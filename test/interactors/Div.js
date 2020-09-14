import { createInteractor } from '@bigtest/interactor';

export default createInteractor('div')({
  selector: 'div',
  defaultLocator: element => element.textContent,
  locators: {
    findByAttribute: element => element.getAttributeNames().find(attr => /data-test/.exec(attr)),
    findById: element => element.id
  },
  filters: {
    value: element => element.textContent
  }
});
