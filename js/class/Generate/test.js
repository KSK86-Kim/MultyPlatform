import { Generate, GenerateForm } from './class/Generate/index.js';
import { log, getElement } from './helper/index.js';

const base = 'poasas';

const element = {
  tag: 'div',
  argm: {
    ki: 12,
    lo: 'asd',
    ap: false,
  },
  textContent: [
    { tag: 'a', textContent: 'ссылка' },
    { tag: 'a', textContent: 'ссылка-2' },
    {
      tag: 'img',
      argm: {
        src: 'https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg',
        alt: 'птичка',
        width: '400',
      },
    },
    { tag: 'a', textContent: base },
    { tag: 'form', textContent: 'ссылка' },
    { tag: 'forma1', textContent: 'ссылка' },
    { tag: 'input', textContent: 'ссылка', dataType: 'qwe' },
  ],
};

class card extends GenerateForm {
  constructor(path, elementJson) {
    super();

    this.url = getElement(path);
    this.url.innerHTML = this.generateElement(elementJson);
  }

  validationType = {
    ...this.validationType,
    qwe: 'zxc',
  };

  customGenerate({ tag, tagArgm, isContentArr, textContent }, item) {
    if (tag === 'forma1') {
      return `
        <form>
            ${isContentArr ? this.generateElements(textContent) : textContent}
            <button type="submit">submit</button>
        </form>
      `;
    }
    return super.customGenerate({ tag, tagArgm, isContentArr, textContent }, item);
  }
}

const generate = new card('[Generate]', element);
