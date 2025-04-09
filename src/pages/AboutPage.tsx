import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">About ResearchHub</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Empowering researchers worldwide through open access to academic knowledge
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission Section */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              ResearchHub is dedicated to making academic research more accessible and collaborative.
              We believe in breaking down barriers to knowledge sharing and fostering meaningful
              connections within the academic community.
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Easy paper uploads and sharing
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Collaborative discussions and peer review
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Advanced search functionality
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div className="bg-white rounded-xl shadow-md p-8 md:col-span-2 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Whether you're a seasoned researcher or just starting your academic journey,
              ResearchHub provides the tools and community to support your research endeavors.
            </p>
            <button 
              onClick={() => navigate('/register')} 
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
