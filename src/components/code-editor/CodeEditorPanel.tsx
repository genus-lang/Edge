import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { AlertCircle, FileCode, Plus, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CodeFile {
  id: string;
  name: string;
  language: string;
  content: string;
  path: string;
}

interface CodeEditorPanelProps {
  files: CodeFile[];
  activeFileId: string;
  onFileChange: (fileId: string, content: string) => void;
  onFileSelect: (fileId: string) => void;
  onFileClose: (fileId: string) => void;
  onFileAdd: () => void;
  errors: Array<{ line: number; message: string; severity: 'error' | 'warning' }>;
  theme?: 'vs-dark' | 'light';
}

export function CodeEditorPanel({
  files,
  activeFileId,
  onFileChange,
  onFileSelect,
  onFileClose,
  onFileAdd,
  errors,
  theme = 'vs-dark',
}: CodeEditorPanelProps) {
  const [editorInstance, setEditorInstance] = useState<any>(null);

  const activeFile = files.find((f) => f.id === activeFileId);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    setEditorInstance(editor);

    // Configure Monaco
    monaco.editor.defineTheme('quant-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0A0E13',
        'editor.foreground': '#E0E0E0',
        'editorLineNumber.foreground': '#4A5568',
        'editor.selectionBackground': '#00FF8820',
        'editor.inactiveSelectionBackground': '#00FF8810',
      },
    });
    monaco.editor.setTheme('quant-dark');

    // Add error markers
    if (errors.length > 0 && activeFile) {
      const model = editor.getModel();
      if (model) {
        const markers = errors.map((error) => ({
          startLineNumber: error.line,
          startColumn: 1,
          endLineNumber: error.line,
          endColumn: model.getLineMaxColumn(error.line),
          message: error.message,
          severity: error.severity === 'error' ? monaco.MarkerSeverity.Error : monaco.MarkerSeverity.Warning,
        }));
        monaco.editor.setModelMarkers(model, 'owner', markers);
      }
    }
  };

  const getLanguageLabel = (lang: string) => {
    const labels: Record<string, string> = {
      python: 'Python',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
    };
    return labels[lang] || lang;
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0E13]">
      {/* File Tabs */}
      <div className="flex items-center gap-1 px-2 py-2 bg-gray-900/50 border-b border-gray-800 overflow-x-auto">
        {files.map((file) => (
          <div
            key={file.id}
            onClick={() => onFileSelect(file.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-all group',
              activeFileId === file.id
                ? 'bg-[#00FF88]/10 border border-[#00FF88]/30 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            )}
          >
            <FileCode className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">{file.name}</span>
            {files.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFileClose(file.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={onFileAdd}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New File
        </button>
      </div>

      {/* File Path Bar */}
      {activeFile && (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/30 border-b border-gray-800/50 text-xs text-gray-500">
          <FileCode className="w-3 h-3" />
          <span>{activeFile.path}</span>
          <span className="ml-auto px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 rounded text-purple-400 font-medium">
            {getLanguageLabel(activeFile.language)}
          </span>
        </div>
      )}

      {/* Error Banner */}
      {errors.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            {errors.length} {errors.length === 1 ? 'issue' : 'issues'} found. Hover over underlined code for details.
          </span>
        </div>
      )}

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        {activeFile ? (
          <Editor
            height="100%"
            language={activeFile.language}
            value={activeFile.content}
            onChange={(value) => onFileChange(activeFileId, value || '')}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 14,
              fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
              fontLigatures: true,
              lineNumbers: 'on',
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              wordWrap: 'off',
              folding: true,
              bracketPairColorization: { enabled: true },
              renderLineHighlight: 'all',
              cursorBlinking: 'smooth',
              smoothScrolling: true,
              padding: { top: 16, bottom: 16 },
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <FileCode className="w-16 h-16 mx-auto mb-4 text-gray-700" />
              <h3 className="text-lg font-semibold text-white mb-2">No file selected</h3>
              <p className="text-sm text-gray-500">Create a new file to get started</p>
              <button
                onClick={onFileAdd}
                className="mt-4 px-4 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] rounded-lg hover:bg-[#00FF88]/20 transition-colors text-sm font-semibold"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                New File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
