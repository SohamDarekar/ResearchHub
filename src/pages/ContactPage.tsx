import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {isSuccess ? (
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl backdrop-blur-sm bg-opacity-90">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600">Thank you for contacting us. You will be redirected to the home page in 5 seconds.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
              <p className="text-lg text-gray-600">We'd love to hear from you. Send us a message!</p>
              <p className="text-sm text-indigo-600 mt-2">We typically respond within 24-48 hours.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 backdrop-blur-sm bg-opacity-90">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3
                               bg-gray-50 text-gray-900 placeholder-gray-400
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition duration-200 ease-in-out
                               hover:border-blue-400 hover:bg-white"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john.doe@example.com"
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3
                               bg-gray-50 text-gray-900 placeholder-gray-400
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition duration-200 ease-in-out
                               hover:border-blue-400 hover:bg-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="How can we help you?"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3
                             bg-gray-50 text-gray-900 placeholder-gray-400
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition duration-200 ease-in-out
                             hover:border-blue-400 hover:bg-white"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Please describe your inquiry in detail..."
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3
                             bg-gray-50 text-gray-900 placeholder-gray-400
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition duration-200 ease-in-out
                             hover:border-blue-400 hover:bg-white"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                             text-white font-medium rounded-lg shadow-lg
                             hover:from-blue-700 hover:to-indigo-700 
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                             transform transition duration-200 ease-in-out hover:scale-105"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
