import {
  Button,
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from '../commons';
import { useIsAuthenticated } from 'react-auth-kit';

import { useFormik } from 'formik';
import { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../app/slices/userSlice';
import { store } from '../../app/store';
import Cookies from 'universal-cookie';

const Login = () => {
  const [error, setError] = useState('');
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  if (isAuthenticated()) {
    navigate('/');
  }

  const signIn = useSignIn();

  const onSubmit = async (values: any) => {
    console.log('Values: ', values);
    setError('');
    store
      .dispatch(login(values))
      .unwrap()
      .then((result: any) => {
        console.log(`fastlog => result`, result);
        toast.success('Welcome!! 💓');

        // const cookies = new Cookies();
        // cookies.set('token', result.token);

        signIn({
          token: result.token,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: { email: values.email },
        });
      })
      .catch((error) => {
        toast.error('Invalid Credentials! 😢');
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
            <>
              {formik.isSubmitting ? (
                <Button type="submit" disabled>
                  Loading...
                </Button>
              ) : (
                <Button>Login</Button>
              )}
            </>
          </InputWrapper>
          <InputWrapper>
            <Button
              style={{ backgroundColor: 'white', color: 'black' }}
              onClick={() => {
                navigate('/register');
              }}
            >
              Create new account
            </Button>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
};

export { Login };
