import React, { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import { toast } from 'react-hot-toast';
import { Camera, Loader } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';

interface ProfileSettingsProps {
  user: User;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    displayName: user.displayName || '',
    email: user.email || '',
    bio: '',
    institution: '',
    department: '',
    position: '',
    researchInterests: '',
    academicDegree: '',
    publications: '',
    socialLinks: {
      linkedin: '',
      github: '',
      orcid: '',
      researchGate: '',
      googleScholar: ''
    }
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData(prevData => ({
            ...prevData,
            bio: userData.bio || '',
            institution: userData.institution || '',
            department: userData.department || '',
            position: userData.position || '',
            researchInterests: userData.researchInterests || '',
            academicDegree: userData.academicDegree || '',
            publications: userData.publications || '',
            socialLinks: userData.socialLinks || {
              linkedin: '',
              github: '',
              orcid: '',
              researchGate: '',
              googleScholar: ''
            },
            displayName: userData.displayName || user.displayName || '',
            email: user.email || ''
          }));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleImageUpload = async (file: File) => {
    try {
      setLoading(true);
      const storageRef = ref(storage, `profile-images/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      
      await Promise.all([
        user.updateProfile({ photoURL }),
        updateDoc(doc(db, 'users', user.uid), { photoURL })
      ]);
      
      toast.success('Profile picture updated successfully');
    } catch (error) {
      toast.error('Failed to update profile picture');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await Promise.all([
        user.updateProfile({ displayName: formData.displayName }),
        updateDoc(userRef, {
          ...formData,
          updatedAt: new Date().toISOString()
        })
      ]);
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-8">
      <div className="flex items-center space-x-8 mb-8">
        <div className="relative">
          <img
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}`}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700"
          >
            <Camera className="h-5 w-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
          <p className="text-gray-500">Update your profile information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <Input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              value={formData.email}
              disabled
              className="mt-1 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Institution</label>
            <Input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <Input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <Input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Academic Degree</label>
            <Input
              type="text"
              value={formData.academicDegree}
              onChange={(e) => setFormData({ ...formData, academicDegree: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Research Interests</label>
          <Textarea
            value={formData.researchInterests}
            onChange={(e) => setFormData({ ...formData, researchInterests: e.target.value })}
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="mt-1"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Publications</label>
          <Textarea
            value={formData.publications}
            onChange={(e) => setFormData({ ...formData, publications: e.target.value })}
            className="mt-1"
            rows={4}
            placeholder="List your publications here"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Professional Links</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.entries(formData.socialLinks).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <Input
                  type="url"
                  value={value}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: {
                      ...formData.socialLinks,
                      [key]: e.target.value
                    }
                  })}
                  className="mt-1"
                  placeholder={`Enter your ${key} profile URL`}
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? <Loader className="h-5 w-5 animate-spin" /> : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
};

export default ProfileSettings;
