import ElementCreator from '../element-creator';
import './style.css';

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

class InputColor extends ElementCreator {
  constructor(params: ElementParams) {
    super(params);
  }

  override createElement(): void {
    const params: Partial<ElementParams> = {
      tag: 'input',
      classNames: [InputFieldCssClasses.CONTAINER],
      textContent: ''
    };

    params.elementAttributes = { type: 'color' };

    super.createElement(params as ElementParams);
  }
}

export default InputColor;
