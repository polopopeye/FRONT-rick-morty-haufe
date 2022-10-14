import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { toast } from 'react-toastify';
import constants from '../../app/constants';
import { Button } from '../commons';

const FavButton = (props: { characterId: string | number }) => {
  const currentUserId = useAuthUser();
  const [isInFavList, setIsInFavList] = useState(false);
  const userId = currentUserId()?.email;

  const handleCheckIsInFavList = async () => {
    axios
      .post(
        constants.api.favourite,
        {
          userId: userId,
          characterId: props.characterId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // res.data.data.favourite ? setIsInFavList(true) : setIsInFavList(false);
        setIsInFavList(true);
      })
      .catch((err) => {
        setIsInFavList(false);
      });
  };

  const handleSaveInFavList = () => {
    axios
      .post(
        constants.api.favourite + 'create',
        {
          userId: userId,
          characterId: props.characterId,
          favourite: true,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success('Added to favourites! 💓');

        if (res.data.message === 'Favourite already exists') {
          toast.info('Already exist! 💓');
        }

        setIsInFavList(true);
      })
      .catch((err) => {
        setIsInFavList(false);
      });
  };

  const handleRemoveInFavList = () => {
    axios
      .delete(constants.api.favourite + 'delete', {
        data: {
          userId: userId,
          characterId: props.characterId,
        },
        withCredentials: true,
      })
      .then((res) => {
        toast.success('Removed from favourites! 💓');
        setIsInFavList(false);
      })
      .catch((err) => {
        toast.error('Error! 😢');
      });
  };

  useEffect(() => {
    handleCheckIsInFavList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userId) {
    console.log('You must be logged in to add to fav list!');
    return <p>You must be logged in to add to fav list!</p>;
  }

  return (
    <div>
      {isInFavList ? (
        <Button onClick={handleRemoveInFavList}>Remove from fav list</Button>
      ) : (
        <Button onClick={handleSaveInFavList}>Add to fav list! 💟</Button>
      )}
    </div>
  );
};

export default FavButton;
