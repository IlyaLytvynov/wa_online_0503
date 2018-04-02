const button = document.querySelector('#btnToggleModal');
const output = document.querySelector('#output');
const nameInput = document.querySelector('#nameInput');
const label = document.querySelector('.name-row');

button.onclick = greeting;

function greeting() {
    const name = nameInput.value;
    if (name) {
        nameInput.value = '';
        print(`Hello, ${name}!`);
    } else {
        label.classList.add('not-valid');
    }
}

function print(text) {
    output.innerHTML = text;
}


const user = {
    0: 'asdasd',
    name: 'Ilya'
};

const name = ['Ilya', 'Jask', 'John', 'Alex'];// Array
debugger;
const usersCart = [
    {
        title: 'iPhone',
        model: 'X',
        price: 1400
    },
    {
        title: 'Samsung',
        model: 'Galaxy s8',
        price: 1000
    },
    {
        title: 'Samsung',
        model: 'Galaxy s8',
        price: 1000
    },
    {
        title: 'Samsung',
        model: 'Galaxy s8',
        price: 1000
    },
    {
        title: 'Samsung',
        model: 'Galaxy s8',
        price: 1000
    }
];

function calcTotalPrice(param) {
    let totalPrice = 0;
    for (let i = 0; i < param.length; i++ ) {
        const currentProduct = param[i];
        totalPrice = totalPrice + currentProduct.price;
    }

    console.log(totalPrice);
}


calcTotalPrice(usersCart);
calcTotalPrice([
    {
        title: 'Oranges',
        price: 20
    },
    {
        title: 'Oranges',
        price: 20
    },
    {
        title: 'Oranges',
        price: 20
    }
]);

function randomInteger(min, max) {

}