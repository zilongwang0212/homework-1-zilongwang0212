# 如何添加自定义关键字主题

本指南说明如何添加您自己的研究主题关键字到arXiv论文获取系统。

## 📝 快速上手

### 当前支持的主题

系统已经配置了以下主题：

1. **AI & Machine Learning** - 通用AI和机器学习论文
2. **Causal Inference** - 因果推断相关研究
3. **Large Language Models** - 大语言模型（LLM、GPT等）
4. **Reinforcement Learning** - 强化学习

## 🔧 添加新主题

### 步骤 1: 编辑 `fetch_papers.py`

打开 `fetch_papers.py` 文件，找到 `SEARCH_TOPICS` 字典（大约在第10行）：

```python
SEARCH_TOPICS = {
    'ai_ml': {
        'query': 'cat:cs.AI OR cat:cs.LG OR cat:cs.CV OR cat:cs.CL',
        'name': 'AI & Machine Learning',
        'max_results': 10
    },
    'causal': {
        'query': 'all:causal AND (cat:cs.AI OR cat:cs.LG OR cat:stat.ML)',
        'name': 'Causal Inference',
        'max_results': 10
    },
    # ... 其他主题
}
```

### 步骤 2: 添加您的主题

在字典中添加新条目。例如，添加"量子计算"主题：

```python
SEARCH_TOPICS = {
    # ... 现有主题 ...
    
    'quantum': {
        'query': 'all:quantum AND (cat:quant-ph OR cat:cs.ET)',
        'name': 'Quantum Computing',
        'max_results': 5
    }
}
```

### 配置参数说明

- **键名** (`'quantum'`): 内部标识符，使用小写字母和下划线
- **`query`**: arXiv API搜索查询（见下方查询语法）
- **`name`**: 显示名称，会出现在网页的下拉菜单中
- **`max_results`**: 获取的最大论文数量（建议5-15篇）

## 🔍 arXiv查询语法

### 基本语法

```python
# 按分类搜索
'cat:cs.AI'                    # 人工智能分类

# 全文搜索（标题、摘要、作者）
'all:transformer'              # 包含"transformer"的论文

# 标题搜索
'ti:neural'                    # 标题中有"neural"

# 作者搜索
'au:lecun'                     # LeCun的论文

# 摘要搜索
'abs:attention'                # 摘要中有"attention"
```

### 组合查询

```python
# AND - 同时满足
'all:causal AND all:inference'

# OR - 满足任一条件
'all:GPT OR all:BERT OR all:transformer'

# 括号分组
'(all:neural OR all:deep) AND cat:cs.AI'

# 多个分类
'cat:cs.AI OR cat:cs.LG OR cat:cs.CL'
```

### 常用分类代码

| 代码 | 领域 |
|------|------|
| `cs.AI` | 人工智能 |
| `cs.LG` | 机器学习 |
| `cs.CV` | 计算机视觉 |
| `cs.CL` | 计算语言学（NLP） |
| `cs.NE` | 神经与进化计算 |
| `stat.ML` | 统计-机器学习 |
| `math.OC` | 数学-优化与控制 |
| `quant-ph` | 量子物理 |
| `cs.CR` | 密码学与安全 |
| `cs.DB` | 数据库 |

完整分类列表: https://arxiv.org/category_taxonomy

## 💡 实际例子

### 例子 1: 添加"图神经网络"主题

```python
'gnn': {
    'query': 'all:"graph neural network" OR all:GNN',
    'name': 'Graph Neural Networks',
    'max_results': 8
}
```

### 例子 2: 添加"可解释AI"主题

```python
'xai': {
    'query': '(all:explainable OR all:interpretable) AND cat:cs.AI',
    'name': 'Explainable AI',
    'max_results': 10
}
```

### 例子 3: 添加"医学AI"主题

```python
'medical_ai': {
    'query': '(all:medical OR all:clinical OR all:healthcare) AND (cat:cs.AI OR cat:cs.LG)',
    'name': 'Medical AI',
    'max_results': 12
}
```

### 例子 4: 添加"因果推断"主题（已实现）

```python
'causal': {
    'query': 'all:causal AND (cat:cs.AI OR cat:cs.LG OR cat:stat.ML)',
    'name': 'Causal Inference',
    'max_results': 10
}
```

### 例子 5: 添加"对抗攻击"主题

```python
'adversarial': {
    'query': 'all:adversarial AND (cat:cs.LG OR cat:cs.CR)',
    'name': 'Adversarial Learning',
    'max_results': 7
}
```

