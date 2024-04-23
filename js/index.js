import { Generate, GenerateForm, MultyPlatform, MultyCard } from './class/index.js';
import { log, getElement } from './helper/index.js';

const element = {
  tag: 'div',
  argm: {
    ki: 12,
    lo: 'asd',
    ap: false,
  },
  textContent: [
    { tag: 'h', textContent: 'это h' },
    {
      tag: 'section',
      textContent: [
        {
          tag: 'h',
          level: 1,
          textContent: [
            {
              tag: 'section',
              textContent: [
                {
                  tag: 'h',
                  level: 2,
                  textContent: [
                    {
                      tag: 'section',
                      textContent: [
                        {
                          tag: 'h',
                          level: 3,
                          textContent: [
                            {
                              tag: 'section',
                              textContent: [
                                {
                                  tag: 'h',
                                  level: 4,
                                  textContent: [
                                    {
                                      tag: 'section',
                                      textContent: [{ tag: 'h', level: 5, textContent: [] }],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      tag: 'section',
      textContent: [{ tag: 'h', level: 5, textContent: 'это h', dataType: 'qwe' }],
    },
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
    { tag: 'a', textContent: 'base' },
    { tag: 'form', textContent: 'ссылка' },
    { tag: 'forma1', textContent: 'ссылка' },
    { tag: 'input', textContent: 'ссылка', dataType: 'qwe' },
    { tag: 'op', textContent: 'op', dataType: 'qwe' },
  ],
};

const frames1 = {
  type: 'info',
  title: 'form example - 1',
  frameIsArticle: true,
  contents: [element],
};
const frames2 = {
  type: 'info',
  title: 'form example - 2',
  frameIsArticle: true,
  contents: [element],
};
const frames3 = {
  type: 'info',
  title: 'form example - 3',
  frameIsArticle: true,
  contents: [element],
};

const option = {
  pathID: 'MultyPlatform',
  jsonFrames: [frames1, frames2, frames3],
};
const generate = new MultyPlatform(option);
