import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollRestoration() {
  const location = useLocation();
  const isRestoringRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const key = `scroll-${location.pathname}`;
    
    // Set restoration flag to prevent saving during restore
    isRestoringRef.current = true;

    // Restore scroll position
    try {
      const savedPosition = sessionStorage.getItem(key);
      
      if (savedPosition) {
        const { x, y } = JSON.parse(savedPosition);
        setTimeout(() => {
          window.scrollTo(x, y);
          // Allow saving again after restoration completes
          setTimeout(() => {
            isRestoringRef.current = false;
          }, 100);
        }, 200);
      } else {
        window.scrollTo(0, 0);
        // Allow saving immediately for new pages
        setTimeout(() => {
          isRestoringRef.current = false;
        }, 100);
      }
    } catch (error) {
      console.warn('Failed to restore scroll position:', error);
      window.scrollTo(0, 0);
      isRestoringRef.current = false;
    }

    // Debounced scroll handler to prevent excessive saves
    const handleScroll = () => {
      // Don't save while restoring
      if (isRestoringRef.current) return;
      
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Debounce the save operation
      timeoutRef.current = setTimeout(() => {
        try {
          sessionStorage.setItem(key, JSON.stringify({
            x: window.scrollX,
            y: window.scrollY
          }));
        } catch (error) {
          console.warn('Failed to save scroll position:', error);
        }
      }, 150); // Save 150ms after scrolling stops
    };

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Reset restoration flag when component unmounts
      isRestoringRef.current = false;
    };

  }, [location.pathname]);
}