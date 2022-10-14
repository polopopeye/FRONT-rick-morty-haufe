import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import constants from '../../app/constants';
import { userFavourites, userSlice } from '../../app/slices/userSlice';
import { store } from '../../app/store';
import { Character } from '../../interfaces/character';
import { Button, InnerContainer } from '../commons';
import CharacterCard from '../home/characterList/CharacterCard';

export const FavList = () => {
  const navigate = useNavigate();
  const currentUserId = useAuthUser();
  const userId = currentUserId()?.email;
  const { favouriteShouldUpdate } = useSelector((state: any) => state.user);

  const [characters, setCharacters] = useState([] as any);

  const handleUpdateList = (favourites: any) => {
    setCharacters([]);
    let charactersIds = favourites.map((fav: any) => fav.characterId);

    charactersIds.forEach(async (id: any) => {
      const res = await axios.get(constants.api.character + id, {
        withCredentials: true,
      });
      const character = res.data.data;
      setCharacters((characters: any) => {
        if (characters) {
          const exist = characters.find((c: any) => c.id === character.id);
          if (!exist) {
            return [...characters, character];
          } else {
            return characters;
          }
        } else {
          return [character];
        }
      });
    });
  };

  useEffect(() => {
    if (!favouriteShouldUpdate) {
      store
        .dispatch(userFavourites({ userId }))
        .unwrap()
        .then((result: any) => {
          handleUpdateList(result.data);
          store.dispatch(userSlice.actions.favouriteShouldUpdate(false));
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []);

  useEffect(() => {
    console.log(`fastlog => favouriteShouldUpdate`, favouriteShouldUpdate);
    if (favouriteShouldUpdate === true) {
      store
        .dispatch(userFavourites({ userId }))
        .unwrap()
        .then((result: any) => {
          handleUpdateList(result.data);
          store.dispatch(userSlice.actions.favouriteShouldUpdate(false));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favouriteShouldUpdate]);

  return (
    <InnerContainer>
      <Button
        onClick={() => {
          navigate('/');
        }}
      >
        Go Back
      </Button>
      <InnerContainer
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '2em',
        }}
      >
        {characters &&
          characters.map((character: Character) => {
            const randomnumber = Math.floor(Math.random() * 1000);

            return (
              <CharacterCard
                character={character}
                key={character.id + randomnumber.toString()}
              />
            );
          })}
      </InnerContainer>
    </InnerContainer>
  );
};
