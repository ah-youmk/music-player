import { SongProps } from '~shared/types/PropsType';

export default function Song({
  song,
  setCurrentSong,
  active,
  node,
  currentPlaylist,
}: SongProps) {
  return (
    <>
      <div
        onClick={() => {
          setCurrentSong(song);
          node.current = currentPlaylist.songs.search(
            (data) => data.title === song.title
          );
        }}
        className={`flex h-[37vh] flex-col rounded-md ${
          active ? 'bg-[#282828]' : 'bg-[#181818]'
        } px-4 pb-6 pt-4 transition-colors duration-150 hover:cursor-pointer hover:bg-[#282828]`}
      >
        <div className="flex-[2] shadow-md">
          <img
            className="rounded"
            src={`music/covers/${song.title}.jpg`}
            alt={song.title}
          />
        </div>
        <div className="flex flex-[1] flex-col items-start pt-2">
          <p className="flex flex-[1] items-center text-base font-semibold">
            {song.title}
          </p>
          <p className="flex flex-[1] items-center text-sm font-semibold text-[#a7a7a7]">
            {song.artist}
          </p>
        </div>
      </div>
    </>
  );
}
