import ElementCreator from '../element-creator';

type cssClasses = {
  CONTAINER: string;
};

const InputFieldCssClasses: cssClasses = {
  CONTAINER: 'input-container'
};

type attr = { type: string };

type ElementParams = {
  tag: string;
  classNames: string[];
  textContent: string;
  elementAttributes: attr;
  callback: () => void;
};

class InputText extends ElementCreator {
  constructor(params: ElementParams) {
    super(params);
  }

  override createElement(): void {
    const params: Partial<ElementParams> = {
      tag: 'input',
      classNames: [InputFieldCssClasses.CONTAINER],
      textContent: ''
    };

    super.createElement(params as ElementParams);
  }
}

export default InputText;
