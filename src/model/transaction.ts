export class Transaction {
  constructor(
    public id: string,
    public created: string,
    public description: string,
    public amount: { value: string; currency: string },
    public type: 'DEBIT' | 'CREDIT',
    public reference: string,
    public metadata: { source: string }
  ) {}
}

export class MonzoTransaction {
  constructor(
    public id: string,
    public created: string,
    public description: string,
    public amount: number,
    public currency: string,
    public metadata: { reference: string }
  ) {}
}

export class RevolutTransaction {
  constructor(
    public id: string,
    public created_at: string,
    public completed_at: string,
    public state: string,
    public amount: { value: string; currency: string },
    public merchant: null | string,
    public counterparty: { id: string; name: string },
    public reference: string
  ) {}
}

export class SterlingTransaction {
  constructor(
    public id: string,
    public currency: string,
    public amount: string,
    public direction: 'IN' | 'OUT',
    public narrative: string,
    public created: string,
    public reference: string
  ) {}
}
