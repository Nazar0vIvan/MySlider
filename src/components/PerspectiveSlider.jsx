import {
  cloneElement,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { linspace, powerSeriesSum, shift } from "../../calc/functions";

export const SliderContext = createContext(null);

export function PerspectiveSlider({
  children,
  className = "",
  scale = 1,
  gap = 0,
}) {
  const [offsets, setOffsets] = useState(
    linspace(-Math.floor(children.length / 2), children.length)
  );
  const slideRef = useRef();
  const sliderRef = useRef();

  const updateSize = useCallback(() => {
    const w = slideRef.current.clientWidth;
    const n = children.length;
    const k = n % 2 == 0 ? 1 : 2;
    const sliderWidth =
      w +
      (n - 1) * gap +
      w *
        (2 * powerSeriesSum(scale, Math.floor(n / 2) - 1) +
          k * Math.pow(scale, Math.floor(n / 2)));

    sliderRef.current.style.width = `${sliderWidth}px`;
    sliderRef.current.style.height = `${slideRef.current.clientHeight}px`;
  });

  useEffect(() => {
    updateSize();
  }, []);

  const handleSlideClick = useCallback((offset) => {
    let newOffsets = [...offsets]; // copy
    for (let i = 0; i < Math.abs(offset); ++i) {
      shift(newOffsets, offset > 0);
    }
    setOffsets(newOffsets);
  });

  function renderSlides() {
    return children.map((child, index) => {
      const perspective = 1;
      const offsetIndex = offsets[index];
      const f = Math.abs(offsetIndex);
      const dz = -perspective * (1 / Math.pow(scale, f) - 1);
      const perspectiveScale = Math.abs(dz) / perspective + 1;
      const sign = Math.sign(offsetIndex);
      const dx = `calc(${sign} * ${perspectiveScale} * (50% + ${
        f * gap
      }px + 100% * ${powerSeriesSum(scale, f - 1) + Math.pow(scale, f) / 2}))`;

      const br = 100 - 20 * f;

      const style = {
        "--dx": `${dx}`,
        "--dz": `${dz}px`,
        "--br": `${br}%`,
      };

      return cloneElement(child, {
        ref: slideRef,
        offsetIndex,
        style,
        handleSlideClick,
      });
    });
  }

  return (
    <SliderContext.Provider value={{}}>
      <div ref={sliderRef} className={`${className} perspective`}>
        {renderSlides()}
      </div>
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
