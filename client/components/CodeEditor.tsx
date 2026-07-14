"use client";

import Editor from "@monaco-editor/react";

interface Props {
  code: string;
  setCode: (value: string) => void;
  language: string;
}

export default function CodeEditor({
  code,
  setCode,
  language,
}: Props) {
  return (
    <div className="mt-8 border rounded-xl overflow-hidden shadow">

      <Editor
        height="500px"
        language={language.toLowerCase()}
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          automaticLayout: true,
        }}
      />

    </div>
  );
}