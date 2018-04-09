let maxValue = findMax([1, 45, 32, 56, 98, 76, 22, 12, 9]);

function findMax(array) {// Function declarartion;
  let maxValue = 0;

  array.forEach((item) => {
    if (typeof item === 'number' && item > maxValue) {
      maxValue = item;
    }
  });

  return maxValue;
}
console.log(findMax);

const print = function (data) {// function expression
  console.log(data);
};
print();

console.log(`MaxValue: ${maxValue}`);
