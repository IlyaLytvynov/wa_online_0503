import { slideshow } from './scripts/slideshow';
import { lighter } from './scripts/lighter';
import { openModal } from './scripts/modal-window';

import './lesson-12.scss';

lighter(document.querySelector('#myLighter'), 1000);
lighter(document.querySelector('#myLighter2'), 4000);
slideshow(document.querySelector('#someSlideShow'));

setTimeout(() => {
    openModal({
      headerText: '<h1>TEST HEADER</h1>',
      bodyText: '2222',
      footerText: 'Footer'
    });
  },
  2000
)
;
