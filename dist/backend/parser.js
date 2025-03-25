import * as fs from 'fs';
// 将静态导入改为动态导入声明
import { LanguageType } from '../common/types.js';
/**
 * Java代码解析器
 */
export class JavaParser {
    /**
     * 解析Java文件为AST
     */
    static async parseFile(filePath, options) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return this.parseContent(fileContent, filePath, options);
        }
        catch (error) {
            console.error(`Error parsing Java file ${filePath}:`, error);
            return null;
        }
    }
    /**
     * 解析Java代码内容为AST
     */
    static async parseContent(content, filePath, options) {
        if (options.languageType !== LanguageType.JAVA) {
            throw new Error(`Language type must be JAVA, got ${options.languageType}`);
        }
        try {
            // 动态导入java-parser
            const javaParser = await import('java-parser');
            // 使用java-parser解析Java代码
            const ast = javaParser.parse(content);
            return ast;
        }
        catch (error) {
            console.error(`Error parsing Java content in ${filePath}:`, error);
            return null;
        }
    }
}
//# sourceMappingURL=parser.js.map