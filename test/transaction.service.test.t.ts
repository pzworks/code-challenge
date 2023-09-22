import {expect} from 'chai';
import {describe, it} from 'mocha';
import sinon from 'sinon';
import {TransactionService} from '../src/services/transaction.service';
import {TransactionRepository} from '../src/repositories/transaction.repository';

describe('TransactionService', () => {
  it('should call getRevolut from TransactionRepository', () => {
    const repository = new TransactionRepository();
    const getRevolutSpy = sinon.spy(repository, 'getFromRevolut');
    const service = new TransactionService(repository);

    service.getTransactions();

    expect(getRevolutSpy.calledOnce).to.be.true;

    getRevolutSpy.restore();
  });
});





