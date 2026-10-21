'use client';

import { useEffect } from 'react';

export function CleanUrl() {
  useEffect(() => {
    // 1. If user loads or reloads with a hash (e.g. /#profile), scroll smoothly and clean the URL immediately
    if (window.location.hash) {
      const targetId = window.location.hash.replace(/^#/, '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // 2. Prevent any subsequent hash from lingering in the browser address bar
    const handleHashChange = () => {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return null;
}
