import { ParserOptions } from '../common/types.js';
/**
 * Java代码解析器
 */
export declare class JavaParser {
    /**
     * 解析Java文件为AST
     */
    static parseFile(filePath: string, options: ParserOptions): Promise<any>;
    /**
     * 解析Java代码内容为AST
     */
    static parseContent(content: string, filePath: string, options: ParserOptions): Promise<any>;
}
