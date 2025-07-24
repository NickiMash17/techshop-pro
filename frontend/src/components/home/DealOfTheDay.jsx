import React, { useEffect, useState } from 'react';
import { productsAPI } from '../../utils/api';
import ProductCard from '../products/ProductCard';

const DealOfTheDay = () => {
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        setLoading(true);
        // Fetch all products and filter for featured
        const response = await productsAPI.getAll();
        const products = Array.isArray(response.data.products)
          ? response.data.products
          : Array.isArray(response.data)
            ? response.data
            : [];
        const featured = products.filter(p => p.featured);
        if (featured.length) {
          // Pick a random featured product as the deal
          const randomIndex = Math.floor(Math.random() * featured.length);
          setDeal(featured[randomIndex]);
        } else {
          setDeal(null);
        }
      } catch (error) {
        setDeal(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, []);

  if (loading || !deal) {
    return null;
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-yellow-400 mb-2">Deal of the Day</h2>
      <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-lg">
        <div className="w-full md:w-1/2">
          <ProductCard product={deal} viewMode="grid" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-2">{deal.name}</h3>
          <p className="text-gray-300 mb-4">{deal.description}</p>
          <span className="inline-block bg-yellow-400 text-yellow-900 font-semibold px-4 py-2 rounded-full mb-4">Today Only!</span>
          <div>
            <a
              href={`/products/${deal._id || deal.id}`}
              className="inline-block bg-primary hover:bg-primary/80 text-white font-bold px-6 py-3 rounded-lg transition-colors shadow-lg"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfTheDay; 