import React from 'react';
import styled from 'styled-components';
import { useUser } from '../hooks/useUser';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const { user, profileImage } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  // Todo: need to update account ui and to add update profile image option

  const profileImageUrl = profileImage ? profileImage : null;

  return (
    <ProfileContainer>
      <Heading>User Profile</Heading>
      {profileImageUrl && <ProfileImage src={profileImageUrl} alt={`${user.username}'s profile`} />}
      <InfoContainer>
        <InfoItem>
          <strong>Username:</strong> {user.username}
        </InfoItem>
        <InfoItem>
          <strong>Email:</strong> {user.email}
        </InfoItem>
        <InfoItem>
          <strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
        </InfoItem>
        <InfoItem>
          <strong>Role:</strong> {user.role === 'ROLE_USER'? 'user' : 'admin'}
        </InfoItem>
      </InfoContainer>
    </ProfileContainer>
  );
};

export default UserProfile;

// Styled components
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const InfoItem = styled.p`
  /* font-size: 18px; */
  margin: 5px 0;
  strong {
    margin-right: 10px;
  }
`;
