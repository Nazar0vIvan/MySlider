import { useMemo } from "react";
import { restSum } from "../../calc/functions";

export function Slide({ offset, icon, scale, gap, handleSlideClick }) {
  /*
  const style = {
    "--dx": `calc(${Math.sign(offset)} * (50% * (${
      Math.pow(1 / scale, Math.abs(offset)) - 1
    }) + ${Math.abs(offset) * gap}px + 100% * ${inverseFracSum(
      scale,
      Math.abs(offset)
    )}))`,
    transform: `translate3d(var(--dx), 0, ${
      -1600 * (1 / Math.pow(scale, Math.abs(offset)) - 1)
    }px)`,
    filter: `brightness(${100 - 20 * Math.abs(offset)}%)`,
  };
  */

  const style = useMemo(() => {
    const w = 100;
    const a = Math.abs(offset);

    const dz = -1600 * (1 / Math.pow(scale, a) - 1);
    const dx =
      Math.sign(offset) *
      (w / 2 + a * gap + w * restSum(scale, a)) *
      (Math.abs(dz) / 1600 + 1);
    const dy = 0;
    const br = 100 - 20 * a;

    return {
      transform: `translate3d(${dx}px, ${dy}px, ${dz}px)`,
      filter: `brightness(${br}%)`,
    };
  }, [offset, gap, scale]);

  return (
    <img
      className="slide"
      src={icon}
      style={style}
      onClick={() => {
        handleSlideClick(offset);
      }}
    />
  );
}
