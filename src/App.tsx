import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UploadPaperPage from './pages/UploadPaperPage';
import PaperDetailsPage from './pages/PaperDetailsPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import SubmissionGuidelinesPage from './pages/SubmissionGuidelinesPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminPapers from './pages/admin/Papers';
import AdminUsers from './pages/admin/Users';

// Add router configuration
const routerOptions = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <Router basename="/ResearchHub" {...routerOptions}>
      <Toaster position="top-center" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="upload" element={<UploadPaperPage />} />
          <Route path="guidelines" element={<SubmissionGuidelinesPage />} />
          <Route path="papers/:id" element={<PaperDetailsPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="papers" element={<AdminPapers />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;