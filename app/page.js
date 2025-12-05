import Carousel from "./components/Carousel";
import './home.css'
import Status from "./components/status";
import Cards from './components/cards';
import Nav from "./components/Nav";
import Header from "./components/Header";
import ShortedHeader from "./components/shortedHeader";

export default function Home() {
  const images = [
    "https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832134/Banner1_ptnkpi.png",
    "https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832134/Banner2_v4thv9.png",
    "https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832134/Banner3_xlqmex.png"
  ];
  const slides = [
    {src: 'https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832220/slide1_wgpg07.jpg', caption: 'Giải pháp 3D', link: 'https://www.facebook.com/photo.php?fbid=122212093958238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: 'https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832220/slide2_chdbma.jpg', caption: 'Đưa 3D vào công nghệ', link: 'https://www.facebook.com/photo.php?fbid=122229365762238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: 'https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832220/slide3_qbmq7m.jpg', caption: 'In 3D bảo vệ môi trường?', link: 'https://www.facebook.com/photo.php?fbid=122231500046238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: 'https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832220/slide4_nbsj4l.jpg', caption: 'Tìm hiểu các loại nhựa', link: 'https://www.facebook.com/photo.php?fbid=122214261350238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: 'https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832221/slide5_uodg0r.jpg', caption: 'In 3D có thể xây nhà?', link: 'https://www.facebook.com/photo.php?fbid=122213636396238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: 'https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832221/slide6_gmrdso.jpg', caption: 'Gửi người thương', link: 'https://www.facebook.com/photo.php?fbid=122222033606238848&set=pb.61557165459296.-2207520000&type=3'},
    {src: 'https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832222/slide7_sdtqq2.jpg', caption: 'ghé thăm 3D Solutions', link: 'https://www.facebook.com/3dsolutionspage'},
    {src: 'https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832222/slide8_uv3b5m.jpg', caption: 'Ý tưởng hóa sản phẩm', link: 'https://www.facebook.com/photo.php?fbid=122212291046238848&set=pb.61557165459296.-2207520000&type=3'},
  ];
  const cardsContent=[
    {title: 'Dedication', content:'Phục vụ khách hàng bằng sự tận tâm tuyệt đối, chăm chút từng chi tiết.'},
    {title: 'Design-aholic', content:'Theo đuổi thiết kế như một đam mê, tạo ra sản phẩm độc đáo, có hồn và giàu giá trị thẩm mỹ.'},
    {title: 'Dynamics', content:'Vận hành linh hoạt, cập nhật nhanh công nghệ mới, đảm bảo đáp ứng mọi nhu cầu từ đơn giản đến phức tạp.'},
  ]
  return (
    <div className="homeContainer">
      <div className="heading" style={{position: 'fixed', top: '0', width: '100%', zIndex:'1000'}}>
          <Header />
          <Nav />
      </div>
      <div className="shortedHeading" style={{position: 'fixed', top: '0', width: '100%', zIndex:'1000'}}>
          <ShortedHeader/>
      </div>      
      <Carousel className="carousel" images={images} autoPlay={true} interval={4000} style={{ width: '100%' }}/>
      <div className="row1">
        <section className="coreValues">
          <h1 className="coreTitle">Giá trị cốt lõi</h1>
          <ul className="coreList">
            <span className="note">-</span><li><p>Tận tâm với từng chi tiết. Không chỉ hoàn thành yêu cầu, mà còn nỗ lực vượt mong đợi.</p></li>
            <span className="note">-</span><li><p>Sáng tạo không ngừng. Luôn tìm kiếm ý tưởng mới, thử nghiệm kỹ thuật mới và tạo ra sản phẩm mang dấu ấn riêng.</p></li>
            <span className="note">-</span><li><p>Linh hoạt & Năng động. Thích ứng nhanh, xử lý hiệu quả, và sẵn sàng thay đổi để phù hợp với mỗi dự án.</p></li>
          </ul>
          <div className="rotatedBackground">
            <img className="rotated" src='/rotated.png'></img>
            <img className='backgroundLogo' src='/OnlyLogo.png'></img>
          </div>
        </section>
        <aside className="status">
          <Status slides={slides}></Status>
        </aside>
      </div>
      <div className="row2">
        <h2 className='row2Title'>3D SOLUTIONS CÓ GÌ</h2>
        <p className="row2Content">Dựa trên ba tiên quyết Dedication – Design-aholic – Dynamics, sứ mệnh của chúng tôi là mang đến những giải pháp 3D trọn vẹn, sáng tạo và hiệu quả nhất.</p>
        <Cards cardsContent={cardsContent}></Cards>
      </div>
    </div>
  );
}