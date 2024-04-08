import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Slide } from "./Slide";
import { shift } from "../../calc/functions";

export function Slider({ slides }) {
  const [offsets, setOffsets] = useState(slides.map((slide) => slide.offset));

  function handleClick(offset) {
    let newOffsets = [...offsets]; // copy
    for (let i = 0; i < Math.abs(offset); ++i) {
      shift(newOffsets, offset > 0);
    }
    setOffsets(newOffsets);
  }

  return (
    <div id="slider">
      {slides.map((slide, i) => {
        const { id, title, icon } = slide;
        return (
          <Slide
            key={id}
            offset={offsets[i]}
            icon={icon}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
}

/*      
{slides.map((slide, index) => {
    return (
      <input
        key={index}
        type="radio"
        id={`s${index}`}
        name="slider"
        defaultChecked={index === 0}
      ></input>
    );
})} 
*/
