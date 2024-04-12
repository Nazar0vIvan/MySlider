export function shift(arr, reverse) {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
}

export function linspace(start, num) {
  return Array.from({ length: num }, (_, i) => start + i);
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
