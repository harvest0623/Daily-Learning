# Token
hello world  

['hello', 'world']  2个token

'人工智能'  2-3个token  取决于模型的分词器

# 分词器  BPE  （Byte Pair Encoding）


# 模型是一个一个token生成回复的
1. 天然就是流式输出
2. 工具调用JSON要“攒够了”才能解析
    {
        "na
        me": "rea
        d_file:,
        xxx
    }

3. response prefill 能操作模型的行为
{ "name": "browser_



# QKV
生成token时，模型会拿着当前token的Q，去跟前面所有的token的key做匹配，找到匹配度最高的key，读取对应的value作为当前token

- 上下文越大，模型对每一条信息的“记忆力”就会越差 （上下文腐烂）

- KV Cache
    xxxxxxxx(100个token)   第101个token想要出现，就要先在101这个位置上生成一个Q，拿着这个Q跟前100个token做点积，最后算出101个token的value，当102个token想要出现时，又得重新生成一个Q，再跟前101个token做点积，最后算出102个token的value，这个过程会涉及到101的token又要再次跟前100个token做点积，那么这是就是重复操作，直接缓存起来每次读取缓存即可