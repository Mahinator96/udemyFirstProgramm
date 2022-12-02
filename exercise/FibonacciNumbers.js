function fib(num) {
  if (num < 0 || typeof(num) !== 'number' || !Number.isInteger(num)) {
    return 'Ошибка! Введите положительное целое число.';
  }

  let result = '';
  let first = 0;
  let second = 1;

  for (let i = 0; i < num; i++) {
    if (i + 1 === num) {
      result += `${first}`;
    } else {
      result += `${first} `;
    }

    let third = first + second;
    first = second;
    second = third;
  }
  return result;
}
console.log(fib(14));