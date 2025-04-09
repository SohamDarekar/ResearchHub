import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface SecuritySettingsProps {
  user: any;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ user }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!passwords.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!validatePassword(passwords.newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement password change logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      alert('Password changed successfully');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setErrors({ submit: 'Failed to change password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="text-red-500 text-sm">{errors.submit}</div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <Input
            type="password"
            value={passwords.currentPassword}
            onChange={(e) => {
              setPasswords({ ...passwords, currentPassword: e.target.value });
              setErrors({ ...errors, currentPassword: '' });
            }}
            className={`mt-1 ${errors.currentPassword ? 'border-red-500' : ''}`}
          />
          {errors.currentPassword && (
            <div className="text-red-500 text-sm mt-1">{errors.currentPassword}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <Input
            type="password"
            value={passwords.newPassword}
            onChange={(e) => {
              setPasswords({ ...passwords, newPassword: e.target.value });
              setErrors({ ...errors, newPassword: '' });
            }}
            className={`mt-1 ${errors.newPassword ? 'border-red-500' : ''}`}
          />
          {errors.newPassword && (
            <div className="text-red-500 text-sm mt-1">{errors.newPassword}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <Input
            type="password"
            value={passwords.confirmPassword}
            onChange={(e) => {
              setPasswords({ ...passwords, confirmPassword: e.target.value });
              setErrors({ ...errors, confirmPassword: '' });
            }}
            className={`mt-1 ${errors.confirmPassword ? 'border-red-500' : ''}`}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
          )}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Changing Password...' : 'Change Password'}
        </Button>
      </form>
    </div>
  );
};

export default SecuritySettings;
