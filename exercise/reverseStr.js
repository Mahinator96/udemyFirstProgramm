const someString = 'This is some strange string';

function reverse(str) {
  const reverseStr = str.split('').reverse().join('');
  return reverseStr;
}

console.log(reverse(someString));