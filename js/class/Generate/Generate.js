// import { log, getElement } from '../../helper/index.js';

// export class Generate {
//   _customGenerate = false; // флаг для вкл/выкл обробочика кастомных тегов

//   generateAll(item) {
//     return Array.isArray(item) ? this.generateElements(item) : this.generateElement(item);
//   }
//   generateElements(arr) {
//     return arr.map(item => this.generateElement(item)).join(' ');
//   }

//   generateElement(obj) {
//     const { tag, argm, textContent } = obj;
//     const tagArgm = this.generatetagElement(argm);
//     const isArrayTextContent = Array.isArray(textContent);

//     if (this._customGenerate) {
//       let result;
//       if ((result = this.customGenerate({ tag, tagArgm, isArrayTextContent, textContent }, obj))) {
//         return result;
//       }
//     }

//     if (tag === 'img' || tag === 'input') {
//       return `<${tag}${tagArgm}/>`;
//     }

//     const content = isArrayTextContent ? this.generateElements(textContent) : textContent;

//     if (tag === 'h') {
//       return this.generateH(obj, tagArgm, content);
//     }

//     return `<${tag}${tagArgm}>${content}</${tag}>`;
//   }

//   generateH({ level = 0 }, tagArgm, content) {
//     const thisLevel = typeof this.level === 'number' ? this.level : 0;
//     const combinedLevel = Math.min(thisLevel + +level, 6);
//     const h = `h${combinedLevel}`;
//     return `<${h}${tagArgm}>${content}</${h}>`;
//   }

//   customGenerate({ tag, tagArgm, isContentArr, textContent }, item) {} // функция для перехва обробочика кастомных тегов

//   generatetagElement(argm) {
//     if (typeof argm !== 'object') {
//       return '';
//     }
//     const tagArgm = Object.entries(argm)
//       .map(([key, value]) => {
//         if (value) {
//           return `${key}="${value}"`;
//         }
//         return key;
//       })
//       .join(' ');
//     return tagArgm ? ` ${tagArgm}` : '';
//   }
// }

export class Generate {
  _customGenerate = false; // флаг для вкл/выкл обработчика кастомных тегов

  generateAll(item) {
    return Array.isArray(item) ? this.generateElements(item, '') : this.generateElement(item, '');
  }

  generateElements(arr, accumulator) {
    if (arr.length === 0) {
      return accumulator;
    } else {
      const [first, ...rest] = arr;
      return this.generateElements(rest, accumulator + this.generateElement(first, ''));
    }
  }

  generateElement(obj, accumulator) {
    const { tag, argm, textContent } = obj;
    const tagArgm = this.generatetagElement(argm);
    const isArrayTextContent = Array.isArray(textContent);

    if (this._customGenerate) {
      const customResult = this.customGenerate({ tag, tagArgm, isArrayTextContent, textContent }, obj);
      if (customResult) {
        return accumulator + customResult;
      }
    }

    if (tag === 'img' || tag === 'input') {
      return accumulator + `<${tag}${tagArgm}/>`;
    }

    const content = isArrayTextContent ? this.generateElements(textContent, '') : textContent;

    if (tag === 'h') {
      return accumulator + this.generateH(obj, tagArgm, content);
    }

    return accumulator + `<${tag}${tagArgm}>${content}</${tag}>`;
  }

  generateH({ level = 0 }, tagArgm, content) {
    const thisLevel = typeof this.level === 'number' ? this.level : 0;
    const combinedLevel = Math.min(thisLevel + +level, 6);
    const h = `h${combinedLevel}`;
    return `<${h}${tagArgm}>${content}</${h}>`;
  }

  customGenerate({ tag, tagArgm, isContentArr, textContent }, item) {} // функция для перехвата обработчика кастомных тегов

  generatetagElement(argm) {
    if (typeof argm !== 'object') {
      return '';
    }
    const tagArgm = Object.entries(argm)
      .map(([key, value]) => {
        if (value) {
          return `${key}="${value}"`;
        }
        return key;
      })
      .join(' ');
    return tagArgm ? ` ${tagArgm}` : '';
  }
}
