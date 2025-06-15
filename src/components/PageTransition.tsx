
import React, { ReactNode, useEffect } from 'react';
import AOS from 'aos';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  useEffect(() => {
    // Initialize AOS with mobile-optimized settings
    AOS.init({
      duration: 400,
      once: true,
      offset: 10,
      delay: 50,
      easing: 'ease-out-cubic',
      disable: window.innerWidth < 640 // Disable on mobile for better performance
    });

    // Refresh AOS when the component mounts
    AOS.refresh();

    // Handle scroll events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default to improve scrolling performance
      e.stopPropagation();
    };

    // Add passive event listener for better scrolling performance
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full" style={{
      transform: 'translateZ(0)',
      WebkitTransform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: 1000,
      WebkitPerspective: 1000,
      WebkitBackfaceVisibility: 'hidden'
    }}>
      <div 
        data-aos="fade-in" 
        data-aos-duration="300"
        data-aos-easing="ease-out-cubic"
        className="relative w-full h-full"
        style={{
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform, opacity'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
