import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: () => faker.random.uuid(),
  title: () => faker.commerce.productName(),
  type: null,
  typeId: null,
  domain: 'users',
  content: faker.lorem.paragraph(),
  creator: {
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName()
  },
  metadata: {
    createdDate: () => faker.date.past(2),
    createdByUserId: () => faker.random.uuid(),
    createdByUsername: () => faker.name.firstName(),
    updatedByUserId: () => faker.random.uuid(),
    updatedDate: () => faker.date.past(1),
  },
  links: [],

  afterCreate(note, server) {
    const noteTypes = server.schema.noteTypes.all();

    if (!note.attrs.type && !note.attrs.typeId) {
      const randomNoteTypeIndex = faker.random.number({
        min: 0,
        max: noteTypes.length - 1
      });

      const randomNoteType = noteTypes.models[randomNoteTypeIndex];

      note.update({
        type: randomNoteType.attrs.name,
        typeId: randomNoteType.attrs.id,
      });

      randomNoteType.update({
        usage: {
          noteTotal: ++randomNoteType.attrs.usage.noteTotal
        }
      });
    } else {
      const noteType = server.schema.noteTypes.find(note.attrs.typeId);

      note.update({
        type: noteType.attrs.name,
        typeId: noteType.attrs.id,
      });

      noteType.update({
        usage: {
          noteTotal: ++noteType.attrs.usage.noteTotal
        }
      });
    }
    if (!note.links.length) {
      const records = server.schema.users.all();
      const randomRecordIndex = faker.random.number({
        min: 0,
        max: records.length - 1
      });

      note.update({
        links: [{
          id: records.models[randomRecordIndex].attrs.id,
          type: 'user'
        }]
      });
    }
  }
});
