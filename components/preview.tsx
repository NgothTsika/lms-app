"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: value,
  });

  // Update editor content when `value` changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  return (
    <div className="prose max-w-full ">
      <EditorContent editor={editor} />
    </div>
  );
};
