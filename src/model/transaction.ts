interface Transaction {
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
