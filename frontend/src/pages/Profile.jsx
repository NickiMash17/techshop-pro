import { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const mockActivity = [
  { action: 'Logged in', date: '2024-06-20 10:12' },
  { action: 'Updated profile', date: '2024-06-19 18:45' },
  { action: 'Added item to wishlist', date: '2024-06-18 14:22' },
];

function getPasswordStrength(password) {
  if (!password) return '';
  if (password.length < 6) return 'Weak';
  if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) return 'Strong';
  return 'Medium';
}

export default function Profile() {
  const [profile, setProfile] = useState({ name: '', email: '', avatar: '' });
  const [originalProfile, setOriginalProfile] = useState({ name: '', email: '', avatar: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    api.get('/users/profile')
      .then(res => {
        setProfile({ name: res.data.name, email: res.data.email, avatar: res.data.avatar });
        setOriginalProfile({ name: res.data.name, email: res.data.email, avatar: res.data.avatar });
        setAvatar(res.data.avatar ? `${res.data.avatar.startsWith('http') ? '' : ''}${res.data.avatar}` : null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to load profile');
        setLoading(false);
      });
  }, []);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (message || error || avatarError) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
        setAvatarError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, avatarError]);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Only send changed fields
  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');
    setSaving(true);
    const changedFields = {};
    Object.keys(profile).forEach(key => {
      if (profile[key] !== originalProfile[key]) {
        changedFields[key] = profile[key];
      }
    });
    if (Object.keys(changedFields).length === 0) {
      setError('No changes to save.');
      setSaving(false);
      return;
    }
    try {
      await api.put('/users/profile', changedFields);
      setMessage('Profile updated!');
      setEditMode(false);
      setOriginalProfile(profile);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  // Password change logic (placeholder, not functional)
  const handlePasswordChange = e => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMessage('Passwords do not match');
      return;
    }
    setPasswordMessage('Password change is not implemented. Use reset password.');
  };

  // Avatar upload with validation and preview
  const handleAvatarChange = async e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setAvatarError('Only image files are allowed.');
        return;
      }
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setAvatarError('File size must be less than 2MB.');
        return;
      }
      setAvatarPreview(URL.createObjectURL(file));
      setAvatarLoading(true);
      setMessage('');
      setError('');
      setAvatarError('');
      const formData = new FormData();
      formData.append('avatar', file);
      try {
        const res = await api.post('/users/profile/avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setAvatar(res.data.avatar);
        setProfile(prev => ({ ...prev, avatar: res.data.avatar }));
        setOriginalProfile(prev => ({ ...prev, avatar: res.data.avatar }));
        setMessage('Avatar updated!');
        setAvatarPreview(null);
      } catch (err) {
        let msg = 'Failed to upload avatar';
        if (err.response?.data?.message) msg = err.response.data.message;
        else if (err.message) msg = err.message;
        setAvatarError(msg + ' (Check backend logs and uploads directory permissions)');
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64 bg-gradient-to-br from-background to-surface">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      <span className="ml-2 text-primary">Loading profile...</span>
    </div>
  );

  // Avatar URL logic
  const avatarUrl = avatarPreview
    ? avatarPreview
    : avatar
      ? (avatar.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:3001'}${avatar}` : avatar)
      : null;

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-background px-2 py-8">
      <div className="max-w-lg w-full bg-surface/80 rounded-2xl shadow-xl border border-white/10 p-6 sm:p-10 flex flex-col gap-8">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-2 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary blur-sm opacity-30" />
            <div className="relative w-full h-full rounded-full bg-surface flex items-center justify-center border-4 border-primary/40 shadow-glow overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" onError={() => setAvatar(null)} />
              ) : (
                <span className="text-3xl sm:text-4xl font-bold text-gradient select-none">
                  {profile.name ? profile.name[0].toUpperCase() : '?'}
                </span>
              )}
              <label
                className="absolute bottom-2 right-2 bg-primary/90 text-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-secondary transition-all duration-300 border-2 border-white"
                title="Upload a new avatar"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter') fileInputRef.current.click(); }}
                aria-label="Upload a new avatar"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={avatarLoading}
                  ref={fileInputRef}
                  aria-label="Upload avatar"
                />
                {avatarLoading ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 19.5V7.125c0-.621.504-1.125 1.125-1.125h3.38c.414 0 .788-.252.94-.64l.57-1.52A1.125 1.125 0 019.23 3.75h5.54c.488 0 .926.308 1.09.765l.57 1.52c.152.388.526.64.94.64h3.38c.621 0 1.125.504 1.125 1.125V19.5a1.125 1.125 0 01-1.125 1.125H3.375A1.125 1.125 0 012.25 19.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
                  </svg>
                )}
              </label>
            </div>
            {avatarError && <div className="form-error text-center mt-2 animate-fade-in-up" style={{maxWidth:'16rem'}}>{avatarError}</div>}
            <div className="text-xs text-gray-400 mt-2 text-center">JPG, PNG, GIF. Max 2MB.</div>
          </div>
          <div className="py-2" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gradient mb-0 tracking-tight">{profile.name || 'My Profile'}</h2>
          <p className="text-gray-400 text-sm mb-2">Manage your account information</p>
        </div>
        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
          <div className="form-group">
            <label className="form-label text-gray-300 mb-1">Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
              className="input-field bg-surface/80"
              autoComplete="name"
              disabled={!editMode}
            />
          </div>
          <div className="form-group">
            <label className="form-label text-gray-300 mb-1">Email</label>
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
              className="input-field bg-surface/80"
              autoComplete="email"
              type="email"
              disabled={!editMode}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            {editMode ? (
              <>
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={saving || JSON.stringify(profile) === JSON.stringify(originalProfile)}
                >
                  {saving ? (
                    <span className="flex items-center justify-center"><svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Saving...</span>
                  ) : 'Save'}
                </button>
                <button
                  type="button"
                  className="btn-secondary w-full"
                  onClick={() => setEditMode(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn-primary w-full"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
        {(message || error) && (
          <div className="w-full max-w-md mx-auto mt-2">
            {message && <div className="form-success text-center mb-2 animate-fade-in-up">{message}</div>}
            {error && <div className="form-error text-center mb-2 animate-fade-in-up">{error}</div>}
          </div>
        )}
        {/* Password Section */}
        <div className="border-t border-white/10 my-2" />
        <div className="w-full max-w-md mx-auto flex flex-col gap-2 items-center">
          <h3 className="text-lg font-semibold text-gradient mb-1">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="w-full space-y-3">
            <div className="form-group">
              <label className="form-label text-gray-300 mb-1">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field bg-surface/80"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                disabled
                placeholder="Use reset password feature"
              />
              {newPassword && (
                <div className={`mt-1 text-xs font-semibold ${getPasswordStrength(newPassword) === 'Strong' ? 'text-green-400' : getPasswordStrength(newPassword) === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{getPasswordStrength(newPassword)} password</div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label text-gray-300 mb-1">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field bg-surface/80"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                disabled
                placeholder="Use reset password feature"
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(v => !v)} disabled />
              <label htmlFor="showPassword" className="text-sm text-gray-400 select-none">Show Password</label>
            </div>
            <div className="py-2" />
            {passwordMessage && <div className="form-error text-center mb-2">{passwordMessage}</div>}
            <Link to="/forgot-password" className="btn-secondary w-full text-center mt-1" title="Reset your password via email">
              Reset Password
            </Link>
          </form>
        </div>
        {/* Recent activity */}
        <div className="border-t border-white/10 my-2" />
        <div className="w-full max-w-md mx-auto pb-2 pt-2">
          <h3 className="text-lg font-semibold text-gradient mb-3">Recent Activity</h3>
          <ul className="space-y-2">
            {mockActivity.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 bg-surface/60 rounded-xl px-4 py-2 shadow-glow">
                <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse-glow"></span>
                <span className="text-white font-medium">{item.action}</span>
                <span className="text-xs text-gray-400 ml-auto">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 