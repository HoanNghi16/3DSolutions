// app/layout.js
import "./globals.css";
import Nav from "./components/Nav";
import Header from "./components/Header"

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <Nav />
        {children}
      </body>
    </html>
  );
}
