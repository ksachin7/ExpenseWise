import React from 'react';
import styled from 'styled-components';
import ExpenseItem from './ExpenseItem';
import Breadcrumb from './ui/Breadcrumb';

const ListContainer = styled.div`
  margin-top: 16px;
`;

const ExpenseList = ({ expenses }) => {
  return (
    <>
    <Breadcrumb crumbs={[
                { path: '/', label: 'Home' },
                { path: '/signout', label: 'Logout' }
            ]} />
    <ListContainer>
      <h2>Expenses</h2>
      {expenses?.map(expense => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </ListContainer>
    </>
  );
};

export default ExpenseList;
