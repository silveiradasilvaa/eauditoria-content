import { ArticleFormData, ZendeskPayload, ZendeskResponse } from '../types';

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

    // Primeiro pega o texto da resposta
    const responseText = await response.text();
    
    // Tenta fazer parse do JSON
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      // Se não conseguir fazer parse, retorna o texto diretamente
      return responseText;
    }
    
    // Se o resultado é um array com objetos que têm 'data'
    if (Array.isArray(result) && result.length > 0 && result[0].data) {
      return result[0].data;
    }
    
    // Se o resultado tem uma propriedade 'data', retorna apenas ela
    if (result && typeof result === 'object' && result.data) {
      return result.data;
    }
    
    // Se o resultado tem uma propriedade 'text', retorna apenas ela
    if (result && typeof result === 'object' && result.text) {
      return result.text;
    }
    
    // Se for uma string direta, retorna ela
    if (typeof result === 'string') {
      return result;
    }
    
    // Fallback: retorna o texto original da resposta
    return responseText;
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
): Promise<ZendeskResponse> => {
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

    const responseText = await response.text();
    console.log('Resposta do Zendesk:', responseText); // Debug
    
    try {
      const result = JSON.parse(responseText);
      console.log('Resultado parseado:', result); // Debug
      
      // Se é um array com objetos que têm 'article'
      if (Array.isArray(result) && result.length > 0 && result[0].article) {
        return result[0];
      }
      
      // Se é um objeto direto com 'article'
      if (result && typeof result === 'object' && result.article) {
        return result;
      }
      
      console.error('Estrutura de resposta não reconhecida:', result);
      throw new Error('Formato de resposta inválido do Zendesk');
    } catch (parseError) {
      console.error('Erro ao fazer parse da resposta:', parseError);
      console.error('Texto da resposta:', responseText);
      throw new Error('Erro ao processar resposta do Zendesk');
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Erro de conexão. Verifique a URL do webhook e sua conexão com a internet.');
    }
    throw error;
  }
};