export interface Quote {
  category: string;
  author: string;
  quoteText: string;
}

export interface ApiQuote extends Quote {
  id: string;
}

export interface ApiQuotes {
  [id: string]: ApiQuote;
}

export interface Category {
  title: string;
  id: string;
}
