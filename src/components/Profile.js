import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    try {
      const userProfile = localStorage.getItem('userProfile');
      setProfile(userProfile ? JSON.parse(userProfile) : {}); // Fallback to empty object
    } catch (error) {
      console.error('Error parsing user profile:', error);
      setProfile({}); // Prevent app crash
    }
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {profile && Object.keys(profile).length > 0 ? (
        <div>
          <p><strong>Name:</strong> {profile.name || 'N/A'}</p>
          <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
          {/* Add other profile fields here */}
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default Profile;
