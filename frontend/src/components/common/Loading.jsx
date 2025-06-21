const ProductsLoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse">
        <div className="bg-slate-800 rounded-2xl h-80"></div>
      </div>
    ))}
  </div>
);

export default ProductsLoadingSkeleton;