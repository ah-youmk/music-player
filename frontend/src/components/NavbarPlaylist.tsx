import { PlaylistProps } from '../types/PropsType';
import CloseIcon from '@mui/icons-material/Close';

export default function NavbarPlaylist({
  playlist,
  allPlaylists,
  setAllPlaylists,
  setActivePlaylist,
  active,
  setCurrentPlaylist,
  currentPlaylist,
  node,
  setToggleQueue,
  setNavContent,
}: PlaylistProps) {
  return (
    <>
      <li
        onClick={() => {
          setNavContent('library');
          setToggleQueue(false);
          if (currentPlaylist.name === playlist.name) return;
          setActivePlaylist(playlist.name);
          setCurrentPlaylist(playlist);
          node.current = playlist.songs.getHead;
        }}
        className={`hover ${
          active ? 'bg-[#393939]' : ''
        } flex h-[10vh] w-[95%] items-center px-3 pb-2 pt-2 hover:cursor-pointer ${
          !active ? 'hover:bg-[#1A1A1A]' : ''
        }`}
      >
        <div className="flex h-full flex-[1] items-center justify-start">
          {playlist.songs.getHead !== null && (
            <img
              src={`music/covers/${playlist.songs.getHead?.data.title}.jpg`}
              alt={playlist.name}
              className="h-full rounded-lg object-contain"
            />
          )}
        </div>
        <div className="flex h-[80%] flex-[3]">
          <div className="flex h-full flex-col justify-between">
            <p className="font-semibold">{playlist.name}</p>
            <p className="text-sm font-semibold text-[#b3b3b3]">
              {playlist.songs.size()} Songs
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            if (
              currentPlaylist.name === 'Home' ||
              currentPlaylist.name === 'Recently Played'
            )
              return;
            const index = allPlaylists.indexOf(playlist);
            const newPlaylist = allPlaylists.filter(
              (value) => value !== playlist
            );
            setCurrentPlaylist(allPlaylists[index - 1]);
            setActivePlaylist(allPlaylists[index - 1].name);
            setAllPlaylists([...newPlaylist]);
          }}
          className="text-xl text-[#a7a7a7] hover:text-white"
        >
          {playlist.name !== 'Home' && playlist.name !== 'Recently Played' && (
            <CloseIcon fontSize="inherit" />
          )}
        </div>
      </li>
    </>
  );
}
