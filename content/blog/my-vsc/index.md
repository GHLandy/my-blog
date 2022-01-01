---
title: 我的 VS Code
date: '2022-01-01T09:44:52.580Z'
description: 记录一下我 VS Code 的配置
---

## settings.json

> 位置: <br />
> windows: `%appdata%\Code\User\settings.json` <br />
> Linux: `~/.config/Code/User/settings.json`

```json
{
  "diffEditor.renderSideBySide": false,
  "editor.fontFamily": "Menlo, Consolas, DejaVu Sans Mono, monospace",
  "editor.fontSize": 14,
  "editor.multiCursorModifier": "alt",
  "editor.renderIndentGuides": true,
  "editor.renderWhitespace": "all",
  "editor.rulers": [80, 100, 120],
  "editor.tabSize": 2,
  "editor.wordWrap": "bounded",
  "editor.wordWrapColumn": 100,
  "files.eol": "\n",
  "window.menuBarVisibility": "toggle",
  "window.zoomLevel": 1,
  "workbench.colorTheme": "Atom Material Theme",
  "workbench.iconTheme": "file-icons",
  "workbench.sideBar.location": "left",
  "[css]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[html]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[javascriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[json]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[jsonc]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[less]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[markdown]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[sass]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[scss]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[vue]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }
}
```

## keybindings.json

> 位置: <br />
> windows: `%appdata%\Code\User\keybindings.json` <br />
> Linux: `~/.config/Code/User/keybindings.json`

```json
// Place your key bindings in this file to override the defaults
[
  {
    "key": "shift+alt+f",
    "command": "editor.action.formatDocument",
    "when": "editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly && !inCompositeEditor"
  },
  {
    "key": "ctrl+shift+i",
    "command": "-editor.action.formatDocument",
    "when": "editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly && !inCompositeEditor"
  },
  {
    "key": "shift+alt+f",
    "command": "editor.action.formatDocument.none",
    "when": "editorTextFocus && !editorHasDocumentFormattingProvider && !editorReadonly"
  },
  {
    "key": "ctrl+shift+i",
    "command": "-editor.action.formatDocument.none",
    "when": "editorTextFocus && !editorHasDocumentFormattingProvider && !editorReadonly"
  },
  {
    "key": "shift+alt+down",
    "command": "editor.action.copyLinesDownAction",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+shift+alt+down",
    "command": "-editor.action.copyLinesDownAction",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "shift+alt+up",
    "command": "editor.action.copyLinesUpAction",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+shift+alt+up",
    "command": "-editor.action.copyLinesUpAction",
    "when": "editorTextFocus && !editorReadonly"
  }
]
```

## extensions.json

> 位置: `<PROJECT_ROOT>/.vscode/extensions.json`

```json
{
  "recommendations": [
    "eamodio.gitlens",
    "editorconfig.editorconfig",
    "esbenp.prettier-vscode",
    "file-icons.file-icons",
    "gruntfuggly.todo-tree",
    "irongeek.vscode-env",
    "johnsoncodehk.volar",
    "mgmcdermott.vscode-language-babel",
    "mhutchie.git-graph",
    "ms-python.python",
    "tobiasalthoff.atom-material-theme"
  ]
}
```
