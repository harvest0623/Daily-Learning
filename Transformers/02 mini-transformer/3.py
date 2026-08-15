"""
Mini Transformer —— 用 PyTorch 从零实现
一个完整的 Transformer 解码器，跑字符级预测任务：拿前 8 个字符预测第 9 个。
"""

# ============================================================
# 导入依赖库
# ============================================================
import torch
# PyTorch 深度学习框架，提供张量（Tensor）计算和自动求导（Autograd）
# 张量（Tensor）= 多维数组，是 PyTorch 的核心数据结构
# 与 NumPy 的 ndarray 类似，但支持 GPU 加速和自动梯度计算
# ========== 示例：PyTorch 张量基本操作 ==========
#   >>> t = torch.tensor([1.0, 2.0, 3.0])
#   >>> t * 2
#   tensor([2., 4., 6.])  # 向量化运算

import torch.nn as nn
# nn 模块：提供各种神经网络层的类（Layer）
# 常用层：nn.Linear（全连接层）、nn.Embedding（嵌入层）、nn.LayerNorm（层归一化）
# 所有层都是 nn.Module 的子类，支持 .parameters() 获取可训练参数
# ========== 示例：nn.Linear 的用法 ==========
#   >>> layer = nn.Linear(in_features=4, out_features=2)
#   >>> layer.weight.shape
#   torch.Size([2, 4])  # 权重矩阵：(输出维度, 输入维度)

import torch.nn.functional as F
# F 模块：提供函数式 API（无状态函数，参数需手动传入）
# 常用函数：F.softmax（归一化概率）、F.relu（激活函数）、F.cross_entropy（交叉熵损失）
# 与 nn 的区别：nn.Linear 是"有状态的层"（含可训练参数），
#               F.linear 是"无状态的函数"（参数手动传入）

import math
# Python 标准数学库，提供 sqrt、log 等数学函数
# 此处用于位置编码（Positional Encoding）中的三角函数计算

# ============================================================
# 超参数配置
# ============================================================

VOCAB_SIZE = 17
# 词汇表大小（17 个字符），后续会被语料实际大小覆盖

CONTEXT_LEN = 8
# 上下文长度：模型每次能看到多少个字符（滑动窗口大小）

D_MODEL = 64
# 模型维度（向量宽度）：每个字符被表示为一个 64 维的向量
# 越大模型越"聪明"，但计算量也越大

D_FF = 128
# 前馈网络（FFN）的隐藏层维度，通常为 D_MODEL 的 2~4 倍

N_HEAD = 4
# 注意力头数：多头注意力中并行运行的注意力头数量
# D_MODEL 必须能被 N_HEAD 整除（64 / 4 = 16，每个头处理 16 维）

N_LAYER = 2
# Transformer Block 的堆叠层数

DROPOUT = 0.1
# Dropout 概率：训练时随机"关闭"部分神经元，防止过拟合
# 当前版本未使用，但保留为后续扩展预留

LEARNING_RATE = 3e-3
# 学习率：控制每次参数更新的步长
# 3e-3 = 0.003，过大容易震荡，过小收敛太慢

# ============================================================
# 数据准备
# ============================================================

# ----------------------------------------------------------
# 1.1 定义语料库（Corpus）
# ----------------------------------------------------------
corpus = "hello world, how are you today? hello again!"
# 使用一个简单的英文句子作为训练语料
# 模型将从中学到字符级别的序列规律

# ----------------------------------------------------------
# 1.2 构建字符级词汇表（Vocabulary）
# ----------------------------------------------------------
chars = sorted(set(corpus))
# ========== 语法拆解 ==========
# 步骤1: set(corpus) 将字符串拆成字符集合，自动去重
#   例如: set("hello") → {'h', 'e', 'l', 'o'}（无序）
# 步骤2: sorted(...) 对集合按字典序排序，保证每次运行顺序一致
#   例如: {'o','h','l','e'} → ['e','h','l','o']
# 最终结果：所有不重复字符按字母顺序排列的列表

# ========== 示例：set() 的常见用法 ==========
#   >>> set("hello")
#   {'h', 'e', 'l', 'o'}  # 自动去重
#   >>> set("abc") & set("bcd")
#   {'b', 'c'}  # 交集运算

stoi = {c: i for i, c in enumerate(chars)}
# ========== 语法拆解 ==========
# 步骤1: enumerate(chars) 生成 (索引, 元素) 对
#   例如: enumerate([' ','!','?']) → (0,' '), (1,'!'), (2,'?')
# 步骤2: for i, c in ... 遍历每一对，i 是索引，c 是字符
# 步骤3: {c: i for ...} 字典推导式（Dict Comprehension）
#   用字符作为键（key），索引作为值（value）
# 最终结果：字符→索引的映射表，用于将文本编码为数字

# ========== 示例：enumerate() 的常见用法 ==========
#   >>> for i, item in enumerate(['a', 'b', 'c']):
#   ...     print(f"位置{i}: {item}")
#   位置0: a
#   位置1: b
#   位置2: c

