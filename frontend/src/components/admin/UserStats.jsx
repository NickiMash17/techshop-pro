import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, 
  Tooltip, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line 
} from 'recharts';
import { format, subMonths } from 'date-fns';
import { Menu } from '@headlessui/react';

const StatCard = ({ title, value, icon, change }) => (
  <div className="bg-surface/50 p-6 rounded-xl">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h4 className="text-2xl font-bold mt-1">{value}</h4>
        {change && (
          <p className={`text-sm mt-1 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
          </p>
        )}
      </div>
      <div className="text-primary">{icon}</div>
    </div>
  </div>
);

const TimeRangeSelector = ({ value, onChange }) => (
  <Menu as="div" className="relative">
    <Menu.Button className="px-3 py-1 bg-surface rounded-lg text-sm hover:bg-surface/70">
      {value}
    </Menu.Button>
    <Menu.Items className="absolute right-0 mt-1 w-36 bg-surface rounded-lg shadow-lg p-1">
      {['30 Days', '90 Days', '6 Months', '1 Year'].map((range) => (
        <Menu.Item key={range}>
          {({ active }) => (
            <button
              className={`w-full text-left px-3 py-1 rounded-lg text-sm ${
                active ? 'bg-primary/20' : ''
              }`}
              onClick={() => onChange(range)}
            >
              {range}
            </button>
          )}
        </Menu.Item>
      ))}
    </Menu.Items>
  </Menu>
);

const UserStats = ({ users }) => {
  const [timeRange, setTimeRange] = useState('30 Days');
  const [selectedRoles, setSelectedRoles] = useState(['Admin', 'User', 'Vendor']);

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      change: 12,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Active Users',
      value: users.filter(u => u.status === 'Active').length,
      change: 8,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Admins',
      value: users.filter(u => u.role === 'Admin').length,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Vendors',
      value: users.filter(u => u.role === 'Vendor').length,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  // Calculate role distribution data
  const roleData = Object.entries(
    users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Enhanced monthly growth data with dynamic date ranges
  const monthlyGrowth = useMemo(() => {
    const months = timeRange === '30 Days' ? 1 
      : timeRange === '90 Days' ? 3 
      : timeRange === '6 Months' ? 6 
      : 12;

    return Array.from({ length: months }, (_, i) => ({
      month: format(subMonths(new Date(), i), 'MMM'),
      users: Math.floor(120 + (i * 25) + Math.random() * 20),
      newUsers: Math.floor(15 + Math.random() * 10)
    })).reverse();
  }, [timeRange]);

  // Filter role data based on selection
  const filteredRoleData = useMemo(() => 
    roleData.filter(role => selectedRoles.includes(role.name))
  , [roleData, selectedRoles]);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Chart Controls */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Analytics</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {['Admin', 'User', 'Vendor'].map(role => (
              <button
                key={role}
                onClick={() => setSelectedRoles(prev => 
                  prev.includes(role) 
                    ? prev.filter(r => r !== role)
                    : [...prev, role]
                )}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedRoles.includes(role)
                    ? 'bg-primary text-white'
                    : 'bg-surface hover:bg-surface/70'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Growth Chart */}
        <div className="bg-surface/50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ background: '#1f2937', border: 'none' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#6366f1" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="newUsers" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Role Distribution Chart */}
        <div className="bg-surface/50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Role Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={filteredRoleData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {filteredRoleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1f2937', border: 'none' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserStats;