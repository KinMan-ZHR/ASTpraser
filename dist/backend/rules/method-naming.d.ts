import { Issue, Rule, Severity } from '../../common/types.js';
/**
 * Java方法命名规范检测规则
 * 检测Java方法名是否正确遵循驼峰命名法
 */
export declare class MethodNamingRule implements Rule {
    id: string;
    description: string;
    severity: Severity;
    /**
     * 检查AST中的Java方法命名是否规范
     */
    check(ast: any, filePath: string): Issue[];
    /**
     * 递归查找所有方法声明
     */
    private findMethodDeclarations;
}
