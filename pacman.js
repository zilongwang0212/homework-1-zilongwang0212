// Game Constants
const CANVAS_WIDTH = 560;
const CANVAS_HEIGHT = 560;
const TILE_SIZE = 20;
const GRID_WIDTH = CANVAS_WIDTH / TILE_SIZE;
const GRID_HEIGHT = CANVAS_HEIGHT / TILE_SIZE;

// Game State
let canvas, ctx;
let score = 0;
let lives = 3;
let level = 1;
let gameRunning = true;
let powerUpActive = false;
let powerUpTimer = 0;
const POWER_UP_DURATION = 300; // 5 seconds at 60 FPS

// Maze Layout (0 = wall, 1 = dot, 2 = empty, 3 = power pellet)
const maze = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,3,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,3,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,2,0,0,0,2,2,0,0,0,2,0,0,1,0,0,0,0,0,0],
    [2,2,2,2,2,2,1,2,2,2,0,2,2,2,2,2,2,0,2,2,2,1,2,2,2,2,2,2],
    [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,3,1,1,0,0,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,0,0,1,1,3,0],
    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

// Deep copy maze for resetting
let currentMaze = JSON.parse(JSON.stringify(maze));

// Pac-Man
const pacman = {
    x: 14,
    y: 20,
    direction: 0, // 0: right, 1: down, 2: left, 3: up
    nextDirection: 0,
    speed: 0.15,
    moveProgress: 0,
    mouthOpen: 0,
    mouthSpeed: 0.2
};

// Ghosts
const ghosts = [
    { x: 12, y: 13, color: '#FF0000', direction: 0, targetX: 0, targetY: 0, speed: 0.08 }, // Red - Blinky
    { x: 14, y: 13, color: '#FFB8FF', direction: 0, targetX: 0, targetY: 0, speed: 0.08 }, // Pink - Pinky
    { x: 13, y: 14, color: '#00FFFF', direction: 0, targetX: 0, targetY: 0, speed: 0.08 }, // Cyan - Inky
    { x: 15, y: 14, color: '#FFB852', direction: 0, targetX: 0, targetY: 0, speed: 0.08 }  // Orange - Clyde
];

// Rose power-up
let rose = null;
let roseSpawnTimer = 0;
const ROSE_SPAWN_INTERVAL = 600; // 10 seconds

// Hearts (projectiles)
let hearts = [];

// Initialize game
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    updateUI();
    gameLoop();
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(e) {
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
            pacman.nextDirection = 2;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            pacman.nextDirection = 0;
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            pacman.nextDirection = 3;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            pacman.nextDirection = 1;
            break;
    }
}

function gameLoop() {
    if (!gameRunning) return;
    
    update();
    draw();
    
    requestAnimationFrame(gameLoop);
}