itos = {i: c for i, c in enumerate(chars)}
# 交换键值位置：索引→字符的映射表，用于将数字解码回可读文本
# 例如: {0: ' ', 1: '!', 2: '?', 3: 'a', ...}

VOCAB_SIZE = len(chars)
# len() 获取可迭代对象的元素个数
# 覆盖初始值，让词汇表大小自动适应实际语料

# ----------------------------------------------------------
# 1.3 打印词汇表信息
# ----------------------------------------------------------
print(f"词汇表大小: {VOCAB_SIZE}")
# f-string 格式化字符串：花括号 {} 内的表达式会被求值并嵌入字符串

print(f"语料长度: {len(corpus)}")


# ============================================================
# 构造训练样本：滑动窗口法（Sliding Window）
# ============================================================
def make_data(text, ctx_len):
    """
    将文本切分成 (输入序列, 目标值) 样本对

    参数:
        text: 原始文本字符串
        ctx_len: 上下文长度（输入序列长度）

    返回:
        xs: 输入序列张量，形状 (样本数, ctx_len)
        ys: 目标值张量，形状 (样本数,)

    示例:
        text = "hello world"
        ctx_len = 8
        → 输入 "hello wo" 预测 'r'（第9个字符）

    类比理解：就像用一个固定长度的"窗口"在文本上平移，
              每次看到的内容是输入，窗口右边第一个看不到的是目标。
    """
    xs, ys = [], []
    # xs: 存放所有输入序列（每个长度为 ctx_len）
    # ys: 存放对应的预测目标（下一个字符的索引）

    for i in range(len(text) - ctx_len):
        # range(len(text) - ctx_len)：确保每个输入后面都有一个目标可预测
        # len(text) - ctx_len = 总样本数

        xs.append([stoi[c] for c in text[i:i + ctx_len]])
        # ========== 语法拆解 ==========
        # 步骤1: text[i:i + ctx_len] 切片操作，取从位置 i 开始的 ctx_len 个字符
        #   例如 i=0, ctx_len=8: text[0:8] → "hello wo"
        # 步骤2: stoi[c] 查字典，将每个字符转为对应整数（已在上方1.2节解释）
        # 步骤3: [stoi[c] for c in ...] 列表推导式（List Comprehension）
        #   等价于：
        #     result = []
        #     for c in text[i:i + ctx_len]:
        #         result.append(stoi[c])
        # 步骤4: .append(...) 将结果追加到 xs 列表

        ys.append(stoi[text[i + ctx_len]])
        # 取输入序列之后的第一个字符，作为预测目标

    return torch.tensor(xs), torch.tensor(ys)
    # torch.tensor() 将 Python 列表/嵌套列表转为 PyTorch 张量
    # xs 转为二维张量 (样本数, ctx_len)
    # ys 转为一维张量 (样本数,)


X, Y = make_data(corpus, CONTEXT_LEN)
# X: 输入张量，形状 (样本数, 8)
# Y: 目标张量，形状 (样本数,)

print(f"训练样本数: {len(X)}, 输入形状: {tuple(X.shape)}, 目标形状: {tuple(Y.shape)}")
# .shape 属性返回张量的维度信息（torch.Size 对象）
# tuple() 将其转为元组，打印格式更友好

print(f"示例输入: '{corpus[:8]}' 预测 '{corpus[8]}'")
# corpus[:8] 取前8个字符作为示例输入
# corpus[8] 取第9个字符作为预测目标


# ============================================================
# 位置编码（Positional Encoding）：正弦余弦编码
# ============================================================
# 为什么需要位置编码？
# Transformer 的注意力机制是"无序"的——它不知道字符的先后顺序。
# 位置编码通过给每个位置一个独特的"位置信号"，让模型知道每个字符在序列中的位置。
#
# 数学公式：
#   PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
#   PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
# 其中 pos 是位置，i 是维度索引，d_model 是模型维度


