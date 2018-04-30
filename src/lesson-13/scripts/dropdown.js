import './dropdown.scss';

export class DropDown {
  constructor(widgetElement, optionsList) {
    this.widgetElement = widgetElement;
    this.optionsList = optionsList;
    this.isOpened = widgetElement.classList.contains('opened');
    this.titleEl = undefined;
    this.init();
  }


  toggle(e) {
    e && e.stopPropagation();
    if (this.isOpened) {
      this.close();
      this.setTitle((e && e.target.textContent) || this.titleEl.textContent);
    } else {
      this.open();
    }
  }

  close() {
    this.isOpened = false;
    this.widgetElement.classList.remove('opened');
    document.removeEventListener('click', close);
  }

  open() {
    this.isOpened = true;
    this.widgetElement.classList.add('opened');
    document.addEventListener('click', close);
  }

  setTitle(text) {
    this.titleEl.textContent = text;
  }

  renderTitle() {
    this.titleEl = document.createElement('div');

    this.titleEl.classList.add('dropdown__title');
    this.titleEl.textContent = this.optionsList[0];
    this.titleEl.tabIndex = 0;
    this.widgetElement.appendChild(this.titleEl);
  }

  renderOptions() {
    const optionsEl = document.createElement('ul');

    optionsEl.classList.add('dropdown__options');

    this.optionsList.forEach(
      (optionText) => {
        const optionEl = document.createElement('li');

        optionEl.classList.add('dropdown__option');
        optionEl.tabIndex = 0;
        optionEl.textContent = optionText;

        optionsEl.appendChild(optionEl);
      }
    );
    this.widgetElement.appendChild(optionsEl);
  }

  renderWidget() {
    this.widgetElement.classList.add('dropdown');
    this.renderTitle();
    this.renderOptions();
  }

  attachEvents() {
    this.widgetElement.addEventListener('click', (e) => {
      this.toggle(e);
    });

    this.widgetElement.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.toggle(e);
      }
    });
  }

  init() {
    this.renderWidget();
    this.attachEvents();
  }
}





