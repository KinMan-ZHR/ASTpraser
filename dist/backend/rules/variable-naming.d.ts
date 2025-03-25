import { Issue, Rule, Severity } from '../../common/types.js';
/**
 * Java变量命名规范检测规则
 * 检测Java变量名是否正确遵循驼峰命名法，常量是否使用全大写下划线分隔
 */
export declare class VariableNamingRule implements Rule {
    id: string;
    description: string;
    severity: Severity;
    /**
     * 检查AST中的Java变量命名是否规范
     */
    check(ast: any, filePath: string): Issue[];
    /**
     * 递归查找所有变量声明
     */
    private findVariableDeclarations;
}