class PositionalEncoding(nn.Module):
    """
    位置编码模块
    使用正弦和余弦函数生成位置信息，加到输入嵌入上
    """

    def __init__(self, d_model, max_len=50):
        """
        参数:
            d_model: 模型维度
            max_len: 最大序列长度（预计算，节省运行时开销）
        """
        super().__init__()
        # super().__init__() 调用父类 nn.Module 的构造函数
        # 这是 Python 继承的标准写法，确保父类被正确初始化

        pe = torch.zeros(max_len, d_model)
        # 创建零矩阵 (max_len, d_model)，用于存放位置编码
        # 例如 max_len=50, d_model=64 → 形状 (50, 64)

        pos = torch.arange(max_len).unsqueeze(1).float()
        # ========== 语法拆解 ==========
        # 步骤1: torch.arange(max_len) 生成 [0, 1, 2, ..., 49]，形状 (50,)
        # 步骤2: .unsqueeze(1) 在第1维插入一个维度，形状变为 (50, 1)
        #   unsqueeze 的作用：将一维向量变成"列向量"，方便后续广播运算
        #   例如: tensor([0,1,2]) → tensor([[0],[1],[2]])
        # 步骤3: .float() 转为浮点数类型（arange 默认生成整数）

        div = torch.exp(
            torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model)
        )
        # ========== 语法拆解 ==========
        # 步骤1: torch.arange(0, d_model, 2) 生成 [0, 2, 4, ..., 62]（步长为2）
        #   形状：(d_model/2,) = (32,)
        # 步骤2: -math.log(10000.0) / d_model 计算衰减系数
        #   math.log(10000) ≈ 9.21，除以 d_model=64 ≈ -0.144
        # 步骤3: 上述两项相乘，得到每个维度的频率参数
        # 步骤4: torch.exp(...) 取指数，得到最终的除法项
        # 最终结果：div[i] = 1 / 10000^(2i/d_model)，不同维度有不同的"波长"

        pe[:, 0::2] = torch.sin(pos * div)
        # 0::2 是切片语法，表示"从第0列开始，步长为2"→ 即所有偶数列
        # pos * div 利用广播机制：(50,1) * (32,) → (50, 32)
        # 将正弦值填入位置编码矩阵的偶数列

        pe[:, 1::2] = torch.cos(pos * div)
        # 1::2 表示"从第1列开始，步长为2"→ 即所有奇数列
        # 将余弦值填入位置编码矩阵的奇数列

        self.register_buffer("pe", pe)
        # register_buffer() 将 pe 注册为"缓冲区"
        # 与 nn.Parameter 的区别：
        #   - nn.Parameter：可训练参数，参与梯度更新
        #   - register_buffer：不可训练，但会随模型保存/加载，也会随模型移到 GPU
        # 位置编码是固定的（不需要训练），所以用 buffer

    def forward(self, x):
        """
        参数:
            x: 输入张量 (batch, seq_len, d_model)
        返回:
            加上位置编码后的张量 (batch, seq_len, d_model)
        """
        return x + self.pe[:x.size(1)]
        # ========== 语法拆解 ==========
        # 步骤1: x.size(1) 获取第1维的大小，即 seq_len（序列长度）
        # 步骤2: self.pe[:x.size(1)] 切片取前 seq_len 个位置编码
        #   例如 seq_len=8 时，取 self.pe[:8]，形状 (8, 64)
        # 步骤3: x + self.pe[:x.size(1)] 利用广播机制相加
        #   x 形状 (batch, 8, 64) + pe 形状 (8, 64)
#   pe 自动扩展为 (1, 8, 64)，与 x 逐元素相加
        # 最终结果：每个位置的嵌入向量都加上了对应的位置信号


# ============================================================
# 因果掩码（Causal Mask）：屏蔽未来信息
# ============================================================
# 为什么需要因果掩码？
# 在自回归语言模型中，预测第 t 个字符时只能看到第 1~t 个字符，
# 不能"偷看"第 t+1 个及之后的字符（否则就是"作弊"）。
# 因果掩码通过将未来位置的注意力分数设为 -inf，让 softmax 后这些位置的概率趋近于 0。


def causal_mask(sz):
    """
    生成因果掩码（下三角矩阵）

    参数:
        sz: 序列长度

    返回:
        布尔掩码矩阵 (sz, sz)，True 表示可见位置

    示例:
        causal_mask(3) →
        [[True,  False, False],   # 位置0只能看到自己
         [True,  True,  False],   # 位置1能看到0和1
         [True,  True,  True ]]   # 位置2能看到0、1、2
    """
    mask = torch.triu(torch.ones(sz, sz), diagonal=1).bool()
    # ========== 语法拆解 ==========
    # 步骤1: torch.ones(sz, sz) 创建全1矩阵 (sz, sz)
    #   例如 sz=3: [[1,1,1],[1,1,1],[1,1,1]]
    # 步骤2: torch.triu(..., diagonal=1) 取上三角（对角线以上）
    #   diagonal=1 表示"对角线向上偏移1格"，即不包含主对角线
    #   结果: [[0,1,1],[0,0,1],[0,0,0]]
    # 步骤3: .bool() 转为布尔类型，0→False, 1→True
    #   结果: [[False,True,True],[False,False,True],[False,False,False]]
    # 此时 True 表示"未来位置"（需要被屏蔽的）

    return ~mask
    # ~ 是按位取反运算符（Bitwise NOT）
    # False→True, True→False
    # 结果: [[True,False,False],[True,True,False],[True,True,True]]
    # 此时 True 表示"可见位置"


# ============================================================
# 单头自注意力（Single-Head Self-Attention）
# ============================================================
# 自注意力的核心思想：
# 对于序列中的每个字符，计算它与所有其他字符的"相关性"，
# 然后根据相关性对所有字符的值向量做加权求和。
#
# 数学公式：Attention(Q,K,V) = softmax(Q·K^T / √d_k) · V
#   Q（Query）：当前字符"想找什么"
#   K（Key）：每个字符"提供什么线索"
#   V（Value）：每个字符"实际携带的信息"
#   √d_k：缩放因子，防止点积值过大导致 softmax 梯度消失


