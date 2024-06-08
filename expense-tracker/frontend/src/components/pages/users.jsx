import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSave } from 'react-icons/fa';
import { RiEditBoxLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import UserService from '../service/UserService';
import styled from 'styled-components';
import { Button, Heading, Form, Input, ButtonIcon, Modal } from '../ui';
import Table from '../ui/Table';
import RadioButton from '../ui/RadioButton';
import { useForm } from 'react-hook-form';
import { Errors } from '../ui/Errors';

const Container = styled.div`
  position: relative;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const defaultValues = {
  username: '',
  password: '',
  email: '',
  role: ''
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

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

  const resetForm = () => {
    setValue(defaultValues);
  };

  const createUser = async (data) => {
    try {
      await UserService.createUser(data);
      fetchUsers();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async (data) => {
    const { username, password, email, role } = data; // Destructure the data object
    try {
      await UserService.updateUser(editingUser.id, { username, password, email, role });
      fetchUsers();
      resetForm();
      setEditingUser(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (user) => {
    try {
      await UserService.deleteUser(user.id);
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = (user) => {
    // setValue(user);
    setValue('username', user.username);
    setValue('password', user.password);
    setValue('email', user.email);
    setValue('role', user.role);
    setEditingUser(user);
    setShowForm(true);
    openModal();
  };

  return (
    <>
      <Heading as='h1'>User</Heading>
      <Container>
        <ButtonIcon onClick={handleClick}><FaPlus /> Add User</ButtonIcon>
        {showForm && (
          <>
            <Modal isOpen={isModalOpen} onClose={closeModal} onClick={() => setShowForm(false)}>
              <Form onSubmit={handleSubmit(editingUser ? updateUser : createUser)}>
                <Input
                  type="text"
                  id="username"
                  placeholder="Username"
                  {...register('username', { required: 'Username is required' })}
                />
                {errors.username && <Errors className="error">{errors.username.message}</Errors>}
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <Errors className="error">{errors.password.message}</Errors>}
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <Errors className="error">{errors.email.message}</Errors>}
                <Flex>
                  <RadioButton
                    id="userRole"
                    name="role"
                    value="USER"
                    checked={editingUser ? editingUser.role === 'USER' : true}
                    onChange={() => setValue('role', 'USER')}
                    label="User"
                    {...register('role')}
                  />
                  <RadioButton
                    id="adminRole"
                    name="role"
                    value="ADMIN"
                    checked={editingUser ? editingUser.role === 'ADMIN' : false}
                    onChange={() => setValue('role', 'ADMIN')}
                    label="Admin"
                    {...register('role')}
                  />
                </Flex>
                <ButtonIcon bg='var(--color-grey-50)' type="submit">
                  {editingUser ? <><FaSave /> Update</> : <><FaPlus /> Create</>}
                </ButtonIcon>
              </Form>
            </Modal>
          </>
        )}
        <Table
          headers={['id', 'username', 'email', 'role']}
          data={users}
          actions={[
            { icon: <RiEditBoxLine />, label: ` Edit`, color: 'var(--color-green-700)', onClick: editUser },
            { icon: <IoMdTrash />, label: ` Delete`, color: 'red', onClick: deleteUser },
          ]}
        />
      </Container>
    </>
  );
};

export default Users;
