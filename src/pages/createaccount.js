import { useState, useContext } from 'react';
import { UserContext } from '../context/context';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import Card from '../components/card';
import * as Yup from 'yup';
function CreateAccount(){
  const initialValues = {
    name: '',
    email: '',
    password: ''
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('A name is required'),
    email: Yup.string().required('An email is required'),
    password: Yup.string().required('A password is required')
  });
  
  const [show, setShow] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const ctx = useContext(UserContext);  
  
  // useEffect(() => {
  //   if (values.name === '' && values.email === '' && values.password === '') {
  //     setDisabled(true);
  //   }
  //   else {
  //     setDisabled(false);
  //   }
  // }, [values])
  function onSubmit(user) {
    ctx.users.push({...user, balance: 100});
    setShow(false);
  }

  function clearForm(){
    setShow(true);
  }

  return (
      <Card
        bgcolor="primary"
        header="Create Account"
        body={show ? (  
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                  {
                    ({values}) => {
                      return(
                        <Form>
                          <label htmlFor='name' className='form-label'>Name</label>
                          <Field className='form-control' placeholder='Enter name' type='text' name='name'id='name' />
                          <ErrorMessage component={'div'} name='name' className='form-text ms-2 text-danger'></ErrorMessage>

                          <label htmlFor='email' className='form-label'>Email</label>
                          <Field className='form-control' placeholder='Enter email' type='text' name='email' id='email' />
                          <ErrorMessage component={'div'} name='email' className='form-text ms-2 text-danger'></ErrorMessage>

                          <label htmlFor='password' className='form-label'>Password</label>
                          <Field className='form-control' placeholder='Enter password' type='password' name='password'id='password' />
                          <ErrorMessage component={'div'} name='password' className='form-text ms-2 text-danger'></ErrorMessage>
                          <input type='submit' disabled={!values.email && !values.name && !values.password} className='btn btn-light mt-3' value='Create Account' />
                        </Form>
                    )}
                  }
                </Formik>
              ):(
                <>
                <h5>Success</h5>
                <h6>Account Created</h6>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>
              )}
      />
  )
}
export default CreateAccount;