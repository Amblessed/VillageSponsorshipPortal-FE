import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PupilForm from './components/pupil/PupilForm';
import ThankYou from './components/ThankYou';
import HomePage from './components/homepage/Homepage';
import AboutPage from './components/about/AboutPage';
import PupilsPage from './components/pupil/PupilsPage';
import ContactPage from './components/homepage/ContactPage';
import AdminDashboard from './components/homepage/AdminDashboard';
import PupilFullProfile from './components/pupil/PupilFullProfile';
import AboutPageDE from './components/about/AboutPageDE';
import AboutPageIG from './components/about/AboutPageIG';
import PupilViewPage from './components/pupil/PupilViewpage';
import PupilList from "./components/pupil/PupilList";
import DonatePage from "./components/donation/DonatePage";
import DonorsPage from "./components/donation/DonorsPage";
import DashboardContainer from './components/dashboard/DashboardContainer';
import ChristmasImpact from './components/impact/ChristmasImpact';


function App() {


  return (
       <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/about/de" element={<AboutPageDE />} />
      <Route path="/about/ig" element={<AboutPageIG />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/pupils" element={<PupilsPage />} />
      <Route path="/sponsor" element={<PupilsPage />} />
      <Route path="/register" element={<PupilForm />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/pupils" element={<PupilList />} />
      <Route path="/pupil" element={<PupilViewPage />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/donors" element={<DonorsPage />} />
      <Route path="/analytics" element={<DashboardContainer />} />
      <Route path="/impact" element={<ChristmasImpact />} />

      <Route path="/pupils/:id" element={<PupilFullProfile />} />
     {/*  <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} /> */}

    
    </Routes>
  );
}

export default App;
