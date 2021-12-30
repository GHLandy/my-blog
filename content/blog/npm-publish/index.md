---
title: 关于 npm publish
date: '2021-12-30T14:15:50.084Z'
description: 记录 npm publish 相关的东西，https://docs.npmjs.com/cli/v8/commands/npm-publish#files-included-in-package
---

## npm 包 (package) 中包含的文件

可以运行 `npx npm-packlist` 查看包 (package) 中包将会含哪些文件，默认是包含所有文件，除非：

- 与 npm 包的安装、分发相关信息的文件会一直包含到 npm 包 (package) 中，比如 `package.json, README.md, LICENSE` 等。

- package.json 存在 "files" 列表，则会包含列举的文件。 (若列举的是文件夹，则会递归的包含其内的文件，与 `忽略规则 (ignore rules)` 相同。)

- 如果有 `.gitignore` 或者 `.npmignore`, 则忽略对应的文件和目录。如果这两个文件都存在，则只有根据 `.npmignore` 的配置来忽略

- `.npmignore` 与 `.gitignore` 的 [`模式规则 (pattern rules)`](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository#_ignoring) 相同

- 如果文件匹配到了某个确定的模式，则文件会被忽略，除非 package.json 的 "files" 列表明确列出这个文件，或者 `.gitignore` 或者 `.npmignore` 使用 `! 规则` 表示不忽略。

- 符号链接 (Symbolic links) 用于不会包含到 npm 包 (package) 中
