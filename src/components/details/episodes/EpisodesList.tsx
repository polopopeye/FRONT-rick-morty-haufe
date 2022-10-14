import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EpisodesList = (props: { episodeUrl: string }) => {
  const [episode, setEpisode] = useState({} as any);

  const handleEpisodeData = () => {
    axios
      .get(props.episodeUrl)
      .then((res) => {
        setEpisode(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleEpisodeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
      }}
    >
      <p>Episode: {episode?.episode}</p>
      <p>
        Name: <b>{episode?.name}</b>
      </p>
      <p>Date:{episode?.air_date}</p>
    </div>
  );
};

export default EpisodesList;
