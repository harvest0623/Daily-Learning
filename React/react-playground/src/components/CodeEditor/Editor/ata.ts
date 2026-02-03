import { setupTypeAcquisition } from "@typescript/ata"
import * as ts from "typescript"

export function createATA(onDownloadFile: (code: string, path: string) => void) {
    const ata = setupTypeAcquisition({
        projectName: "My ATA Project",
        typescript: ts,
        logger: console,
        delegate: {
            receivedFile: (code: string, path: string) => {
                // console.log('加载到了的包', path);
                onDownloadFile(code, path); // 将加载到的包添加到运行时
            },
            started: () => {
                console.log("ATA start");
            },
            progress: (downloaded: number, total: number) => {
                console.log(`Got ${downloaded} out of ${total}`);
            },
            finished: vfs => {
                console.log("ATA done", vfs);
            },
        },
    })
    return ata;
};