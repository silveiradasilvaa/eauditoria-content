import React from 'react';
import { EditorMode } from '../types';
import { Copy, Send, Edit3, Eye, Bold, Italic, List, Type, Hash, Link } from 'lucide-react';

interface EditorSectionProps {
  content: string;
  mode: EditorMode;
  isPublishing: boolean;
  hasContent: boolean;
  onContentChange: (content: string) => void;
  onModeChange: (mode: EditorMode) => void;
  onCopy: () => void;
  onPublish: () => void;
}

export const EditorSection: React.FC<EditorSectionProps> = ({
  content,
  mode,
  isPublishing,
  hasContent,
  onContentChange,
  onModeChange,
  onCopy,
  onPublish
}) => {
  const applyFormatting = (format: string) => {
    const textarea = document.getElementById('article-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = content;

    switch (format) {
      case 'bold':
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
        break;
      case 'italic':
        newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
        break;
      case 'h1':
        newText = content.substring(0, start) + `# ${selectedText}` + content.substring(end);
        break;
      case 'h2':
        newText = content.substring(0, start) + `## ${selectedText}` + content.substring(end);
        break;
      case 'h3':
        newText = content.substring(0, start) + `### ${selectedText}` + content.substring(end);
        break;
      case 'h4':
        newText = content.substring(0, start) + `#### ${selectedText}` + content.substring(end);
        break;
      case 'list':
        newText = content.substring(0, start) + `- ${selectedText}` + content.substring(end);
        break;
      case 'numbered-list':
        newText = content.substring(0, start) + `1. ${selectedText}` + content.substring(end);
        break;
      case 'link':
        if (selectedText) {
          newText = content.substring(0, start) + `[${selectedText}](url)` + content.substring(end);
        } else {
          newText = content.substring(0, start) + `[texto do link](url)` + content.substring(end);
        }
        break;
    }

    onContentChange(newText);
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 text-slate-800">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 text-slate-700">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-2 text-slate-600">$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-base font-medium mb-2 text-slate-600">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc mb-4">$1</ul>')
      .replace(/(<li class="ml-4">.*<\/li>)/s, (match) => {
        // Se contém números no início, é lista numerada
        if (content.includes('1. ')) {
          return match.replace('<ul class="list-disc mb-4">', '<ol class="list-decimal mb-4">');
        }
        return match;
      })
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|u|l])(.+)$/gm, '<p class="mb-4">$1</p>');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Editor de Artigo</h2>
          
          {hasContent && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onModeChange(mode === 'edit' ? 'preview' : 'edit')}
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                {mode === 'edit' ? (
                  <>
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-1" />
                    Editar
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Toolbar */}
        {hasContent && mode === 'edit' && (
          <div className="flex items-center space-x-1 mt-4 p-2 bg-slate-50 rounded-lg">
            <button
              onClick={() => applyFormatting('bold')}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded transition-colors"
              title="Negrito"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => applyFormatting('italic')}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded transition-colors"
              title="Itálico"
            >
              <Italic className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-300 mx-1"></div>
            <button
              onClick={() => applyFormatting('h1')}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded transition-colors text-sm font-bold"
              title="Título H1"
            >
              H1
            </button>
            <button
              onClick={() => applyFormatting('h2')}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded transition-colors text-sm font-bold"
              title="Título H2"
            >
              H2
            </button>
            <button
              onClick={() => applyFormatting('h3')}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded transition-colors text-sm font-bold"
              title="Título H3"
            >
              H3
            </button>
            <button
              onClick={() => applyFormatting('h4')}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded transition-colors text-sm font-bold"
              title="Título H4"
            >
              H4
            </button>
            <div className="w-px h-6 bg-slate-300 mx-1"></div>
            <button
              onClick={() => applyFormatting('list')}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded transition-colors"
              title="Lista"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => applyFormatting('numbered-list')}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded transition-colors"
              title="Lista Numerada"
            >
              <Hash className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-300 mx-1"></div>
            <button
              onClick={() => applyFormatting('link')}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded transition-colors"
              title="Link"
            >
              <Link className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {!hasContent ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <Type className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Preencha o formulário e gere um artigo</p>
              <p className="text-slate-400 text-sm mt-2">O artigo gerado aparecerá aqui para edição</p>
            </div>
          </div>
        ) : mode === 'edit' ? (
          <textarea
            id="article-editor"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full h-full border border-slate-300 rounded-lg p-4 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
            placeholder="Seu artigo aparecerá aqui..."
          />
        ) : (
          <div 
            className="h-full overflow-y-auto prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        )}
      </div>

      {/* Actions */}
      {hasContent && (
        <div className="p-6 border-t border-slate-200">
          <div className="flex space-x-3">
            <button
              onClick={onCopy}
              className="flex-1 flex items-center justify-center px-4 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar Artigo
            </button>
            
            <button
              onClick={onPublish}
              disabled={isPublishing}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isPublishing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Publicando...
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar para Zendesk
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};