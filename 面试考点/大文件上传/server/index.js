const http = require('http');
const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs-extra');

const resolvePost = (req) => {
    return new Promise((resolve, reject) => {
        let chunk = '';
        req.on('data', (data) => {
            chunk += data;
        })
        req.on('end', () => {
            resolve(JSON.parse(chunk));
        })
    })
}

const mergeChunks = async (filePath, fileName, size) => {
    let chunksPath = fs.readdirSync(filePath);
    // console.log(chunksPath);
    chunksPath.sort((a, b) => {
        return a.split('-')[1] - b.split('-')[1];
    })

    const arr = chunksPath.map((chunkPath, index) => {
        return pipeStream(
            path.resolve(filePath, chunkPath),
            fs.createWriteStream(path.resolve(filePath, fileName), {
                start: index * size,
                end: (index + 1) * size
            })
        )
    })
    await Promise.all(arr);
}

const pipeStream = (path, writeStream) => {
    return new Promise((resolve, reject) => {
        // 将 path 对应的文件资源读取成流式资源
        // 写入到 writeStream 中
        const readStream = fs.createReadStream(path);
        readStream.pipe(writeStream);
        readStream.on('end', () => {
            fs.unlinkSync(path);
            resolve();
        })
    })
}

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {  // 预检请求
        res.end();  
        return;
    }

    if (req.url === '/upload') {
        // req.on('data', (chunk) => {
        //   console.log(chunk);
        // })

        const form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            const [file] = files.file;
            const [fileName] = fields.fileName;
            const [chunkName] = fields.chunkName;

            // 保存片段
            const chunkDir = path.resolve(__dirname, 'qiepian', `${fileName}-chunks`);
            if (!fs.existsSync(chunkDir)) {
                fs.mkdirsSync(chunkDir);
            }
            fs.moveSync(file.path, path.resolve(chunkDir, chunkName));

            res.end(JSON.stringify({
                code: 200,
                msg: '上传成功'
            }))

        })

    }

    if (req.url === '/merge') {
        // 合并片段
        const { fileName, size } = await resolvePost(req);
        const filePath = path.resolve(__dirname, 'qiepian', `${fileName}-chunks`);

        await mergeChunks(filePath, fileName, size);    

        res.end(JSON.stringify({
            code: 200,
            msg: '合并成功'
        }))
    }
})

server.listen(3000);