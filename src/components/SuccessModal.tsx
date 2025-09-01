import React from 'react';
import { CheckCircle, X, ExternalLink, Copy } from 'lucide-react';

interface ZendeskArticle {
  id: number;
  html_url: string;
  title: string;
  draft: boolean;
}

interface SuccessModalProps {
  isOpen: boolean;
  article: ZendeskArticle | null;
  onClose: () => void;
  onCopyId: () => void;
  onCopyUrl: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  article,
  onClose,
  onCopyId,
  onCopyUrl
}) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Artigo Publicado com Sucesso!
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm font-medium mb-2">
              ✅ Artigo salvo nos rascunhos do Zendesk
            </p>
            <p className="text-green-700 text-sm">
              O artigo foi criado com sucesso e está disponível para revisão e publicação.
            </p>
          </div>

          {/* Article Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título do Artigo
              </label>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded border">
                {article.title}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID do Artigo
              </label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 text-sm bg-gray-50 p-3 rounded border font-mono">
                  {article.id}
                </code>
                <button
                  onClick={onCopyId}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  title="Copiar ID"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL do Artigo
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={article.html_url}
                  readOnly
                  className="flex-1 text-sm bg-gray-50 p-3 rounded border font-mono"
                />
                <button
                  onClick={onCopyUrl}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  title="Copiar URL"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
            Status: Rascunho
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fechar
            </button>
            <a
              href={article.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Abrir no Zendesk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};