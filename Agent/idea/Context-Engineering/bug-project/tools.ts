import { readdir, readFile, stat } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

const PROJECT_ROOT = '.'

async function* walk(dir: string): AsyncGenerator<string> {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) {
            yield* walk(path)
        } else if (entry.isFile()) {
            yield path
        }
    }
}

function matchPattern(path: string, pattern: string): boolean {
    const expanded = pattern.replace(/\{([^}]+)\}/g, (_, opts) => `(${opts.split(',').join('|')})`)
    const regex = expanded
        .replace(/\./g, '\\.')
        .replace(/\*\*\//g, '__GLOBSTARSEP__')
        .replace(/\*\*/g, '__GLOBSTAR__')
        .replace(/\*/g, '[^/]*')
        .replace(/__GLOBSTARSEP__/g, '(?:.*/)?')
        .replace(/__GLOBSTAR__/g, '.*')
    return new RegExp(`^${regex}$`).test(path)
}

/**
 * Glob：按文件名模式列出文件路径。最便宜的工具，几乎不消耗 token。
 */
export async function globFiles(pattern: string): Promise<string[]> {
    const results: string[] = []
    for await (const path of walk(PROJECT_ROOT)) {
        const rel = relative(PROJECT_ROOT, path).split(sep).join('/')
        if (matchPattern(rel, pattern)) {
            results.push(rel)
        }
    }
    return results.sort()
}

export interface GrepHit {
    file: string
    line: number
    content: string
}

/**
 * Grep：按内容搜索，返回匹配的行。轻量级，只返回命中。
 */
export async function grepContent(
    pattern: string,
    opts: { path?: string } = {}
): Promise<GrepHit[]> {
    const root = opts.path ? join(PROJECT_ROOT, opts.path) : PROJECT_ROOT
    const stats = await stat(root)
    const files: string[] = []
    if (stats.isDirectory()) {
        for await (const p of walk(root)) files.push(p)
    } else {
        files.push(root)
    }

    const regex = new RegExp(pattern)
    const hits: GrepHit[] = []
    for (const file of files) {
        const content = await readFile(file, 'utf8')
        content.split('\n').forEach((line, idx) => {
            if (regex.test(line)) {
                hits.push({
                    file: relative(PROJECT_ROOT, file).split(sep).join('/'),
                    line: idx + 1,
                    content: line.trim(),
                })
            }
        })
    }
    return hits
}


export async function readFileTool(path: string): Promise<string> {
    const content = await readFile(join(PROJECT_ROOT, path), 'utf8')
    return content
}