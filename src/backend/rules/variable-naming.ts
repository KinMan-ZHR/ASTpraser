import { Issue, Rule, Severity } from '../../common/types.js';
import { NamingUtils, IdentifierType } from '../../common/naming-utils.js';

/**
 * Java变量命名规范检测规则
 * 检测Java变量名是否正确遵循驼峰命名法，常量是否使用全大写下划线分隔
 */
export class VariableNamingRule implements Rule {
  id = 'backend/variable-naming';
  description = '检测Java变量和常量命名是否符合规范';
  severity = Severity.WARNING;

  /**
   * 检查AST中的Java变量命名是否规范
   */
  check(ast: any, filePath: string): Issue[] {
    const issues: Issue[] = [];

    if (!ast) {
      return issues;
    }

    // 递归查找所有变量声明
    this.findVariableDeclarations(ast, filePath, issues);

    return issues;
  }

  /**
   * 递归查找所有变量声明
   */
  private findVariableDeclarations(node: any, filePath: string, issues: Issue[]): void {
    if (!node) return;

    // 检查是否是变量声明节点
    if (node.type === 'FieldDeclaration') {
      // 获取修饰符信息，判断是否是常量
      const modifiers = node.modifiers || [];
      const isConstant = modifiers.some((mod: any) => 
        (mod.keyword === 'static' && mod.keyword === 'final') || 
        mod.keyword === 'const'
      );
      
      // 获取变量名
      const variableName = node.declarators?.[0]?.id?.name?.value;
      
      if (variableName) {
        // 根据是否是常量选择不同的检查规则
        const identifierType = isConstant ? IdentifierType.CONSTANT : IdentifierType.VARIABLE;
        const namingIssue = NamingUtils.checkNaming(variableName, identifierType);
        
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
    
    // 同时检查本地变量声明
    if (node.type === 'LocalVariableDeclaration') {
      const modifiers = node.modifiers || [];
      const isConstant = modifiers.some((mod: any) => mod.keyword === 'final');
      
      // 遍历所有声明变量
      if (node.declarators && Array.isArray(node.declarators)) {
        for (const declarator of node.declarators) {
          const variableName = declarator.id?.name?.value;
          
          if (variableName) {
            // 根据是否是常量选择不同的检查规则
            const identifierType = isConstant ? IdentifierType.CONSTANT : IdentifierType.VARIABLE;
            const namingIssue = NamingUtils.checkNaming(variableName, identifierType);
            
            if (namingIssue) {
              issues.push({
                ruleId: this.id,
                message: namingIssue,
                severity: this.severity,
                location: {
                  file: filePath,
                  line: declarator.location?.startLine || node.location?.startLine || 0,
                  column: declarator.location?.startColumn || node.location?.startColumn || 0
                }
              });
            }
          }
        }
      }
    }

    // 递归处理子节点
    if (typeof node === 'object') {
      for (const key in node) {
        if (node[key] && typeof node[key] === 'object') {
          this.findVariableDeclarations(node[key], filePath, issues);
        } else if (Array.isArray(node[key])) {
          for (const item of node[key]) {
            this.findVariableDeclarations(item, filePath, issues);
          }
        }
      }
    }
  }
} 