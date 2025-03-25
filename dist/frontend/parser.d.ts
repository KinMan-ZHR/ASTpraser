import { ParserOptions } from '../common/types.js';
/**
 * 前端代码解析器
 */
export declare class FrontendParser {
    /**
     * 解析JavaScript/TypeScript文件为AST
     */
    static parseFile(filePath: string, options: ParserOptions): any;
    /**
     * 解析代码内容为AST
     */
    static parseContent(content: string, filePath: string, options: ParserOptions): any;
    /**
     * 解析JavaScript代码
     */
    private static parseJavaScript;
    /**
     * 解析TypeScript代码
     */
    private static parseTypeScript;
    /**
     * 解析JavaScript React代码
     */
    private static parseJavaScriptReact;
    /**
     * 解析TypeScript React代码
     */
    private static parseTypeScriptReact;
    /**
     * 解析Vue文件 (简化实现，实际需要使用vue-template-compiler)
     * 这里仅提取<script>标签内的内容进行解析
     */
    private static parseVue;
}
