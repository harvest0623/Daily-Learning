## LLM 微调
- 全局微调
    - 重新训练整个模型，包括模型结构和所有参数
    - 适用于任务复杂，数据量较大的场景（法律、金融、医疗等领域）
    - 需要大量的计算资源、时间和数据
    - 计算量大，训练时间长，成本高

- 轻微微调（Fine-Tuning） （LoRA, QloaRA, Prefix-Tuning）
    - 只微调模型的一小部分参数，而不是重新训练整个模型（给模型贴便签）
    - 适用于任务简单，数据量较小的场景（聊天、翻译、情感分析等领域）
    - 计算量小，训练时间短，成本低

1. 下载模型

2. 查看模型位置

3. 加载模型
```python
# 加载模型并测试
from transformers import AutoTokenizer, AutoModelForCausalLM

# 指定模型路径，这里是一个本地已经下载好的 DeepSeek-R1 模型的路径
model_name = "/mnt/workspace/.cache/modelscope/models/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B"

# 加载分词器和模型
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name).to("cuda")

print("模型加载成功！")
```

4. 准备数据集
```python
# 准备数据集
import json

# 假设这是你的原始数据
samples = [...] # 每个 sample 应为 dict 类型，例如 {"text": "xxx"} 或 {"input": "...", "output": "..."}

# 写入 jsonl 文件
with open("dataset.jsonl", "w", encoding="utf-8") as f:
    for sample in samples:
        f.write(json.dumps(sample, ensure_ascii=False) + "\n")

print("数据集制作完成！")
```

5. 导入数据集

6. 拆分数据集：训练集、测试集

7. 将数据集转换为模型输入格式（向量表示）

8. 量化数据集（8 bit 量化）（节省显存占用）

9. 训练模型：配置 loRA 参数（低秩参数）