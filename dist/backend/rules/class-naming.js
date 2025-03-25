import { Severity } from '../../common/types.js';
import { NamingUtils, IdentifierType } from '../../common/naming-utils.js';
/**
 * Java类命名规范检测规则
 * 检测Java类名是否正确遵循帕斯卡命名法
 */
export class ClassNamingRule {
    constructor() {
        this.id = 'backend/class-naming';
        this.description = '检测Java类名是否正确遵循帕斯卡命名法';
        this.severity = Severity.ERROR;
    }
    /**
     * 检查AST中的Java类命名是否规范
     */
    check(ast, filePath) {
        const issues = [];
        if (!ast) {
            return issues;
        }
        // 递归查找所有类声明
        this.findClassDeclarations(ast, filePath, issues);
        return issues;
    }
    /**
     * 递归查找所有类声明
     */
    findClassDeclarations(node, filePath, issues) {
        if (!node)
            return;
        // 检查是否是类声明节点
        if (node.type === 'ClassDeclaration') {
            // 获取类名
            const className = node.name?.value;
            if (className) {
                // 使用命名工具类检查类名是否符合帕斯卡命名法
                const namingIssue = NamingUtils.checkNaming(className, IdentifierType.CLASS);
                if (namingIssue) {
                    issues.push({
                        ruleId: this.id,
                        message: namingIssue,
                        severity: this.severity,
                        location: {
                            file: filePath,
                            line: node.location?.startLine || 0,
                            column: node.location?.startColumn || 0
                        }
                    });
                }
            }
        }
        // 递归处理子节点
        if (typeof node === 'object') {
            for (const key in node) {
                if (node[key] && typeof node[key] === 'object') {
                    this.findClassDeclarations(node[key], filePath, issues);
                }
                else if (Array.isArray(node[key])) {
                    for (const item of node[key]) {
                        this.findClassDeclarations(item, filePath, issues);
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=class-naming.js.map