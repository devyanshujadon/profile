"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

const lowlight = createLowlight(common);

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link.configure({
        openOnClick: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: content || "",
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none focus:outline-none min-h-[320px] px-4 py-3 text-ink prose-headings:font-display prose-a:text-mark",
      },
    },
  });

  // Sync external content (e.g. loading a post to edit)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (content && content !== current) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
    if (!content && current !== "<p></p>") {
      editor.commands.setContent("", { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="min-h-[320px] border border-line rounded-lg bg-panel animate-pulse" />
    );
  }

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const btn = (active: boolean) =>
    `px-2.5 py-1.5 rounded text-sm transition-colors ${
      active
        ? "bg-canvas-2 text-ink"
        : "text-ink-2 hover:bg-canvas-2 hover:text-ink"
    }`;

  return (
    <div className="border border-line rounded-lg overflow-hidden bg-canvas">
      <div className="flex flex-wrap gap-0.5 p-2 bg-panel border-b border-line">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btn(editor.isActive("bold"))}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btn(editor.isActive("italic"))}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btn(editor.isActive("strike"))}
        >
          <s>S</s>
        </button>
        <div className="w-px h-7 bg-line mx-1 self-center" />
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={btn(editor.isActive("heading", { level: 1 }))}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={btn(editor.isActive("heading", { level: 2 }))}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={btn(editor.isActive("heading", { level: 3 }))}
        >
          H3
        </button>
        <div className="w-px h-7 bg-line mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btn(editor.isActive("bulletList"))}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btn(editor.isActive("orderedList"))}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btn(editor.isActive("blockquote"))}
        >
          Quote
        </button>
        <div className="w-px h-7 bg-line mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={btn(editor.isActive("code"))}
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={btn(editor.isActive("codeBlock"))}
        >
          Block
        </button>
        <button
          type="button"
          onClick={addLink}
          className={btn(editor.isActive("link"))}
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={btn(false)}
        >
          —
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
