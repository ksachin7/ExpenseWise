import React from 'react';
import {useUser} from '../hooks/useUser';

const UserProfile = () => {
  const userId = 1; // Specify the user ID here
  const { isLoading, user, isAuthenticated } = useUser(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default UserProfile;
