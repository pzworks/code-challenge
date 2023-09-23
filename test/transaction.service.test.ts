import {expect} from 'chai';
import {describe, it} from 'mocha';
import sinon from 'sinon';
import {TransactionService} from '../src/services/transaction.service';
import {TransactionRepository} from '../src/repositories/transaction.repository';

const repositoryMock = {
  getTransactionsFrom: async (source: string | null) => {
    return [
      {
        id: '1',
        created: '2023-09-20',
        description: 'Purchase',
        amount: { value: '100', currency: 'EUR' },
        type: 'DEBIT',
        reference: 'SEPA-123',
        metadata: { source: source },
      },
    ];
  }
}


describe('TransactionService', () => {
  it('should call for Revolut data from TransactionRepository', () => {
    const repository = repositoryMock as TransactionRepository;
    const getRevolutSpy = sinon.spy(repository, 'getTransactionsFrom');
    const service = new TransactionService(repository);

    service.collectTransactions('revolut');

    expect(getRevolutSpy.calledOnce).to.be.true;
    expect(getRevolutSpy.calledOnceWith('revolut')).to.be.true;

    getRevolutSpy.restore();
  });

  it('should call for Monzo data from TransactionRepository', () => {
    const repository = repositoryMock as TransactionRepository;
    const getRevolutSpy = sinon.spy(repository, 'getTransactionsFrom');
    const service = new TransactionService(repository);

    service.collectTransactions('monzo');

    expect(getRevolutSpy.calledOnce).to.be.true;
    expect(getRevolutSpy.calledOnceWith('monzo')).to.be.true;

    getRevolutSpy.restore();
  });

  it('should call for Sterling data from TransactionRepository', () => {
    const repository = repositoryMock as TransactionRepository;
    const getRevolutSpy = sinon.spy(repository, 'getTransactionsFrom');
    const service = new TransactionService(repository);

    service.collectTransactions('sterling');

    expect(getRevolutSpy.calledOnce).to.be.true;
    expect(getRevolutSpy.calledOnceWith('sterling')).to.be.true;

    getRevolutSpy.restore();
  });

  it('should call for data from all APIs', async () => {
    const repository = repositoryMock as TransactionRepository;
    const getRevolutSpy = sinon.spy(repository, 'getTransactionsFrom');
    const service = new TransactionService(repository);

    await service.collectTransactions(null);

    expect(getRevolutSpy.callCount).to.be.equal(3);
    expect(getRevolutSpy.calledWith('revolut')).to.be.true;
    expect(getRevolutSpy.calledWith('sterling')).to.be.true;
    expect(getRevolutSpy.calledWith('monzo')).to.be.true;

    getRevolutSpy.restore();
  });

  it('should collect transactions from all accepted sources', async () => {
    const transactionService = new TransactionService(repositoryMock as TransactionRepository);
    const selectedSource = null;

    const collectedTransactions = await transactionService.collectTransactions(selectedSource);

    expect(collectedTransactions).to.be.an('array');
    expect(collectedTransactions).to.have.lengthOf.at.least(1);
  });

  it('should collect transactions from a selected source', async () => {
    const transactionService = new TransactionService(repositoryMock as TransactionRepository);
    const selectedSource = 'revolut';

    const collectedTransactions = await transactionService.collectTransactions(selectedSource);

    expect(collectedTransactions).to.be.an('array');
    expect(collectedTransactions).to.have.lengthOf.at.least(1);
  });

});
