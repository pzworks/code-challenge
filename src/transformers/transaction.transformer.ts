import {MonzoTransaction, RevolutTransaction, SterlingTransaction, Transaction} from '../model/transaction';

export function getTransformedBySource(
  source: string,
  transaction: RevolutTransaction | MonzoTransaction | SterlingTransaction | null) {
  if (!source) {
    return null;
  }

  let transformedTransaction = null;

  switch (source) {
    case 'revolut':
      transformedTransaction = transformRevolutToTransaction(<RevolutTransaction>transaction)
      break
    case 'monzo':
      transformedTransaction = transformMonzoToTransaction(<MonzoTransaction>transaction)
      break
    case 'sterling':
      transformedTransaction = transformSterlingToTransaction(<SterlingTransaction>transaction)
      break
  }

  return transformedTransaction
}

export function transformRevolutToTransaction(
  revolutTransaction: RevolutTransaction
): Transaction {
  return new Transaction(
    revolutTransaction.id,
    revolutTransaction.created_at,
    '',
    {
      value: revolutTransaction.amount.value,
      currency: revolutTransaction.amount.currency,
    },
    revolutTransaction.amount.value.charAt(0) === '-' ? 'DEBIT' : 'CREDIT',
    revolutTransaction.reference,
    {
      source: 'Revolut',
    }
  )
}

export function transformMonzoToTransaction(
  monzoTransaction: MonzoTransaction
): Transaction {
  return new Transaction(
    monzoTransaction.id,
    monzoTransaction.created,
    monzoTransaction.description,
    {
      value: monzoTransaction.amount.toString(),
      currency: monzoTransaction.currency,
    },
    monzoTransaction.amount < 0 ? 'DEBIT' : 'CREDIT',
    monzoTransaction.metadata.reference,
    {
      source: 'Monzo',
    },
  )
}

export function transformSterlingToTransaction(
  sterlingTransaction: SterlingTransaction
): Transaction {
  return new Transaction(
    sterlingTransaction.id,
    sterlingTransaction.created,
    sterlingTransaction.narrative,
    {
      value: sterlingTransaction.amount,
      currency: sterlingTransaction.currency,
    },
    sterlingTransaction.direction === 'OUT' ? 'DEBIT' : 'CREDIT',
    sterlingTransaction.reference,
    {
      source: 'Sterling Bank',
    },
  )
}
