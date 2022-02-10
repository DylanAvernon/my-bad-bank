import { useContext } from 'react';
import { UserContext } from '../context/context';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Card from '../components/card';
function LoginForm() {
  const ctx = useContext(UserContext);
  const initialValues = {
    email: '',
    password: ''
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('An email is required'),
    password: Yup.string().required('A password is required')
  });
  function onSubmit(credentials, {resetForm}) {
    ctx.users.forEach(user => {
      if(user.email === credentials.email && user.password === credentials.password) {
        ctx.user = user;
        return;
      }
    });
    resetForm({credentials: ''});
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <label htmlFor='email' className='form-label'>Email</label>
        <Field className='form-control' placeholder='Enter email' type='text' name='email' id='email' />
        <ErrorMessage component={'div'} name='email' className='form-text ms-2 text-danger'></ErrorMessage>

        <label htmlFor='password' className='form-label'>Password</label>
        <Field className='form-control' placeholder='Enter password' type='password' name='password'id='password' />
        <ErrorMessage component={'div'} name='password' className='form-text ms-2 text-danger'></ErrorMessage>
        <input type='submit' className='btn btn-light mt-3' value='Login' />
      </Form>
    </Formik>
  );
}
function Login(){
  return (
    <Card 
      txtcolor="black"
      bgcolor="warning"
      header="BadLogin"
      title="Login"
      text="Please provide your credentials."
      body={<LoginForm />}/>
  )  
}
export default Login;
