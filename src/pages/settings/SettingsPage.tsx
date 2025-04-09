import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import ProfileSettings from '../settings/ProfileSettings';
import AccountSettings from '../settings/AccountSettings';
import SecuritySettings from '../settings/SecuritySettings';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings user={currentUser} />
          </TabsContent>

          <TabsContent value="account">
            <AccountSettings user={currentUser} />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings user={currentUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
