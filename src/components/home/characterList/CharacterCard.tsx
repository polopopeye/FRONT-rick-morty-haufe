import { useNavigate } from 'react-router-dom';
import { Character } from '../../../interfaces/character';
import FavButton from '../../favButton/FavButton';

const CharacterCard = (props: { character: Character }) => {
  const { character } = props;
  const navigate = useNavigate();

  return (
    <div key={character.id}>
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate(`/character/${character.id}`);
        }}
      >
        <h2>{character.name}</h2>
        <img src={character.image} alt={character.name} />
        <p>{character.description}</p>
      </div>
      <FavButton characterId={character.id as number} />
    </div>
  );
};

export default CharacterCard;
