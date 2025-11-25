import Carousel from "./components/Carousel";
import './home.css'
import Status from "./components/status";
export default function Home() {
  const images = [
    "/Banner1.png",
    "/logoNgang2.jpg",
    "/logoNgang2.jpg",
    "/logoNgang2.jpg"
  ];
  const slides = [
    {src: '/slides/slide1.jpg', caption: 'Giải pháp 3D', link: 'https://www.facebook.com/photo.php?fbid=122212093958238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: '/slides/slide2.jpg', caption: 'Đưa 3D vào công nghệ', link: 'https://www.facebook.com/photo.php?fbid=122229365762238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: '/slides/slide3.jpg', caption: 'In 3D bảo vệ môi trường?', link: 'https://www.facebook.com/photo.php?fbid=122231500046238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: '/slides/slide4.jpg', caption: 'Tìm hiểu các loại nhựa', link: 'https://www.facebook.com/photo.php?fbid=122214261350238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: '/slides/slide5.jpg', caption: 'In 3D có thể xây nhà?', link: 'https://www.facebook.com/photo.php?fbid=122213636396238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: '/slides/slide6.jpg', caption: 'Gửi người thương', link: 'https://www.facebook.com/photo.php?fbid=122222033606238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: '/slides/slide7.jpg', caption: 'ghé thăm 3D Solutions', link: 'https://www.facebook.com/3dsolutionspage'},
    {src: '/slides/slide8.jpg', caption: 'Ý tưởng hóa sản phẩm', link: 'https://www.facebook.com/photo.php?fbid=122212291046238848&set=pb.61557165459296.-2207520000&type=3'},
  ];
  return (
    <div className="homeContainer">
      <Carousel className="carousel" images={images} autoPlay={true} interval={4000} style={{ width: '100%' }}/>
      <section className="coreValues">
        <h1 className="coreTitle">Giá trị cốt lõi</h1>
        <ul className="coreList">
          <li><p>Tận tâm với từng chi tiết. Không chỉ hoàn thành yêu cầu, mà còn nỗ lực vượt mong đợi.</p></li>
          <li><p>Sáng tạo không ngừng. Luôn tìm kiếm ý tưởng mới, thử nghiệm kỹ thuật mới và tạo ra sản phẩm mang dấu ấn riêng.</p></li>
          <li><p>Linh hoạt & Năng động. Thích ứng nhanh, xử lý hiệu quả, và sẵn sàng thay đổi để phù hợp với mỗi dự án.</p></li>
        </ul>
      </section>
      <aside className="status">
        <Status slides={slides}></Status>
      </aside>
      <div className="3D"></div>
    </div>
  );
}