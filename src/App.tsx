import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DatasetDirectory from './pages/DatasetDirectory';
import DatasetDetail from './pages/DatasetDetail';
import DatasetForm from './pages/DatasetForm';
import RepositoryList from './pages/Repositories/RepositoryList';
import RepositoryForm from './pages/Repositories/RepositoryForm';
import RepositoryDetail from './pages/RepositoryDetail';
import ResearcherSearch from './pages/ResearcherSearch';
import ProviderProfile from './pages/ProviderProfile';
import JobListings from './pages/JobListings';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSettings from './pages/Settings/ProfileSettings';
import BillingSettings from './pages/Settings/BillingSettings';
import NewProject from './pages/Projects/NewProject';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/datasets" element={<DatasetDirectory />} />
            <Route path="/datasets/new" element={<DatasetForm />} />
            <Route path="/datasets/:id/edit" element={<DatasetForm />} />
            <Route path="/datasets/:id" element={<DatasetDetail />} />
            <Route path="/repositories" element={<RepositoryList />} />
            <Route path="/repositories/new" element={<RepositoryForm />} />
            <Route path="/repositories/:id" element={<RepositoryDetail />} />
            <Route path="/researchers" element={<ResearcherSearch />} />
            <Route path="/researchers/:id" element={<ProviderProfile />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects/new" element={<NewProject />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/profile"
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/billing"
              element={
                <ProtectedRoute>
                  <BillingSettings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;