import Song from './Song';
import { Song as SongType } from '../types/GlobalTypes';
import fetchSongs from '../../../backend/src/server/songs';
import { useEffect, useState } from 'react';

export default function Home() {
  const [songs, setSongs] = useState<SongType[]>([]);

  const getSongs = () => {
    fetchSongs().then((result: SongType[]) => setSongs(result));
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <>
      <div className="flex h-full flex-[3] flex-col p-3">
        <div className="flex w-full flex-col gap-12 p-3">
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
        <div className="grid h-full w-full grid-cols-5 gap-4 overflow-auto p-3 transition-all duration-300">
          {songs.map((song: SongType, index: number) => (
            <Song key={index} song={song} />
          ))}
        </div>
      </div>
    </>
  );
}
