import React, { useEffect, useState } from 'react';
import { productsAPI } from '../../utils/api';
import ProductCard from '../products/ProductCard';

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        // Fetch all products and filter for featured
        const response = await productsAPI.getAll();
        const products = Array.isArray(response.data.products)
          ? response.data.products
          : Array.isArray(response.data)
            ? response.data
            : [];
        setFeatured(products.filter(p => p.featured));
      } catch (error) {
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return <div className="py-8 text-center text-gray-400">Loading featured products...</div>;
  }

  if (!featured.length) {
    return null;
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-white mb-4">Featured Products</h2>
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {featured.map((product, idx) => (
          <div key={product._id || product.id || idx} className="min-w-[320px] max-w-xs flex-shrink-0">
            <ProductCard product={product} index={idx} viewMode="grid" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts; 