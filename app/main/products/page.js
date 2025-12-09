// app/products/page.js

export default async function ProductsPage() {
  const res = await fetch('http://localhost:8000/api/hello/');
  const data = await res.json();
  return (
    <div style={{ padding: 20 }}>
      <section>
        {JSON.stringify(data)}
      </section>
      <aside></aside>
    </div>
  );
}
