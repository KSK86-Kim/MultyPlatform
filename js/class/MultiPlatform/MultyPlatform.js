import { log, getElement, getElementAll, nanoid, animateText, createKey } from '../../helper/index.js';
import { Generate, GenerateForm } from '../Generate/index.js';

export class MultyPlatform extends Generate {
  level = 2;
  url = {
    domElement: null,
    content: null,
    control: null,
    controlFramesList: null,
    modal: null,
    wrapper: null,
    frames: {},
  };

  _intermediateStorage = {
    skin: 'basic',
    title: '',
    framesTHML: null,
    controlTHML: null,
    framesInline: null,
    jsonFrames: null,
  };

  multyOption = {
    height: function () {
      this.url.wrapper.classList.toggle('trueHeightAuto');
    },
    modal: function () {
      this.handlerOpenModal();
    },
  };

  // _customGenerate = true;
  constructor({ pathID, jsonFrames }) {
    super();
    this.url.domElement = pathID && document.getElementById(pathID);

    if (!this.url.domElement) {
      console.error('Не могу продолжить инизацизация MultyPlatform - не найден элемент с таким id');
      return;
    }

    this._intermediateStorage.jsonFrames = jsonFrames;
    this.startMultyPlatform();

    log(this);
  }

  startMultyPlatform() {
    this.getInlineSetting();
    this.renderCard();
    this.initUrlShellElements();
    this.initControlEvent();
    this.initFrames();

    this.clearingСlass();

    this.handlerOpenModal = this.handlerOpenModal.bind(this);
    this.addEventModal = this.addEventModal.bind(this);
  }

  clearingСlass() {
    // delete this._intermediateStorage;
    delete MultyPlatform.prototype.startMultyPlatform;
    delete MultyPlatform.prototype.getInlineSetting;
    delete MultyPlatform.prototype.renderCard;
    delete MultyPlatform.prototype.generateMultyPlatformTemplate;
    delete MultyPlatform.prototype.reGenerateInlineTHML;
    delete MultyPlatform.prototype.generateInlineControlBtns;
    delete MultyPlatform.prototype.initUrlShellElements;
    delete MultyPlatform.prototype.initFrames;
    delete MultyPlatform.prototype.initControlEvent;
    delete MultyPlatform.prototype.clearingСlass;
  }

  getInlineSetting() {
    const {
      dataset: { level, skin },
    } = this.url.domElement;
    this.level = level ? Number(level) : this.level;

    this._intermediateStorage.framesInline = [...getElementAll('[frame]', this.url.domElement)];

    this._intermediateStorage.skin = skin ? (skin === 'none' || skin === 'false' ? null : skin) : this._intermediateStorage.skin;
    this._intermediateStorage.title = getElement(`h${this.level}`, this.url.domElement)?.outerHTML || this._intermediateStorage.title;
  }

  renderCard() {
    this.url.domElement.innerHTML = this.generateMultyPlatformTemplate();
  }

  initUrlShellElements() {
    this.url.content = getElement('[muiltyContent]', this.url.domElement);
    this.url.control = getElement('[muiltyControl]', this.url.domElement);
    this.url.controlWrapperLists = getElement('.control--wrapper__lists', this.url._control);
    this.url.controlFramesList = getElement('.control-frames--list', this._control);
    this.url.controlOptionList = getElement('.control-option--list', this._control);
    this.url.wrapper = getElement('[muiltyWrapper]', this.url.domElement);
    this.url.modal = getElement('[muiltyModal]', this.url.domElement);
    this.url.modalWrapper = getElement('.muiltyModal--wrapper', this.modal);
    this.url.modalContent = getElement('.muiltyModal--content', this.modal);
  }

  generateMultyPlatformTemplate() {
    const { jsonFrames, skin } = this._intermediateStorage;

    const inlineContentElementsInline = this.reGenerateInlineTHML() || '';
    const inlineControlElementsInline = this.generateInlineControlBtns() || '';
    const [jsonContentElements, jsonControlElements] = jsonFrames ? this.preGenerateFrame(jsonFrames) : ['', ''];

    const classWrapper = skin ? `class="${skin}"` : '';

    const buttonMenu = this.generateButtonWithIcon('toggleOption', '../img/svg/sprite.svg#icon-menu');
    const buttonSettings = this.generateButtonWithIcon('toggleSetting', '../img/svg/sprite.svg#icon-settings');

    return `<div muiltyWrapper ${classWrapper}>

                <div muiltyContent>
                    ${this._intermediateStorage.title}
                    ${inlineContentElementsInline}
                    ${jsonContentElements}
                    
                
                </div>

                <div muiltyControl>
                    <div class="auxiliary-control--wrapper">
                        ${buttonMenu}
                        ${buttonSettings}
                    </div>
            
                    <div class="control--wrapper__lists">
                        <ul class="control-frames--list">
                              ${inlineControlElementsInline}
                              ${jsonControlElements}
                        </ul>
                        <ul class="control-option--list">
                              ${this.schemaOptionlLiBtn('height')}
                              ${this.schemaOptionlLiBtn('modal')}
                        </ul>
                    </div>
                </div>


                <div muiltyModal aria-hidden="true">
                    <div class="muiltyModal--wrapper">
                        <div class="muiltyModal--content">
                        </div>
                    </div>
                </div>
            </div>
          `;
  }

