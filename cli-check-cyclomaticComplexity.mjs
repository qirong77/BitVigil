
import { ESLint } from "eslint";
// @ts-ignore
// import tep from '@typescript-eslint/eslint-plugin'
// console.log(tep)
/* npm i @typescript-eslint/eslint-plugin --force */
export async function taskOfCyclomaticComplexity(target = process.cwd()) {
    const eslint = new ESLint({
        cwd: target, // 设置 ESLint 的根路径为 target
        overrideConfig: {
            parser: "@typescript-eslint/parser", // 指定 TypeScript 的 parser
            rules: {
                complexity: ["error", { max: 0 }],
            },
        },
    });

    // 异步函数来执行 ESLint 检查
    async function lintFiles() {
        const results = await eslint.lintFiles([target + "/src/**/*.{js,jsx,ts,tsx}"]); 
        let files = 0;
        let complexity = 0;
        results.forEach((result) => {
            const filePath = result.filePath;
            const messages = result.messages;
            if (messages.length > 0) {
                files++;
                messages.forEach((message) => {
                    const regex = /has a complexity of ([d]+)/;
                    const n = regex.exec(message.message)?.[1] || 0;
                    complexity += Number(n);
                });
            }
        });
        const result = {
            执行路径: target,
            文件数量: files,
            复杂度: complexity,
            平均复杂度: (complexity / files).toFixed(2) + '/每个文件',
        }
        return result;
    }
    return lintFiles().catch(console.error); // 捕获并处理可能的错误
}
taskOfCyclomaticComplexity();
