package com.example.naming;

/**
 * 测试各种命名规范的Java类
 */
public class NamingRulesTest {
    
    // 正确的常量命名
    public static final String DATABASE_URL = "jdbc:mysql://localhost:3306/db";
    
    // 错误的常量命名 - 使用驼峰而非全大写
    public static final int connectionTimeout = 30;
    
    // 正确的变量命名
    private String userName;
    private int maxRetryCount;
    
    // 错误的变量命名 - 首字母大写
    private String UserEmail;
    
    // 错误的变量命名 - 包含下划线
    private int max_count;
    
    // 错误的变量命名 - 不符合驼峰规范
    private boolean isactive;
    
    /**
     * 正确的方法命名
     */
    public void processUserData() {
        // 正确的局部变量命名
        int count = 0;
        String temporaryBuffer = "";
        
        // 错误的局部变量命名 - 首字母大写
        String Result = "success";
        
        // 错误的局部变量命名 - 不符合驼峰规范
        boolean isvalid = true;
        
        // 正确的常量局部变量命名
        final int MAX_RETRY = 3;
        
        // 错误的常量局部变量命名
        final String defaultValue = "none";
    }
    
    /**
     * 错误的方法命名 - 首字母大写
     */
    public void ProcessData() {
        // 方法内容
    }
    
    /**
     * 错误的方法命名 - 包含下划线
     */
    public int get_count() {
        return 0;
    }
    
    /**
     * 错误的方法命名 - 单词没有边界
     */
    public void updateuserprofile() {
        // 方法内容
    }
}

/**
 * 错误类名 - 使用下划线
 */
class User_Profile {
    // 类内容
}

/**
 * 错误类名 - 首字母小写
 */
class dataProcessor {
    // 类内容
}

/**
 * 错误类名 - 不符合驼峰命名规范
 */
class userprofilemanager {
    // 类内容
}

/**
 * 正确的接口命名
 */
interface DataProvider {
    // 接口内容
}

/**
 * 错误的接口命名 - 首字母小写
 */
interface dataConsumer {
    // 接口内容
} 