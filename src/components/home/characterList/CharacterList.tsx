import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { InnerContainer } from '../../commons';
import CharacterCard from './CharacterCard';

const CharacterList = () => {
  const { listCharacters: listCharactersState } = useSelector(
    (state: RootState) => state.character
  );
  const characters =
    listCharactersState && listCharactersState.data
      ? listCharactersState.data.results
      : [];

  return (
    <InnerContainer
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '2em',
      }}
    >
      {characters &&
        characters.map((character: any) => (
          <CharacterCard character={character} key={character.id} />
        ))}
    </InnerContainer>
  );
};

export default CharacterList;
