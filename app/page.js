
import Carousel from "./components/Carousel";
import './home.css'

export default function Home() {
  const images = [
    "/logoNgang2.jpg",
    "/logoNgang2.jpg",
    "/logoNgang2.jpg",
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Carousel images={images} autoPlay={true} interval={4000} />
      <h1><b>3D Solutions là gì?</b></h1>
      <p style={{marginLeft: '20px'}}>- 3D Solutions bắt đầu từ 1 căn nhà nhỏ, 610 Lũy Bán Bích<br/>
      - 3D Solutions là ý tưởng kinh doanh táo bạo từ 1 lần mong muốn có 1 cây kiếm nhựa của CEO Lương Chí Võ.</p>
    </div>
  );
}