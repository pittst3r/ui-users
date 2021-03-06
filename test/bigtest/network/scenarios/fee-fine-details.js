/* istanbul ignore file */
import CQLParser from '../cql';

export default (server) => {
  const user = server.create('user', { id: 'ce0e0d5b-b5f3-4ad5-bccb-49c0784298fd' });
  server.create('account', { userId: user.id });
  const loan = server.create('loan', {
    id: '8e9f211b-6024-4828-8c14-ace39c6c2863',
    userId: user.id,
    overdueFinePolicyId: () => 'a6130d37-0468-48ca-a336-c2bde575768d',
    lostItemPolicyId: () => '48a3115d-d476-4582-b6a8-55c09eed7ec7',
    overdueFinePolicy: {
      name: () => 'Overdue Fine Policy name',
    },
    lostItemPolicy: {
      name: () => 'Lost Item Policy name',
    },
  });
  server.createList('account', 3, { userId: user.id });
  server.create('account', {
    userId: user.id,
    status: {
      name: 'Open',
    },
    amount: 100,
    remaining: 100,
    loanId: loan.id,
  });
  server.create('account', {
    userId: user.id,
    status: {
      name: 'Closed',
    },
    amount: 0,
    remaining: 0
  });
  server.get('/accounts');
  server.get('/accounts/:id', (schema, request) => {
    return schema.accounts.find(request.params.id).attrs;
  });
  server.get('/loans');

  server.post('/loans', (schema, request) => {
    const body = JSON.parse(request.requestBody);

    return schema.feefineactions.create(body);
  });

  server.get('/loans', (schema, request) => {
    const url = new URL(request.url);
    const cqlQuery = url.searchParams.get('query');

    if (cqlQuery != null) {
      const cqlParser = new CQLParser();
      cqlParser.parse(cqlQuery);

      if (cqlParser.tree.term) {
        return schema.feefineactions.where({
          accountId: cqlParser.tree.term
        });
      }
    }

    return schema.feefineactions.all();
  });

  server.get('/loans/:id', (schema, request) => {
    return schema.loans.find(request.params.id);
  });
};
