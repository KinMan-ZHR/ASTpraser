/**
 * 标识符类型枚举
 */
export declare enum IdentifierType {
    CLASS = "class",
    METHOD = "method",
    VARIABLE = "variable",
    CONSTANT = "constant",
    PACKAGE = "package",
    INTERFACE = "interface"
}
/**
 * 命名规范检测工具类
 */
export declare class NamingUtils {
    /**
     * 常见的缩写词列表
     */
    private static readonly COMMON_ABBREVIATIONS;
    /**
     * 检查标识符命名是否符合规范
     * @param name 标识符名称
     * @param type 标识符类型
     * @returns 错误消息，如果符合规范则返回null
     */
    static checkNaming(name: string, type: IdentifierType): string | null;
    /**
     * 获取标识符类型的中文名称
     */
    private static getTypeName;
    /**
     * 检查是否符合帕斯卡命名法（PascalCase）
     * - 首字母大写
     * - 不包含下划线或连字符
     * - 只包含字母和数字
     * - 每个单词首字母大写
     */
    private static checkPascalCase;
    /**
     * 检查是否符合驼峰命名法（camelCase）
     * - 首字母小写
     * - 不包含下划线或连字符
     * - 只包含字母和数字
     * - 除首字母外，每个单词首字母大写
     */
    private static checkCamelCase;
    /**
     * 检查常量命名是否符合规范（全大写，下划线分隔）
     */
    private static checkConstantNaming;
    /**
     * 检查包命名是否符合规范（全小写，点分隔）
     */
    private static checkPackageNaming;
    /**
     * 检查标识符中的缩写词使用是否规范
     */
    private static checkAbbreviation;
}
