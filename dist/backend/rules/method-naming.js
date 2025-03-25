import { Severity } from '../../common/types.js';
import { NamingUtils, IdentifierType } from '../../common/naming-utils.js';
/**
 * Java方法命名规范检测规则
 * 检测Java方法名是否正确遵循驼峰命名法
 */
export class MethodNamingRule {
    constructor() {
        this.id = 'backend/method-naming';
        this.description = '检测Java方法名是否正确遵循驼峰命名法';
        this.severity = Severity.WARNING;
    }
    /**
     * 检查AST中的Java方法命名是否规范
     */
    check(ast, filePath) {
        const issues = [];
        if (!ast) {
            return issues;
        }
        // 递归查找所有方法声明
        this.findMethodDeclarations(ast, filePath, issues);
        return issues;
    }
    /**
     * 递归查找所有方法声明
     */
    findMethodDeclarations(node, filePath, issues) {
        if (!node)
            return;
        // 检查是否是方法声明节点
        if (node.type === 'MethodDeclaration') {
            // 获取方法名
            const methodName = node.name?.value;
            if (methodName) {
                // 使用命名工具类检查方法名是否符合驼峰命名法
                const namingIssue = NamingUtils.checkNaming(methodName, IdentifierType.METHOD);
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
                    this.findMethodDeclarations(node[key], filePath, issues);
                }
                else if (Array.isArray(node[key])) {
                    for (const item of node[key]) {
                        this.findMethodDeclarations(item, filePath, issues);
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=method-naming.js.map