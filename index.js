const fs = require('fs');

// 读取JavaScript文件内容
const fileContent = fs.readFileSync('example.js', 'utf-8');

// 简单的正则表达式来检测未使用的变量
const unusedVarRegex = /var\s+(\w+)\s*;/g;
let match;
const unusedVars = [];

while ((match = unusedVarRegex.exec(fileContent)) !== null) {
  const varName = match[1];
  const varUsageRegex = new RegExp(`\\b${varName}\\b`, 'g');
  const usageCount = (fileContent.match(varUsageRegex) || []).length;
  if (usageCount === 1) { // 变量声明时会被匹配一次
    unusedVars.push(varName);
  }
}

if (unusedVars.length > 0) {
  console.log('未使用的变量:', unusedVars.join(', '));
} else {
  console.log('没有未使用的变量。');
} 