import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FrontendParser } from './frontend/parser.js';
import { SimpleJavaParser } from './backend/simple-parser.js';
import { UnusedVariableRule } from './frontend/rules/unused-variable.js';
import { ClassNamingRule } from './backend/rules/class-naming.js';
import { MethodNamingRule } from './backend/rules/method-naming.js';
import { VariableNamingRule } from './backend/rules/variable-naming.js';
import { Issue, LanguageType, ParserOptions, Rule, Severity } from './common/types.js';

// ES模块中获取__dirname的替代方案
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 代码检测引擎
 */
class CodeChecker {
  private frontendRules: Rule[] = [];
  private backendRules: Rule[] = [];

  constructor() {
    // 注册前端规则
    this.frontendRules.push(new UnusedVariableRule());
    
    // 注册后端规则
    this.backendRules.push(new ClassNamingRule());
    this.backendRules.push(new MethodNamingRule());
    this.backendRules.push(new VariableNamingRule());
  }

  /**
   * 检测单个文件
   */
  async checkFile(filePath: string): Promise<Issue[]> {
    try {
      const ext = path.extname(filePath).toLowerCase();
      let ast;
      let issues: Issue[] = [];

      // 根据文件扩展名选择解析器
      if (['.js', '.jsx', '.ts', '.tsx', '.vue'].includes(ext)) {
        // 前端代码文件
        let languageType: LanguageType;
        
        if (ext === '.js') languageType = LanguageType.JAVASCRIPT;
        else if (ext === '.ts') languageType = LanguageType.TYPESCRIPT;
        else if (['.jsx', '.tsx'].includes(ext)) languageType = LanguageType.REACT;
        else if (ext === '.vue') languageType = LanguageType.VUE;
        else {
          console.error(`Unsupported file extension: ${ext}`);
          return [];
        }

        const options: ParserOptions = { languageType };
        ast = FrontendParser.parseFile(filePath, options);

        // 应用前端规则
        for (const rule of this.frontendRules) {
          const ruleIssues = rule.check(ast, filePath);
          issues = [...issues, ...ruleIssues];
        }
      } else if (ext === '.java') {
        // Java代码文件
        const options: ParserOptions = { languageType: LanguageType.JAVA };
        // 使用简易Java解析器
        ast = SimpleJavaParser.parseFile(filePath, options);

        // 应用后端规则
        for (const rule of this.backendRules) {
          const ruleIssues = rule.check(ast, filePath);
          issues = [...issues, ...ruleIssues];
        }
      } else {
        console.error(`Unsupported file extension: ${ext}`);
        return [];
      }

      return issues;
    } catch (error) {
      console.error(`Error checking file ${filePath}:`, error);
      return [];
    }
  }

  /**
   * 检测目录下的所有文件
   */
  async checkDirectory(dirPath: string, extensions: string[] = ['.js', '.jsx', '.ts', '.tsx', '.vue', '.java']): Promise<Map<string, Issue[]>> {
    const result = new Map<string, Issue[]>();
    
    const files = this.getFilesRecursively(dirPath, extensions);
    
    for (const file of files) {
      const issues = await this.checkFile(file);
      if (issues.length > 0) {
        result.set(file, issues);
      }
    }
    
    return result;
  }

  /**
   * 递归获取目录下所有指定扩展名的文件
   */
  private getFilesRecursively(dir: string, extensions: string[]): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    
    for (const file of list) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // 递归处理子目录
        results = results.concat(this.getFilesRecursively(filePath, extensions));
      } else {
        // 检查文件扩展名
        const ext = path.extname(filePath).toLowerCase();
        if (extensions.includes(ext)) {
          results.push(filePath);
        }
      }
    }
    
    return results;
  }

  /**
   * 格式化输出检测结果
   */
  formatResults(results: Map<string, Issue[]>): string {
    let output = '';
    let errorCount = 0;
    let warningCount = 0;
    let infoCount = 0;
    
    results.forEach((issues, filePath) => {
      if (issues.length > 0) {
        output += `\n文件: ${filePath}\n`;
        
        issues.forEach(issue => {
          const severityIcon = issue.severity === Severity.ERROR ? '❌' :
                               issue.severity === Severity.WARNING ? '⚠️' : 'ℹ️';
          
          output += `  ${severityIcon} ${issue.location.line}:${issue.location.column || 0} - ${issue.message} [${issue.ruleId}]\n`;
          
          if (issue.severity === Severity.ERROR) errorCount++;
          else if (issue.severity === Severity.WARNING) warningCount++;
          else infoCount++;
        });
      }
    });
    
    output = `检测完成! 发现 ${errorCount} 个错误, ${warningCount} 个警告, ${infoCount} 个提示\n` + output;
    return output;
  }
}

/**
 * 命令行接口
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('用法: node dist/index.js <文件路径或目录路径>');
    process.exit(1);
  }

  const targetPath = args[0];
  const checker = new CodeChecker();
  
  try {
    const stat = fs.statSync(targetPath);
    
    if (stat.isFile()) {
      // 检测单个文件
      const issues = await checker.checkFile(targetPath);
      const results = new Map<string, Issue[]>();
      results.set(targetPath, issues);
      console.log(checker.formatResults(results));
    } else if (stat.isDirectory()) {
      // 检测目录
      const results = await checker.checkDirectory(targetPath);
      console.log(checker.formatResults(results));
    } else {
      console.error('指定的路径既不是文件也不是目录');
      process.exit(1);
    }
  } catch (error) {
    console.error('处理路径时出错:', error);
    process.exit(1);
  }
}

// 始终执行main函数
main().catch(error => {
  console.error('运行时出错:', error);
  process.exit(1);
});

// 导出主要类，以便其他模块可以导入
export {
  CodeChecker,
  FrontendParser,
  SimpleJavaParser,
  UnusedVariableRule,
  ClassNamingRule,
  MethodNamingRule,
  VariableNamingRule
}; 