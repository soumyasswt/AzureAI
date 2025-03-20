const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://codesensei-ashy.vercel.app/api/login', { email, password });
  
      const { token, user } = response.data;  // Simplified destructuring
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userProfile', JSON.stringify(user));
  
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);  // Handle error more gracefully
    }
  };
  