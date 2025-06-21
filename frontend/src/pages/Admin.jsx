import React from 'react';

const Admin = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {/* Add product management UI here */}
        </div>
        
        <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          {/* Add order management UI here */}
        </div>
        
        <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          {/* Add user management UI here */}
        </div>
      </div>
    </div>
  );
};

export default Admin;