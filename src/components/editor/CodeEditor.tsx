import React from 'react';
import Editor from '@monaco-editor/react';
import { useProjectStore } from '../../store/projectStore';

const CodeEditor: React.FC = () => {
  const { code, setCode } = useProjectStore();

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-2 bg-slate-100 border-b border-slate-200">
        <h2 className="text-lg font-semibold">コードエディタ</h2>
        <p className="text-sm text-slate-600">JavaScriptでゲームのコードを書こう！</p>
      </div>
      <Editor
        height="calc(100% - 60px)"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
        theme="vs-light"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          tabSize: 2,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;