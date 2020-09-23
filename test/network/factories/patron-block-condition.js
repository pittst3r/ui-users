import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: () => faker.random.uuid(),
  name: () => faker.lorem.sentence(),
  blockBorrowing: () => faker.random.boolean(),
  blockRenewals: () => false,
  blockRequests: () => false,
  valueType: 'Integer',
  message: () => faker.lorem.sentence(),
  metadata : {
    createdDate : () => faker.date.past(0.1, faker.date.past(0.1)).toString(),
    updatedDate : () => faker.date.past(0.1, faker.date.past(0.1)).toString(),
  }
});
