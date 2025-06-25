//src/pages/AboutUs/hooks/ErrorBoundary.jsx
import { useEffect, useState } from "react";
import { FaRocket } from "react-icons/fa";

export const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      console.error('Error caught by boundary:', error);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', color: '#ef4444', padding: '2rem' }}>
        <FaRocket size={48} />
        <h2>Oops! Something went wrong</h2>
        <p>We're working to fix this issue. Please try refreshing the page.</p>
        <button onClick={() => setHasError(false)} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: '#0e3b39', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
          Try Again
        </button>
      </div>
    );
  }

  return children;
};