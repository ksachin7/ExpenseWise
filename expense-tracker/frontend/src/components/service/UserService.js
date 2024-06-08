const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:8080/users', {
      method: 'GET',
      // mode:'no-cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response)
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // console.log(response)
    // return await response;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export default { fetchUsers, createUser, updateUser, deleteUser };
