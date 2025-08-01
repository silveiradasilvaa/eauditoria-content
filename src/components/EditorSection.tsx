import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Copy, Send, Type } from 'lucide-react';

interface EditorSectionProps {
  content: string;
  isPublishing: boolean;
  hasContent: boolean;
  onContentChange: (content: string) => void;
  onCopy: () => void;
  onPublish: () => void;
}

export const EditorSection: React.FC<EditorSectionProps> = ({
  content,
  isPublishing,
  hasContent,
  onContentChange,
  onCopy,
  onPublish
}) => {
  // Configuração da barra de ferramentas do Quill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['blockquote', 'code-block'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline',
    'list', 'bullet', 'link', 'blockquote', 
    'code-block', 'align'
  ];

  // Função para copiar apenas o texto limpo (sem HTML)
  const handleCopy = async () => {
    try {
      // Cria um elemento temporário para extrair apenas o texto
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      await navigator.clipboard.writeText(textContent);
      onCopy();
    } catch (error) {
      // Fallback: copia o HTML mesmo
      await navigator.clipboard.writeText(content);
      onCopy();
    }
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Editor de Artigo</h2>
        </div>
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
        ) : (
          <div className="h-full">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={onContentChange}
              modules={modules}
              formats={formats}
              style={{ height: 'calc(100% - 42px)' }}
              className="h-full"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      {hasContent && (
        <div className="p-6 border-t border-slate-200">
          <div className="flex space-x-3">
            <button
              onClick={handleCopy}
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
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Publicando...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar para Zendesk
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};