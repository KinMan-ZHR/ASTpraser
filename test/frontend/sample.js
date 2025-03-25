// 包含未使用变量的JavaScript代码示例
function testFunction() {
  var a = 1;        // 这个变量会被使用
  var b = 2;        // 这个变量不会被使用
  var c = "test";   // 这个变量不会被使用
  
  console.log(a);
  
  return a;
} 