class SelfAttentionHead(nn.Module):
    """
    单头自注意力机制
    计算 Query、Key、Value，应用因果掩码后输出加权和
    """

    def __init__(self, d_model, d_k):
        """
        参数:
            d_model: 输入维度
            d_k: 注意力头维度（每个头处理的维度）
        """
        super().__init__()

        self.Wq = nn.Linear(d_model, d_k)
        # Q 的线性变换：将输入映射为 Query 向量
        # nn.Linear(in_features, out_features) 实现 y = x·W^T + b
        # 权重矩阵形状：(d_k, d_model)，偏置形状：(d_k,)

        self.Wk = nn.Linear(d_model, d_k)
        # K 的线性变换：将输入映射为 Key 向量

        self.Wv = nn.Linear(d_model, d_k)
        # V 的线性变换：将输入映射为 Value 向量

        self.d_k = d_k
        # 保存 d_k，用于后续缩放因子 √d_k

    def forward(self, x):
        """
        参数:
            x: 输入张量 (batch, seq_len, d_model)
        返回:
            注意力输出 (batch, seq_len, d_k)
        """
        B, T, C = x.shape
        # B = batch_size（批次大小）
        # T = seq_len（序列长度/上下文长度）
        # C = d_model（模型维度）
        # 这是 PyTorch 中常见的解包写法，一次性获取三个维度

        Q = self.Wq(x)
        # Q = x · Wq^T + bq，形状 (B, T, d_k)
        # Query 向量：代表每个位置"想找什么样的信息"

        K = self.Wk(x)
        # K = x · Wk^T + bk，形状 (B, T, d_k)
        # Key 向量：代表每个位置"提供什么样的线索"

        V = self.Wv(x)
        # V = x · Wv^T + bv，形状 (B, T, d_k)
        # Value 向量：代表每个位置"实际携带的信息"

        scores = Q @ K.transpose(-2, -1) / math.sqrt(self.d_k)
        # ========== 语法拆解 ==========
        # 步骤1: K.transpose(-2, -1) 转置最后两个维度
        #   K 形状 (B, T, d_k) → 转置后 (B, d_k, T)
        #   -2 和 -1 表示倒数第2和倒数第1个维度
        # 步骤2: Q @ K.transpose(...) 矩阵乘法
        #   (B, T, d_k) @ (B, d_k, T) → (B, T, T)
        #   结果：每个位置与其他所有位置的"相似度分数"
        # 步骤3: / math.sqrt(self.d_k) 除以缩放因子
        #   防止点积值过大，导致 softmax 输出趋近于 one-hot，梯度消失
        #   这是论文 "Attention Is All You Need" 中的关键技巧

        mask = causal_mask(T).to(x.device)
        # causal_mask(T) 生成 (T, T) 的因果掩码（已在上方解释）
        # .to(x.device) 将掩码移到与输入相同的设备（CPU 或 GPU）

        scores = scores.masked_fill(~mask, float('-inf'))
        # ========== 语法拆解 ==========
        # 步骤1: ~mask 取反，True 变为 False，False 变为 True
        #   此时 True 表示"未来位置"（需要屏蔽的）
        # 步骤2: .masked_fill(~mask, float('-inf'))
        #   将 ~mask 中为 True 的位置（未来位置）替换为 -inf
        #   被屏蔽的位置分数变为负无穷，softmax 后概率趋近于 0
        # 效果：每个位置只能注意到自己和之前的位置，看不到未来

        weights = F.softmax(scores, dim=-1)
        # softmax 将分数转为概率分布（所有值在 0~1 之间，且总和为 1）
        # dim=-1 表示在最后一个维度（每行）上做 softmax
        # -inf 的位置 softmax 后概率为 0（被完全屏蔽）
        # 形状：(B, T, T)

        return weights @ V
        # 矩阵乘法：(B, T, T) @ (B, T, d_k) → (B, T, d_k)
        # 含义：对每个位置，用注意力权重对所有位置的 Value 做加权求和
        # 例如位置 3 的输出 = w30·V0 + w31·V1 + w32·V2 + w33·V3


# ============================================================
# 多头注意力（Multi-Head Attention）
# ============================================================
# 为什么用多头？
# 单头注意力只能学习一种"注意力模式"。
# 多头注意力让模型同时学习多种模式：
#   头1 可能关注"语法关系"（主语↔谓语）
#   头2 可能关注"距离关系"（相邻字符）
#   头3 可能关注"语义相似性"
# 最后将所有头的输出拼接起来，通过线性层融合。


