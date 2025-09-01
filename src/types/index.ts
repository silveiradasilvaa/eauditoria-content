export interface ArticleFormData {
  topic: string;
  description: string;
  audience: string;
  format: string;
  keywords: string;
}

export interface WebhookConfig {
  generateUrl: string;
  zendeskUrl: string;
}

export interface ZendeskPayload extends ArticleFormData {
  content: string;
  final_article: string;
}

export interface LoadingStates {
  generating: boolean;
  publishing: boolean;
}

export interface ErrorStates {
  generation: string | null;
  publishing: string | null;
}

export interface ZendeskArticle {
  id: number;
  html_url: string;
  title: string;
  draft: boolean;
}

export interface ZendeskResponse {
  article: ZendeskArticle;
}