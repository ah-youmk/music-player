import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@radix-ui/react-context-menu';
import { SongProps } from '~shared/types/PropsType';
import { ContextMenuItem } from './ui/context-menu';
import { useEffect, useState } from 'react';

export default function Song({
  song,
  setCurrentSong,
  active,
  node,
  currentPlaylist,
  setVolume,
  volume,
  recentlyPlayed,
  recentPlaylist,
  audioRef,
  currentSong,
}: SongProps) {
  const [audioTrack, setAudioTrack] = useState<number>(0);

  useEffect(() => {
    if (audioTrack > 0) audioRef.current?.play();
  }, [audioTrack]);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            onClick={() => {
              if (currentSong?.title !== song.title) {
                audioRef.current?.play();
                setAudioTrack((prev) => prev + 1);
              }
              if (!recentPlaylist.current.songs.traverse().includes(song)) {
                recentlyPlayed.current.push(song);
                recentPlaylist.current.songs.insertAtEnd(song);
              }
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
        </ContextMenuTrigger>
        <ContextMenuContent className="rounded-md bg-[#282828] shadow-[0_16px_24px_rgba(0,0,0,.3),_0_6px_8px_rgba(0,0,0,.2)]">
          <ContextMenuItem
            onClick={() => console.log('first')}
            className="py-3 pl-2 pr-3 data-[highlighted]:bg-[#3E3E3E]"
            inset
          >
            Add to queue
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
