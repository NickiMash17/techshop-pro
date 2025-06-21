import React from 'react';

const UserActivityLog = ({ activities }) => {
  return (
    <div className="mt-8 bg-surface/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
            <div>
              <p className="text-sm">{activity.description}</p>
              <span className="text-xs text-gray-400">{activity.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivityLog;