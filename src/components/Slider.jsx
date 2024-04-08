import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Slide } from "./Slide";
import { shift } from "../../calc/functions";

export function Slider({ slides }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const ids = useMemo(() => {
    let result = [];
    slides.forEach((slide) => {
      result.push(slide.id);
    });

    for (let i = 0; i < Math.abs(activeSlide); ++i) {
      shift(result, activeSlide > 0);
    }
    return result;
  }, [activeSlide]);

  function handleClick(index) {
    if (activeSlide == index) return;
    setActiveSlide(index);
    console.log("beep");
  }

  return (
    <div id="slider">
      {slides.map((slide, index) => {
        const { id, title, icon } = slide;
        return (
          <Slide
            key={id}
            id={ids[index]}
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
