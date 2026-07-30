"use client";

import { useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

const lowlight = createLowlight(common);

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function Editor({
  content,
  onChange,
  placeholder = "Start writing…",
  minHeight = "320px",
}: EditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4",
        },
      }),
      Placeholder.configure({ placeholder }),
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
          "prose prose-neutral max-w-none focus:outline-none px-4 py-3 text-ink prose-headings:font-display prose-a:text-mark prose-img:rounded-lg",
        style: `min-height: ${minHeight}`,
      },
      handleDrop: (view, event, _slice, moved) => {
        if (moved || !event.dataTransfer?.files?.length) return false;
        const file = event.dataTransfer.files[0];
        if (!file?.type.startsWith("image/")) return false;
        // External images only — prompt for URL instead of uploading
        event.preventDefault();
        return true;
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (content && content !== current) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
    if (!content && current !== "<p></p>" && current !== "") {
      editor.commands.setContent("", { emitUpdate: false });
    }
  }, [content, editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL:", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Image URL:");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const addYoutube = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("YouTube or embed URL:");
    if (!url) return;
    // Simple embed as a link-styled block for portability
    const html = `<p><a href="${url}">${url}</a></p>`;
    editor.chain().focus().insertContent(html).run();
  }, [editor]);

  if (!editor) {
    return (
      <div
        className="border border-line rounded-lg bg-panel animate-pulse"
        style={{ minHeight }}
      />
    );
  }

  const btn = (active: boolean) =>
    `px-2 py-1.5 rounded text-xs font-medium transition-colors ${
      active
        ? "bg-canvas-2 text-ink"
        : "text-ink-2 hover:bg-canvas-2 hover:text-ink"
    }`;

  return (
    <div className="border border-line rounded-lg overflow-hidden bg-canvas">
      <div className="flex flex-wrap gap-0.5 p-2 bg-panel border-b border-line sticky top-0 z-10">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={btn(false)}
          title="Undo"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className={btn(false)}
          title="Redo"
        >
          ↷
        </button>
        <div className="w-px h-6 bg-line mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btn(editor.isActive("bold"))}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btn(editor.isActive("italic"))}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={btn(editor.isActive("underline"))}
          title="Underline"
        >
          <span className="underline">U</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btn(editor.isActive("strike"))}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
        <div className="w-px h-6 bg-line mx-1 self-center" />
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
        <div className="w-px h-6 bg-line mx-1 self-center" />
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
        <div className="w-px h-6 bg-line mx-1 self-center" />
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
        <button type="button" onClick={addImage} className={btn(false)}>
          Image
        </button>
        <button type="button" onClick={addYoutube} className={btn(false)}>
          Embed
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
