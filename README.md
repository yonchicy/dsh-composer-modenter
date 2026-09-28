# dsh-composer-modenter

[English](#english) · [中文](#中文)

---

## English

A web composer keymap plugin for [DeepSeek Harness](https://github.com/deepseek-ai/DeepSeek-Harness).

It flips the default composer shortcuts:

- **Enter** inserts a newline
- **Cmd+Enter** (macOS) / **Ctrl+Enter** (Linux/Windows) sends the message
- Slash / command menus still use **Enter** to pick an item
- IME composition (e.g. Chinese input) is left untouched

### How it works

The plugin is entirely browser-side. It registers a capture-phase `keydown`
listener on `document` and, for a plain `Enter` pressed inside the composer:

1. Skips events with any modifier (`shift` / `meta` / `ctrl` / `alt`), so
   **Cmd/Ctrl+Enter keeps sending** as before.
2. Skips IME composition events (`isComposing` or `keyCode === 229`).
3. Only acts on events inside a `[data-composer-input]` element.
4. Bails out when the slash / command menu is open, so **Enter still selects**
   the highlighted menu item.
5. Otherwise it masquerades the event as `Shift+Enter`; if the native field is
   frozen it falls back to `preventDefault()` + `insertLineBreak`.

### Install

```sh
dsh plugin --profile web add github:yonchicy/dsh-composer-modenter
```

Or install from a local checkout:

```sh
dsh plugin --profile web add link:/absolute/path/to/dsh-composer-modenter
```

Restart the web GUI after install or update.

### Uninstall

```sh
dsh plugin --profile web remove dsh-composer-modenter
```

### License

[MIT](LICENSE)

---

## 中文

一款用于 [DeepSeek Harness](https://github.com/deepseek-ai/DeepSeek-Harness) 的
Web 输入框按键插件，反转默认的快捷键行为：

- **Enter** 换行
- **Cmd+Enter**（macOS）/ **Ctrl+Enter**（Linux/Windows）发送消息
- 斜杠 / 命令菜单中仍可用 **Enter** 选中条目
- 不干扰输入法（IME）组合输入，例如中文打字选词

### 工作原理

插件逻辑完全运行在浏览器侧。它在 `document` 上注册捕获阶段的 `keydown`
监听器，对在输入框内按下的纯 `Enter` 做如下处理：

1. 带任何修饰键（`shift` / `meta` / `ctrl` / `alt`）的事件一律放行，因此
   **Cmd/Ctrl+Enter 照常发送**。
2. 跳过输入法组合事件（`isComposing` 或 `keyCode === 229`）。
3. 仅处理 `[data-composer-input]` 元素内的事件。
4. 斜杠 / 命令菜单打开时不干预，因此 **Enter 仍可选中**高亮的菜单项。
5. 其余情况下将事件伪装成 `Shift+Enter`；若原生字段被冻结，则回退为
   `preventDefault()` + `insertLineBreak` 插入换行。

### 安装

```sh
dsh plugin --profile web add github:yonchicy/dsh-composer-modenter
```

或从本地检出目录安装：

```sh
dsh plugin --profile web add link:/absolute/path/to/dsh-composer-modenter
```

安装或更新后请重启 Web GUI。

### 卸载

```sh
dsh plugin --profile web remove dsh-composer-modenter
```

### 开源协议

[MIT](LICENSE)
