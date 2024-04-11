import { getCards } from "../../api/cards";
import { useLoaderData } from "react-router";
import { Slider } from "../components/Slider";
import { Slide } from "../components/Slide";

function Home() {
  const slides = useLoaderData();
  return (
    <div className="home">
      <Slider scale={0.7} gap={50}>
        {slides.map(({ id, title, icon }) => {
          return (
            <Slide key={id}>
              <img className="slide-icon" src={icon} />
            </Slide>
          );
        })}
      </Slider>
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
