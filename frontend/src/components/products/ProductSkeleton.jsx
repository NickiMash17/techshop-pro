import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-surface/50 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-slate-700" />
      <div className="p-4 space-y-4">
        <div className="h-4 bg-slate-700 rounded w-3/4" />
        <div className="h-3 bg-slate-700 rounded w-1/2" />
        <div className="flex items-center justify-between pt-4">
          <div className="h-6 bg-slate-700 rounded w-1/4" />
          <div className="h-8 bg-slate-700 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;