function log(x) {
  console.log(x);
}

function generateElements(arr) {
  return arr.map(item => generateElement(item)).join(' ');
}

function generateElement(obj) {
  const { tag, argm, textContent } = obj;
  const tagArgm = ' (argm)';
  const isArrayTextContent = Array.isArray(textContent);

  if (tag === 'img' || tag === 'input') {
    return `<${tag}${tagArgm}/>`;
  }

  let content = isArrayTextContent ? generateElements(textContent) : textContent;

  if (tag === 'h') {
    const thisLevel = typeof this.level === 'number' ? this.level : 0;
    const objLevel = typeof obj.level === 'number' ? obj.level : 0;
    const combinedLevel = Math.min(thisLevel + objLevel, 6);
    const h = `h${combinedLevel}`;
    content = `<${h}${tagArgm}>${content}</${h}>`;
  } else {
    content = `<${tag}${tagArgm}>${content}</${tag}>`;
  }

  if (this._customGenerate) {
    const customResult = this.customGenerate({ tag, tagArgm, isArrayTextContent, textContent }, obj);
    if (customResult) {
      return content + customResult;
    }
  }

  return content;
}

const test = { tag: 'div', textContent: [{ tag: 'a', textContent: [{ tag: 'div', textContent: [{ tag: 'a', textContent: 'ссылка' }] }] }] };

log(generateElement(test));
