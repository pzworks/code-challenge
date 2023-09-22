export interface Transaction {
  id: string
  created: string // ISO8601 date format
  description: string
  amount: {
    value: string
    currency: string // Currency code, e.g., EUR, USD
  }
  type: 'DEBIT' | 'CREDIT'
  reference: string
  metadata: {
    source: string // Source bank
  }
}

export interface MonzoTransaction {
  id: string;
  created: string;
  description: string;
  amount: number;
  currency: string;
  metadata: {
    reference: string;
  };
}

export interface RevolutTransaction {
  id: string;
  created_at: string;
  completed_at: string;
  state: string;
  amount: {
    value: string;
    currency: string;
  };
  merchant: null | string;
  counterparty: {
    id: string;
    name: string;
  };
  reference: string;
}

export interface SterlingTransaction {
  id: string;
  currency: string;
  amount: string;
  direction: "IN" | "OUT";
  narrative: string;
  created: string;
  reference: string;
}
