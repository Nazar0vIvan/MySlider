export function shift(arr, reverse) {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
}

/*
const slides = [
  {
    id: -3,
    title: "C++",
  },
  {
    id: -2,
    title: "JavaScript",
  },
  {
    id: -1,
    title: "React",
  },
];

let result = [];
slides.forEach((slide) => {
  const { id, title, icon } = slide;
  result.push(id);
});

console.log(result);
shift(result);
console.log(result);
*/
