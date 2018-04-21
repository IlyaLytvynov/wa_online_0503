const OPEN_MODAL_CLASS_NAME = 'visible';
const modalWindow = document.querySelector('.modal');
const overlay = document.querySelector('.modal__overlay');
const header = document.querySelector('.modal__header');
const body = document.querySelector('.modal__body');

let isOpen = modalWindow.classList.contains(OPEN_MODAL_CLASS_NAME);

overlay.addEventListener('click', closeModal);

function toggleModal() {
  if (isOpen) {
    closeModal();
  } else {
    openModal();
  }
}

function closeModal() {
  modalWindow.classList.remove(OPEN_MODAL_CLASS_NAME);
  isOpen = false;
}

function openModal(options) {
  const { headerText, bodyText } = options;
  if (headerText) {
    header.innerHTML = headerText;
  }

  if (bodyText) {
    body.innerHTML = bodyText;
  }

  modalWindow.classList.add(OPEN_MODAL_CLASS_NAME);
  isOpen = true;
}

export { toggleModal, closeModal, openModal }