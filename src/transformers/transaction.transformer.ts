import {
  Transaction,
  MonzoTransaction,
  RevolutTransaction,
  SterlingTransaction
} from '../model/transaction';

export function getTransformerBySource(source: string) {
  if (!source) {
    return null;
  }

  source = source.toLowerCase()
  source = source.charAt(0).toUpperCase() + source.slice(1);
  const functionName = `transform${source}ToTransaction`;

  return [functionName];
}

export function transformRevolutToTransaction(
  revolutTransaction: RevolutTransaction
): Transaction {
  return {
    id: revolutTransaction.id,
    created: revolutTransaction.created_at,
    description: '',
    amount: {
      value: revolutTransaction.amount.value,
      currency: revolutTransaction.amount.currency,
    },
    type: revolutTransaction.amount.value.charAt(0) === '-' ? 'DEBIT' : 'CREDIT',
    reference: revolutTransaction.reference,
    metadata: {
      source: 'Revolut',
    },
  };
}

export function transformMonzoToTransaction(
  monzoTransaction: MonzoTransaction
): Transaction {
  return {
    id: monzoTransaction.id,
    created: monzoTransaction.created,
    description: monzoTransaction.description,
    amount: {
      value: monzoTransaction.amount.toString(),
      currency: monzoTransaction.currency,
    },
    type: monzoTransaction.amount < 0 ? 'DEBIT' : 'CREDIT',
    reference: monzoTransaction.metadata.reference,
    metadata: {
      source: 'Monzo',
    },
  };
}

export function transformSterlingToTransaction(
  sterlingTransaction: SterlingTransaction
): Transaction {
  return {
    id: sterlingTransaction.id,
    created: sterlingTransaction.created,
    description: sterlingTransaction.narrative,
    amount: {
      value: sterlingTransaction.amount,
      currency: sterlingTransaction.currency,
    },
    type: sterlingTransaction.direction === 'OUT' ? 'DEBIT' : 'CREDIT',
    reference: sterlingTransaction.reference,
    metadata: {
      source: 'Sterling Bank',
    },
  };
}
