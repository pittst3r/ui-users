import { createInteractor, perform } from '@bigtest/interactor';

export default createInteractor('select')({
  selector: 'select',
  defaultLocator: element => element.labels[0].textContent,
  actions: {
    select: perform((element, value) => {
      const options = Array.from(element.options);
      const desiredOption = options.find(opt => opt.text === value);

      element.value = desiredOption.value;
      desiredOption.selected = true;
      element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      element.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    })
  }
});
