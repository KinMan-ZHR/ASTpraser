/**
 * 标识符类型枚举
 */
export enum IdentifierType {
  CLASS = 'class',
  METHOD = 'method',
  VARIABLE = 'variable',
  CONSTANT = 'constant',
  PACKAGE = 'package',
  INTERFACE = 'interface'
}

/**
 * 命名规范检测工具类
 */
export class NamingUtils {
  
  /**
   * 常见的缩写词列表
   */
  private static readonly COMMON_ABBREVIATIONS = [
    'HTTP', 'XML', 'JSON', 'URL', 'API', 'DAO', 'DTO', 'IO', 'UI',
    'DB', 'SQL', 'JPA', 'REST', 'JWT', 'CSS', 'HTML', 'ID'
  ];

  /**
   * 检查标识符命名是否符合规范
   * @param name 标识符名称
   * @param type 标识符类型
   * @returns 错误消息，如果符合规范则返回null
   */
  static checkNaming(name: string, type: IdentifierType): string | null {
    // 检查是否为空
    if (!name || name.length === 0) {
      return `${this.getTypeName(type)}不能为空`;
    }

    // 根据不同类型应用不同的命名规则
    switch (type) {
      case IdentifierType.CLASS:
      case IdentifierType.INTERFACE:
        return this.checkPascalCase(name, type);
      
      case IdentifierType.METHOD:
      case IdentifierType.VARIABLE:
        return this.checkCamelCase(name, type);
      
      case IdentifierType.CONSTANT:
        return this.checkConstantNaming(name);
      
      case IdentifierType.PACKAGE:
        return this.checkPackageNaming(name);
      
      default:
        return null;
    }
  }

  /**
   * 获取标识符类型的中文名称
   */
  private static getTypeName(type: IdentifierType): string {
    switch (type) {
      case IdentifierType.CLASS: return '类名';
      case IdentifierType.METHOD: return '方法名';
      case IdentifierType.VARIABLE: return '变量名';
      case IdentifierType.CONSTANT: return '常量名';
      case IdentifierType.PACKAGE: return '包名';
      case IdentifierType.INTERFACE: return '接口名';
      default: return '标识符';
    }
  }

  /**
   * 检查是否符合帕斯卡命名法（PascalCase）
   * - 首字母大写
   * - 不包含下划线或连字符
   * - 只包含字母和数字
   * - 每个单词首字母大写
   */
  private static checkPascalCase(name: string, type: IdentifierType): string | null {
    const typeName = this.getTypeName(type);
    
    // 检查首字母是否大写
    if (!/^[A-Z]/.test(name)) {
      return `${typeName} "${name}" 首字母必须大写`;
    }

    // 检查是否包含下划线或连字符
    if (/[_\-]/.test(name)) {
      return `${typeName} "${name}" 不能包含下划线或连字符`;
    }

    // 检查是否包含非法字符
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      return `${typeName} "${name}" 只能包含字母和数字`;
    }

    // 检查单词边界处是否正确使用大写字母
    if (name.length > 2 && !/[A-Z]/.test(name.substring(1))) {
      return `${typeName} "${name}" 需遵循帕斯卡命名法，保持单词边界字母大写`;
    }

    // 检查是否有连续的大写字母（可能是缩写）后跟小写字母
    return this.checkAbbreviation(name, typeName);
  }

  /**
   * 检查是否符合驼峰命名法（camelCase）
   * - 首字母小写
   * - 不包含下划线或连字符
   * - 只包含字母和数字
   * - 除首字母外，每个单词首字母大写
   */
  private static checkCamelCase(name: string, type: IdentifierType): string | null {
    const typeName = this.getTypeName(type);
    
    // 检查首字母是否小写
    if (!/^[a-z]/.test(name)) {
      return `${typeName} "${name}" 首字母必须小写`;
    }

    // 检查是否包含下划线或连字符
    if (/[_\-]/.test(name)) {
      return `${typeName} "${name}" 不能包含下划线或连字符`;
    }

    // 检查是否包含非法字符
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      return `${typeName} "${name}" 只能包含字母和数字`;
    }

    // 检查是否有其他单词（除第一个单词外）
    const hasMultipleWords = /[a-z][A-Z]/.test(name);
    
    // 如果名称较长（超过3字符）但没有明显的单词分界，可能是单词写在了一起
    if (name.length > 3 && !hasMultipleWords) {
      return `${typeName} "${name}" 较长的标识符应使用驼峰命名法区分单词`;
    }

    // 检查是否有连续的大写字母（可能是缩写）后跟小写字母
    return this.checkAbbreviation(name, typeName);
  }

  /**
   * 检查常量命名是否符合规范（全大写，下划线分隔）
   */
  private static checkConstantNaming(name: string): string | null {
    const typeName = this.getTypeName(IdentifierType.CONSTANT);
    
    // 常量应该全部大写
    if (!/^[A-Z0-9_]+$/.test(name)) {
      return `${typeName} "${name}" 应全部使用大写字母，单词间用下划线分隔`;
    }

    // 检查是否有连续的下划线
    if (name.includes('__')) {
      return `${typeName} "${name}" 不应包含连续的下划线`;
    }

    return null;
  }

  /**
   * 检查包命名是否符合规范（全小写，点分隔）
   */
  private static checkPackageNaming(name: string): string | null {
    const typeName = this.getTypeName(IdentifierType.PACKAGE);
    
    // 包名应该全部小写
    if (!/^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*$/.test(name)) {
      return `${typeName} "${name}" 应全部使用小写字母，不同层级用点号分隔`;
    }

    // 检查是否有连续的点号
    if (name.includes('..')) {
      return `${typeName} "${name}" 不应包含连续的点号`;
    }

    return null;
  }

  /**
   * 检查标识符中的缩写词使用是否规范
   */
  private static checkAbbreviation(name: string, typeName: string): string | null {
    // 检查是否有连续的大写字母（可能是缩写）后跟小写字母（如ABcde）
    const consecutiveUppercasePattern = /[A-Z]{2,}[a-z]/;
    if (consecutiveUppercasePattern.test(name)) {
      // 对常见缩写的特殊处理
      let isValidAbbreviation = false;
      for (const abbr of this.COMMON_ABBREVIATIONS) {
        if (name.includes(abbr)) {
          isValidAbbreviation = true;
          break;
        }
      }
      
      if (!isValidAbbreviation) {
        return `${typeName} "${name}" 中存在不规范的大小写组合，缩写词后应使用大写字母开始新单词`;
      }
    }

    return null;
  }
} 