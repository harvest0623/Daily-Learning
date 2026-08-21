const messages = [
    {
        role: 'user',
        content: '把项目中的所有的console.log 替换成 logger.info'
    }
]

const MAX_TURNS = 30;
let turn = 0;

// 保险丝一, 把工具名+参数生成哈希指纹，用于判断是否重复调用
function fingerprint(name, params) {
    const stable = JSON.stringify(params, Object.keys(params).sort());
    return createHash('sha256').update(name + stable).digest('hex').slice(0, 12);
}

const history = new Map();

// 轮询检查工具函数的结果
function checkLoop(tool, result) {
    const fp = fingerprint(tool.name, tool.arguments);
    const entry = history.get(fp);
    if (entry.lastResult === result) {
        entry.count++;
    } else {
        entry.count = 1;
    }

    entry.lastResult = result;
    history.set(fp, entry);
    if (entry.count >= 10) {
        return 'break'
    }

    if (entry.count >= 5) {
        return 'warn'
    }
    return 'ok'
}

while (true) {
    turn++;
    const res = await chat(messages);

    if (res.stopReason === 'end_turn') {
        break;
    }

    for (const tool of res.toolCalls) {
        const result = executeTool(tool.name, tool.arguments);
        const status = checkLoop(tool, result);

        if (status === 'break') {
            console.log('工具调用重复，停止执行');
            break;
        }

        if (status === 'warn') {
            console.warn('工具调用重复，警告');
            messages.push({ role: 'system', content: '[LOOP_WARNING] 您正在反复调用工具，且没有进展，请换一种方式完成任务' });
        }

        messages.push({ role: 'tool', content: result });
    }

    messages.push({ role: 'assistant', content: res.text });

    if (turn >= MAX_TURNS) {
        // 超过最大轮数，结束循环
        break;
    }
}