import { Issue, Rule, Severity } from '../../common/types.js';
/**
 * 未使用变量检测规则
 */
export declare class UnusedVariableRule implements Rule {
    id: string;
    description: string;
    severity: Severity;
    /**
     * 检查AST中是否存在未使用的变量
     */
    check(ast: any, filePath: string): Issue[];
    /**
     * 遍历AST找出所有变量声明
     */
    private findVariableDeclarations;
    /**
     * 遍历AST找出所有变量使用
     */
    private findVariableUsages;
}
