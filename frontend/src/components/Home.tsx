import Song from './Song';
import { Song as SongType } from '../types/GlobalTypes';
import { useEffect, useState } from 'react';
import { HomeProps } from '~shared/types/PropsType';

export default function Home({ setCurrentSong }: HomeProps) {
  const [songs, setSongs] = useState<SongType[]>([]);
  const [active, setActive] = useState<SongType | undefined>(undefined);

  const getSongs = () => {
    fetch('http://localhost:5000/songs')
      .then((response: Response) => response.json())
      .then((result: SongType[]) => setSongs(result));
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <>
      <div className="flex h-full flex-[3] flex-col">
        <div className="flex w-full flex-col gap-12 bg-gradient-to-t from-[#121212] to-[#222] px-6 pb-3 pt-6">
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
        <div className="grid h-full w-full grid-cols-5 gap-4 overflow-auto bg-[#121212] px-6 pb-6 pt-3 transition-all duration-300">
          {songs.map((song: SongType, index: number) => (
            <Song key={index} song={song} setCurrentSong={setCurrentSong} />
          ))}
        </div>
      </div>
    </>
  );
}
