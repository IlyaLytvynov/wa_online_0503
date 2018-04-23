import './modal-window.scss';

const contentTemplate = `
  <div class="modal__header">
    <h2 class="modal__title"></h2>
  </div>
  <div class="modal__body"></div>
  <div class="modal__footer">
    <button class="modal__btn modal__btn_close">Cancel</button>
    <button class="modal__btn modal__btn_confirm">Confirm</button>
    </div>
`;

const ACTIVE_CLASS_NAME = 'visible';

class ModalWindow {
  constructor(targetElement) {
    this.targetElement = targetElement;
    // this.hide = this.hide.bind(this);
    this.init();
    this.subscribtions = [];
  }

  render() {
    this.targetElement.classList.add('modal');
    this.overlay = document.createElement('div');
    this.overlay.classList.add('modal__overlay');

    this.content = document.createElement('div');
    this.content.classList.add('modal__content');
    this.content.innerHTML = contentTemplate;

    this.targetElement.appendChild(this.overlay);
    this.targetElement.appendChild(this.content);
  }

  attachEvent() {
    this.overlay.addEventListener('click', () => {
      this.hide();
    });
    this.content.querySelectorAll('.modal__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.onBtnClick();
      })
    })
  }

  init() {
    this.render();
    this.attachEvent()
  }

  onBtnClick() {
    this.hide();
  }

  show(options) {
    const modalHeader = this.content.querySelector('.modal__header');
    const modalBodyEl = this.content.querySelector('.modal__body');
    const modalFooter = this.content.querySelector('.modal__footer');

    if (options.headerText) {
      const modalTitle = modalHeader.querySelector('.modal__title');
      modalHeader.classList.add('modal__header_visible');

      modalTitle.innerHTML = options.headerText;
    }

    if (options.withButtons) {
      modalFooter.classList.add('modal__footer_visible');

      const btnConfirm = this.content.querySelector('.modal__btn_confirm');
      btnConfirm.onclick = options.onConfirm();

      const btnClose = this.content.querySelector('.modal__btn_close');
      btnClose.onclick =  options.onCancel();
    }

    modalBodyEl.innerHTML = options.content;

    this.targetElement.classList.add(ACTIVE_CLASS_NAME);
  }

  hide() {
    this.targetElement.classList.remove(ACTIVE_CLASS_NAME);
    this.subscribtions.forEach((unsubscribe) => unsubscribe());
  }

}

const modalWindow = new ModalWindow(document.querySelector('#defaultModal'));

export { modalWindow };
