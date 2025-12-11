import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        if (!mounted) return;
        setProducts(response.data || []);
      })
      .catch(err => {
        if (!mounted) return;
        setError(err.message || 'Failed to fetch');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading products…</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;

  return (
    <div>
      <h1>Products list</h1>
      {products.length === 0 && <p>No products found.</p>}
      {products.map(product => (
        <div key={product.id} className="product-card" style={{marginBottom: 12}}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          {product.image && <img src={product.image} alt={product.title} style={{width: '100px'}} />}
        </div>
      ))}
    </div>
  );
}