## 🚀 应用更改

### 本地测试

```bash
# 测试新配置
python3 fetch_papers.py

# 检查输出
cat papers.json
```

### 部署到GitHub

```bash
# 提交更改
git add fetch_papers.py
git commit -m "Add custom topic: [您的主题名]"
git push

# GitHub Actions会自动：
# 1. 运行您的新配置
# 2. 更新papers.json
# 3. 部署到网站
```

## ⚙️ 高级配置

### 调整获取数量

根据主题热度调整 `max_results`：

```python
# 热门主题 - 更多论文
'popular_topic': {
    'max_results': 15
}

# 小众主题 - 较少论文
'niche_topic': {
    'max_results': 5
}
```

### 使用引号进行精确匹配

```python
# 精确短语
'query': 'all:"exact phrase here"'

# vs 任意词匹配
'query': 'all:word1 OR all:word2'
```

### 排除某些结果

虽然arXiv API不直接支持NOT操作符，但可以通过精确的分类限制来过滤：

```python
# 只在特定分类中搜索
'query': 'all:keyword AND (cat:cs.AI OR cat:cs.LG)'
```

## 🎯 最佳实践

1. **测试查询**: 先在 [arXiv网站](https://arxiv.org/search/advanced) 测试查询
2. **合理数量**: 每个主题5-15篇论文，总计不超过50篇
3. **清晰命名**: 使用描述性的 `name` 字段
4. **避免重复**: 不同主题间应该有明确区分
5. **定期更新**: 根据研究兴趣调整主题

## 📊 查看结果

网页会显示：

- **主题过滤器**: 下拉菜单显示所有主题及论文数量
- **主题标签**: 每篇论文会标注所属主题
- **组合过滤**: 可以同时使用主题过滤、分类过滤和搜索

## 🔄 自动更新

配置好后，系统会：

1. **每天午夜UTC**: 自动获取所有主题的最新论文
2. **去重处理**: 自动删除重复论文（同一篇可能匹配多个主题）
3. **更新网站**: GitHub Pages自动部署更新

## ❓ 常见问题

### Q: 我的主题没有获取到论文？

**A:** 检查：
1. 查询语法是否正确
2. 分类代码是否有效
3. 关键词是否太具体（尝试更广泛的查询）

### Q: 如何获取更多论文？

**A:** 增加 `max_results` 值，但建议总数不超过50篇（避免页面加载慢）

### Q: 可以按作者获取论文吗？

**A:** 可以！使用 `au:author_name`：

```python
'lecun_papers': {
    'query': 'au:lecun',
    'name': 'Yann LeCun Papers',
    'max_results': 10
}
```

### Q: 如何只获取最近一周的论文？

**A:** arXiv API按提交日期排序，`max_results` 控制数量，新论文会自动排在前面。

## 📚 参考资源

- [arXiv API文档](https://arxiv.org/help/api/user-manual)
- [arXiv分类列表](https://arxiv.org/category_taxonomy)
- [arXiv高级搜索](https://arxiv.org/search/advanced)

## 🎓 示例配置集合

```python
SEARCH_TOPICS = {
    # AI基础
    'ai_ml': {
        'query': 'cat:cs.AI OR cat:cs.LG OR cat:cs.CV OR cat:cs.CL',
        'name': 'AI & Machine Learning',
        'max_results': 10
    },
    
    # 因果推断
    'causal': {
        'query': 'all:causal AND (cat:cs.AI OR cat:cs.LG OR cat:stat.ML)',
        'name': 'Causal Inference',
        'max_results': 10
    },
    
    # 大语言模型
    'llm': {
        'query': 'all:"large language model" OR all:LLM OR all:GPT',
        'name': 'Large Language Models',
        'max_results': 5
    },
    
    # 强化学习
    'reinforcement': {
        'query': 'all:"reinforcement learning" OR all:RL',
        'name': 'Reinforcement Learning',
        'max_results': 5
    },
    
    # 图神经网络
    'gnn': {
        'query': 'all:"graph neural network" OR all:GNN',
        'name': 'Graph Neural Networks',
        'max_results': 5
    },
    
    # 可解释AI
    'xai': {
        'query': '(all:explainable OR all:interpretable) AND cat:cs.AI',
        'name': 'Explainable AI',
        'max_results': 5
    }
}
```

---

**提示**: 修改配置后，记得测试并提交到GitHub！系统会在下次自动更新时使用新配置。
