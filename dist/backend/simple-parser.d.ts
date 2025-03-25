import { ParserOptions } from '../common/types.js';
/**
 * 简单的Java代码解析器
 * 不依赖第三方库，仅使用正则表达式进行基本解析
 */
export declare class SimpleJavaParser {
    /**
     * 解析Java文件找出所有类声明
     */
    static parseFile(filePath: string, options: ParserOptions): any;
    /**
     * 解析Java代码内容
     */
    static parseContent(content: string, filePath: string, options: ParserOptions): any;
    /**
     * 查找所有类声明
     */
    private static findClasses;
    /**
     * 查找所有方法声明
     */
    private static findMethods;
    /**
     * 查找所有字段（变量）声明
     */
    private static findFields;
    /**
     * 根据字符位置获取行号
     */
    private static getLineNumber;
}
