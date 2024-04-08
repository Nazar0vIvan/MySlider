export function shift(arr, reverse) {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
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
