import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, BookOpen, Building, Calendar, Github, Linkedin } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  course: string;
  stream: string;
  completionYear: string;
  university: string;
  linkedin?: string;
  github?: string;
  agreeTerms: boolean;
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const password = watch('password');
  
  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError('');
      setLoading(true);
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: data.name,
        email: data.email,
        course: data.course,
        stream: data.stream,
        completionYear: data.completionYear,
        university: data.university,
        linkedin: data.linkedin || null,
        github: data.github || null,
        createdAt: new Date().toISOString(),
      });

      navigate('/'); // Changed from '/dashboard' to '/'
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  {...register('name', { required: 'Name is required' })}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            {/* Course */}
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                Course
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="course"
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.course ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  {...register('course', { required: 'Course is required' })}
                />
              </div>
              {errors.course && (
                <p className="mt-1 text-sm text-red-600">{errors.course.message}</p>
              )}
            </div>
            
            {/* Stream */}
            <div>
              <label htmlFor="stream" className="block text-sm font-medium text-gray-700">
                Stream
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  id="stream"
                  className={`block w-full pl-3 pr-10 py-2 border ${
                    errors.stream ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  {...register('stream', { required: 'Stream is required' })}
                >
                  <option value="">Select a stream</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Biomedical">Biomedical</option>
                  <option value="Quantum Computing">Quantum Computing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {errors.stream && (
                <p className="mt-1 text-sm text-red-600">{errors.stream.message}</p>
              )}
            </div>
            
            {/* Year of Completion */}
            <div>
              <label htmlFor="completionYear" className="block text-sm font-medium text-gray-700">
                Year of Completion
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="completionYear"
                  type="number"
                  min="2000"
                  max="2030"
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.completionYear ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  {...register('completionYear', { required: 'Year of completion is required' })}
                />
              </div>
              {errors.completionYear && (
                <p className="mt-1 text-sm text-red-600">{errors.completionYear.message}</p>
              )}
            </div>
            
            {/* University */}
            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                University Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="university"
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.university ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  {...register('university', { required: 'University name is required' })}
                />
              </div>
              {errors.university && (
                <p className="mt-1 text-sm text-red-600">{errors.university.message}</p>
              )}
            </div>
            
            {/* LinkedIn (Optional) */}
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                LinkedIn Profile (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="linkedin"
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  {...register('linkedin')}
                />
              </div>
            </div>
            
            {/* GitHub (Optional) */}
            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                GitHub Profile (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Github className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="github"
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  {...register('github')}
                />
              </div>
            </div>
          </div>
          
          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              id="agreeTerms"
              type="checkbox"
              className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${
                errors.agreeTerms ? 'border-red-300' : ''
              }`}
              {...register('agreeTerms', { 
                required: 'You must agree to the terms and conditions' 
              })}
            />
            <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                terms and conditions
              </a>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-sm text-red-600">{errors.agreeTerms.message}</p>
          )}
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-4 text-center text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;