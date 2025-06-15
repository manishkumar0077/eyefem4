import { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useLayoutEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-quill/dist/quill.snow.css"; // Add Quill CSS
import "@/styles/quill-editor.css"; // Add our custom Quill styles

import ScrollToTop from "@/components/ScrollToTop";
import { smoothScrollTo, initSmoothScrolling } from "@/utils/scrollUtils";

// Import pages
import LandingPage from "@/pages/LandingPage";
import SpecialtyChoice from "@/pages/SpecialtyChoice";
import NotFound from "@/pages/NotFound";
import Developers from "@/pages/Developers";
import Gallery from "@/pages/Gallery";

// EyeCare pages
import EyeCareHome from "@/pages/eyecare/Home";
import EyeCareConditions from "@/pages/eyecare/Conditions";
import EyeCareDoctor from "@/pages/eyecare/Doctor";
import EyeCareAppointment from "@/pages/eyecare/Appointment";

// Gynecology pages
import GynecologyHome from "@/pages/gynecology/Home";
import GynecologyHealth from "@/pages/gynecology/Health";
import GynecologyDoctor from "@/pages/gynecology/Doctor";
import GynecologyAppointment from "@/pages/gynecology/Appointment";

// Admin pages
import AdminLogin from "@/pages/admin/Login";
import ForgotPassword from "@/pages/admin/ForgotPassword";
import ResetPassword from "@/pages/admin/ResetPassword";
import ProtectedRoute from "@/components/ProtectedRoute";

// Lazy-loaded pages to improve initial load time
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const ExportData = lazy(() => import('@/pages/admin/ExportData'));

// Auth Provider
import { AuthProvider } from '@/hooks/useAuth';
import EditContent from "./pages/admin/EditContent";

// Initialize AOS with mobile optimizations
useEffect(() => {
  const initializeAOS = async () => {
    const AOS = (await import('aos')).default;
    const isMobile = window.innerWidth < 768;
    
    AOS.init({
      duration: 600, // Slightly faster animations on mobile
      once: true, // Only animate once
      easing: 'ease-out-cubic', // Smoother easing
      mirror: false, // Don't mirror animations on scroll up
      offset: isMobile ? 20 : 100, // Smaller offset on mobile
      delay: isMobile ? 50 : 0, // Small delay on mobile for better performance
      disable: isMobile ? 'mobile' : false, // Disable on mobile if needed
    });
    
    // Refresh AOS on window resize
    const handleResize = () => {
      AOS.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial refresh after all elements are loaded
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 1000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  };
  
  initializeAOS();
}, []);
const handleResize = () => {
  AOS.refresh();
};

// Add resize event listener
window.addEventListener('resize', handleResize);

// Cleanup
document.addEventListener('DOMContentLoaded', () => {
  AOS.refresh();
});

// Add smooth scrolling to the entire app
const SmoothScroll = () => {
  useEffect(() => {
    // Apply smooth scrolling to all anchor links
    const cleanup = initSmoothScrolling();
    
    // Re-apply when route changes
    const handleRouteChange = () => {
      requestAnimationFrame(() => {
        initSmoothScrolling();
      });
    };
    
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      cleanup();
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
  
  return null;
};

function App() {
  return (
    <AuthProvider>
      <div className="App min-h-screen flex flex-col">
        <ScrollToTop />
        <SmoothScroll />
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<LandingPage />} />
          {/* Temporarily hidden per client request
          <Route path="/specialties" element={<SpecialtyChoice />} />
          */}
          <Route path="/gallery" element={<Gallery />} />

          {/* Developers page */}
          <Route path="/developers" element={<Developers />} />

          {/* EyeCare routes */}
          <Route path="/eyecare" element={<EyeCareHome />} />
          <Route path="/eyecare/conditions" element={<EyeCareConditions />} />
          <Route path="/eyecare/doctor" element={<EyeCareDoctor />} />
          <Route path="/eyecare/appointment" element={<EyeCareAppointment />} />

          {/* Gynecology routes */}
          <Route path="/gynecology" element={<GynecologyHome />} />
          <Route path="/gynecology/health" element={<GynecologyHealth />} />
          <Route path="/gynecology/doctor" element={<GynecologyDoctor />} />
          <Route path="/gynecology/appointment" element={<GynecologyAppointment />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          <Route path="/admin/dashboard" element={
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/admin/export-data" element={
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <ProtectedRoute>
                <ExportData />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/admin/edit-content" element={
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <ProtectedRoute>
                <EditContent />
              </ProtectedRoute>
            </Suspense>
          } />
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