class MultiHeadAttention(nn.Module):
    """
    多头注意力机制
    并行运行多个注意力头，拼接后投影
    """

    def __init__(self, d_model, n_head):
        """
        参数:
            d_model: 模型维度
            n_head: 注意力头数
        """
        super().__init__()

        assert d_model % n_head == 0, "d_model 必须能被 n_head 整除"
        # assert 是断言语句：如果条件为 False，抛出 AssertionError
        # 这里确保每个头能分到整数维度，如 64 / 4 = 16

        d_k = d_model // n_head
        # // 是整除运算符（地板除）
        # 每个注意力头处理的维度：64 // 4 = 16

        self.heads = nn.ModuleList([
            SelfAttentionHead(d_model, d_k) for _ in range(n_head)
        ])
        # ========== 语法拆解 ==========
        # 步骤1: for _ in range(n_head) 循环 n_head 次
        #   _ 是"丢弃变量"，表示循环变量不需要使用
        # 步骤2: SelfAttentionHead(d_model, d_k) 创建单头注意力实例
        #   每个头有独立的 Wq, Wk, Wv 参数
        # 步骤3: [...] 列表推导式，生成 n_head 个注意力头
        # 步骤4: nn.ModuleList([...]) 将普通列表转为"模块列表"
        #   与普通 list 的区别：ModuleList 会自动注册子模块，
        #   使得 .parameters() 能正确返回所有头的参数

        self.proj = nn.Linear(n_head * d_k, d_model)
        # 输出投影层：将拼接后的多头输出映射回 d_model 维度
        # 输入维度 = n_head * d_k（所有头拼接后的维度）
        # 输出维度 = d_model

    def forward(self, x):
        """
        参数:
            x: 输入张量 (batch, seq_len, d_model)
        返回:
            多头注意力输出 (batch, seq_len, d_model)
        """
        heads = [h(x) for h in self.heads]
        # 每个头独立计算注意力，结果列表中每个元素形状 (B, T, d_k)

        concat = torch.cat(heads, dim=-1)
        # torch.cat() 在指定维度上拼接张量
        # dim=-1 表示在最后一个维度拼接
        # 4个头 × (B, T, 16) → 拼接后 (B, T, 64)

        return self.proj(concat)
        # 通过投影层融合多头信息，形状 (B, T, d_model)


# ============================================================
# 前馈网络（Feed-Forward Network, FFN）
# ============================================================
# FFN 的作用：对注意力输出做非线性变换，增加模型的表达能力
# 结构：Linear → ReLU → Linear（两层线性变换，中间用激活函数）
# 类比：注意力层负责"信息收集"（从其他位置获取信息），
#       FFN 负责"信息处理"（对收集到的信息做深度变换）


class FFN(nn.Module):
    """
    前馈神经网络
    两层线性变换，中间用 ReLU 激活
    """

    def __init__(self, d_model, d_ff):
        """
        参数:
            d_model: 输入/输出维度
            d_ff: 隐藏层维度（通常为 d_model 的 4 倍）
        """
        super().__init__()

        self.net = nn.Sequential(
            nn.Linear(d_model, d_ff),
            # 第一层：d_model → d_ff（升维），形状变化 (B,T,64) → (B,T,128)

            nn.ReLU(),
            # ReLU 激活函数：f(x) = max(0, x)
            # 负值变为0，正值保持不变
            # 引入非线性，让模型能学习更复杂的模式
            # ========== 示例：ReLU 的效果 ==========
            #   >>> F.relu(torch.tensor([-2, -1, 0, 1, 2]))
            #   tensor([0, 0, 0, 1, 2])

            nn.Linear(d_ff, d_model),
            # 第二层：d_ff → d_model（降维），形状变化 (B,T,128) → (B,T,64)
        )
        # nn.Sequential() 按顺序串联多个层
        # 数据依次流过每个层，前一个层的输出是后一个层的输入

    def forward(self, x):
        """
        参数:
            x: 输入张量 (batch, seq_len, d_model)
        返回:
            前馈输出 (batch, seq_len, d_model)
        """
        return self.net(x)


# ============================================================
# Transformer Block（完整解码器块）
# ============================================================
# 一个 Transformer Block 的数据流：
#   输入 x → LayerNorm → Multi-Head Attention → + x（残差连接）
#         → LayerNorm → FFN → + x（残差连接）→ 输出
#
# 残差连接（Residual Connection）的作用：
#   直接将输入加到输出上：output = x + sublayer(x)
#   这样即使子层学不好，信息也能通过"捷径"直接传递，防止梯度消失
#   类比：就像高速公路的匝道，即使主路堵车，车流也能通过匝道通行