function update() {
    // Try to change direction
    if (canMove(pacman.x, pacman.y, pacman.nextDirection)) {
        pacman.direction = pacman.nextDirection;
    }
    
    // Move Pac-Man
    if (canMove(pacman.x, pacman.y, pacman.direction)) {
        const dx = [1, 0, -1, 0][pacman.direction];
        const dy = [0, 1, 0, -1][pacman.direction];
        
        pacman.moveProgress += pacman.speed;
        
        if (pacman.moveProgress >= 1) {
            pacman.x += dx;
            pacman.y += dy;
            pacman.moveProgress = 0;
            
            // Wrap around
            if (pacman.x < 0) pacman.x = GRID_WIDTH - 1;
            if (pacman.x >= GRID_WIDTH) pacman.x = 0;
            
            // Collect dots
            if (currentMaze[pacman.y] && currentMaze[pacman.y][pacman.x] === 1) {
                currentMaze[pacman.y][pacman.x] = 2;
                score += 10;
                updateUI();
            }
            
            // Collect power pellet
            if (currentMaze[pacman.y] && currentMaze[pacman.y][pacman.x] === 3) {
                currentMaze[pacman.y][pacman.x] = 2;
                score += 50;
                updateUI();
            }
            
            // Check for rose
            if (rose && pacman.x === rose.x && pacman.y === rose.y) {
                activatePowerUp();
                rose = null;
            }
        }
    }
    
    // Animate mouth
    pacman.mouthOpen += pacman.mouthSpeed;
    if (pacman.mouthOpen > 0.5 || pacman.mouthOpen < 0) {
        pacman.mouthSpeed = -pacman.mouthSpeed;
    }
    
    // Update ghosts
    ghosts.forEach(ghost => updateGhost(ghost));
    
    // Check collision with ghosts
    ghosts.forEach(ghost => {
        if (Math.abs(pacman.x - ghost.x) < 0.6 && Math.abs(pacman.y - ghost.y) < 0.6) {
            loseLife();
        }
    });
    
    // Power-up management
    if (powerUpActive) {
        powerUpTimer--;
        if (powerUpTimer <= 0) {
            powerUpActive = false;
            document.getElementById('powerUpIndicator').textContent = '';
        } else {
            // Shoot hearts automatically
            if (powerUpTimer % 15 === 0) { // Shoot every 0.25 seconds
                shootHeart();
            }
            document.getElementById('powerUpIndicator').textContent = 
                `🌹 POWER-UP ACTIVE! ${Math.ceil(powerUpTimer / 60)}s 💕`;
        }
    }
    
    // Update hearts
    hearts = hearts.filter(heart => {
        heart.x += heart.dx * 0.2;
        heart.y += heart.dy * 0.2;
        
        // Remove if out of bounds or hits wall
        if (heart.x < 0 || heart.x >= GRID_WIDTH || heart.y < 0 || heart.y >= GRID_HEIGHT) {
            return false;
        }
        
        const tileX = Math.floor(heart.x);
        const tileY = Math.floor(heart.y);
        if (currentMaze[tileY] && currentMaze[tileY][tileX] === 0) {
            return false;
        }
        
        // Check collision with ghosts
        for (let ghost of ghosts) {
            if (Math.abs(heart.x - ghost.x) < 0.7 && Math.abs(heart.y - ghost.y) < 0.7) {
                respawnGhost(ghost);
                score += 200;
                updateUI();
                return false;
            }
        }
        
        return true;
    });
    
    // Rose spawning
    if (!rose) {
        roseSpawnTimer++;
        if (roseSpawnTimer >= ROSE_SPAWN_INTERVAL) {
            spawnRose();
            roseSpawnTimer = 0;
        }
    }
    
    // Check win condition
    if (checkWin()) {
        nextLevel();
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw maze
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const tile = currentMaze[y][x];
            
            if (tile === 0) {
                // Wall
                ctx.fillStyle = '#2121DE';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            } else if (tile === 1) {
                // Dot
                ctx.fillStyle = '#FFB897';
                ctx.beginPath();
                ctx.arc(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (tile === 3) {
                // Power pellet
                ctx.fillStyle = '#FFB897';
                ctx.beginPath();
                ctx.arc(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    // Draw rose
    if (rose) {
        ctx.font = '16px Arial';
        ctx.fillText('🌹', rose.x * TILE_SIZE + 2, rose.y * TILE_SIZE + 16);
    }
    
    // Draw Pac-Man
    drawPacman();
    
    // Draw ghosts
    ghosts.forEach(ghost => drawGhost(ghost));
    
    // Draw hearts
    hearts.forEach(heart => {
        ctx.font = '14px Arial';
        ctx.fillText('💕', heart.x * TILE_SIZE, heart.y * TILE_SIZE + 14);
    });
}

function drawPacman() {
    const x = (pacman.x + pacman.moveProgress * [1, 0, -1, 0][pacman.direction]) * TILE_SIZE + TILE_SIZE / 2;
    const y = (pacman.y + pacman.moveProgress * [0, 1, 0, -1][pacman.direction]) * TILE_SIZE + TILE_SIZE / 2;
    
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    
    const mouthAngle = pacman.mouthOpen * 0.4;
    const startAngle = (pacman.direction * Math.PI / 2) + mouthAngle;
    const endAngle = (pacman.direction * Math.PI / 2) + Math.PI * 2 - mouthAngle;
    
    ctx.arc(x, y, TILE_SIZE / 2 - 2, startAngle, endAngle);
    ctx.lineTo(x, y);
    ctx.fill();
}

function drawGhost(ghost) {
    const x = ghost.x * TILE_SIZE + TILE_SIZE / 2;
    const y = ghost.y * TILE_SIZE + TILE_SIZE / 2;
    const radius = TILE_SIZE / 2 - 2;
    
    ctx.fillStyle = ghost.color;
    
    // Ghost body
    ctx.beginPath();
    ctx.arc(x, y - radius / 2, radius, Math.PI, 0, false);
    ctx.lineTo(x + radius, y + radius);
    ctx.lineTo(x + radius * 0.6, y + radius * 0.5);
    ctx.lineTo(x + radius * 0.2, y + radius);
    ctx.lineTo(x - radius * 0.2, y + radius * 0.5);
    ctx.lineTo(x - radius * 0.6, y + radius);
    ctx.lineTo(x - radius, y + radius * 0.5);
    ctx.lineTo(x - radius, y - radius / 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(x - radius / 3, y - radius / 3, radius / 4, 0, Math.PI * 2);
    ctx.arc(x + radius / 3, y - radius / 3, radius / 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x - radius / 3, y - radius / 3, radius / 6, 0, Math.PI * 2);
    ctx.arc(x + radius / 3, y - radius / 3, radius / 6, 0, Math.PI * 2);
    ctx.fill();
}

function updateGhost(ghost) {
    // Simple AI: chase Pac-Man
    const dx = pacman.x - ghost.x;
    const dy = pacman.y - ghost.y;
    
    // Randomly change direction sometimes
    if (Math.random() < 0.02) {
        ghost.direction = Math.floor(Math.random() * 4);
    } else {
        // Move towards Pac-Man
        if (Math.abs(dx) > Math.abs(dy)) {
            ghost.direction = dx > 0 ? 0 : 2;
        } else {
            ghost.direction = dy > 0 ? 1 : 3;
        }
    }
    
    // Try to move
    if (canMove(ghost.x, ghost.y, ghost.direction)) {
        const moveX = [1, 0, -1, 0][ghost.direction];
        const moveY = [0, 1, 0, -1][ghost.direction];
        
        ghost.x += moveX * ghost.speed;
        ghost.y += moveY * ghost.speed;
        
        // Wrap around
        if (ghost.x < 0) ghost.x = GRID_WIDTH - 1;
        if (ghost.x >= GRID_WIDTH) ghost.x = 0;
    } else {
        // Change direction if blocked
        ghost.direction = Math.floor(Math.random() * 4);
    }
}

function canMove(x, y, direction) {
    const nextX = Math.floor(x + [1, 0, -1, 0][direction]);
    const nextY = Math.floor(y + [0, 1, 0, -1][direction]);
    
    if (nextX < 0 || nextX >= GRID_WIDTH || nextY < 0 || nextY >= GRID_HEIGHT) {
        return direction === 2 || direction === 0; // Allow wrapping left/right
    }
    
    return currentMaze[nextY][nextX] !== 0;
}

function spawnRose() {
    // Find random empty position
    let attempts = 0;
    while (attempts < 100) {
        const x = Math.floor(Math.random() * GRID_WIDTH);
        const y = Math.floor(Math.random() * GRID_HEIGHT);
        
        if (currentMaze[y][x] !== 0) {
            rose = { x, y };
            break;
        }
        attempts++;
    }
}

function activatePowerUp() {
    powerUpActive = true;
    powerUpTimer = POWER_UP_DURATION;
    score += 100;
    updateUI();
}

function shootHeart() {
    const dx = [1, 0, -1, 0][pacman.direction];
    const dy = [0, 1, 0, -1][pacman.direction];
    
    hearts.push({
        x: pacman.x,
        y: pacman.y,
        dx: dx,
        dy: dy
    });
}

function respawnGhost(ghost) {
    ghost.x = 14;
    ghost.y = 13;
}

function loseLife() {
    lives--;
    updateUI();
    
    if (lives <= 0) {
        gameOver();
    } else {
        resetPositions();
    }
}

function resetPositions() {
    pacman.x = 14;
    pacman.y = 20;
    pacman.direction = 0;
    pacman.nextDirection = 0;
    
    ghosts[0].x = 12;
    ghosts[0].y = 13;
    ghosts[1].x = 14;
    ghosts[1].y = 13;
    ghosts[2].x = 13;
    ghosts[2].y = 14;
    ghosts[3].x = 15;
    ghosts[3].y = 14;
    
    hearts = [];
    powerUpActive = false;
}

function checkWin() {
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            if (currentMaze[y][x] === 1 || currentMaze[y][x] === 3) {
                return false;
            }
        }
    }
    return true;
}

function nextLevel() {
    level++;
    currentMaze = JSON.parse(JSON.stringify(maze));
    resetPositions();
    rose = null;
    roseSpawnTimer = 0;
    
    // Increase difficulty
    ghosts.forEach(ghost => {
        ghost.speed += 0.01;
    });
    
    updateUI();
}

function gameOver() {
    gameRunning = false;
    document.getElementById('gameOver').style.display = 'block';
}

function restartGame() {
    score = 0;
    lives = 3;
    level = 1;
    gameRunning = true;
    currentMaze = JSON.parse(JSON.stringify(maze));
    resetPositions();
    rose = null;
    roseSpawnTimer = 0;
    powerUpActive = false;
    
    ghosts.forEach(ghost => {
        ghost.speed = 0.08;
    });
    
    document.getElementById('gameOver').style.display = 'none';
    updateUI();
    gameLoop();
}

function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('level').textContent = level;
}

// Start game when page loads
window.addEventListener('load', init);
