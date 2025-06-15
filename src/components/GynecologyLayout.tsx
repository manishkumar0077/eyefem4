import { ReactNode, useEffect } from 'react';
import GynecologyNavbar from './GynecologyNavbar';
import Footer from './Footer';
import PageTransition from './PageTransition';
import { useLocation } from 'react-router-dom';

interface GynecologyLayoutProps {
  children: ReactNode;
}

const GynecologyLayout = ({ children }: GynecologyLayoutProps) => {
  const location = useLocation();

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Force a reflow to ensure proper rendering on mobile
    const root = document.getElementById('root');
    if (root) {
      root.style.display = 'none';
      root.offsetHeight; // Trigger reflow
      root.style.display = 'block';
    }
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-white relative">
        <GynecologyNavbar />
        <main className="flex-grow w-full pt-16 overflow-x-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            {children}
          </div>
        </main>
        <Footer />
        {/* Elfsight WhatsApp Chat Widget */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="elfsight-app-f5987c20-7de0-4b19-a688-ad23bc2c6457" data-elfsight-app-lazy></div>
        </div>
      </div>
    </PageTransition>
  );
};

export default GynecologyLayout;
