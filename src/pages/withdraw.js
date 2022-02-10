import Card from "../components/card";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState, useContext, useEffect } from 'react';
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
  function onSubmit(amount, {resetForm}) {
    console.log(amount);
    if(ctx.user) {
      const newBalance = Number(ctx.user.balance) - Number(amount.amount);
      if (newBalance >= 0) {
        ctx.user.balance = Number(ctx.user.balance) - Number(amount.amount);
        setBalance(ctx.user.balance);
        resetForm({amount: ''});
      }
      else {
        resetForm({amount: ''});
      }
    }
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {
        (props) => {
          let errorMessage = '';
          if (ctx.user) {
            const newBalance = Number(ctx.user.balance) - props.values.amount;
            if (newBalance >= 0) {
              errorMessage = '';
            }
            else {
              errorMessage = 'Insufficient Funds';
            }
          }
          return (
            <Form>
              <label htmlFor='balance' className='form-label'>Balance</label>
              <input readOnly className='form-control-plaintext' value={balance} type='text' id='balance' />

              <label htmlFor='amount' className='form-label'>Withdraw</label>
              <Field className='form-control' type='number' name='amount' id='amount' />
              <ErrorMessage component={'div'} name='amount' className='form-text ms-2 text-danger'></ErrorMessage>
              <div className='form-text ms-2 text-danger'>{errorMessage}</div>

              <input type='submit' disabled={!ctx.user || props.values.amount <= 0 || errorMessage} className='btn btn-light mt-3' value='Withdraw' />
            </Form>
          );
        }
      }
    </Formik>
  )
  
}
function Withdraw(){
  const [show, setShow] = useState(true);
  const ctx = useContext(UserContext);
  const initialValues = {
    amount: 0
  };
  const validationSchema = Yup.object().shape({
    amount: Yup.number().positive('You must enter a positive number').required('You must enter a number')
  });

  const [balance, setBalance] = useState(ctx.user ? ctx.user.balance : 'User is Not Logged In');
  function onSubmit(amount, {resetForm}) {
    console.log(amount);
    if(ctx.user) {
      const newBalance = Number(ctx.user.balance) - Number(amount.amount);
      if (newBalance >= 0) {
        ctx.user.balance = Number(ctx.user.balance) - Number(amount.amount);
        setBalance(ctx.user.balance);
        setShow(false);
        resetForm({amount: ''});
      }
      else {
        resetForm({amount: ''});
      }
    }
  }
  function clearForm(){
    setShow(true);
  }
  return (
    <Card 
      txtcolor="black"
      bgcolor="secondary"
      header="Bad Withdraw"
      title="Withdraw"
      text="Enter an amount to withdraw."
      body={show ? (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {
            (props) => {
              let errorMessage = '';
              if (ctx.user) {
                const newBalance = Number(ctx.user.balance) - props.values.amount;
                if (newBalance >= 0) {
                  errorMessage = '';
                }
                else {
                  errorMessage = 'Insufficient Funds';
                }
              }
              return (
                <Form>
                  <label htmlFor='balance' className='form-label'>Balance</label>
                  <input readOnly className='form-control-plaintext' value={balance} type='text' id='balance' />

                  <label htmlFor='amount' className='form-label'>Withdraw</label>
                  <Field className='form-control' type='number' name='amount' id='amount' />
                  <ErrorMessage component={'div'} name='amount' className='form-text ms-2 text-danger'></ErrorMessage>
                  <div className='form-text ms-2 text-danger'>{errorMessage}</div>

                  <input type='submit' disabled={!ctx.user || props.values.amount <= 0 || errorMessage} className='btn btn-light mt-3' value='Withdraw' />
                </Form>
              );
            }
          }
        </Formik>
      ) : (
        <>
          <h5>Success</h5>
          <h6>Withdraw Completed</h6>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Make Another Withdraw</button>
          </>
      )}/>
  )
}
export default Withdraw;
