import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Slide } from "./Slide";
import { linspace, shift } from "../../calc/functions";

export function Slider({ slides, scale, gap }) {
  const [offsets, setOffsets] = useState(
    linspace(-Math.floor(slides.length / 2), slides.length)
  );

  function handleSlideClick(offset) {
    let newOffsets = [...offsets]; // copy
    for (let i = 0; i < Math.abs(offset); ++i) {
      shift(newOffsets, offset > 0);
    }
    setOffsets(newOffsets);
  }

  function handleNextBtnClick() {}

  function handlePrevBtnClicnpmk() {}

  return (
    <div className="container">
      <input type="image" className="btn-prev" src="arrow-prev.svg"></input>
      <div id="slider">
        {slides.map((slide, i, array) => {
          const { id, title, icon } = slide;
          const n = array.length;
          return (
            <Slide
              key={id}
              icon={icon}
              offset={offsets[i]}
              scale={scale}
              gap={gap}
              handleSlideClick={handleSlideClick}
            />
          );
        })}
      </div>
      <input type="image" className="btn-next" src="arrow-next.svg"></input>
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
