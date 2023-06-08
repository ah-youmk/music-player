import { ContetnProps } from '../types/PropsType';
import Home from './Home';
import Playlist from './Playlist';
import Search from './Search';

export default function Content({
  content,
  songs,
  showSongs,
  currentPlaylist,
}: ContetnProps) {
  return (
    <>
      {content === 'home' && (
        <Home
          currentPlaylist={currentPlaylist}
          songs={songs}
          showSongs={showSongs}
        />
      )}
      {content === 'search' && <Search />}
      {content !== 'home' && content !== 'search' && (
        <Playlist playlist={content} />
      )}
    </>
  );
}
