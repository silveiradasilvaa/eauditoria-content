import React from 'react';
import { ArticleFormData, WebhookConfig } from '../types';

interface FormSectionProps {
  formData: ArticleFormData;
  webhookConfig: WebhookConfig;
  isGenerating: boolean;
  onFormChange: (data: ArticleFormData) => void;
  onWebhookConfigChange: (config: WebhookConfig) => void;
  onGenerate: () => void;
}

export const FormSection: React.FC<FormSectionProps> = ({
  formData,
  webhookConfig, 
  isGenerating,
  onFormChange,
  onWebhookConfigChange,
  onGenerate
}) => {
  const handleInputChange = (field: keyof ArticleFormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  const handleWebhookChange = (field: keyof WebhookConfig, value: string) => {
    onWebhookConfigChange({ ...webhookConfig, [field]: value });
  };

  const isFormValid = formData.topic && formData.description && formData.audience && formData.format;

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Configuração do Artigo</h2>
      
      {/* Campos Obrigatórios */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tema do Artigo *
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => handleInputChange('topic', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Digite o tema principal do artigo"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Descrição/Contexto *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
            placeholder="Descreva o contexto e detalhes do artigo"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Público-alvo *
          </label>
          <select
            value={formData.audience}
            onChange={(e) => handleInputChange('audience', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Selecione o público-alvo</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
            <option value="Geral">Geral</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Formato do Artigo *
          </label>
          <select
            value={formData.format}
            onChange={(e) => handleInputChange('format', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Selecione o formato</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Guia Completo">Guia Completo</option>
            <option value="FAQ">FAQ</option>
            <option value="Solução de Problemas">Solução de Problemas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Palavras-chave
          </label>
          <input
            type="text"
            value={formData.keywords}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Ex: auditoria, compliance, gestão"
          />
        </div>
      </div>

      {/* Configuração de Webhooks */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Configuração</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              URL Webhook Geração
            </label>
            <input
              type="url"
              value={webhookConfig.generateUrl}
              onChange={(e) => handleWebhookChange('generateUrl', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              URL Webhook Zendesk
            </label>
            <input
              type="url"
              value={webhookConfig.zendeskUrl}
              onChange={(e) => handleWebhookChange('zendeskUrl', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Botão Gerar */}
      <div className="mt-8">
        <button
          onClick={onGenerate}
          disabled={!isFormValid || isGenerating}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Gerando Artigo...
            </div>
          ) : (
            'Gerar Artigo'
          )}
        </button>
      </div>
    </div>
  );
};