import Header from '../components/Header'
import Nav from '../components/Nav'
import ShortedHeader from '../components/shortedHeader'
import Footer from '../components/Footer'



export default function MainLayout({children}){
    return (
        <div className='mainContainer'>
            <div className="heading" style={{position: 'fixed', top: '0', width: '100%', zIndex:'1000'}}>
                <Header />
                <Nav />
            </div>
            <div className="shortedHeading" style={{position: 'fixed', top: '0', width: '100%', zIndex:'1000'}}>
                <ShortedHeader/>
            </div>
                {children}
            <Footer></Footer>
        </div>
    )
}