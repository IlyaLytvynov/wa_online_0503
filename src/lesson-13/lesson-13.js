import { modalWindow } from "./scripts/modal-window";
import { DropDown } from './scripts/dropdown'
import './scripts/dropdown';
import './lesson-13.scss';


const moviesList = ['Shrek', 'Lost', 'Star Wars', 'Avengers'];
const countries = ['USA', 'Germany', 'Ukraine'];

const moviesDropDown = new DropDown(document.querySelector('#moviesDropdownMenu'), moviesList);
const countriesDropDown = new DropDown(document.querySelector('#countriesDropdownMenu'), countries);

window.moviesDropDown = moviesDropDown;
window.countriesDropDown = countriesDropDown;

const btn = document.querySelector('#openModal');

btn.addEventListener('click', () => {
  modalWindow.show({
    headerText: 'Hello world',
    content: `
        <ul>
            <li>Some item</li>
            <li>Some item</li>
            <li>Some item</li>
        </ul>
    `,
    withButtons: true,
    onConfirm: () => {
      console.log('Confirmed');
    },
    onCancel: () => {
      console.log('Canceled!');
    }
  });
});