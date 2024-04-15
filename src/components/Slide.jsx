import { forwardRef } from "react";

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
