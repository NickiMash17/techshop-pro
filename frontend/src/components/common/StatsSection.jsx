export const StatsSection = () => (
  <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up-delayed-2">
    {[
      { value: "10k+", label: "Happy Customers", color: "purple" },
      { value: "500+", label: "Products", color: "cyan" },
      { value: "24/7", label: "Support", color: "purple" },
      { value: "99%", label: "Satisfaction", color: "cyan" }
    ].map(({ value, label, color }) => (
      <div key={label} className="text-center">
        <div className={`text-3xl font-bold text-${color}-400`}>{value}</div>
        <div className="text-slate-400">{label}</div>
      </div>
    ))}
  </div>
);