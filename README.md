# Highlight with comment

A tiny Obsidian plugin that does one thing: wraps the selected text in a highlight and asks you for a comment to go with it.

Select some text, run the command, type a comment, press Enter:

```md
The thing I selected

==The thing I selected==^[needs a citation]
```

That is the format [sidebar-highlights](https://github.com/trevware/obsidian-sidebar-highlights) reads, so the highlight and its comment show up in the sidebar panel straight away. It works fine without that plugin too, since `^[...]` is just a standard Obsidian inline footnote.

## Why

`sidebar-highlights` can create a highlight, and it can add a comment afterwards from the sidebar. This does both in one step, from wherever your cursor already is.

## Usage

The command is **Highlight with comment**, bound to `Cmd .` (`Ctrl .` on Windows and Linux) out of the box. Rebind it in Settings → Hotkeys, or add it to a toolbar:

- **[Editing Toolbar](https://github.com/PKM-er/obsidian-editing-toolbar)**: Settings → Editing Toolbar → add the command, it ships with a highlighter icon.
- **[Commander](https://github.com/phibr0/obsidian-commander)**: add it to the ribbon, status bar, or page header.
- **Mobile**: Settings → Toolbar → add the command.

Empty comment gives you a plain `==highlight==`. Escape cancels and leaves your selection alone.

## Dictating comments

The prompt takes focus as soon as it opens, so anything your dictation tool types goes into it rather than into the note. With [MacWhisper](https://goodsnooze.gumroad.com/l/macwhisper) that makes the whole loop: select, `Cmd .`, hold your push-to-talk key, talk, Enter. Dictate again before pressing Enter to add more.

## Install

**Manually**: download `main.js` and `manifest.json` from the [latest release](https://github.com/chrisns/obsidian-highlight-comment/releases/latest) into `<vault>/.obsidian/plugins/highlight-comment/`, then enable it in Settings → Community plugins.

**Via [BRAT](https://github.com/TfTHacker/obsidian42-brat)**: add `chrisns/obsidian-highlight-comment` as a beta plugin.

## Licence

MIT
