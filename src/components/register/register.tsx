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
import { register } from '../../app/slices/userSlice';
import { store } from '../../app/store';

const Register = () => {
  const [error, setError] = useState('');
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  if (isAuthenticated()) {
    navigate('/');
  }

  const signIn = useSignIn();

  const onSubmit = async (values: any) => {
    console.log('Values: ', values);

    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      birthDate: values.birthDate,
    };

    setError('');
    store
      .dispatch(register(values))
      .unwrap()
      .then((result: any) => {
        toast.success('Welcome!! 💓');

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
      name: '',
      email: '',
      password: '',
      birthDate: '',
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
                <Button>Login</Button>
              )}
            </>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
};

export { Register };
