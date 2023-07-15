import { Character, CharacterList } from '@/types/Swapi';
import { fetcher } from '@/utils/api';

export const getCharacter = async () => {
  try {
    const data = (await fetcher('https://swapi.dev/api/people/')) as CharacterList;
    const characterId = Math.floor(Math.random() * data.count) + 1;
    const character = (await fetcher(`https://swapi.dev/api/people/${characterId}`)) as Character;

    return character;
  } catch (error) {
    console.log(error);
  }
};
