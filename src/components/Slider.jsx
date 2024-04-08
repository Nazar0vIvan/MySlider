import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Slide } from "./Slide";
import { shift } from "../../calc/functions";

export function Slider({ slides }) {
  const [offsets, setOffsets] = useState(slides.map((slide) => slide.offset));

  function handleSlideClick(offset) {
    let newOffsets = [...offsets]; // copy
    for (let i = 0; i < Math.abs(offset); ++i) {
      shift(newOffsets, offset > 0);
    }
    setOffsets(newOffsets);
  }

  function handleNextBtnClick() {}

  function handlePrevBtnClick() {}

  return (
    <div className="container">
      <input
        type="image"
        className="btn-prev"
        src="arrow-prev.svg"
        onClick={handlePrevBtnClick}
      ></input>
      <div id="slider">
        {slides.map((slide, i) => {
          const { id, title, icon } = slide;
          return (
            <Slide
              key={id}
              offset={offsets[i]}
              icon={icon}
              handleSlideClick={handleSlideClick}
            />
          );
        })}
      </div>
      <input
        type="image"
        className="btn-next"
        src="arrow-next.svg"
        onClick={handlePrevBtnClick}
      ></input>
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
