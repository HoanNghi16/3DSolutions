import Link from "next/link";
import
 './Nav.css'
export default function Nav() {
  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <Link href="/" style={{ marginRight: 12 }}>Home</Link>
      <Link href="/about" style={{ marginRight: 12 }}>About</Link>
      <Link href="/products">Products</Link>
    </nav>
  );
}
