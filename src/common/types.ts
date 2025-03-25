/**
 * 检测结果的严重级别
 */
export enum Severity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

/**
 * 代码位置信息
 */
export interface Location {
  file: string;
  line: number;
  column?: number;
}

/**
 * 检测问题
 */
export interface Issue {
  ruleId: string;
  message: string;
  severity: Severity;
  location: Location;
  source?: string;
}

/**
 * 检测规则接口
 */
export interface Rule {
  id: string;
  description: string;
  severity: Severity;
  check(ast: any, filePath: string): Issue[];
}

/**
 * 语言类型
 */
export enum LanguageType {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  REACT = 'react',
  VUE = 'vue',
  JAVA = 'java'
}

/**
 * 解析器配置
 */
export interface ParserOptions {
  languageType: LanguageType;
  plugins?: string[];
  extraOptions?: Record<string, any>;
} 