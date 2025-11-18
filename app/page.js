
import Carousel from "./components/Carousel";

export default function Home() {
  const images = [
    "/logoNgang2.jpg",
    "/logoNgang2.jpg",
    "/logoNgang2.jpg",
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Carousel images={images} autoPlay={true} interval={4000} />
    </div>
  );
}