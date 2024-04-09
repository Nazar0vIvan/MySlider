import { getCards } from "../../api/cards";
import { useLoaderData } from "react-router";
import { Slider } from "../components/Slider";

function Home() {
  const slides = useLoaderData();
  return (
    <div className="home">
      <Slider slides={slides} scale={0.8} />
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
