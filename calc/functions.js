export function shift(arr, reverse) {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
}

export function linspace(start, num) {
  return Array.from({ length: num }, (_, i) => start + i);
}

export function restSum(value, n) {
  let sum = 0;
  for (let i = 1; i <= n - 1; ++i) {
    sum += Math.pow(value, i);
  }
  sum += Math.pow(value, n) / 2;
  return sum;
}
/*
const slides = [
  {
    id: 0,
    title: "C++",
  },
  {
    id: 1,
    title: "JavaScript",
  },
  {
    id: 2,
    title: "React",
  },
];

const arr = slides.map((slide) => slide.id);

console.log(arr);
*/
