export interface LeadCaptureData {
  name: string;
  email: string;
  phone: string;
  projectDetails: string;
  serviceTier?: string;
}

export interface QuoteFormData {
  trade: string;
  timescale: string;
  prompt_reason: string;
  name: string;
  business: string;
  email: string;
  phone: string;
}

export interface QuoteEstimate {
  low: number;
  high: number;
  rangeText: string;
  items: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  pageSpeedBefore: number;
  pageSpeedAfter: number;
  keyMetric: string;
  keyResult?: string;
  turnaroundTime: string;
  features: string[];
  clientQuote: string;
  clientAuthor: string;
  accentColor: string;
  url?: string;
  imageSrc?: string;
}

export type CaseStudy = PortfolioProject;
