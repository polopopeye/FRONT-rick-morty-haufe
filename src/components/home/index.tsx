// import axios from 'axios';
import { useEffect } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listCharacters } from '../../app/slices/charactersSlice';
import { RootState, store } from '../../app/store';
import { Button, InnerContainer } from '../commons';
import Pagination from './Pagination';

const Home = () => {
  const singOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    singOut();
    navigate('/login');
  };

  const { listCharacters: listCharactersState, currentPagination } =
    useSelector((state: RootState) => state.character);

  const characters =
    listCharactersState && listCharactersState.data
      ? listCharactersState.data.results
      : [];

  useEffect(() => {
    if (characters.length === 0) {
      store.dispatch(listCharacters({ page: currentPagination }));
    }
  }, []);

  if (characters.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <InnerContainer>
      <h1 color="secondary500">Welcome Home Bud!</h1>
      <Button onClick={logout}>Logout</Button>
      <Pagination />

      <InnerContainer
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '2em',
        }}
      >
        {characters &&
          characters.map((character: any) => (
            <div
              key={character.id}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                navigate(`/character/${character.id}`);
              }}
            >
              <h2>{character.name}</h2>
              <img src={character.image} alt={character.name} />
              <p>{character.description}</p>
            </div>
          ))}
      </InnerContainer>
      <Pagination />
    </InnerContainer>
  );
};

export { Home };
