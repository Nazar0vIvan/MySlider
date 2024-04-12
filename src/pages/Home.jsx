import { getCards } from "../../api/cards";
import { useLoaderData } from "react-router";
import { PerspectiveSlider } from "../components/PerspectiveSlider";
import { Slide } from "../components/Slide";

function Home() {
  const slides = useLoaderData();
  return (
    <div className="home">
      <input
        type="image"
        className="slider-btn-prev"
        src="arrow-prev.svg"
      ></input>
      <PerspectiveSlider className="slider" scale={0.7} gap={50}>
        {slides.map(({ id, title, icon }) => {
          return (
            <Slide key={id} className="slide">
              <img className="slide-icon" src={icon} />
            </Slide>
          );
        })}
      </PerspectiveSlider>
      <input
        type="image"
        className="slider-btn-next"
        src="arrow-next.svg"
      ></input>
    </div>
  );
}

async function loader({ request: { signal } }) {
  return await getCards({ signal });
}

export const homeRoute = {
  element: <Home />,
  loader,
};