class TransformerBlock(nn.Module):
    """
    一个完整的 Transformer 解码器块
    包含：多头注意力 + 前馈网络 + 残差连接 + 层归一化
    """

    def __init__(self, d_model, n_head, d_ff):
        """
        参数:
            d_model: 模型维度
            n_head: 注意力头数
            d_ff: 前馈层隐藏维度
        """
        super().__init__()

        self.attn = MultiHeadAttention(d_model, n_head)
        # 多头自注意力层

        self.ffn = FFN(d_model, d_ff)
        # 前馈网络

        self.ln1 = nn.LayerNorm(d_model)
        # 第一个层归一化（Layer Normalization）
        # 作用：对每个样本的特征维度做归一化（均值为0，方差为1）
        # 然后通过可学习的缩放参数 γ 和偏移参数 β 做仿射变换
        # 效果：稳定训练过程，加速收敛

        self.ln2 = nn.LayerNorm(d_model)
        # 第二个层归一化

    def forward(self, x):
        """
        参数:
            x: 输入张量 (batch, seq_len, d_model)
        返回:
            输出张量 (batch, seq_len, d_model)

        前向流程（Pre-Norm 方案，即先归一化再做子层运算）:
            1. 层归一化 → 多头注意力 → 残差连接
            2. 层归一化 → 前馈网络 → 残差连接
        """
        x = x + self.attn(self.ln1(x))
        # ========== 语法拆解 ==========
        # 步骤1: self.ln1(x) 对输入做层归一化，形状不变 (B, T, d_model)
        # 步骤2: self.attn(...) 对归一化后的结果做多头注意力，形状不变
        # 步骤3: x + ... 残差连接，将原始输入加到注意力输出上
        # 最终结果：x = x + Attention(LayerNorm(x))

        x = x + self.ffn(self.ln2(x))
        # 同理：x = x + FFN(LayerNorm(x))

        return x


# ============================================================
# 完整模型：Mini Transformer
# ============================================================


