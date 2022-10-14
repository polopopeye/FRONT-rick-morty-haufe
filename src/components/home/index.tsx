import { useEffect } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listCharacters } from '../../app/slices/charactersSlice';
import { RootState, store } from '../../app/store';
import { Button, InnerContainer } from '../commons';
import CharacterList from './characterList/CharacterList';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (characters.length === 0) {
    return (
      <>
        <Button onClick={logout}>Logout</Button>

        <div>Loading...</div>
      </>
    );
  }

  return (
    <InnerContainer>
      <h1>Welcome!</h1>
      <Button
        onClick={() => {
          navigate('/favs');
        }}
      >
        Your favourites
      </Button>
      <hr></hr>
      <Button onClick={logout}>Logout</Button>
      <Pagination />
      <CharacterList />
      <Pagination />
    </InnerContainer>
  );
};

export { Home };
