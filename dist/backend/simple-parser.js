import fs from 'fs';
import { LanguageType } from '../common/types.js';
/**
 * 简单的Java代码解析器
 * 不依赖第三方库，仅使用正则表达式进行基本解析
 */
export class SimpleJavaParser {
    /**
     * 解析Java文件找出所有类声明
     */
    static parseFile(filePath, options) {
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
     * 解析Java代码内容
     */
    static parseContent(content, filePath, options) {
        if (options.languageType !== LanguageType.JAVA) {
            throw new Error(`Language type must be JAVA, got ${options.languageType}`);
        }
        try {
            // 使用正则表达式匹配类、方法和变量声明
            const ast = {
                program: {
                    classes: this.findClasses(content),
                    methods: this.findMethods(content),
                    fields: this.findFields(content)
                }
            };
            return ast;
        }
        catch (error) {
            console.error(`Error parsing Java content in ${filePath}:`, error);
            return null;
        }
    }
    /**
     * 查找所有类声明
     */
    static findClasses(content) {
        const classes = [];
        const classRegex = /(public\s+|private\s+|protected\s+)?(class|interface)\s+(\w+)/g;
        let match;
        while ((match = classRegex.exec(content)) !== null) {
            const className = match[3];
            const classType = match[2]; // class 或 interface
            const startLine = this.getLineNumber(content, match.index);
            classes.push({
                type: 'ClassDeclaration',
                classType: classType,
                name: {
                    value: className
                },
                location: {
                    startLine,
                    startColumn: 0
                }
            });
        }
        return classes;
    }
    /**
     * 查找所有方法声明
     */
    static findMethods(content) {
        const methods = [];
        const methodRegex = /(public|private|protected)?\s+(?!class|interface)[\w<>[\],\s]+\s+(\w+)\s*\([^)]*\)\s*(\{|throws)/g;
        let match;
        while ((match = methodRegex.exec(content)) !== null) {
            const methodName = match[2];
            const startLine = this.getLineNumber(content, match.index);
            methods.push({
                type: 'MethodDeclaration',
                name: {
                    value: methodName
                },
                location: {
                    startLine,
                    startColumn: 0
                }
            });
        }
        return methods;
    }
    /**
     * 查找所有字段（变量）声明
     */
    static findFields(content) {
        const fields = [];
        // 匹配字段声明，包括静态和非静态字段
        const fieldRegex = /(public|private|protected)?\s+(static\s+final|final\s+static|static|final)?\s+[\w<>[\],\s]+\s+(\w+)\s*=?.*;/g;
        let match;
        while ((match = fieldRegex.exec(content)) !== null) {
            const fieldName = match[3];
            const modifiers = [];
            if (match[1])
                modifiers.push({ keyword: match[1] });
            if (match[2]) {
                if (match[2].includes('static'))
                    modifiers.push({ keyword: 'static' });
                if (match[2].includes('final'))
                    modifiers.push({ keyword: 'final' });
            }
            const startLine = this.getLineNumber(content, match.index);
            fields.push({
                type: 'FieldDeclaration',
                modifiers: modifiers,
                declarators: [
                    {
                        id: {
                            name: {
                                value: fieldName
                            }
                        },
                        location: {
                            startLine,
                            startColumn: 0
                        }
                    }
                ],
                location: {
                    startLine,
                    startColumn: 0
                }
            });
        }
        // 匹配局部变量声明
        const localVarRegex = /(?<!\w.*\s)\b(?:final\s+)?[\w<>[\],\s]+\s+(\w+)\s*=?[^;]*;/g;
        while ((match = localVarRegex.exec(content)) !== null) {
            const text = match[0];
            // 跳过可能是方法参数或其他非局部变量声明的情况
            if (text.includes('(') || text.includes(')') || text.includes('class ') || text.includes('interface ')) {
                continue;
            }
            const varName = match[1];
            const isFinal = text.includes('final ');
            const modifiers = isFinal ? [{ keyword: 'final' }] : [];
            const startLine = this.getLineNumber(content, match.index);
            fields.push({
                type: 'LocalVariableDeclaration',
                modifiers: modifiers,
                declarators: [
                    {
                        id: {
                            name: {
                                value: varName
                            }
                        },
                        location: {
                            startLine,
                            startColumn: 0
                        }
                    }
                ],
                location: {
                    startLine,
                    startColumn: 0
                }
            });
        }
        return fields;
    }
    /**
     * 根据字符位置获取行号
     */
    static getLineNumber(content, position) {
        const lines = content.slice(0, position).split('\n');
        return lines.length;
    }
}
//# sourceMappingURL=simple-parser.js.map