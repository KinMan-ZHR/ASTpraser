# 静态代码检测工具

一个用于前端和后端代码静态分析的工具，支持检测Vue、React和Java等不同类型的代码。可用于公司内部代码规范检查和CI/CD流程集成。

## 功能特点

- 支持多种前端语言：JavaScript、TypeScript、React、Vue
- 支持Java后端代码检测
- 可扩展的规则系统
- 易于集成到CI/CD流程
- 可定制化的规则严重级别
- 友好的命令行输出格式

## 当前实现的规则

### 前端规则
- `unused-variable`: 检测未使用的变量声明

### 后端规则
- `class-naming`: 检测Java类名是否遵循驼峰命名法并以大写字母开头

## 安装

```bash
# 克隆代码库
git clone <repository-url>
cd static-code-checker

# 安装依赖
npm install

# 构建项目
npm run build
```

## 使用方法

```bash
# 检测单个文件
npm run check -- <文件路径>

# 检测整个目录
npm run check -- <目录路径>
```

## 扩展规则

可以通过在`src/frontend/rules`或`src/backend/rules`目录中添加新的规则类来扩展检测规则。所有规则类必须实现`Rule`接口。

### 添加前端规则示例

```typescript
import { Issue, Rule, Severity } from '../../common/types';

export class MyNewFrontendRule implements Rule {
  id = 'frontend/my-new-rule';
  description = '我的新规则描述';
  severity = Severity.WARNING;

  check(ast: any, filePath: string): Issue[] {
    // 实现规则检测逻辑
    const issues: Issue[] = [];
    
    // ...

    return issues;
  }
}
```

添加新规则后，需要在`src/index.ts`文件中注册该规则：

```typescript
constructor() {
  // 注册前端规则
  this.frontendRules.push(new UnusedVariableRule());
  this.frontendRules.push(new MyNewFrontendRule()); // 添加新规则
  
  // 注册后端规则
  this.backendRules.push(new ClassNamingRule());
}
```

## CI/CD 集成

### 在GitLab CI中集成

`.gitlab-ci.yml`示例：

```yaml
code-check:
  stage: test
  script:
    - npm install
    - npm run build
    - npm run check -- ./src
  artifacts:
    paths:
      - code-check-report.txt
```

### 在GitHub Actions中集成

`.github/workflows/code-check.yml`示例：

```yaml
name: Code Check

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  code-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - run: npm run check -- ./src
```

## 许可证

ISC 