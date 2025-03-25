import fs from 'fs';
import path from 'path';
import * as babelParser from '@babel/parser';
import { LanguageType } from '../common/types.js';
/**
 * 前端代码解析器
 */
export class FrontendParser {
    /**
     * 解析JavaScript/TypeScript文件为AST
     */
    static parseFile(filePath, options) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return this.parseContent(fileContent, filePath, options);
        }
        catch (error) {
            console.error(`Error parsing file ${filePath}:`, error);
            return null;
        }
    }
    /**
     * 解析代码内容为AST
     */
    static parseContent(content, filePath, options) {
        const fileExt = path.extname(filePath).toLowerCase();
        // 根据文件类型和语言类型选择解析策略
        switch (options.languageType) {
            case LanguageType.JAVASCRIPT:
                return this.parseJavaScript(content);
            case LanguageType.TYPESCRIPT:
                return this.parseTypeScript(content);
            case LanguageType.REACT:
                if (fileExt === '.tsx') {
                    return this.parseTypeScriptReact(content);
                }
                else {
                    return this.parseJavaScriptReact(content);
                }
            case LanguageType.VUE:
                return this.parseVue(content);
            default:
                throw new Error(`Unsupported language type: ${options.languageType}`);
        }
    }
    /**
     * 解析JavaScript代码
     */
    static parseJavaScript(content) {
        return babelParser.parse(content, {
            sourceType: 'module',
            plugins: ['jsx']
        });
    }
    /**
     * 解析TypeScript代码
     */
    static parseTypeScript(content) {
        return babelParser.parse(content, {
            sourceType: 'module',
            plugins: ['typescript']
        });
    }
    /**
     * 解析JavaScript React代码
     */
    static parseJavaScriptReact(content) {
        return babelParser.parse(content, {
            sourceType: 'module',
            plugins: ['jsx']
        });
    }
    /**
     * 解析TypeScript React代码
     */
    static parseTypeScriptReact(content) {
        return babelParser.parse(content, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript']
        });
    }
    /**
     * 解析Vue文件 (简化实现，实际需要使用vue-template-compiler)
     * 这里仅提取<script>标签内的内容进行解析
     */
    static parseVue(content) {
        // 简单提取<script>标签内容
        const scriptMatch = content.match(/<script\b[^>]*>([\s\S]*?)<\/script>/);
        if (scriptMatch && scriptMatch[1]) {
            const scriptContent = scriptMatch[1].trim();
            // 检测是否是TypeScript
            const isTypeScript = content.includes('<script lang="ts">') ||
                content.includes('<script lang=\'ts\'>');
            if (isTypeScript) {
                return this.parseTypeScript(scriptContent);
            }
            else {
                return this.parseJavaScript(scriptContent);
            }
        }
        return null;
    }
}
//# sourceMappingURL=parser.js.map