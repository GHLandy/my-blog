---
title: 关于 Husky
date: '2022-12-26T10:30:25.240Z'
description: 使用 husky 来设置项目的 git hooks, 比如 pre-commit 等。
---

## 安装依赖

在项目 `package.json` 的 `scripts` 中将 `prepare` 设置 `husky install`

添加 `husky` 和 `lint-staged` 以来，之后在执行一遍 `pnpm i` 触发这个 prepare 执行

```bash
pnpm i -D husky lint-staged
```

添加 hooks, 比如 pre-commit

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

一般将 `.husky/_` 目录添加到 `.gitignore` 忽略掉它，因为它是 `husky install` 操作生成的，`.husky` 下的其他文件，
比如 `pre-commit` 则提交到 git 仓库中

对于使用 `vue-cli` 模板的项目，它会默认下载 `yorkie`, 但是对于使用 pnpm 时，无法正确生成 `git hooks`

> 若是使用了 `nvm` 之类的来安装 `node` 的话，在 `VS Code` 中提交代码时会找不到 `npx` 命令，需要在家目录添加 `~/.huskyrc` 文件：

```bash
export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

[ -f ".nvmrc" ] && nvm use
```

## READ MORE

- [Why husky has dropped conventional JS config](https://blog.typicode.com/husky-git-hooks-javascript-config/)
- [Why husky doesn't autoinstall anymore](https://blog.typicode.com/husky-git-hooks-autoinstall/)
