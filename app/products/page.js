// app/products/page.js
export default function ProductsPage() {
  const products = [
    { id: 1, name: "Quần A", price: "350.000 VND" },
    { id: 2, name: "Áo B", price: "250.000 VND" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - {p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
