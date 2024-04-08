export function Slide({ id, icon, handleClick }) {
  const style = {
    transform: `translate3d(${id * 250}px, 0, ${-Math.abs(id) * 1000}px)`,
    filter: `brightness(${100 - 20 * Math.abs(id)}%)`,
  };

  return (
    <img
      className="slide"
      src={icon}
      style={style}
      onClick={() => {
        handleClick(id);
      }}
    />
  );
}
