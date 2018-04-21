// const jack = {
//   name: 'Jack',
//   phones: ['111222333'],
//   age: 26,
//   greet: greeting,
// };



class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
    this.fuelAmount = 50;
    this.maxSpeed = 190;
  }

  drive () {
    console.log('Car moved!!');
    this.fuelAmount -= 7;
  }
}

class Driver {
  constructor(car) {
    this.car = car;
  }

  move() {
    this.car.drive();
  }
}

const fiesta = new Car('Ford', 'Fiesta');
const driver = new Driver(fiesta);
const cClass = new Car('Mercedes', 'c300');
const driver2 = new Driver(cClass);


driver.move();

