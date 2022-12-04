const restorantData = {
  menu: [
      {
          name: 'Salad Caesar',
          price: '1$'
      },
      {
          name: 'Pizza Diavola',
          price: '9$'
      },
      {
          name: 'Beefsteak',
          price: '17$'
      },
      {
          name: 'Napoleon',
          price: '7$'
      }
  ],
  waitors: [
      {name: 'Alice', age: 22}, {name: 'John', age: 24}
  ],
  averageLunchPrice: '20$',
  openNow: true
};

function isOpen(prop) {
  let answer = '';
  prop ? answer = 'Открыто' : answer = 'Закрыто';
  return answer;
}

function isAverageLunchPriceTrue(fDish, sDish, average) {
  if ((parseInt(fDish.price) + parseInt(sDish.price)) < parseInt(average)) {
      return 'Цена ниже средней';
  } else {
      return 'Цена выше средней';
  }
}

function transferWaitors(data) {
  let man = {};
  let copyCopy = Object.setPrototypeOf(man, data);

  copyCopy.waitors[0] = {name: 'Mike', age: 32};
  return man;
}

console.log(transferWaitors(restorantData));