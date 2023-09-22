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
  transformSterlingToTransaction, getTransformerBySource,
} from '../src/transformers/transaction.transformer';

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

describe('getTransformerBySource', () => {
  it('should return the correct transformer function name', () => {
    const testData = [
      { source: 'revolut', expectedFunctionName: 'transformRevolutToTransaction' },
      { source: 'monzo', expectedFunctionName: 'transformMonzoToTransaction' },
      { source: 'sterling', expectedFunctionName: 'transformSterlingToTransaction' },
    ];

    testData.forEach((data) => {
      const { source, expectedFunctionName } = data;
      const result = getTransformerBySource(source);

      expect(result).to.deep.equal([expectedFunctionName]);
    });
  });

  it('should handle source with mixed case', () => {
    const mixedCaseSource = 'ReVolUt';
    const expectedFunctionName = 'transformRevolutToTransaction';

    const result = getTransformerBySource(mixedCaseSource);

    expect(result).to.deep.equal([expectedFunctionName]);
  });

  it('should handle empty source', () => {
    const emptySource = '';
    const result = getTransformerBySource(emptySource);

    expect(result).to.equal(null);
  });
});
