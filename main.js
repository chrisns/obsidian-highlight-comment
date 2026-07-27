const { Plugin, Modal, Setting, Notice } = require("obsidian");

class CommentModal extends Modal {
  constructor(app, onSubmit, onClosed) {
    super(app);
    this.onSubmit = onSubmit;
    this.onClosed = onClosed;
  }

  onOpen() {
    this.setTitle("Comment");
    new Setting(this.contentEl).addText((text) => {
      text.setPlaceholder("comment");
      text.inputEl.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        this.submitted = text.inputEl.value;
        this.close();
      });
      window.setTimeout(() => text.inputEl.focus(), 0);
    });
  }

  onClose() {
    this.contentEl.empty();
    this.onClosed();
    if (this.submitted !== undefined) this.onSubmit(this.submitted);
  }
}

module.exports = class HighlightCommentPlugin extends Plugin {
  onload() {
    this.addCommand({
      id: "add",
      name: "Highlight with comment",
      icon: "highlighter",
      hotkeys: [{ modifiers: ["Mod"], key: "." }],
      editorCallback: (editor) => this.prompt(editor),
    });
  }

  prompt(editor) {
    const selection = editor.getSelection();
    if (!selection) {
      new Notice("Select some text first");
      return;
    }
    this.isOpen = true;
    new CommentModal(
      this.app,
      (comment) =>
        editor.replaceSelection(
          comment.trim() ? `==${selection}==^[${comment.trim()}]` : `==${selection}==`
        ),
      () => (this.isOpen = false)
    ).open();
  }
};
