import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

function AppWrapper() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <App />
    </Router>
  );
}

export default AppWrapper;