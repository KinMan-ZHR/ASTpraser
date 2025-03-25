// 包含各种驼峰命名情况的Java类
package com.example.naming;

// 正确的驼峰命名
public class UserManager {
    private String name;
    
    public void processData() {
        // 代码
    }
}

// 首字母小写，不符合类命名规范
class userService {
    public void getData() {
        // 代码
    }
}

// 包含下划线，不符合驼峰命名
class User_Data {
    private int id;
}

// 包含连字符，不符合驼峰命名
class Product-Manager {
    private String category;
}

// 没有明显的单词边界（全小写字母）
class Productmanager {
    private int count;
}

// 不规范的大小写组合（连续大写字母后跟小写字母）
class ABcService {
    private String code;
}

// 正确使用缩写的驼峰命名
class XMLParser {
    public String parse(String xml) {
        return null;
    }
}

// 正确的多单词驼峰命名
class UserProfileManager {
    private String userId;
}

// 包含数字的正确驼峰命名
class OAuth2Client {
    private String clientId;
}

// 全大写，不符合驼峰命名规范
class DATAPROCESSOR {
    public void process() {
        // 代码
    }
} 