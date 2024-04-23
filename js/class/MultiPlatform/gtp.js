import { log, getElement, getElementAll, nanoid, animateText } from '../../helper/index.js';
import { Generate, GenerateForm } from '../Generate/index.js';

export class MultyPlatform extends Generate {
  level = 2;

  intermediateStorage = {
    skin: ['basic'],
    title: '',
    framesTHML: [],
    controlTHML: [],
    framesInline: [],
  };

  // *auxiliary memory

  constructor({ pathID, jsonFrames }) {
    super();
    this._customGenerate = true;
    this._domElement = pathID && document.getElementById(pathID);

    this.intermediateStorage.jsonFrames = jsonFrames;
    this.getInlineSetting();
  }

  /////////////////////////

  getInlineSetting() {
    let { framesInline } = this.intermediateStorage;

    framesInline = [...getElementAll('[frame]', this._domElement)];
  }
}

//////////////

// import { log, getElement, getElementAll, nanoid, animateText } from '../../helper/index.js';
// import { Generate, GenerateForm } from '../Generate/index.js';

// export class MultyPlatform extends Generate {
//   level = 2;

//   intermediateStorage = {
//     skin: ['basic'],
//     title: '',
//     framesTHML: [],
//     controlTHML: [],
//     framesInline: [],
//   };

//   // *auxiliary memory

//   constructor({ pathID, jsonFrames }) {
//     super();
//     this._customGenerate = true;
//     this._domElement = pathID && document.getElementById(pathID);

//     if (!this._domElement) {
//       console.error('Не могу продолжить инизацизация MultyPlatform - не найден элемент с таким id');
//       return;
//     }

//     this.intermediateStorage.jsonFrames = jsonFrames;
//     this.getInlineSetting();
//     /////////////////

//     // this._domElement.innerHTML = this.generateAll(jsonFrames);

//     log(this);
//   }

//   /////////////////////////

//   getInlineSetting() {
//     let { framesInline, skin, title } = this.intermediateStorage;
//     const { dataset } = this._domElement;

//     // this.asd = [...getElementAll('[frame]', this._domElement)];
//     // log(getElementAll('[frame]', this._domElement));
//     framesInline = [...getElementAll('[frame]', this._domElement)];
//     skin = dataset.skin ? dataset.skin : skin;
//     this.level = dataset.level ? Number(dataset.level) : this.level;
//     title = getElement(`h${this.level}`, this._domElement)?.outerHTML || title;
//   }

//   validationType = {
//     name: 'text',
//     age: 'number',
//   };

//   customGenerate({ tag, tagArgm, isContentArr, textContent }, item) {
//     if (tag === 'form') {
//       const { nameForm } = item;
//       return `
//         <form nameForm="${nameForm}"${tagArgm}>
//         ${isContentArr ? this.generateElements(textContent) : textContent}
//         <button type="submit">submit</button>
//         </form>
//         `;
//     }
//     if (tag === 'input') {
//       const { dataType } = item;
//       let type = this.validationType[dataType];
//       return `
//               <div class="inputBox"${tagArgm}>
//                 <input id="${nanoid(12)}" type=${type} placeholder=" "  />
//                 <label for="${nanoid(12)}">${animateText(textContent)}</label>
//               </div>
//       `;
//     }
//   }
// }
