import { useIsAuthenticated } from 'react-auth-kit';
import {
  Button,
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from '../commons';

import { format } from 'date-fns';
import { useFormik } from 'formik';
import { useState } from 'react';
// import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../app/slices/userSlice';
import { store } from '../../app/store';

const Register = () => {
  const [error, setError] = useState('');
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  if (isAuthenticated()) {
    navigate('/');
  }

  // const signIn = useSignIn();

  const onSubmit = async (values: any) => {
    console.log('Values: ', values);

    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      birthDate: format(new Date(values.birthDate), 'yyyy-MM-dd'),
    };

    setError('');
    store
      .dispatch(register(data))
      .unwrap()
      .then((result: any) => {
        console.log(`fastlog => result`, result);
        toast.success('Great!! now you can login!');
      })
      .catch((error) => {
        toast.error(error + '😢');
      });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      birthDate: format(new Date(), 'yyyy-MM-dd'),
    },
    onSubmit,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <h1>Welcome Back!</h1>
          <ErrorText>{error}</ErrorText>
          <InputWrapper>
            <StyledInput
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Name"
              type=""
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              type="email"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              style={{
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '10px',
              }}
              name="birthDate"
              value={formik.values.birthDate}
              onChange={formik.handleChange}
              placeholder="Birth Date"
              type="date"
            />
          </InputWrapper>
          <InputWrapper>
            <>
              {formik.isSubmitting ? (
                <Button type="submit" disabled>
                  Loading...
                </Button>
              ) : (
                <Button>Register</Button>
              )}
            </>
          </InputWrapper>
          <InputWrapper>
            <Button
              style={{ backgroundColor: 'white', color: 'black' }}
              onClick={() => {
                navigate('/login');
              }}
            >
              Go to Login
            </Button>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
};

export { Register };
