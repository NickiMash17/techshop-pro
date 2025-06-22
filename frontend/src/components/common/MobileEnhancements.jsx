import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const MobileEnhancements = () => {
  useEffect(() => {
    // Prevent zoom on input focus for iOS
    const preventZoom = (e) => {
      // Check if event and target exist
      if (!e || !e.target) {
        return;
      }
      
      try {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
          e.target.style.fontSize = '16px';
        }
      } catch (error) {
        console.warn('Error in preventZoom:', error);
      }
    };

    // Add touch event listeners
    const addTouchSupport = () => {
      try {
        // Add touch feedback to buttons
        const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .nav-link');
        
        buttons.forEach(button => {
          button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.95)';
          });
          
          button.addEventListener('touchend', () => {
            button.style.transform = 'scale(1)';
          });
        });

        // Add swipe support for mobile navigation
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        const handleTouchStart = (e) => {
          if (!e || !e.touches || !e.touches[0]) {
            return;
          }
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
          if (!e || !e.changedTouches || !e.changedTouches[0]) {
            return;
          }
          endX = e.changedTouches[0].clientX;
          endY = e.changedTouches[0].clientY;
          
          const diffX = startX - endX;
          const diffY = startY - endY;
          
          // Horizontal swipe detection
          if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
              // Swipe left - could be used for navigation
              console.log('Swipe left detected');
            } else {
              // Swipe right - could be used for navigation
              console.log('Swipe right detected');
            }
          }
        };

        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
      } catch (error) {
        console.warn('Error in addTouchSupport:', error);
      }
    };

    // Optimize images for mobile
    const optimizeImages = () => {
      try {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          // Add loading="lazy" for better performance
          if (!img.loading) {
            img.loading = 'lazy';
          }
          
          // Add error handling
          img.addEventListener('error', () => {
            img.src = '/placeholder-image.jpg';
            img.alt = 'Image not available';
          });
        });
      } catch (error) {
        console.warn('Error in optimizeImages:', error);
      }
    };

    // Handle orientation changes
    const handleOrientationChange = () => {
      try {
        // Reload page on orientation change to fix layout issues
        if (window.innerHeight > window.innerWidth) {
          // Portrait mode
          document.body.classList.add('portrait');
          document.body.classList.remove('landscape');
        } else {
          // Landscape mode
          document.body.classList.add('landscape');
          document.body.classList.remove('portrait');
        }
      } catch (error) {
        console.warn('Error in handleOrientationChange:', error);
      }
    };

    // Initialize mobile enhancements
    try {
      addTouchSupport();
      optimizeImages();
      handleOrientationChange();
    } catch (error) {
      console.warn('Error initializing mobile enhancements:', error);
    }

    // Add event listeners
    document.addEventListener('focusin', preventZoom);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    // Cleanup
    return () => {
      try {
        document.removeEventListener('focusin', preventZoom);
        window.removeEventListener('orientationchange', handleOrientationChange);
        window.removeEventListener('resize', handleOrientationChange);
      } catch (error) {
        console.warn('Error in cleanup:', error);
      }
    };
  }, []);

  return (
    <Helmet>
      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="TechShop Pro" />
      <meta name="application-name" content="TechShop Pro" />
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
      
      {/* PWA Meta Tags */}
      <meta name="manifest" content="/manifest.json" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Preconnect to external domains for better performance */}
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Mobile-specific CSS */}
      <style>
        {`
          /* Mobile-specific styles */
          @media (max-width: 768px) {
            /* Prevent horizontal scroll */
            body {
              overflow-x: hidden;
              width: 100%;
            }
            
            /* Improve touch targets */
            button, a, input, select, textarea {
              min-height: 44px;
              min-width: 44px;
            }
            
            /* Optimize text for mobile reading */
            p, h1, h2, h3, h4, h5, h6 {
              line-height: 1.6;
            }
            
            /* Improve form elements */
            input, textarea, select {
              font-size: 16px !important;
              -webkit-appearance: none;
              border-radius: 8px;
            }
            
            /* Remove default button styles on iOS */
            button {
              -webkit-appearance: none;
              border-radius: 8px;
            }
            
            /* Improve scrolling */
            * {
              -webkit-overflow-scrolling: touch;
            }
            
            /* Optimize images */
            img {
              max-width: 100%;
              height: auto;
            }
            
            /* Improve modal on mobile */
            .modal-content {
              margin: 1rem;
              max-height: calc(100vh - 2rem);
              overflow-y: auto;
            }
            
            /* Improve navigation on mobile */
            .nav-link {
              padding: 0.75rem 1rem;
              margin: 0.25rem 0;
            }
            
            /* Improve cards on mobile */
            .glass-card {
              margin: 0.5rem 0;
            }
            
            /* Improve buttons on mobile */
            .btn-primary, .btn-secondary {
              width: 100%;
              margin: 0.5rem 0;
            }
            
            /* Improve grid layouts */
            .grid {
              gap: 1rem;
            }
            
            /* Improve spacing */
            .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }
          
          /* Very small screens */
          @media (max-width: 480px) {
            .container {
              padding-left: 0.75rem;
              padding-right: 0.75rem;
            }
            
            .glass-card {
              margin: 0.25rem 0;
            }
            
            .btn-primary, .btn-secondary {
              padding: 0.75rem 1rem;
              font-size: 0.875rem;
            }
          }
          
          /* Landscape orientation */
          @media (orientation: landscape) and (max-height: 500px) {
            .hero-section {
              min-height: 100vh;
              padding: 2rem 0;
            }
            
            .modal-content {
              max-height: 90vh;
            }
          }
          
          /* High DPI displays */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            img {
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
            }
          }
          
          /* Reduced motion */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            :root {
              color-scheme: dark;
            }
          }
          
          /* Safe area support for notched devices */
          @supports (padding: max(0px)) {
            .safe-area-top {
              padding-top: max(1rem, env(safe-area-inset-top));
            }
            
            .safe-area-bottom {
              padding-bottom: max(1rem, env(safe-area-inset-bottom));
            }
            
            .safe-area-left {
              padding-left: max(1rem, env(safe-area-inset-left));
            }
            
            .safe-area-right {
              padding-right: max(1rem, env(safe-area-inset-right));
            }
          }
          
          /* Focus styles for accessibility */
          *:focus-visible {
            outline: 2px solid #8B5CF6;
            outline-offset: 2px;
          }
          
          /* Loading states */
          .loading {
            opacity: 0.7;
            pointer-events: none;
          }
          
          /* Error states */
          .error {
            border-color: #ef4444;
            color: #ef4444;
          }
          
          /* Success states */
          .success {
            border-color: #10b981;
            color: #10b981;
          }
        `}
      </style>
    </Helmet>
  );
};

export default MobileEnhancements; 