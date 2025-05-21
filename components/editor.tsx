"use client";

import {
  EditorProvider,
  useCurrentEditor,
  type EditorOptions,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { Mark, mergeAttributes, RawCommands } from "@tiptap/core";
import React from "react";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Highlighter,
  Italic,
  Link2,
  List,
  ListOrdered,
  PencilLine,
  Pilcrow,
  Ruler,
  Strikethrough,
  TextQuote,
} from "lucide-react";

// Custom Uppercase Mark
const Uppercase = Mark.create({
  name: "uppercase",
  parseHTML() {
    return [{ tag: "span.uppercase" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes, { class: "uppercase" }), 0];
  },
  addCommands() {
    return {
      toggleUppercase:
        () =>
        ({ commands }: { commands: any }) =>
          commands.toggleMark(this.name),
    } as Partial<RawCommands>;
  },
});

// MenuBar Component
const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const Btn = ({
    onClick,
    active,
    label,
  }: {
    onClick: () => void;
    active?: boolean;
    label: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 rounded ${
        active ? "bg-purple-600 text-white" : "bg-gray-100"
      }`}
      aria-label={typeof label === "string" ? label : undefined}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-2 mb-4 pb-1 border-b-2">
      <div className="p-2 space-x-2 border-r">
        <Btn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label={<Bold className="w-[15px] h-[15px]" />}
        />
        <Btn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label={<Italic className="w-[15px] h-[15px]" />}
        />
        <Btn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          label={<Strikethrough className="w-[15px] h-[15px]" />}
        />
        <Btn
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive("paragraph")}
          label={<Pilcrow className="w-[15px] h-[15px]" />}
        />
        <Btn
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive("highlight", "mark")}
          label={<Highlighter className="w-[15px] h-[15px] " />}
        />
      </div>

      <div className="p-2 space-x-2">
        <Btn
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          label={<AlignLeft className="w-[15px] h-[15px]" />}
        />
        <Btn
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive("center", { textAlign: "center" })}
          label={<AlignCenter className="w-[15px] h-[15px]" />}
        />
        <Btn
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          active={editor.isActive({ textAlign: "justify" })}
          label={<AlignJustify className="w-[15px] h-[15px]" />}
        />
        <Btn
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          label={<AlignRight className="w-[15px] h-[15px]" />}
        />
      </div>

      <div className="p-2 space-x-2 border-r ">
        <Btn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label={<List className="w-[15px] h-[15px]" />}
        />
        <Btn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label={<ListOrdered className="w-[15px] h-[15px]" />}
        />
        <Btn
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          label={<PencilLine className="w-[15px] h-[15px]" />}
        />
        <Btn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          label={<TextQuote className="w-[15px] h-[15px]" />}
        />
        <Btn
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          active={editor.isActive("horizontalRule")}
          label={<Ruler className="w-[15px] h-[15px]" />}
        />
      </div>

      <div className="p-2 space-x-2 ">
        <Btn
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          label={<Code className="w-[15px] h-[15px]" />}
        />

        <Btn
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (url) {
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
            }
          }}
          active={editor.isActive("link")}
          label={<Link2 className="w-[15px] h-[15px]" />}
        />
      </div>
      {/* heading */}

      {[1, 2, 2, 4].map((level) => (
        <Btn
          key={level}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: level as any })
              .run()
          }
          active={editor.isActive("heading", { level })}
          label={`H${level}`}
        />
      ))}
    </div>
  );
};

// Main Editor Component
type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const Editor = ({ value, onChange }: EditorProps) => {
  const editorOptions: Partial<EditorOptions> = {
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "underline text-blue-600 hover:text-blue-800 cursor-pointer",
        },
      }),
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Write something awesome...",
      }),
      Uppercase,
      TextStyle,
      Color.configure({
        types: [TextStyle.name, ListItem.name],
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none",
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md min-h-[200px] max-w-full flex flex-col p-4">
      <EditorProvider
        extensions={editorOptions.extensions!}
        content={editorOptions.content}
        slotBefore={<MenuBar />}
        onUpdate={editorOptions.onUpdate}
        editorProps={editorOptions.editorProps}
        children={undefined}
      />
    </div>
  );
};
