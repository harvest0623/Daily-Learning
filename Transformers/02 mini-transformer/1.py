"""
核心：
    给定输入序列 “hello”， 模型的目标是预测每一个位置的下一个字符：

    输入： h e l l o
    目标： e l l o  <下一个字符>

"""

import torch  # 提供张量数据结构
import torch.nn as nn   # 神经网络层 （Embedding, Linear等）
import torch.nn.functional as F  # 提供函数式API（softmax, cross_entropy等）

CORPUS = "hello world transformer model attention is all you need"  # 极小的训练语料

chars = sorted(list(set(CORPUS)))  # 去重并排序
# set("hello") ==> {'h', 'e', 'l', 'o'}
# list({'h', 'e', 'l', 'o'}) ==> ['h', 'e', 'l', 'o']
# sorted(['h', 'e', 'l', 'o']) ==> ['e', 'h', 'l', 'o']

vocab_size = len(chars)  # 词汇表大小


# 构建双向映射，将字符转换为索引，索引转换为字符
char_to_idx = {ch: i for i, ch in enumerate(chars)}  # 字符到索引的映射\
# enumerate(['', 'a', 'd']) ==> (0, ''), (1, 'a'), (2, 'd')
# for i, ch in ...  ==> 遍历每一对，i为索引，ch为字符
# {'': 0, 'a': 1, 'd': 2}

idx_to_char = {i: ch for ch, i in char_to_idx.items()}  # 索引到字符的映射\
# {0: '', 1: 'a', 2: 'd'}

print(f"词汇表大小: {vocab_size}")
print(f"字符列表: {chars}")
print(f"语料: {CORPUS!r}")   

# 词嵌入 + 位置编码