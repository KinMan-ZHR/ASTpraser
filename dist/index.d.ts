import { FrontendParser } from './frontend/parser.js';
import { SimpleJavaParser } from './backend/simple-parser.js';
import { UnusedVariableRule } from './frontend/rules/unused-variable.js';
import { ClassNamingRule } from './backend/rules/class-naming.js';
import { MethodNamingRule } from './backend/rules/method-naming.js';
import { VariableNamingRule } from './backend/rules/variable-naming.js';
import { Issue } from './common/types.js';
/**
 * 代码检测引擎
 */
declare class CodeChecker {
    private frontendRules;
    private backendRules;
    constructor();
    /**
     * 检测单个文件
     */
    checkFile(filePath: string): Promise<Issue[]>;
    /**
     * 检测目录下的所有文件
     */
    checkDirectory(dirPath: string, extensions?: string[]): Promise<Map<string, Issue[]>>;
    /**
     * 递归获取目录下所有指定扩展名的文件
     */
    private getFilesRecursively;
    /**
     * 格式化输出检测结果
     */
    formatResults(results: Map<string, Issue[]>): string;
}
export { CodeChecker, FrontendParser, SimpleJavaParser, UnusedVariableRule, ClassNamingRule, MethodNamingRule, VariableNamingRule };
