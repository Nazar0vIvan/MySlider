export function Slide({ offset, icon, handleSlideClick }) {
  const style = {
    transform: `translate3d(${
      Math.sign(offset) *
      (10 * Math.pow(Math.abs(offset), 2) + 300 * Math.abs(offset) - 50)
    }px, 0, ${-Math.abs(offset) * 1000}px)`,
    filter: `brightness(${100 - 20 * Math.abs(offset)}%)`,
  };

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
