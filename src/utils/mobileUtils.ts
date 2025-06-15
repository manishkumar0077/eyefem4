// This utility file contains helper functions for handling mobile-specific issues

export const setupMobileViewport = () => {
  // Set viewport height variable for mobile browsers
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // Initial set
  setVh();

  // Update on resize
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', setVh);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', setVh);
    window.removeEventListener('orientationchange', setVh);
  };
};

export const enableSmoothScrolling = () => {
  // Add smooth scrolling class to html element
  document.documentElement.classList.add('smooth-scroll');
  
  // Disable overscroll behavior on body
  document.body.style.overscrollBehaviorY = 'none';
  
  // Enable hardware acceleration for smoother scrolling
  document.body.style.transform = 'translateZ(0)';
  document.body.style.WebkitTransform = 'translateZ(0)';
};

export const disablePullToRefresh = () => {
  // Prevent pull-to-refresh behavior on mobile
  document.body.style.overscrollBehaviorY = 'contain';
  
  const preventDefault = (e: TouchEvent) => {
    if (e.cancelable && !e.defaultPrevented) {
      e.preventDefault();
    }
  };
  
  // Add touch event listeners to prevent pull-to-refresh
  document.addEventListener('touchmove', preventDefault, { passive: false });
  
  // Cleanup function
  return () => {
    document.removeEventListener('touchmove', preventDefault);
  };
};

export const initializeMobileOptimizations = () => {
  const cleanupFunctions: Array<() => void> = [];
  
  // Only apply these optimizations on mobile devices
  if (window.innerWidth <= 1024) {
    cleanupFunctions.push(setupMobileViewport());
    cleanupFunctions.push(disablePullToRefresh());
    enableSmoothScrolling();
    
    // Add a class to the html element to enable mobile-specific styles
    document.documentElement.classList.add('is-mobile');
  }
  
  // Return a cleanup function that removes all event listeners
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup && cleanup());
    document.documentElement.classList.remove('is-mobile');
    document.documentElement.classList.remove('smooth-scroll');
  };
};
