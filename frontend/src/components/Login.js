import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true); // Start loading
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });

      // Save token & user profile
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userProfile', JSON.stringify(response.data.user));

      // Redirect to profile page
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email"
          required 
        />
        
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter your password"
          required 
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

// Basic styles for a better UI
const styles = {
  container: { textAlign: 'center', maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  button: { padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' },
  error: { color: 'red' },
};

export default Login;
