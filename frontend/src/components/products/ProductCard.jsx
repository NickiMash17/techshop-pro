import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <div className="card-container">
      <Link 
        to={`/products/${product.id}`} 
        className="block h-full group"
      >
        <div className="card-wrapper">
          {/* Image Container */}
          <div className="card-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="card-image"
            />
            
            {/* Category Badge */}
            {product.category && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-primary/80 
                           backdrop-blur-sm rounded-full text-xs font-medium z-10
                           transform transition-all duration-300 
                           group-hover:scale-110 group-hover:bg-primary">
                {product.category}
              </div>
            )}
          </div>

          {/* Content Container */}
          <div className="card-content">
            <h3 className="card-title">{product.name}</h3>
            <p className="card-description">{product.description}</p>
            
            {/* Price and Action */}
            <div className="mt-auto flex items-center justify-between">
              <div className="flex flex-col">
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                  ${product.price}
                </span>
              </div>
              
              <button className="card-button">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    image: PropTypes.string.isRequired,
    category: PropTypes.string
  }).isRequired
};

export default ProductCard;