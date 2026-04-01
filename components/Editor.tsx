"use client";

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
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-zinc max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-zinc-200 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-zinc-50 border-b border-zinc-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("bold") ? "bg-zinc-200" : ""}`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("italic") ? "bg-zinc-200" : ""}`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("strike") ? "bg-zinc-200" : ""}`}
        >
          <s>S</s>
        </button>
        <div className="w-px h-8 bg-zinc-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("heading", { level: 1 }) ? "bg-zinc-200" : ""}`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("heading", { level: 2 }) ? "bg-zinc-200" : ""}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("heading", { level: 3 }) ? "bg-zinc-200" : ""}`}
        >
          H3
        </button>
        <div className="w-px h-8 bg-zinc-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("bulletList") ? "bg-zinc-200" : ""}`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("orderedList") ? "bg-zinc-200" : ""}`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("blockquote") ? "bg-zinc-200" : ""}`}
        >
          {'>'}
        </button>
        <div className="w-px h-8 bg-zinc-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("code") ? "bg-zinc-200" : ""}`}
        >
          {'</>'}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("codeBlock") ? "bg-zinc-200" : ""}`}
        >
          {'[]'}
        </button>
        <button
          type="button"
          onClick={addLink}
          className={`p-2 rounded hover:bg-zinc-200 ${editor.isActive("link") ? "bg-zinc-200" : ""}`}
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-zinc-200"
        >
          ─
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}