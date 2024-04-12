import { forwardRef, useContext, useRef } from "react";

export const Slide = forwardRef(function Slide(
  {
    children,
    className = "",
    offsetIndex = 0,
    style = {},
    handleSlideClick = () => {},
  },
  ref
) {
  return (
    <div
      className={className}
      ref={ref}
      style={style}
      onClick={() => {
        handleSlideClick(offsetIndex);
      }}
    >
      {children}
    </div>
  );
});

/*
export function Slide({ offset, icon, scale, gap, handleSlideClick }) {
  const slideRef = useRef(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    const w = slideRef.current.clientWidth;
    const a = Math.abs(offset);

    const dz = -1600 * (1 / Math.pow(scale, a) - 1);
    const dx =
      Math.sign(offset) *
      (w / 2 + a * gap + w * restSum(scale, a)) *
      (Math.abs(dz) / 1600 + 1);
    const dy = 0;
    const br = 100 - 20 * a;

    setStyle({
      transform: `translate3d(${dx}px, ${dy}px, ${dz}px)`,
      filter: `brightness(${br}%)`,
    });
    console.log("bip");
  }, [offset, scale, gap]);

  return (
    <img
      ref={slideRef}
      className="slide"
      src={icon}
      style={style}
      onClick={() => {
        handleSlideClick(offset);
      }}
    />
  );
}
*/
