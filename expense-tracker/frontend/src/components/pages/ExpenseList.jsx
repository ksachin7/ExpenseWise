import React, { useState } from 'react';
import styled from 'styled-components';
import ExpenseItem from '../expenses/ExpenseItem';
import { Button, Form, Input, Modal, Container, Heading, ButtonIcon, TextArea, Header  } from '../ui';
import { FaPlus } from 'react-icons/fa';

const ListContainer = styled.div`
  margin-top: 16px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const ExpenseList = ({ expenses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    // Handle form submission
    event.preventDefault();
    // Your form submission logic here
    closeModal(); // Close modal after form submission
  };
  return (
    <div>
      <Heading>Expenses</Heading>
      <ButtonIcon onClick={openModal}><FaPlus /> Add Expense</ButtonIcon>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="amount">Amount</Label>
          <Input type="number" id="amount" name="amount" required />
          <Label htmlFor="description">Description</Label>
          <TextArea rows={2} type="text" id="description" name="description" required />
          <Button type="submit">Add Expense</Button>
        </Form>
      </Modal>
      <ListContainer>
        {expenses?.map(expense => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </ListContainer>
    </div>
  );
};

export default ExpenseList;
