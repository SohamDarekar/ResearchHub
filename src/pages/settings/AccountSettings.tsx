import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';

interface AccountSettingsProps {
  user: User;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [emailPreferences, setEmailPreferences] = useState({
    notifications: true,
    newsletter: false,
    updates: true
  });

  const handleEmailPreferencesChange = async (key: string) => {
    setEmailPreferences(prev => {
      const newPreferences = { ...prev, [key]: !prev[key as keyof typeof prev] };
      return newPreferences;
    });
    
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        emailPreferences: emailPreferences
      });
      toast.success('Preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update preferences');
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'users', user.uid));
        await user.delete();
        toast.success('Account deleted successfully');
      } catch (error) {
        toast.error('Failed to delete account');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500">Manage your account preferences and settings</p>
      </div>

      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Email Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Notifications</h4>
                <p className="text-sm text-gray-500">Receive notifications about your research updates</p>
              </div>
              <Switch
                checked={emailPreferences.notifications}
                onCheckedChange={() => handleEmailPreferencesChange('notifications')}
                className="bg-blue-600 hover:bg-blue-700"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Newsletter</h4>
                <p className="text-sm text-gray-500">Subscribe to our monthly newsletter</p>
              </div>
              <Switch
                checked={emailPreferences.newsletter}
                onCheckedChange={() => handleEmailPreferencesChange('newsletter')}
                className="bg-blue-600 hover:bg-blue-700"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Platform Updates</h4>
                <p className="text-sm text-gray-500">Get notified about platform changes and updates</p>
              </div>
              <Switch
                checked={emailPreferences.updates}
                onCheckedChange={() => handleEmailPreferencesChange('updates')}
                className="bg-blue-600 hover:bg-blue-700"
              />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h3>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 text-base font-medium bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm transition-colors duration-200"
          >
            {loading ? <Loader className="h-5 w-5 animate-spin mr-2" /> : null}
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
