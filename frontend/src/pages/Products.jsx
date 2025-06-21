import React, { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporary mock data until API is ready
    const mockProducts = [
      {
        id: 1,
        name: "Test Product",
        price: 99.99,
        image: "https://via.placeholder.com/300",
        category: "electronics"
      }
      // Add more mock products as needed
    ];
    
    setProducts(mockProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;