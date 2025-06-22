import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../utils/currency';

const ProductsTab = () => {
  const [products] = useState([
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      stock: 10,
      status: 'In Stock'
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      price: 299.99,
      stock: 8,
      status: 'Low Stock'
    },
    {
      id: '3',
      name: 'Wireless Gaming Mouse',
      price: 79.99,
      stock: 15,
      status: 'In Stock'
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Products</h2>
        <button className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors">
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface text-left">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-surface/50">
                <td className="p-4">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {formatCurrency(product.price)}
                </td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs 
                    ${product.status === 'In Stock' 
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                    {product.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTab;