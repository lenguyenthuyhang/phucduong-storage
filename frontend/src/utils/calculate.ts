import currency from 'currency.js';

const calculate = {
  add: (firstValue: number, secondValue: number) => {
    return currency(firstValue).add(secondValue).value;
  },
  sub: (firstValue: number, secondValue: number) => {
    return currency(firstValue).subtract(secondValue).value;
  },
  multiply: (firstValue: number, secondValue: number) => {
    return currency(firstValue).multiply(secondValue).value;
  },
  divide: (firstValue: number, secondValue: number) => {
    return currency(firstValue).divide(secondValue).value;
  },
};

export default calculate;
