# 词嵌入 + 位置编码
# 词嵌入 = 词嵌入到向量空间（矩阵）（向量本身对位置是一无所知的 hello wo  乱序词袋） dog bites man 和 man bites dog
# 位置编码 = 位置向量 （正弦余弦函数）

# 输入向量 = 嵌入向量 + 位置向量

import numpy as np   # 张量数据结构  提供了高效的多维数组的操作

# print(np.dot(np.array([[1, 2], [3, 4]]), np.array([[5], [6]])))

CORPUS = "hello world transformer model attention is all you need"
# 极小的训练语料， 模型将从中学到字符级别的序列规律

# 构建字符级别词汇表
chars = sorted(list(set(CORPUS)))  # 去重并排序

vocab_size = len(chars)  # 词汇表大小

# 构建双向映射字典 （字符 <-> 索引）
char_to_idx = {ch: i for i, ch in enumerate(chars)}  # 字符到索引的映射\
# {'': 0, 'a': 1, 'd': 2}

idx_to_char = {i: ch for ch, i in char_to_idx.items()}  # 索引到字符的映射\
# {0: '', 1: 'a', 2: 'd'}

# 将整个语料转换为索引序列
data = np.array([char_to_idx[ch] for ch in CORPUS])
# for ch in CORPUS
# h e l l o w o ....
# char_to_idx[ch]  => 'h' -> 5, 'e' -> 3, 'l' -> 10, ...


# print(f"词汇表大小: {vocab_size}")
# print(f"语料长度: {len(data)}")
# print(f"索引序列（前20个）: {data[:20]}")


# 构建训练样本 -- 滑动窗口  用连续的seq_len个字符作为输入，预测下一个字符（seq_len+1）
# seq_len = 8
#  位置 0 - 7： “hello wo” -> "r"
#  位置 1 - 8： “ello wor” -> "l"
#  位置 2 - 9： “llo worl” -> "d"

seq_len = 8

inputs = []  # 用来存放所有输入序列
targets = []  # 用来存放对应的预测目标


# 滑动窗口遍历语料， 生成训练样本
for i in range(len(data) - seq_len):
  inputs.append(data[i : i + seq_len])  # “hello wo”
  targets.append(data[i + seq_len])  # “r”


# 将 inputs 和 targets 转换为张量（NumPy数组）
inputs = np.array(inputs)  
targets = np.array(targets)


print(f"\n训练样本数: {len(inputs)}")  
print(f"\输入形状: {inputs.shape}, 目标形状: {targets.shape}") # (47, 8)  (47, )

print(f"示例-输入索引: {inputs[0]}, 目标索引: {targets[0]}")  

print(f"示例-输入字符: {''.join(idx_to_char[i] for i in inputs[0])} -> 目标字符: {idx_to_char[targets[0]]}")  