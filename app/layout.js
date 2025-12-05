//app/layout.js
import "./globals.css";
import Nav from "./components/Nav";
import Header from "./components/Header"
import ShortedHeader from './components/shortedHeader'
import Footer from './components/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}
