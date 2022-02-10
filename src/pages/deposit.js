import Card from "../components/card";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { UserContext } from '../context/context';
function DepositForm() {
  const ctx = useContext(UserContext);
  const [balance, setBalance] = useState(ctx.user ? ctx.user.balance : 'User is Not Logged In');
  const initialValues = {
    amount: 0
  };
  const validationSchema = Yup.object().shape({
    amount: Yup.number().positive('You must enter a positive number').required('You must enter a number')
  });
  function onSubmit(amount) {
    if(ctx.user) {
      ctx.user.balance = Number(ctx.user.balance) + Number(amount.amount);
      setBalance(ctx.user.balance);
    }
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <label htmlFor='balance' className='form-label'>Balance</label>
        <input readOnly className='form-control-plaintext' value={balance} type='text' id='balance' />

        <label htmlFor='amount' className='form-label'>Deposit</label>
        <Field className='form-control' type='number' name='amount' id='amount' />
        <ErrorMessage component={'div'} name='amount' className='form-text ms-2 text-danger'></ErrorMessage>

        <input type='submit' className='btn btn-light mt-3' value='Deposit' />
      </Form>
    </Formik>
  )
  
}
function Deposit(){
  return (
    <Card 
      txtcolor="black"
      bgcolor="success"
      header="BadDeposit"
      title="Deposit"
      text="Enter an amount to deposit."
      body={<DepositForm />}/>
  )
}
export { Deposit, DepositForm };
