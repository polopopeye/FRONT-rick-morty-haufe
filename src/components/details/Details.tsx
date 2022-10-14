import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCharacterInfo } from '../../app/slices/charactersSlice';
import { store } from '../../app/store';
import { Button, InnerContainer } from '../commons';
import FavButton from '../favButton/FavButton';
import { DetailsContainer } from './Details.style';
import EpisodesList from './episodes/EpisodesList';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split('/')[2];
  const [characterInfo, setCharacterInfo] = useState({} as any);

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

      <div
        style={{
          padding: '20px',
        }}
      >
        <FavButton characterId={id} />
      </div>

      <div
        style={{
          marginTop: '20px',
          marginBottom: '20px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          color: '#000',
          border: '1px solid #000',
        }}
      >
        <h2>Episodes:</h2>
        {characterInfo?.episode?.map((episodeUrl: any) => (
          <EpisodesList key={episodeUrl} episodeUrl={episodeUrl} />
        ))}
      </div>

      <div
        style={{
          padding: '20px',
        }}
      >
        <FavButton characterId={id} />
      </div>
    </InnerContainer>
  );
};

export default Details;
