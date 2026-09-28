# dsh-composer-modenter

A web composer keymap plugin for [DeepSeek Harness](https://github.com/deepseek-ai/DeepSeek-Harness).

It flips the default composer shortcuts:

- **Enter** inserts a newline
- **Cmd+Enter** (macOS) / **Ctrl+Enter** (Linux/Windows) sends the message
- Slash / command menus still use **Enter** to pick an item
- IME composition (e.g. Chinese input) is left untouched

## How it works

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

## Install

```sh
dsh plugin --profile web add github:yonchicy/dsh-composer-modenter
```

Or install from a local checkout:

```sh
dsh plugin --profile web add link:/absolute/path/to/dsh-composer-modenter
```

Restart the web GUI after install or update.

## Uninstall

```sh
dsh plugin --profile web remove dsh-composer-modenter
```

## License

[MIT](LICENSE)
