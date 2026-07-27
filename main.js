const { Plugin, Modal, Setting, Notice } = require("obsidian");

class CommentModal extends Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
    this.value = "";
  }

  onOpen() {
    this.setTitle("Comment");
    new Setting(this.contentEl).addText((text) => {
      text.setPlaceholder("comment").onChange((v) => (this.value = v));
      text.inputEl.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        this.close();
        this.onSubmit(this.value);
      });
      window.setTimeout(() => text.inputEl.focus(), 0);
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}

module.exports = class HighlightCommentPlugin extends Plugin {
  onload() {
    this.addCommand({
      id: "add",
      name: "Highlight with comment",
      icon: "highlighter",
      editorCallback: (editor) => {
        const selection = editor.getSelection();
        if (!selection) {
          new Notice("Select some text first");
          return;
        }
        new CommentModal(this.app, (comment) => {
          // ponytail: escape closes the modal without submitting, so nothing is replaced
          editor.replaceSelection(
            comment ? `==${selection}==^[${comment}]` : `==${selection}==`
          );
        }).open();
      },
    });
  }
};
