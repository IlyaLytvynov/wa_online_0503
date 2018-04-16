/**
 * @param {HTMLElement} widgetElement Елемент куда вставляем содержимое меню
 * @param {Array} optionsList
 * */
function dropdown(widgetElement, optionsList) {
  let isOpened = widgetElement.classList.contains('opened');
  let titleEl;

  function close() {
    isOpened = false;
    widgetElement.classList.remove('opened');
    document.removeEventListener('click', close);
  }

  function open() {
    isOpened = true;
    widgetElement.classList.add('opened');
    document.addEventListener('click', close);
  }

  function toggle(e) {
    e.stopPropagation();

    if (isOpened) {
      close();
      setTitle(e.target.textContent);
    } else {
      open();
    }
  }

  function setTitle(text) {
    titleEl.textContent = text;
  }

  function renderTitle() {
    titleEl = document.createElement('div');

    titleEl.classList.add('dropdown__title');
    titleEl.textContent = optionsList[0];
    titleEl.tabIndex = 0;
    widgetElement.appendChild(titleEl);
  }

  function renderOptions() {
    const optionsEl = document.createElement('ul');

    optionsEl.classList.add('dropdown__options');
    optionsList.forEach(
      (optionText) => {
        const optionEl = document.createElement('li');

        optionEl.classList.add('dropdown__option');
        optionEl.tabIndex = 0;
        optionEl.textContent = optionText;

        optionsEl.appendChild(optionEl);
      }
    );
    widgetElement.appendChild(optionsEl);
  }

  function renderWidget() {
    widgetElement.classList.add('dropdown');
    renderTitle();
    renderOptions();
  }

  function attachEvents() {
    widgetElement.addEventListener('click', (e) => {
      toggle(e);
    });

    widgetElement.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        toggle(e);
      }
    });
  }

  function init() {
    renderWidget();
    attachEvents();
  }

  init();
}

const moviesList = ['Shrek', 'Lost', 'Star Wars', 'Avengers'];
const countries = ['USA', 'Germany', 'Ukraine'];
const categories = [
  {
    title: 'Фильмы',
    content: 'lorem asdasdas'
  },
  {
    title: 'Мультфильмы',
    content: 'lorem asdasdas'
  },
  {
    title: 'Избранное',
    content: 'lorem asdasdas'
  }
];

dropdown(document.querySelector('#moviesDropdownMenu'), moviesList);
dropdown(document.querySelector('#countriesDropdownMenu'), countries);

/**
 * 1. Html+css
 * 2. Создание функции которая реализовывает алгоритм открытия закрытия акоордеона
 * 3. Реализация динамического создания элемента.
 * */


const div = document.createElement('div');
div.classList.add('btn');
rootelemnent.appendChild(div);
