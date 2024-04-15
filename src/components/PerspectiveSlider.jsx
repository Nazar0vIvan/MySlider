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
}) {
  const [offsetIndices, setoOffsetIndices] = useState(
    nlinspace(-Math.floor(children.length / 2), children.length - 1)
  );
  const [style, setStyle] = useState({ width: "0px", height: "0px" });
  const slideRef = useRef();

  const updateSize = useCallback(() => {
    const w = slideRef.current.clientWidth;
    const n = children.length;
    const sliderWidth =
      w +
      (n - 1) * gap +
      w *
        (2 * powerSeriesSum(scaleFactor, Math.floor(n / 2) - 1) +
          2 * Math.pow(scaleFactor, Math.floor(n / 2)));
    const sliderHeight = slideRef.current.clientHeight;
    setStyle({ width: `${sliderWidth}px`, height: `${sliderHeight}px` });
  }, []);

  useEffect(() => {
    updateSize();
  }, []);

  function handleSlideClick(offsetIndex) {
    let newOffsetsIndices = [...offsetIndices]; // copy
    for (let i = 0; i < Math.abs(offsetIndex); ++i) {
      shift(newOffsetsIndices, offsetIndex > 0);
    }
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
      <div className={`${className} perspective`} style={style}>
        {renderSlides()}
      </div>
    </SliderContext.Provider>
  );
}
