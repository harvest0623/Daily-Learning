import ollama from 'ollama'


// 短文本处理成向量
export function getEmbedding(text) {
    return ollama.embeddings({
        model: 'nomic-embed-text',
        prompt: text
    })
}

// 长文本处理成向量
export async function getEmbeddings(text) {
    const chunks = splitText(text)
    const embeddings = await Promise.all(chunks.map(chunk => getEmbedding(chunk)))
    return embeddings.map((embedding, i) => ({
        vector: embedding.embedding,
        metadata: { text: chunks[i] }
    }))
}


function splitText(text, chunkSize = 300, overlap = 50) {
    const chunks = []
    let i = 0
    while (i < text.length) {
        chunks.push(text.slice(i, i + chunkSize))
        i += chunkSize - overlap
    }
    return chunks
}