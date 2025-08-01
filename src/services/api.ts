import { ArticleFormData, ZendeskPayload } from '../types';

export const generateArticle = async (
  data: ArticleFormData, 
  webhookUrl: string
): Promise<string> => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro na geração: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    // Se o resultado tem uma propriedade 'text', retorna apenas ela
    if (result && typeof result === 'object' && result.text) {
      return result.text;
    }
    
    // Se for uma string direta, retorna ela
    if (typeof result === 'string') {
      return result;
    }
    
    // Fallback: converte para string
    return JSON.stringify(result);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Erro de conexão. Verifique a URL do webhook e sua conexão com a internet.');
    }
    throw error;
  }
};

export const publishToZendesk = async (
  data: ZendeskPayload,
  webhookUrl: string  
): Promise<void> => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro na publicação: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Erro de conexão. Verifique a URL do webhook e sua conexão com a internet.');
    }
    throw error;
  }
};