import { useEffect } from "react";

export function Slide({ offset, icon, handleClick }) {
  const style = {
    transform: `translate3d(${
      Math.sign(offset) *
      (Math.pow(4.5, Math.abs(offset)) + 250 * Math.abs(offset) - 60)
    }px, 0, ${-Math.abs(offset) * 1000}px)`,
    filter: `brightness(${100 - 20 * Math.abs(offset)}%)`,
  };

  return (
    <img
      className="slide"
      src={icon}
      style={style}
      onClick={() => {
        handleClick(offset);
      }}
    />
  );
}
