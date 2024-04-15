import { getCards } from "../../api/cards";
import { useLoaderData } from "react-router";
import { PerspectiveSlider } from "../components/PerspectiveSlider";
import { Slide } from "../components/Slide";

function Home() {
  const slides = useLoaderData();
  return (
    <div className="home">
      <PerspectiveSlider className="slider" scaleFactor={0.7} gap={40}>
        {slides.map(({ id, title, icon }) => {
          return (
            <Slide key={id} className="slide">
              <img className="slide-icon" src={icon} />
            </Slide>
          );
        })}
      </PerspectiveSlider>
    </div>
  );
}

async function loader({ request: { signal } }) {
  return await getCards({ signal });
}

export const HomeRoute = {
  element: <Home />,
  loader,
};
