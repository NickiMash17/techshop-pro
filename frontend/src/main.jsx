import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './AppWrapper';

// Error handling for the root render
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

// Add error boundary at the root level
const renderApp = () => {
  try {
    root.render(
      <AppWrapper />
    );
  } catch (error) {
    console.error('Error rendering app:', error);
    // Fallback render
    root.render(
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: 'white', 
        backgroundColor: '#1e293b',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <h1>Something went wrong</h1>
        <p>Please refresh the page</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Refresh Page
        </button>
      </div>
    );
  }
};

renderApp();