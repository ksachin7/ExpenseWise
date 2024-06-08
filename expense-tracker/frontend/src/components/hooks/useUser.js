import { useState, useEffect } from 'react';

const useUser = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const BASE_URI= 'http://localhost:8080'
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URI}/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const isAuthenticated = user?.role !== '';
//   const isAuthenticated = user?.role === 'authenticated';
//   console.log(user)
  return { isLoading, user, isAuthenticated };
};

export {useUser};
