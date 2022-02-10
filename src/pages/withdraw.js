import Card from "../components/card";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { UserContext } from '../context/context';
function WithdrawForm() {
  const ctx = useContext(UserContext);
  const initialValues = {
    amount: 0
  };
  const validationSchema = Yup.object().shape({
    amount: Yup.number().positive('You must enter a positive number').required('You must enter a number')
  });

  const [balance, setBalance] = useState(ctx.user ? ctx.user.balance : 'User is Not Logged In');
  const [overdraftMessage, setOverdraftMessage] = useState('');

  function onSubmit(amount, {resetForm}) {
    console.log(amount);
    if(ctx.user) {
      const newBalance = Number(ctx.user.balance) - Number(amount.amount);
      if (newBalance > 0) {
        ctx.user.balance = Number(ctx.user.balance) - Number(amount.amount);
        setOverdraftMessage('');
        setBalance(ctx.user.balance);
      }
      else {
        setOverdraftMessage('Insufficient Funds');
        resetForm({amount: ''});
      }
    }
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <label htmlFor='balance' className='form-label'>Balance</label>
        <input readOnly className='form-control-plaintext' value={balance} type='text' id='balance' />

        <label htmlFor='amount' className='form-label'>Withdraw</label>
        <Field className='form-control' type='number' name='amount' id='amount' />
        <ErrorMessage component={'div'} name='amount' className='form-text ms-2 text-danger'></ErrorMessage>
        <div className='form-text ms-2 text-danger'>{overdraftMessage}</div>

        <input type='submit' className='btn btn-light mt-3' value='Withdraw' />
      </Form>
    </Formik>
  )
  
}
function Withdraw(){
  return (
    <Card 
      txtcolor="black"
      bgcolor="secondary"
      header="Bad Withdraw"
      title="Withdraw"
      text="Enter an amount to withdraw."
      body={<WithdrawForm />}/>
  )
}
export default Withdraw;
