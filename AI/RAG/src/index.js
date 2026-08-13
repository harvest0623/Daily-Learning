// 项目主要的入口文件
import path from 'node:path'
import { LocalIndex } from 'vectra'
import { getEmbeddings, getEmbedding } from './utils/index.js'

// 构建向量数据库
export class SimpleRag {
    db = null;
    indexPath = '';

    constructor(indexPath = '.vectra') {
        this.indexPath = path.join(import.meta.dirname, '..', indexPath);
    }
    // 初始化数据库
    async initialize() {
        const index = new LocalIndex(this.indexPath);  // 指明在这个路径下创建仓库
        if (!(await index.isIndexCreated())) {  // 查找当前位置是否已经具有数据库
            await index.createIndex();  // 创建数据库
        }
        this.db = index;
    }
    // 判断数据库是否已存在
    get avaliable() {
        return this.db !== null;
    }
    // 往数据库中写入数据
    async add(text) {
        if (!this.avaliable) throw new Error('RAG 还没初始化');

        const embeddings = await getEmbeddings(text);
        const res = [];
        for (const embedding of embeddings) {
            const overResult = await this.db.insertItem(embedding);
            res.push(overResult);
        }
        return res.filter(item => item).map(item => ({ id: item.id }));  // [{id: xxxxxx}, {id: xxx}]

    }
    // 从数据库中删除数据
    async del(items) {
        if (!Array.isArray(items)) items = [items];
        if (!this.avaliable) throw new Error('RAG 还没初始化');

        const res = [];
        for (let item of items) {
            await this.db.deleteItem(item.id);
            res.push({ id: item.id });
        }
        return res;

    }
    // 从数据库中查找数据
    async query(text, topK = 1) {
        if (!this.avaliable) throw new Error('RAG 还没初始化');
        const vector = (await getEmbedding(text)).embedding;  // 新问题被处理成向量
        const result = await this.db.queryItems(vector, text, topK);
        // console.log(result);
        return result.map(({ item, score }) => ({
            text: item.metadata.text,
            query: text,
            simularity: score,
            id: item.id
        }));
    }
}