class MiniTransformer(nn.Module):
    """
    小型 Transformer 解码器模型
    用于字符级别的自回归语言建模

    前向传播的数据流：
        字符索引 → Embedding → + PositionalEncoding
        → N × TransformerBlock → LayerNorm → Linear → logits
    """

    def __init__(self, vocab_size, d_model, d_ff, n_head, n_layer):
        """
        参数:
            vocab_size: 词汇表大小
            d_model: 模型维度
            d_ff: 前馈层隐藏维度
            n_head: 注意力头数
            n_layer: Transformer Block 层数
        """
        super().__init__()

        self.tok_emb = nn.Embedding(vocab_size, d_model)
        # Token 嵌入层（Token Embedding）
        # 将离散的字符索引映射为连续的向量表示
        # 例如：索引 5 → [0.12, -0.34, 0.56, ...]（64维向量）
        # nn.Embedding(num_embeddings, embedding_dim)
        #   内部维护一个 (vocab_size, d_model) 的查找表
        #   输入索引 → 输出对应行的向量
        # ========== 示例：Embedding 的用法 ==========
        #   >>> emb = nn.Embedding(10, 4)  # 10个词，每个4维
        #   >>> emb(torch.tensor([0, 3, 7]))  # 查找索引0、3、7
        #   tensor([[...], [...], [...]])  # 形状 (3, 4)

        self.pos_enc = PositionalEncoding(d_model)
        # 位置编码模块（已在上方详细解释）

        self.blocks = nn.Sequential(*[
            TransformerBlock(d_model, n_head, d_ff) for _ in range(n_layer)
        ])
        # ========== 语法拆解 ==========
        # 步骤1: for _ in range(n_layer) 循环 n_layer 次，创建多个 TransformerBlock
        # 步骤2: [...] 列表推导式，生成 [Block1, Block2]
        # 步骤3: * 是解包运算符（Unpacking），将列表解包为独立参数
        #   nn.Sequential(*[Block1, Block2]) 等价于 nn.Sequential(Block1, Block2)
        #   类似于 JavaScript 的展开运算符 ...arr
        # 步骤4: nn.Sequential(...) 按顺序串联所有 Block
        # 数据依次流过 Block1 → Block2，前一个的输出是后一个的输入

        self.ln_f = nn.LayerNorm(d_model)
        # 最终层归一化（在所有 Transformer Block 之后）
        # 论文中称为 "final layer norm"

        self.head = nn.Linear(d_model, vocab_size)
        # 输出头（Language Model Head）：将 d_model 维向量映射为词汇表概率分布
        # 输入：(B, T, d_model) → 输出：(B, T, vocab_size)
        # 每个位置的输出是"下一个字符是词汇表中每个字符的分数（logits）"

    def forward(self, idx):
        """
        前向传播

        参数:
            idx: 输入索引序列 (batch, seq_len)，如 [[7, 3, 10, 10, 11, ...]]
        返回:
            logits: 输出分数 (batch, seq_len, vocab_size)
            logits 不是概率，需要经过 softmax 才能转为概率分布
        """
        x = self.tok_emb(idx)
        # Token 嵌入：将字符索引转为向量
        # idx 形状 (B, T) → x 形状 (B, T, d_model)

        x = self.pos_enc(x)
        # 添加位置编码：让模型知道每个字符的位置
        # x 形状不变 (B, T, d_model)

        x = self.blocks(x)
        # 经过 N 层 Transformer Block
        # 每层做：注意力 → FFN → 残差连接
        # x 形状不变 (B, T, d_model)

        x = self.ln_f(x)
        # 最终层归一化
        # x 形状不变 (B, T, d_model)

        logits = self.head(x)
        # 输出头：映射回词汇表维度
        # x 形状 (B, T, d_model) → logits 形状 (B, T, vocab_size)

        return logits

    def generate(self, idx, max_new_tokens=20):
        """
        自回归生成（Autoregressive Generation）

        核心思想：每次预测一个字符，将其拼接到输入序列末尾，
                  然后用更新后的序列预测下一个字符，如此循环。

        参数:
            idx: 初始索引序列 (1, seq_len)，如 [[7, 3, 10, 10, ...]]
            max_new_tokens: 生成的最大新字符数

        返回:
            生成的完整序列 (1, seq_len + max_new_tokens)

        类比：就像写作文时，每次只写一个字，
              写完后回头看前面所有的字，再决定下一个字写什么。
        """
        self.eval()
        # 切换到评估模式（Evaluation Mode）
        # 影响：关闭 Dropout、BatchNorm 使用全局统计量等
        # 与 self.train() 配对使用

        for _ in range(max_new_tokens):
            # 每次循环生成一个新字符

            idx_cond = idx[:, -CONTEXT_LEN:]
            # 只取最后 CONTEXT_LEN 个字符作为上下文
            # idx[:, -CONTEXT_LEN:] 切片语法拆解：
            #   : 表示取所有 batch
            #   -CONTEXT_LEN: 表示从倒数第 CONTEXT_LEN 个取到最后
            # 为什么要截断？因为模型训练时只用 CONTEXT_LEN 长度的输入
            # 如果生成过程中序列超过这个长度，必须截断

            logits = self(idx_cond)
            # 前向传播获取 logits
            # idx_cond 形状 (1, CONTEXT_LEN) → logits 形状 (1, CONTEXT_LEN, vocab_size)

            logits_last = logits[:, -1, :]
            # 只取最后一个位置的输出
            # 因为我们要预测的是"下一个字符"，即序列末尾之后的那个字符
            # logits[:, -1, :] 形状 (1, vocab_size)

            probs = F.softmax(logits_last, dim=-1)
            # softmax 将 logits 转为概率分布（值在 0~1 之间，总和为 1）
            # dim=-1 在最后一个维度（词汇表维度）上做归一化
            # probs 形状 (1, vocab_size)

            next_idx = torch.multinomial(probs, 1)
            # ========== 语法拆解 ==========
            # torch.multinomial(input, num_samples) 从概率分布中采样
            #   probs: 概率分布，如 [0.1, 0.3, 0.05, 0.55, ...]
            #   num_samples=1: 采样1个
            #   概率越高的字符越可能被选中（但不是确定性的）
            # 返回形状 (1, 1)
            # ========== 示例：multinomial 的用法 ==========
            #   >>> probs = torch.tensor([[0.1, 0.7, 0.2]])
            #   >>> torch.multinomial(probs, 1)
            #   tensor([[1]])  # 大概率采样到索引1（概率0.7）

            # next_idx = probs.argmax(dim=-1, keepdim=True)
            # argmax 是贪心策略：每次都选概率最高的字符（确定性，无随机性）
            # keepdim=True 保持维度不变，形状 (1, 1)
            # 贪心 vs 采样：采样更有"创意"，贪心更"稳定"

            idx = torch.cat([idx, next_idx], dim=1)
            # ========== 语法拆解 ==========
            # torch.cat([idx, next_idx], dim=1) 在第1维（序列维度）拼接
            #   idx 形状 (1, L) + next_idx 形状 (1, 1) → (1, L+1)
            #   相当于把新字符追加到序列末尾
            # 类比：字符串拼接 "hello" + "w" → "hellow"

        self.train()
        # 恢复训练模式（Training Mode）
        # 重新启用 Dropout 等训练时的行为

        return idx
        # 返回生成的完整序列，形状 (1, 原始长度 + max_new_tokens)


# ============================================================
# 训练函数
# ============================================================


