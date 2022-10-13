import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCharacterInfo } from '../../app/slices/charactersSlice';
import { store } from '../../app/store';
import { Button, InnerContainer } from '../commons';
import { DetailsContainer } from './Details.style';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.pathname);

  const id = location.pathname.split('/')[2];
  const [characterInfo, setCharacterInfo] = useState({} as any);
  console.log(`fastlog => characterInfo`, characterInfo);

  useEffect(() => {
    store
      .dispatch(getCharacterInfo({ id }))
      .unwrap()
      .then((result) => {
        if (result.data) {
          setCharacterInfo(result.data);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!characterInfo) {
    return (
      <InnerContainer>
        <h1>Loading...</h1>
      </InnerContainer>
    );
  }

  return (
    <InnerContainer>
      <Button
        onClick={() => {
          navigate('/');
        }}
      >
        Go Back
      </Button>
      <div>
        <h2>{characterInfo?.name}</h2>
      </div>

      <DetailsContainer>
        <img src={characterInfo?.image} alt={characterInfo?.name} />
        <div>
          <p>
            Gender: <b>{characterInfo.gender}</b>
          </p>
          <p>
            Species: <b>{characterInfo.species}</b>
          </p>
          <p>
            Status: <b>{characterInfo.status}</b>
          </p>
          <p>
            Origin: <b>{characterInfo.origin?.name}</b>
          </p>
          <p>
            Location: <b>{characterInfo.location?.name}</b>
          </p>
        </div>
      </DetailsContainer>
    </InnerContainer>
  );
};

export default Details;
