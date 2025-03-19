import React from 'react';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your components
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

const API_URL = process.env.REACT_APP_API_URL;
console.log("API URL:", API_URL);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary: ", error);
    console.error("Error info: ", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong!</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
