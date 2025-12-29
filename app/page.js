import Carousel from "./components/home/Carousel";
import './home.css'
import Status from "./components/home/status";
import Cards from './components/home/cards';
import Nav from "./components/Nav";
import Header from "./components/Header";
import ShortedHeader from "./components/shortedHeader";
import {images, slides, cardsContent} from './data/slider'
import { useAuth } from "./authProvider";

export default async function Home() {
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