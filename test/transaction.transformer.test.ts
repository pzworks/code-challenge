import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  Transaction,
  MonzoTransaction,
  RevolutTransaction,
  SterlingTransaction,
} from '../src/model/transaction';

import {
  transformRevolutToTransaction,
  transformMonzoToTransaction,
  transformSterlingToTransaction, getTransformedBySource,
} from '../src/transformers/transaction.transformer';
import sinon from "sinon";

describe('Transform Functions', () => {
  describe('transformRevolutToTransaction', () => {
    it('should transform RevolutTransaction to Transaction', () => {
      const revolutTransaction: RevolutTransaction = {
        id: 'tx_123',
        created_at: '2022-01-01',
        amount: {
          value: '100.00',
          currency: 'EUR',
        },
        reference: 'REF123',
        merchant: null,
        counterparty: {
          id: 'cpty_456',
          name: 'John Doe',
        },
        completed_at: '2022-01-02',
        state: 'COMPLETED',
      };

      const transformedTransaction: Transaction = transformRevolutToTransaction(
        revolutTransaction
      );

      expect(transformedTransaction.id).to.equal(revolutTransaction.id);
      expect(transformedTransaction.created).to.equal(revolutTransaction.created_at);
      expect(transformedTransaction.description).to.equal('');
      expect(transformedTransaction.amount.value).to.equal(
        revolutTransaction.amount.value
      );
      expect(transformedTransaction.amount.currency).to.equal(
        revolutTransaction.amount.currency
      );
      expect(transformedTransaction.type).to.equal('CREDIT');
      expect(transformedTransaction.reference).to.equal(revolutTransaction.reference);
      expect(transformedTransaction.metadata.source).to.equal('Revolut');
    });
  });

  describe('transformMonzoToTransaction', () => {
    it('should transform MonzoTransaction to Transaction', () => {
      const monzoTransaction: MonzoTransaction = {
        id: 'tx_456',
        created: '2022-02-01',
        description: 'Purchase',
        amount: 50.0,
        currency: 'GBP',
        metadata: {
          reference: 'REF456',
        },
      };

      const transformedTransaction: Transaction = transformMonzoToTransaction(
        monzoTransaction
      );

      expect(transformedTransaction.id).to.equal(monzoTransaction.id);
      expect(transformedTransaction.created).to.equal(monzoTransaction.created);
      expect(transformedTransaction.description).to.equal(monzoTransaction.description);
      expect(transformedTransaction.amount.value).to.equal(
        monzoTransaction.amount.toString()
      );
      expect(transformedTransaction.amount.currency).to.equal(
        monzoTransaction.currency
      );
      expect(transformedTransaction.type).to.equal('CREDIT');
      expect(transformedTransaction.reference).to.equal(monzoTransaction.metadata.reference);
      expect(transformedTransaction.metadata.source).to.equal('Monzo');
    });
  });

  describe('transformSterlingToTransaction', () => {
    it('should transform SterlingTransaction to Transaction', () => {
      const sterlingTransaction: SterlingTransaction = {
        id: 'tx_789',
        currency: 'USD',
        amount: '75.00',
        direction: 'OUT',
        narrative: 'Payment',
        created: '2022-03-01',
        reference: 'REF789',
      };

      const transformedTransaction: Transaction = transformSterlingToTransaction(
        sterlingTransaction
      );

      expect(transformedTransaction.id).to.equal(sterlingTransaction.id);
      expect(transformedTransaction.created).to.equal(sterlingTransaction.created);
      expect(transformedTransaction.description).to.equal(sterlingTransaction.narrative);
      expect(transformedTransaction.amount.value).to.equal(
        sterlingTransaction.amount
      );
      expect(transformedTransaction.amount.currency).to.equal(
        sterlingTransaction.currency
      );
      expect(transformedTransaction.type).to.equal('DEBIT');
      expect(transformedTransaction.reference).to.equal(sterlingTransaction.reference);
      expect(transformedTransaction.metadata.source).to.equal('Sterling Bank');
    });
  });
});

const revolutTransaction: RevolutTransaction = {
  id: '1',
  created_at: '2023-09-20',
  completed_at: '2023-09-21',
  state: 'COMPLETED',
  amount: { value: '100', currency: 'EUR' },
  merchant: null,
  counterparty: { id: '2', name: 'John Doe' },
  reference: 'SEPA-123',
};

const monzoTransaction: MonzoTransaction = {
  id: '3',
  created: '2023-09-20',
  description: 'Purchase',
  amount: 50,
  currency: 'GBP',
  metadata: { reference: 'MONZO-456' },
};

const sterlingTransaction: SterlingTransaction = {
  id: '4',
  currency: 'USD',
  amount: '75',
  direction: 'OUT',
  narrative: 'Payment',
  created: '2023-09-20',
  reference: 'STERLING-789',
};

describe('getTransformedBySource', () => {
  it('should return null for empty source', () => {
    const source = '';
    const result = getTransformedBySource(source, null);

    expect(result).to.be.null;
  });

  it('should transform to Transaction for source "revolut"', () => {
    const source = 'revolut';
    const result = getTransformedBySource(source, revolutTransaction);

    expect(result).to.be.instanceOf(Transaction);
  });

  it('should transform to Transaction for source "monzo"', () => {
    const source = 'monzo';
    const result = getTransformedBySource(source, monzoTransaction);

    expect(result).to.be.instanceOf(Transaction);
  });

  it('should transform to Transaction for source "sterling"', () => {
    const source = 'sterling';
    const result = getTransformedBySource(source, sterlingTransaction);

    expect(result).to.be.instanceOf(Transaction);
  });

  it('should return null for unknown source', () => {
    const source = 'unknown';
    const result = getTransformedBySource(source, null);

    expect(result).to.be.null;
  });
});
