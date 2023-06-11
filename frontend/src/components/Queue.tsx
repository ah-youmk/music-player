import { useEffect, useState } from 'react';
import { Playlist, Song } from '~shared/types/GlobalTypes';
import { QueueCollection } from '~shared/utils/queue';
import lodash from 'lodash';
import { Stack } from '~shared/utils/stack';

type QueuedSongProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
  setCurrentSong: React.Dispatch<Song>;
  number: number;
  active: boolean;
  song: Song;
  queue: React.MutableRefObject<QueueCollection<Song>>;
  recentlyPlayed: React.MutableRefObject<Stack<Song>>;
  recentPlaylist: React.MutableRefObject<Playlist>;
};
type QueueProps = {
  recentlyPlayed: React.MutableRefObject<Stack<Song>>;
  recentPlaylist: React.MutableRefObject<Playlist>;
  audioRef: React.RefObject<HTMLAudioElement>;
  currentSong: Song | undefined;
  setCurrentSong: React.Dispatch<Song>;
  queue: React.MutableRefObject<QueueCollection<Song>>;
};

function QueuedSong({
  song,
  active,
  number,
  setCurrentSong,
  recentlyPlayed,
  recentPlaylist,
  audioRef,
  queue,
}: QueuedSongProps) {
  const [audioTrack, setAudioTrack] = useState<boolean>(false);

  useEffect(() => {
    audioRef.current?.play();
  }, [audioTrack]);

  return (
    <>
      {song && (
        <li
          onClick={() => {
            while (song.title !== queue.current.peek().title) {
              queue.current.dequeue().title;
            }
            setCurrentSong(song);
            setAudioTrack(!audioTrack);
            if (
              !recentPlaylist.current.songs
                .traverse()
                .map((song) => song.title)
                .includes(song.title)
            ) {
              recentlyPlayed.current.push(song);
              recentPlaylist.current.songs.insertAtEnd(song);
            }
          }}
          className={`bg-[#282828] px-3 ${
            active ? 'bg-[#414141]' : ''
          } flex h-[10vh] w-full items-center pb-2 pt-2 hover:cursor-pointer ${
            !active ? 'hover:bg-[#1f1f1f]' : ''
          } rounded-md`}
        >
          <div className="flex h-full flex-[1] items-center justify-start">
            <img
              src={`music/covers/${song.title}.jpg`}
              alt={song.title}
              className="h-full rounded-lg object-contain"
            />
          </div>
          <div className="flex h-[80%] flex-[6]">
            <div className="flex h-full flex-col justify-between">
              <p className="text-xl font-medium">
                {number}. {song.title}
              </p>
              <p className="text-sm font-semibold text-[#b3b3b3]">
                {song.artist}
              </p>
            </div>
          </div>
        </li>
      )}
    </>
  );
}

export default function Queue({
  queue,
  currentSong,
  setCurrentSong,
  audioRef,
  recentlyPlayed,
  recentPlaylist,
}: QueueProps) {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const songs: Song[] = [];
    const newQueue = lodash.cloneDeep(queue);
    for (let i = 0; i < queue.current.size(); i++) {
      const dequeued = newQueue.current.dequeue();
      if (dequeued) songs.push(dequeued);
    }
    setSongs([...songs]);
  }, [queue.current.size()]);

  return (
    <>
      <div className="flex-[1] px-6 pb-5 pt-3 text-4xl font-semibold">
        <h1>Queue</h1>
        <ul className="flex w-full flex-col items-center gap-3 px-3 pt-4">
          {songs.length === 0 && (
            <li>
              <p className="pt-5 text-xl font-light">
                There is no queue. Right click on the songs you want to be
                queued and select "Add to queue".
              </p>
            </li>
          )}
          {songs.map((song, index) => (
            <QueuedSong
              recentPlaylist={recentPlaylist}
              recentlyPlayed={recentlyPlayed}
              queue={queue}
              audioRef={audioRef}
              setCurrentSong={setCurrentSong}
              number={index + 1}
              active={currentSong?.title === song.title}
              song={song}
              key={index}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
