'use strict';

function fib(num) {
  let result = '';
  let first = 0;                 // 0 1 1 2
  let second = 1;                // 1 1 2

  for(let i = 0; i < num; i++) { //0 1
    if (i + 1 === num) {         
      result += `${first}`;
    } else {
      result += `${first} `;
    }

    let third = second + first;  //1 2 3
    first = second;              //1 1 2
    second = third;              //1 2 3
  }
  return result;                 //0 1 3
}
