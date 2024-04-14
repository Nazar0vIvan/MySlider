export function createSymmetricArray() {}

export function shift(arr, reverse = false) {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
}

export function nlinspace(start, num, reverse = false, isEnd = true) {
  const n = isEnd ? num + 1 : num;
  const k = reverse ? -1 : 1;
  return Array.from({ length: n }, (_, i) => start + k * i);
}

export function powerSeriesSum(value, n) {
  let sum = 0;
  for (let i = 1; i <= n; ++i) {
    sum += Math.pow(value, i);
  }
  return sum;
}

export function inversePowerSeriesSum(value, n) {
  let sum = 0;
  for (let i = 1; i <= n; ++i) {
    sum += Math.pow(1 / value, i);
  }
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
