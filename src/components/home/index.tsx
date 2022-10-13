// import axios from 'axios';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '../commons';

const Home = () => {
  const singOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    singOut();
    navigate('/login');
  };

  // const getPayment = async () => {
  //   const response = await axios.get('http://localhost:9000/api/v1/payment', {
  //     withCredentials: true,
  //   });
  //   console.log('Response: ', response);
  // };

  return (
    <Container>
      <h1 color="secondary500">Welcome Home Bud!</h1>
      {/* <button onClick={getPayment}>Get Payment</button> */}
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
};

export { Home };
