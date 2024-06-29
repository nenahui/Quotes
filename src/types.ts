export interface Quote {
  category?: string;
  author: string;
  quoteText: string;
}

export interface ApiQuote extends Quote {
  id: string;
}
