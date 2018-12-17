import title from './partials/_title.md';
import intro from './partials/_intro.md';
import contentImage from './partials/_content-image.md';
import content from './partials/_content.md';
import Card from './js/base';

const christmasCard = new Card();
document.querySelector('.message__title').innerHTML = title;
document.querySelector('.message__intro').innerHTML = intro;
document.querySelector('.message__caption').innerHTML = contentImage;
document.querySelector('.message__content').innerHTML = content;