import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSave } from 'react-icons/fa';
import { IoMdTrash } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import UserService from '../service/UserService';
import styled from 'styled-components';
import { Button, Heading, Form, Input, ButtonIcon, Modal } from '../ui';
import Table from '../ui/Table';
import RadioButton from '../ui/RadioButton';

const Container = styled.div`
  position: relative;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('USER');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setShowForm(true);
    openModal();
  };

  const handleRoleChange = (e) => {
    console.log('prev', selectedRole)
    setSelectedRole(e.target.value);
    console.log(selectedRole)
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await UserService.fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async () => {
    try {
      setEditingUser(false);
      await UserService.createUser({ username, password, email, role: selectedRole });
      fetchUsers();
      setUsername('');
      setPassword('');
      setEmail('');
      setSelectedRole('');
      setShowForm(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async () => {
    try {
      await UserService.updateUser(editingUser.id, { username, password, email, role: selectedRole });
      fetchUsers();
      setUsername('');
      setPassword('');
      setEmail('');
      setSelectedRole('');
      setEditingUser(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (user) => {
    try {
      // console.log(user)
      await UserService.deleteUser(user.id);
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = (user) => {
    setUsername(user.username);
    setPassword(''); // We won't pre-fill the password for security reasons
    setEmail(user.email);
    setEditingUser(user);
    setShowForm(true);
    openModal();
  };

  return (
    <>
      <Container>
        <Heading>User List</Heading>
        <ButtonIcon onClick={handleClick}><FaPlus /> Add User</ButtonIcon>
        {showForm && (
          <>
            <Modal isOpen={isModalOpen} onClose={closeModal} onClick={() => setShowForm(false)}>
              <Form onSubmit={(e) => e.preventDefault()}>
                {/* <Label for="username">Username</Label> */}
                <Input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                {/* <Label for="password">Password</Label> */}
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* <Label for="email">Email</Label> */}
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Flex>
                  <RadioButton
                    id="userRole"
                    name="role"
                    value="USER"
                    checked={selectedRole === 'USER'}
                    onChange={handleRoleChange}
                    label="User"
                  />
                  <RadioButton
                    id="adminRole"
                    name="role"
                    value="ADMIN"
                    checked={selectedRole === 'ADMIN'}
                    onChange={handleRoleChange}
                    label="Admin"
                  />
                </Flex>
                {editingUser ? (
                  <ButtonIcon bg='var(--color-grey-50)' onClick={updateUser}><FaSave /> Update</ButtonIcon>
                ) : (
                  <ButtonIcon bg='var(--color-grey-50)' onClick={createUser}><FaPlus /> Create</ButtonIcon>
                )}
              </Form>
            </Modal>
          </>
        )}
        <Table
          headers={['id', 'username', 'email', 'role']}
          data={users}
          actions={[
            { icon: <MdModeEdit />, label: ` Edit`, color: 'var(--color-green-700)', onClick: editUser },
            { icon: <IoMdTrash />, label: ` Delete`, color: 'red', onClick: deleteUser },
          ]}
        />
      </Container>
    </>
  );
};

export default Users;
