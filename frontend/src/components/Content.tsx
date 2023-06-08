import { ContetnProps } from '../types/PropsType';
import Home from './Home';
import Playlist from './Playlist';
import Search from './Search';

export default function Content({ content, setCurrentSong }: ContetnProps) {
  return (
    <>
      {content === 'home' && <Home setCurrentSong={setCurrentSong} />}
      {content === 'search' && <Search />}
      {content !== 'home' && content !== 'search' && (
        <Playlist playlist={content} />
      )}
    </>
  );
}
