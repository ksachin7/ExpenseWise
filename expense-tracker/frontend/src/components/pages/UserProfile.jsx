import React from 'react';
import {useUser} from '../hooks/useUser';
import { Heading, Row } from '../ui';

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
    <Row>
      <Heading>User Profile</Heading>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
    </Row>
  );
};

export default UserProfile;
