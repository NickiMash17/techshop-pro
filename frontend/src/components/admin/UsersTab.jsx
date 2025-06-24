import React, { useState, useMemo } from 'react';
import UserModal from './modals/UserModal';
import UserActivityLog from './UserActivityLog';
import UserStats from './UserStats';
import toast from 'react-hot-toast';

const UserRole = ({ role }) => {
  const styles = {
    'Admin': 'bg-purple-500/20 text-purple-500',
    'User': 'bg-blue-500/20 text-blue-500',
    'Vendor': 'bg-green-500/20 text-green-500'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${styles[role]}`}>
      {role}
    </span>
  );
};

const UsersTab = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      lastLogin: '2025-06-21',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      lastLogin: '2025-06-20',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Vendor',
      lastLogin: '2025-06-19',
      status: 'Active'
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [activities, setActivities] = useState([
    {
      description: 'User John Doe logged in',
      timestamp: '2 minutes ago'
    },
    {
      description: 'New user Jane Smith registered',
      timestamp: '1 hour ago'
    }
  ]);
  
  const ITEMS_PER_PAGE = 5;

  // Sort and filter users
  const sortedAndFilteredUsers = useMemo(() => {
    return users
      .filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
  }, [users, searchQuery, sortConfig]);

  // Paginate users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedAndFilteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedAndFilteredUsers, currentPage]);

  const totalPages = Math.ceil(sortedAndFilteredUsers.length / ITEMS_PER_PAGE);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const logActivity = (description) => {
    setActivities(prev => [{
      description,
      timestamp: 'Just now'
    }, ...prev]);
  };

  const handleBulkDelete = () => {
    if (selectedUsers.size === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedUsers.size} users?`)) {
      setUsers(prev => prev.filter(user => !selectedUsers.has(user.id)));
      logActivity(`Deleted ${selectedUsers.size} users`);
      toast.success(`${selectedUsers.size} users deleted successfully`);
      setSelectedUsers(new Set());
    }
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === paginatedUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(paginatedUsers.map(user => user.id)));
    }
  };

  const toggleSelectUser = (userId) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleAddUser = (userData) => {
    setUsers(prev => [...prev, { ...userData, id: Date.now() }]);
    logActivity(`Added new user ${userData.name}`);
    toast.success('User added successfully');
  };

  const handleEditUser = (userData) => {
    setUsers(prev => prev.map(user => 
      user.id === userData.id ? userData : user
    ));
    logActivity(`Updated user ${userData.name}`);
    toast.success('User updated successfully');
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const userToDelete = users.find(u => u.id === userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
      logActivity(`Deleted user ${userToDelete.name}`);
      toast.success('User deleted successfully');
    }
  };

  const handleExportUsers = () => {
    try {
      const exportData = users.map(({ id, name, email, role, lastLogin, status }) => ({
        id,
        name,
        email,
        role,
        lastLogin,
        status
      }));

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      logActivity('Exported users data');
      toast.success('Users data exported successfully');
    } catch {
      toast.error('Failed to export users data');
    }
  };

  return (
    <div>
      {/* Add Stats */}
      <UserStats users={users} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Users Management</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleExportUsers}
            className="px-4 py-2 bg-surface rounded-lg hover:bg-surface/70 transition-colors"
          >
            Export
          </button>
          <button 
            onClick={() => {
              setSelectedUser(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add User
          </button>
        </div>
      </div>

      {/* Add bulk actions */}
      {selectedUsers.size > 0 && (
        <div className="mb-4 p-4 bg-surface/50 rounded-lg flex items-center justify-between">
          <span>{selectedUsers.size} users selected</span>
          <button
            onClick={handleBulkDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Delete Selected
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface text-left">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={selectedUsers.size === paginatedUsers.length}
                  onChange={toggleSelectAll}
                  className="rounded bg-surface border-gray-600"
                />
              </th>
              {[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'role', label: 'Role' },
                { key: 'lastLogin', label: 'Last Login' },
                { key: 'status', label: 'Status' }
              ].map(column => (
                <th 
                  key={column.key}
                  className="p-4 font-medium cursor-pointer hover:text-primary"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {sortConfig.key === column.key && (
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d={
                            sortConfig.direction === 'asc' 
                              ? "M5 15l7-7 7 7" 
                              : "M19 9l-7 7-7-7"
                          }
                        />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-surface/50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(user.id)}
                    onChange={() => toggleSelectUser(user.id)}
                    className="rounded bg-surface border-gray-600"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    {user.name}
                  </div>
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <UserRole role={user.role} />
                </td>
                <td className="p-4">{user.lastLogin}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                      className="p-2 hover:text-primary transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 hover:text-red-500 transition-colors"
                    >
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

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, sortedAndFilteredUsers.length)} of {sortedAndFilteredUsers.length} users
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-surface hover:bg-surface/70 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg ${
                currentPage === page 
                  ? 'bg-primary text-white' 
                  : 'bg-surface hover:bg-surface/70'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-surface hover:bg-surface/70 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add activity log */}
      <UserActivityLog activities={activities} />

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSubmit={selectedUser ? handleEditUser : handleAddUser}
      />
    </div>
  );
};

export default UsersTab;