// 包含命名不规范的Java类示例
public class goodClass {  // 类名不符合命名规范，首字母应该大写
    private int value;
    
    public goodClass(int value) {
        this.value = value;
    }
    
    public int getValue() {
        return value;
    }
}

class anotherBadNamedClass {  // 类名不符合命名规范，首字母应该大写
    private String name;
    
    public anotherBadNamedClass(String name) {
        this.name = name;
    }
}

class GoodClass {  // 类名符合命名规范
    private boolean status;
    
    public GoodClass() {
        this.status = false;
    }
} 