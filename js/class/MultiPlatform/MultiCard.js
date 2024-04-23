import { log, logRun, getElement, getElementAll, nanoid, animateText } from '../../helper/index.js';
import { MultyPlatform } from './index.js';

export class MultyCard extends MultyPlatform {
  constructor({ pathID, jsonFrames }) {
    super({ pathID, jsonFrames });
  }

  validationType = {
    name: 'text',
    age: 'number',
  };

  customGenerate({ tag, tagArgm, isContentArr, textContent }, item) {
    if (tag === 'form') {
      const { nameForm } = item;
      return `
        <form nameForm="${nameForm}"${tagArgm}>
        ${isContentArr ? this.generateElements(textContent) : textContent}
        <button type="submit">submit</button>
        </form>
        `;
    }
    if (tag === 'input') {
      const { dataType } = item;
      let type = this.validationType[dataType];
      return `
              <div class="inputBox"${tagArgm}>
                <input id="${nanoid(12)}" type=${type} placeholder=" "  />
                <label for="${nanoid(12)}">${animateText(textContent)}</label>
              </div>
      `;
    }
  }
}
