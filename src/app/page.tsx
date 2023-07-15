import { getCharacter } from '@/api/test.api';
import Home from './Home';

const page = async () => {
  const character = await getCharacter();

  return <Home character={character} />;
};

export default page;