  reGenerateInlineTHML() {
    this._intermediateStorage.framesInline.forEach(frame => {
      frame.setAttribute('frame', createKey(frame.getAttribute('frame')));
    });

    return this._intermediateStorage.framesInline.map(item => item.outerHTML).join('');
  }

  generateInlineControlBtns() {
    return this._intermediateStorage.framesInline
      .map(item => {
        const linkage = item.getAttribute('frame');
        return this.schemaControlLiBtn(linkage);
      })
      .join('');
  }

  schemaControlLiBtn(linkage) {
    return `<li  class="card-control__item-btn" for="${linkage}">
                  <button data-linkage="${linkage}" data-action="get"  type="button" class="control__btn control__btn--get">
                    <svg class="full-width-height">
                        <use href="../img/svg/sprite.svg#control--btn"></use>
                    </svg>
                  </button>
                       <button data-linkage="${linkage}" data-action="del"  type="button" class="control__btn control__btn--get">
                    <svg class="full-width-height">
                        <use href="../img/svg/sprite.svg#control--btn"></use>
                    </svg>
                  </button>

            </li>`;
  }

  schemaOptionlLiBtn(action) {
    return `<li  class="card-control__item-btn">
                  <button  data-action="${action}"  type="button">
                    ${action}
                  </button>
            </li>`;
  }

  generateButtonWithIcon(action, iconPath) {
    return `
      <button type="button" class="control__btn" data-action="${action}">
        <svg class="full-width-height">
          <use href="${iconPath}"></use>
        </svg>
      </button>
    `;
  }

  preGenerateFrame(Arr_Obj) {
    return Array.isArray(Arr_Obj) ? this.generateFramesAndControls(Arr_Obj) : this.generateFramesAndControl(Arr_Obj);
  }

  generateFramesAndControls(jsonFrames) {
    const [contents, controls] = jsonFrames.reduce(
      (acc, jsonFrame) => {
        const [frameHTML, controlBtnHTML] = this.generateFramesAndControl(jsonFrame);
        if (frameHTML && controlBtnHTML) {
          acc[0].push(frameHTML);
          acc[1].push(controlBtnHTML);
        }
        return acc;
      },
      [[], []]
    );

    return [contents.join(' '), controls.join(' ')];
  }

  generateFramesAndControl(jsonFrame) {
    const frame = createKey(jsonFrame.title);

    if (!frame) {
      console.error(`Не возможно создать Frame and Control title: ${jsonFrame.title}`);
      console.error(jsonFrame);
    }

    const content = frame ? this.generateFrameTemplate(jsonFrame, frame) : '';
    const control = frame ? this.schemaControlLiBtn(frame) : '';

    return [content, control];
  }

  generateFrameTemplate(frameJson, frame) {
    const { title, frameIsArticle = false, contents } = frameJson;
    const isArticleFrame = frameIsArticle ? 'article' : 'section';
    const titleElement = `<h${this.level + 1}>${title}</h${this.level + 1}>`;
    const contentElements = this.generateAll(contents);
    return `
        <${isArticleFrame} frame="${frame}">

          ${titleElement}
          ${contentElements}

        </${isArticleFrame}>
    `;
  }

  initFrames() {
    getElementAll('[frame]', this.url.content).forEach(item => {
      this.url.frames[item.getAttribute('frame')] = item;
    });
  }

  initControlEvent() {
    getElement('[data-action="toggleSetting"]', this.url.control).addEventListener('click', this.visibleSetting.bind(this));
    this.url.controlFramesList.addEventListener('click', this.handleControlFrameClick.bind(this));
    this.url.controlOptionList.addEventListener('click', this.handleControlOptionClick.bind(this));
  }

  handleControlFrameClick(event) {
    const controlElement = event.target.closest('[data-linkage]');
    if (!controlElement) return;

    const { action, linkage } = controlElement.dataset;

    switch (action) {
      case 'get':
        this.visibleFrame(linkage);
        return;
      case 'del':
        this.deleteFrame(linkage);
        return;
      default:
        log(`Не известный action key: ${action}`);
        return;
    }
  }

  handleControlOptionClick(event) {
    const { action } = event.target.dataset;

    const optionFunction = this.multyOption[action];
    if (typeof optionFunction === 'function') {
      optionFunction.call(this);
    } else {
      console.log(`Не известный action key: ${action}`);
    }
  }

  deleteFrame(linkage) {
    this.url.frames[linkage].outerHTML = '';
    delete this.url.frames[linkage];
    getElement(`[for="${linkage}"]`, this.controlFramesList).outerHTML = '';
  }

  visibleFrame(linkage) {
    this.url.frames[linkage].classList.toggle('visible');
  }

  visibleSetting() {
    this.url.controlWrapperLists.classList.toggle('visible');
  }

  toggleModal() {
    this.url.wrapper.classList.toggle('modal');
  }
  handlerOpenModal() {
    this.toggleModal();
    this.url.modalWrapper.addEventListener('click', this.addEventModal);
  }

  addEventModal({ currentTarget, target }) {
    if (currentTarget === target) {
      this.toggleModal();
      this.url.modalWrapper.removeEventListener('click', this.addEventModal);
    }
  }
}
