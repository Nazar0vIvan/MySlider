import {
  cloneElement,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { nlinspace, powerSeriesSum, shift } from "../../calc/functions";

export const SliderContext = createContext(null);

export function PerspectiveSlider({
  children,
  className = "",
  scaleFactor = 1,
  gap = 0,
  navigation = {},
}) {
  const [offsetIndices, setoOffsetIndices] = useState(
    nlinspace(-Math.floor(children.length / 2), children.length - 1)
  );
  const slideRef = useRef();
  const sliderRef = useRef();

  const updateSize = useCallback(() => {
    const w = slideRef.current.clientWidth;
    const n = children.length;
    const sliderWidth =
      w +
      (n - 1) * gap +
      w *
        (2 * powerSeriesSum(scaleFactor, Math.floor(n / 2) - 1) +
          2 * Math.pow(scaleFactor, Math.floor(n / 2)));

    sliderRef.current.style.width = `${sliderWidth}px`;
    sliderRef.current.style.height = `${slideRef.current.clientHeight}px`;
  }, []);

  useEffect(() => {
    updateSize();
  }, []);

  useEffect(() => {
    if (!navigation.prev) return;
    const prevBtn = document.querySelector(navigation.prev);
    prevBtn.addEventListener("click", handleClickPrev);

    if (!navigation.next) return;
    const nextBtn = document.querySelector(navigation.next);
    nextBtn.addEventListener("click", handleClickNext);

    return () => {
      prevBtn.removeEventListener("click", handleClickPrev);
      nextBtn.removeEventListener("click", handleClickNext);
    };
  }, [offsetIndices]);

  function handleSlideClick(offsetIndex) {
    let newOffsetsIndices = [...offsetIndices]; // copy
    for (let i = 0; i < Math.abs(offsetIndex); ++i) {
      shift(newOffsetsIndices, offsetIndex > 0);
    }
    setoOffsetIndices(newOffsetsIndices);
  }

  function handleClickNext() {
    let newOffsetsIndices = [...offsetIndices]; // copy
    shift(newOffsetsIndices, false);
    setoOffsetIndices(newOffsetsIndices);
  }

  function handleClickPrev() {
    let newOffsetsIndices = [...offsetIndices]; // copy
    shift(newOffsetsIndices, true);
    setoOffsetIndices(newOffsetsIndices);
  }

  function renderSlides() {
    return children.map((child, index) => {
      const perspective = 1;
      const offsetIndex = offsetIndices[index];
      const aoi = Math.abs(offsetIndex);
      const dz = -perspective * (1 / Math.pow(scaleFactor, aoi) - 1);

      const perspectiveFactor = Math.abs(dz) / perspective + 1;
      const sign = Math.sign(offsetIndex);
      const dx = `calc(${sign} * ${perspectiveFactor} * (50% + ${
        aoi * gap
      }px + 100% * ${
        powerSeriesSum(scaleFactor, aoi - 1) + Math.pow(scaleFactor, aoi) / 2
      }))`;

      const op = 1.0 - 0.25 * aoi;

      const style = {
        "--dx": `${dx}`,
        "--dz": `${dz}px`,
        "--op": `${op}`,
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

/*   const renderSlides = useCallback(() => {
    return children.map((child, index) => {
      const perspective = 1;
      const offsetIndex = offsets[index];
      const f = Math.abs(offsetIndex);
      const dz = -perspective * (1 / Math.pow(scaleFactor, f) - 1);
      const perspectivescaleFactor = Math.abs(dz) / perspective + 1;
      const sign = Math.sign(offsetIndex);
      const dx = `calc(${sign} * ${perspectivescaleFactor} * (50% + ${
        f * gap
      }px + 100% * ${powerSeriesSum(scaleFactor, f - 1) + Math.pow(scaleFactor, f) / 2}))`;

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
  });
 */

/* 
export function Slider({ slides, scaleFactor, gap }) {
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
              scaleFactor={scaleFactor}
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
