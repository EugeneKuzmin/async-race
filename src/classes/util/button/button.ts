import ElementCreator from '../element-creator.ts';
type attr = { type: string };

type ElementParams = {
  tag: string;
  classNames: string[];
  textContent: string;
  elementAttributes: attr;
  callback: () => void;
};

class Button {
  private button: HTMLElement | null;
  private callback: (() => void) | null;

  constructor(label: string, callback?: () => void) {
    this.button = null;
    this.callback = callback || null;
    this.createButton(label);
  }

  private createButton(label: string): void {
    const buttonParams: ElementParams = {
      tag: 'button',
      classNames: ['button'],
      textContent: label,
      elementAttributes: { type: '' },
      callback: () => {
        if (this.callback) {
          this.callback();
        }
      }
    };

    const buttonCreator = new ElementCreator(buttonParams);
    this.button = buttonCreator.getElement();
  }

  getButton(): HTMLElement | null {
    return this.button;
  }

  setCallback(callback: () => void): void {
    this.callback = callback;
  }
}

export default Button;
