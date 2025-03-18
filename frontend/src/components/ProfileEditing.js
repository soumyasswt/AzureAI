import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileEditing = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return; // Stop execution if token is missing

      try {
        const response = await axios.get('http://localhost:3000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setName(response.data.name || '');
        setEmail(response.data.email || '');
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load profile.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');

    // Validation: Prevent empty values
    if (!name.trim() || !email.trim()) {
      setError('Name and Email cannot be empty.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:3000/api/updateProfile',
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data); // Update profile info
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleProfileUpdate}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileEditing;
