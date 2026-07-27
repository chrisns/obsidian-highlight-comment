const { Plugin, Modal, Notice } = require("obsidian");

class CommentModal extends Modal {
  constructor(app, onSubmit, onClosed) {
    super(app);
    this.onSubmit = onSubmit;
    this.onClosed = onClosed;
  }

  onOpen() {
    const input = this.contentEl.createEl("textarea", {
      attr: { rows: 1, placeholder: "comment" },
    });
    input.style.width = "100%";
    input.style.resize = "none";

    const grow = () => {
      input.style.height = "auto";
      input.style.height = `${input.scrollHeight}px`;
    };
    input.addEventListener("input", grow);

    input.addEventListener("keydown", (e) => {
      // shift+enter for a line break, enter to commit
      if (e.key !== "Enter" || e.shiftKey) return;
      e.preventDefault();
      this.submitted = input.value;
      this.close();
    });

    window.setTimeout(() => {
      input.focus();
      grow();
    }, 0);
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
      (comment) => {
        // inline footnotes cannot span lines, so flatten anything typed as one
        const text = comment.replace(/\s*\n\s*/g, " ").trim();
        editor.replaceSelection(
          text ? `==${selection}==^[${text}]` : `==${selection}==`
        );
      },
      () => (this.isOpen = false)
    ).open();
  }
};
