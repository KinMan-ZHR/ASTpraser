import { Severity } from '../../common/types.js';
/**
 * 未使用变量检测规则
 */
export class UnusedVariableRule {
    constructor() {
        this.id = 'frontend/unused-variable';
        this.description = '检测未使用的变量声明';
        this.severity = Severity.WARNING;
    }
    /**
     * 检查AST中是否存在未使用的变量
     */
    check(ast, filePath) {
        const issues = [];
        if (!ast || !ast.program || !ast.program.body) {
            return issues;
        }
        // 收集所有变量声明
        const declarations = new Map();
        // 遍历AST查找变量声明
        this.findVariableDeclarations(ast.program.body, declarations);
        // 遍历AST查找变量使用
        this.findVariableUsages(ast.program.body, declarations);
        // 收集未使用的变量
        declarations.forEach((variable) => {
            if (!variable.used) {
                issues.push({
                    ruleId: this.id,
                    message: `变量 "${variable.name}" 被声明但从未使用`,
                    severity: this.severity,
                    location: {
                        file: filePath,
                        line: variable.loc?.start?.line || 0,
                        column: variable.loc?.start?.column || 0
                    }
                });
            }
        });
        return issues;
    }
    /**
     * 遍历AST找出所有变量声明
     */
    findVariableDeclarations(nodes, declarations) {
        if (!nodes || !Array.isArray(nodes))
            return;
        for (const node of nodes) {
            if (!node)
                continue;
            // 变量声明
            if (node.type === 'VariableDeclaration') {
                for (const declarator of node.declarations) {
                    if (declarator.id.type === 'Identifier') {
                        declarations.set(declarator.id.name, {
                            name: declarator.id.name,
                            loc: declarator.loc,
                            used: false
                        });
                    }
                }
            }
            // 函数声明中的参数
            if (node.type === 'FunctionDeclaration' && node.params) {
                for (const param of node.params) {
                    if (param.type === 'Identifier') {
                        declarations.set(param.name, {
                            name: param.name,
                            loc: param.loc,
                            used: false
                        });
                    }
                }
                // 递归检查函数体
                if (node.body && node.body.body) {
                    this.findVariableDeclarations(node.body.body, declarations);
                }
            }
            // 递归检查其他可能包含声明的节点
            if (node.body) {
                if (Array.isArray(node.body)) {
                    this.findVariableDeclarations(node.body, declarations);
                }
                else if (node.body.body && Array.isArray(node.body.body)) {
                    this.findVariableDeclarations(node.body.body, declarations);
                }
            }
        }
    }
    /**
     * 遍历AST找出所有变量使用
     */
    findVariableUsages(nodes, declarations) {
        if (!nodes || !Array.isArray(nodes))
            return;
        for (const node of nodes) {
            if (!node)
                continue;
            // 标识符使用
            if (node.type === 'Identifier' && declarations.has(node.name)) {
                const variable = declarations.get(node.name);
                // 不在声明位置才算是使用
                if (variable.loc?.start?.line !== node.loc?.start?.line ||
                    variable.loc?.start?.column !== node.loc?.start?.column) {
                    variable.used = true;
                }
            }
            // 递归处理所有属性
            for (const key in node) {
                if (node[key] && typeof node[key] === 'object') {
                    if (Array.isArray(node[key])) {
                        this.findVariableUsages(node[key], declarations);
                    }
                    else {
                        this.findVariableUsages([node[key]], declarations);
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=unused-variable.js.map