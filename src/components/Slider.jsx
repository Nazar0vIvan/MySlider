import {
  cloneElement,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { linspace, restSum, shift } from "../../calc/functions";

export const SliderContext = createContext(null);

export function Slider({ children, scale, gap }) {
  const [offsets, setOffsets] = useState(
    linspace(-Math.floor(children.length / 2), children.length)
  );

  const handleSlideClick = useCallback((offset) => {
    let newOffsets = [...offsets]; // copy
    for (let i = 0; i < Math.abs(offset); ++i) {
      shift(newOffsets, offset > 0);
    }
    console.log("beep");
    setOffsets(newOffsets);
  });

  function renderSlides() {
    return children.map((child, index) => {
      const offsetIndex = offsets[index];

      const w = 100;
      const a = Math.abs(offsetIndex);

      const dz = -1600 * (1 / Math.pow(scale, a) - 1);
      const dx =
        Math.sign(offsetIndex) *
        (w / 2 + a * gap + w * restSum(scale, a)) *
        (Math.abs(dz) / 1600 + 1);
      const dy = 0;
      const br = 100 - 20 * a;

      const style = {
        transform: `translate3d(${dx}px, ${dy}px, ${dz}px)`,
        filter: `brightness(${br}%)`,
      };

      return cloneElement(child, {
        offsetIndex,
        style,
        handleSlideClick,
      });
    });
  }

  return (
    <SliderContext.Provider value={{ scale, gap }}>
      <div id="slider">{renderSlides()}</div>
    </SliderContext.Provider>
  );
}

/* 
export function Slider({ slides, scale, gap }) {
  const [offsets, setOffsets] = useState(
    linspace(-Math.floor(slides.length / 2), slides.length)
  );

  useEffect(() => {
    console.log(children);
  }, []);

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

 */
