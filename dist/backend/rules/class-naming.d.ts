import { Issue, Rule, Severity } from '../../common/types.js';
/**
 * Java类命名规范检测规则
 * 检测Java类名是否正确遵循帕斯卡命名法
 */
export declare class ClassNamingRule implements Rule {
    id: string;
    description: string;
    severity: Severity;
    /**
     * 检查AST中的Java类命名是否规范
     */
    check(ast: any, filePath: string): Issue[];
    /**
     * 递归查找所有类声明
     */
    private findClassDeclarations;
}