def train():
    """
    训练 Mini Transformer 模型

    训练流程概述：
        1. 初始化模型和优化器
        2. 循环 2000 步：
           a. 前向传播：输入 → logits
           b. 计算损失：logits vs 真实目标
           c. 反向传播：计算梯度
           d. 更新参数：沿梯度方向调整权重
        3. 训练完成后，用种子文本生成新字符
    """
    model = MiniTransformer(VOCAB_SIZE, D_MODEL, D_FF, N_HEAD, N_LAYER)
    # 创建模型实例，传入所有超参数

    opt = torch.optim.AdamW(model.parameters(), lr=LEARNING_RATE)
    # ========== 语法拆解 ==========
    # 步骤1: model.parameters() 返回模型所有可训练参数的迭代器
    #   包括 Embedding 权重、Linear 权重和偏置、LayerNorm 的 γ 和 β 等
    # 步骤2: AdamW 优化器（Adaptive Moment Estimation with Weight Decay）
    #   Adam：自适应学习率优化器，对每个参数自动调整学习率
    #   W（Weight Decay）：权重衰减，防止参数过大（正则化手段）
    #   lr=LEARNING_RATE：初始学习率 0.003
    # 对比 SGD：Adam 收敛更快、更稳定，是目前最常用的优化器

    loss_fn = nn.CrossEntropyLoss()
    # 交叉熵损失函数（Cross-Entropy Loss）
    # 用于多分类任务：衡量模型预测的概率分布与真实标签之间的"距离"
    # 数学公式：L = -log(p_correct)，其中 p_correct 是模型对正确答案的预测概率
    # 损失越小，说明模型预测越准

    print("\n开始训练...")
    # \n 是换行符，输出前先空一行

    print("-" * 50)
    # 字符串乘法："-" 重复 50 次，作为分隔线

    for step in range(2000):
        # 训练 2000 步

        opt.zero_grad()
        # 清零所有参数的梯度
        # 为什么？因为 PyTorch 默认会累加梯度（方便 RNN 等场景）
        # 每步训练前必须手动清零，否则梯度会越积越大

        logits = model(X)
        # 前向传播：输入 X 经过模型得到 logits
        # X 形状 (样本数, CONTEXT_LEN) → logits 形状 (样本数, CONTEXT_LEN, vocab_size)

        loss = loss_fn(logits[:, -1, :], Y)
        # ========== 语法拆解 ==========
        # 步骤1: logits[:, -1, :] 取最后一个位置的输出
        #   : 表示所有样本，-1 表示最后一个位置，: 表示所有词汇
        #   形状：(样本数, vocab_size)
        # 步骤2: loss_fn(logits[:, -1, :], Y) 计算交叉熵损失
        #   预测：(样本数, vocab_size) vs 目标：(样本数,)
        #   损失是一个标量（单个数值）
        #
        # 为什么只取最后一个位置？
        # 因为我们的目标是"预测序列的下一个字符"，
        # 只有最后一个位置的输出对应"下一个字符"的预测

        loss.backward()
        # 反向传播（Backpropagation）
        # 自动计算损失函数对每个可训练参数的梯度
        # 梯度 = 损失函数在当前参数值处的"斜率"
        # 梯度指明了"参数应该往哪个方向调整，能让损失变小"

        opt.step()
        # 参数更新：沿着梯度的反方向调整参数
        # 新参数 = 旧参数 - 学习率 × 梯度
        # AdamW 还会额外做权重衰减（正则化）

        if step % 400 == 0 or step == 1999:
            # % 是取模运算符（求余数）
            # step % 400 == 0 表示每 400 步打印一次
            # step == 1999 表示最后一步也打印

            print(f"Step {step:4d}: loss = {loss.item():.6f}")
            # :4d 表示整数占4位宽度（右对齐，不足补空格）
            # loss.item() 将张量转为 Python 浮点数（单元素张量才能调用）
            # :.6f 表示保留6位小数

    print("-" * 50)
    print("训练完成！")

    # ============================================================
    # 生成测试
    # ============================================================

    seed_text = "hello wo"
    # 用 "hello w" 作为种子文本，让模型续写

    idx = torch.tensor([[stoi[c] for c in seed_text]]).long()
    # ========== 语法拆解 ==========
    # 步骤1: [stoi[c] for c in seed_text] 列表推导式
    #   将 "hello w" 中每个字符转为索引，如 [7, 3, 10, 10, 11, 0, 15]
    # 步骤2: [[...]] 外层再套一层列表，变成嵌套列表
    #   因为模型输入需要 batch 维度，形状为 (1, seq_len)
    # 步骤3: torch.tensor(...) 转为张量
    # 步骤4: .long() 转为 64 位整数类型（Embedding 层要求整数输入）

    print(f"\n种子文本: '{seed_text}'")
    print("生成结果:")

    out = model.generate(idx, max_new_tokens=20)
    # 调用 generate 方法，从种子文本开始续写 20 个字符

    generated_text = "".join(itos[i] for i in out[0].tolist())
    # ========== 语法拆解 ==========
    # 步骤1: out[0] 取第一个（也是唯一一个）batch，形状 (seq_len + 20,)
    # 步骤2: .tolist() 将张量转为 Python 列表，如 [7, 3, 10, ...]
    # 步骤3: itos[i] 将每个索引转回字符（已在上方1.2节解释）
    # 步骤4: "".join(...) 将字符列表拼接为完整字符串
    # 最终效果：将数字序列转为人类可读的文本

    print(f"'{generated_text}'")


# ============================================================
# 程序入口
# ============================================================
if __name__ == "__main__":
    # __name__ 是 Python 的内置变量
    # 当文件被直接运行时，__name__ 的值为 "__main__"
    # 当文件被 import 时，__name__ 的值为模块名（如 "3"）
    # 这个判断确保 train() 只在直接运行时执行，被 import 时不执行

    train()