import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance'; // Ensure axiosInstance is correctly set up
import Challenge from '../components/Challenge';

const Dashboard = () => {
  const [profile, setProfile] = useState(null); // State to hold user profile
  const [loading, setLoading] = useState(false); // State to show loading status
  const [error, setError] = useState(null); // State to show error messages

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Show loading while fetching data
      setError(null); // Clear previous errors

      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axiosInstance.get('/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data); // Update profile state with the fetched data
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProfile();
  }, []); // Runs only once when the component mounts

  return (
    <div>
      <h2>Welcome to the Coding Dashboard</h2>

      {/* Loading state */}
      {loading && <p>Loading your profile...</p>}

      {/* Error state */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Profile data */}
      {profile ? (
        <div>
          <h3>Hello, {profile.name}!</h3>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        !loading && <p>No profile data available.</p>
      )}

      {/* Render the Challenge component */}
      <Challenge />
    </div>
  );
};

export default Dashboard;
