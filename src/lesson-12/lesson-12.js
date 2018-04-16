
import { slideshow } from './scripts/slideshow';
import { lighter } from './scripts/lighter';

import './lesson-12.scss';

lighter(document.querySelector('#myLighter'), 1000);
lighter(document.querySelector('#myLighter2'), 4000);
slideshow(document.querySelector('#someSlideShow'));