import React, { useState } from 'react';
import { FormSection } from './components/FormSection';
import { EditorSection } from './components/EditorSection';
import { Toast } from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateArticle, publishToZendesk } from './services/api';
import { ArticleFormData, WebhookConfig, LoadingStates, ErrorStates } from './types';

function App() {
  const [formData, setFormData] = useState<ArticleFormData>({
    topic: '',
    description: '',
    audience: '',
    format: '',
    keywords: '',
  });

  const [webhookConfig, setWebhookConfig] = useLocalStorage<WebhookConfig>('eauditoria-webhooks', {
    generateUrl: 'https://n8n.flap.studio/webhook/eauditoria/generate-content',
    zendeskUrl: 'https://n8n.flap.studio/webhook/eauditoria/send-zendesk',
  });

  const [content, setContent] = useState<string>('');
  
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    generating: false,
    publishing: false,
  });

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleGenerate = async () => {
    if (!webhookConfig.generateUrl) {
      showToast('Configure a URL do webhook de geração', 'error');
      return;
    }

    setLoadingStates(prev => ({ ...prev, generating: true }));
    
    try {
      const generatedContent = await generateArticle(formData, webhookConfig.generateUrl);
      setContent(generatedContent);
      showToast('Artigo gerado com sucesso!', 'success');
      
      // Scroll para o editor no mobile
      const editorSection = document.getElementById('editor-section');
      if (editorSection && window.innerWidth < 1024) {
        setTimeout(() => {
          editorSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido na geração';
      showToast(errorMessage, 'error');
    } finally {
      setLoadingStates(prev => ({ ...prev, generating: false }));
    }
  };

  const handlePublish = async () => {
    if (!webhookConfig.zendeskUrl) {
      showToast('Configure a URL do webhook do Zendesk', 'error');
      return;
    }

    if (!content.trim()) {
      showToast('Não há conteúdo para publicar', 'error');
      return;
    }

    setLoadingStates(prev => ({ ...prev, publishing: true }));

    try {
      const payload = {
        ...formData,
        content: content,
        final_article: content,
      };

      await publishToZendesk(payload, webhookConfig.zendeskUrl);
      showToast('Artigo publicado no Zendesk com sucesso!', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido na publicação';
      showToast(errorMessage, 'error');
    } finally {
      setLoadingStates(prev => ({ ...prev, publishing: false }));
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      showToast('Artigo copiado para a área de transferência', 'success');
    } catch (error) {
      showToast('Erro ao copiar artigo', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="https://www.e-auditoria.com.br/wp-content/uploads/2022/02/logo-eauditoria-branco.png" 
                alt="e-Auditoria" 
                className="h-8 mr-3"
              />
              <div>
                <h1 className="text-xl font-bold text-white">
                  Gerador de Artigos e-Auditoria
                </h1>
                <p className="text-sm text-gray-300">
                  Base de Conhecimento Zendesk
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)]">
          {/* Form Section */}
          <div className="lg:w-2/5 lg:h-full lg:overflow-y-auto">
            <FormSection
              formData={formData}
              webhookConfig={webhookConfig}
              isGenerating={loadingStates.generating}
              onFormChange={setFormData}
              onWebhookConfigChange={setWebhookConfig}
              onGenerate={handleGenerate}
            />
          </div>

          {/* Editor Section */}
          <div id="editor-section" className="lg:w-3/5 min-h-[calc(100vh-20rem)] lg:h-full">
            <EditorSection
              content={content}
              isPublishing={loadingStates.publishing}
              hasContent={!!content.trim()}
              onContentChange={setContent}
              onCopy={handleCopy}
              onPublish={handlePublish}
            />
          </div>
        </div>
      </main>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;