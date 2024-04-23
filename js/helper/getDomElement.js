import { logRun, log } from './console.js';

export function getElement(key, dom = document) {
  logRun(`getElement() , key: ${key}`);
  // log(dom);
  return dom.querySelector(key);
}

export function getElementAll(key, dom = document) {
  logRun(`getElementAll(), key: ${key}`);
  // log(dom);
  return dom.querySelectorAll(key);
}
