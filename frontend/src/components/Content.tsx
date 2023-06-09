import { ContetnProps } from '../types/PropsType';
import Search from './Search';
import Song from './Song';

export default function Content({
  content,
  songs,
  showSongs,
  currentPlaylist,
  setVolume,
  node,
  setCurrentSong,
  currentSong,
}: ContetnProps) {
  return (
    <>
      <div className="flex h-full flex-[3] flex-col rounded-lg">
        <div className="flex w-full flex-col justify-center gap-6 bg-gradient-to-t from-[#121212] to-[#222] px-6 pb-3 pt-6">
          <p className="text-xl font-semibold">Add music to your library</p>
          <div className="flex w-full items-start justify-between">
            <span className="flex flex-[3] items-center text-base">
              You can add music from anywhere in your device to the library
            </span>
            <button className="focus:outline-5 h-8 flex-[1] rounded-2xl bg-purple-500 transition-colors duration-200 hover:bg-purple-700 focus:bg-purple-700 focus:outline focus:outline-offset-[3px] focus:outline-white">
              Add Music
            </button>
          </div>
        </div>
        <div className="flex h-full w-full flex-col overflow-auto bg-[#121212] pb-3">
          {content === 'home' && (
            <>
              <div className="flex-[1] px-6 pb-5 pt-3 text-4xl font-semibold">
                <h1>{currentPlaylist.name}</h1>
              </div>
              <div className="grid w-full flex-grow grid-cols-5 gap-4 px-6 transition-all duration-300">
                {currentPlaylist.name === 'Home'
                  ? showSongs(songs)
                  : currentPlaylist.songs
                      .traverse()
                      .map((song, index) => (
                        <Song
                          setVolume={setVolume}
                          node={node}
                          key={index}
                          song={song}
                          setCurrentSong={setCurrentSong}
                          active={currentSong?.title === song.title}
                          currentPlaylist={currentPlaylist}
                        />
                      ))}
              </div>
            </>
          )}
          {content === 'search' && <Search />}
        </div>
      </div>
    </>
  );
}
