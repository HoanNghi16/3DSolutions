// app/layout.js
import "./globals.css";
import Nav from "./components/Nav";
import Header from "./components/Header"
import ShortedHeader from './components/shortedHeader'

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <div className="container">
          <div className="heading" style={{position: 'fixed', top: '0', width: '100%', zIndex:'1000'}}>
            <Header />
            <Nav />
          </div>
          <div className="shortedHeading" style={{position: 'fixed', top: '0', width: '100%', zIndex:'1000'}}>
            <ShortedHeader/>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
