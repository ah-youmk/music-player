import React, { MouseEvent, useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { MusicBarProps } from '~shared/types/PropsType';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Song } from '~shared/types/GlobalTypes';
import lodash from 'lodash';

function MusicBar({
  currentSong,
  currentPlaylist,
  node,
  volume,
  setVolume,
  setCurrentSong,
  recentlyPlayed,
  recentPlaylist,
  setToggleQueue,
  toggleQueue,
  audioRef,
  queue,
}: MusicBarProps) {
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [toggleMute, setToggleMute] = useState<boolean>(false);
  const duration = currentSong?.duration ?? 0;
  const [audioTrack, setAudioTrack] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(audioRef.current?.currentTime ?? 0);
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    }, 50);
    return () => clearInterval(interval);
  }, [audioRef.current?.currentTime]);

  useEffect(() => {
    if (currentPlaylist.songs.getHead)
      setCurrentSong(currentPlaylist.songs.getHead?.data);
  }, [currentPlaylist]);

  useEffect(() => {
    if (audioTrack > 0) audioRef.current?.play();
  }, [audioTrack]);

  useEffect(() => {
    if (toggleQueue) {
      const songs: Song[] = [];
      const newQueue = lodash.cloneDeep(queue);
      const dequeued = newQueue.current.dequeue();
      if (dequeued) songs.push(dequeued);
      setCurrentSong(dequeued);
    } else {
      setCurrentSong(node.current?.data);
    }
  }, [toggleQueue]);

  return (
    <>
      <div className="flex h-[12vh] w-full items-center justify-center bg-[#000]">
        <div className="flex h-full flex-[1]">
          <div className="ml-8 flex h-full flex-[1] items-center">
            {currentSong && (
              <img
                className="h-[75%] rounded object-contain"
                src={`music/covers/${currentSong?.title}.jpg`}
              />
            )}
          </div>
          <div className="flex h-[90%] flex-[2] flex-col items-start justify-center gap-1">
            <p className="text-sm font-semibold">{currentSong?.title}</p>
            <p className="text-xs font-light">{currentSong?.artist}</p>
          </div>
        </div>
        <div className="flex h-full flex-[3]">
          <div className="flex w-full items-center justify-center gap-2">
            <div className="flex h-full w-1/12 flex-col items-center">
              <div className="mt-[calc(60%+1rem-10px)] flex h-[20px] w-full items-center justify-end">
                <p className="text-[0.67rem] font-medium text-[#a7a7a7]">
                  {(duration - currentTime) / 60 < 10 ? '0' : null}
                  {Math.floor(
                    (duration - currentTime > 0 ? duration - currentTime : 0) /
                      60
                  )}
                  :{(duration - currentTime) % 60 < 10 ? '0' : null}
                  {Math.floor(
                    (duration - currentTime > 0 ? duration - currentTime : 0) %
                      60
                  )}
                </p>
              </div>
            </div>
            <div className="flex h-full w-7/12 flex-col items-center">
              <audio
                ref={audioRef}
                onEnded={() => {
                  if (toggleQueue) {
                    const song = queue.current.dequeue();
                    setCurrentSong(queue.current.peek());
                    setAudioTrack((prev) => prev + 1);
                    if (
                      !recentPlaylist.current.songs
                        .traverse()
                        .map((song) => song.title)
                        .includes(song.title)
                    ) {
                      recentlyPlayed.current.push(song);
                      recentPlaylist.current.songs.insertAtEnd(song);
                    }
                    return;
                  }
                  if (
                    currentSong &&
                    !recentPlaylist.current.songs
                      .traverse()
                      .includes(currentSong)
                  ) {
                    recentlyPlayed.current.push(currentSong);
                    recentPlaylist.current.songs.insertAtEnd(currentSong);
                  }
                  if (node.current !== null && node.current.next !== null) {
                    setCurrentSong(node.current.next.data);
                    node.current = node.current.next;
                  }
                }}
                src={`music/${currentSong?.fileName}`}
              >
                Your browser does not support the audio element.
              </audio>
              <div className="flex h-[60%] w-full items-center justify-center gap-5 pb-1 pt-3">
                <button
                  className="flex h-full w-6 items-center text-[1.75rem] text-[hsla(0,0%,100%,.7)] hover:cursor-default hover:text-whiteA-whiteA12"
                  onClick={(e: MouseEvent): void => {
                    e.preventDefault();
                    if (toggleQueue) return;
                    if (
                      node.current !== null &&
                      node.current.prev !== null &&
                      !recentPlaylist.current.songs
                        .traverse()
                        .map((song) => song.title)
                        .includes(node.current.prev.data.title)
                    ) {
                      recentlyPlayed.current.push(node.current.prev.data);
                      recentPlaylist.current.songs.insertAtEnd(
                        node.current.prev.data
                      );
                    }
                    if (node.current !== null && node.current.prev !== null) {
                      setCurrentSong(node.current.prev.data);
                      node.current = node.current.prev;
                      setAudioTrack((prev) => prev + 1);
                    }
                  }}
                >
                  <SkipPreviousIcon fontSize="inherit" />
                </button>
                <button
                  className="flex h-[2.1875rem] w-[2.1875rem] text-white hover:cursor-default hover:text-whiteA-whiteA12"
                  onClick={(e: MouseEvent): void => {
                    e.preventDefault();
                    if (recentlyPlayed.current.size() === 0 && currentSong) {
                      recentlyPlayed.current.push(currentSong);
                      recentPlaylist.current.songs.insertAtEnd(currentSong);
                    }
                    if (audioRef.current?.paused) {
                      audioRef.current?.play();
                    } else {
                      audioRef.current?.pause();
                    }
                  }}
                >
                  {audioRef.current?.paused ? (
                    <PlayCircleIcon fontSize="large" />
                  ) : (
                    <PauseCircleIcon fontSize="large" />
                  )}
                </button>
                <button
                  className="flex h-full w-6 items-center text-[1.75rem] text-[hsla(0,0%,100%,.7)] hover:cursor-default hover:text-whiteA-whiteA12"
                  onClick={(e: MouseEvent): void => {
                    e.preventDefault();
                    if (toggleQueue) {
                      const song = queue.current.dequeue();
                      setCurrentSong(queue.current.peek());
                      setAudioTrack((prev) => prev + 1);
                      if (
                        !recentPlaylist.current.songs
                          .traverse()
                          .map((song) => song.title)
                          .includes(song.title)
                      ) {
                        recentlyPlayed.current.push(song);
                        recentPlaylist.current.songs.insertAtEnd(song);
                      }
                      return;
                    }
                    if (
                      node.current !== null &&
                      node.current.next !== null &&
                      !recentPlaylist.current.songs
                        .traverse()
                        .map((song) => song.title)
                        .includes(node.current.next.data.title)
                    ) {
                      recentlyPlayed.current.push(node.current.next.data);
                      recentPlaylist.current.songs.insertAtEnd(
                        node.current.next.data
                      );
                    }
                    if (node.current !== null && node.current.next !== null) {
                      setCurrentSong(node.current.next.data);
                      node.current = node.current.next;
                      setAudioTrack((prev) => prev + 1);
                    }
                  }}
                >
                  <SkipNextIcon fontSize="inherit" />
                </button>
              </div>
              <form className="flex w-full flex-[1] items-start">
                <Slider.Root
                  className="group relative flex h-[20px] w-full touch-none select-none items-center"
                  defaultValue={[0]}
                  value={[progress]}
                  max={audioRef.current?.duration}
                  step={1}
                  onValueChange={(value: number[]): void => {
                    audioRef.current!.currentTime = value[0];
                    setProgress(value[0]);
                  }}
                >
                  <Slider.Track className="relative h-[3px] grow rounded-full bg-[#4D4D4D]">
                    <Slider.Range className="absolute h-full rounded-full bg-whiteA-whiteA12 group-hover:bg-purple-500" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="hover:bg-violet-violet3 hidden h-[12px] w-[12px] rounded-[20px] bg-[#fff] shadow-[0_2px_10px_0_rgba(0,0,0,0.141)] focus:shadow-[0_0_0_5px_rgba(0,0,0,0.22)] focus:outline-none group-hover:block"
                    aria-label="Volume"
                  />
                </Slider.Root>
              </form>
            </div>
            <div className="flex h-full w-1/12 flex-col items-center">
              <div className="mt-[calc(60%+1rem-10px)] flex h-[20px] w-full items-center">
                <p className="text-[0.67rem] font-medium text-[#a7a7a7]">
                  {currentTime / 60 < 10 ? '0' : null}
                  {Math.floor(currentTime / 60)}:
                  {currentTime % 60 < 10 ? '0' : null}
                  {Math.floor(currentTime % 60)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-[1] justify-end gap-3">
          <div
            onClick={() => setToggleQueue(!toggleQueue)}
            className={`${
              toggleQueue
                ? 'text-purple-400 hover:text-purple-500'
                : 'text-[#a7a7a7] hover:text-white'
            } flex h-full items-center hover:cursor-pointer`}
          >
            <QueueMusicIcon />
          </div>
          <div
            className="flex h-full items-center text-[#a7a7a7] hover:text-white"
            onClick={() => {
              setToggleMute(!toggleMute);
              audioRef.current!.volume = toggleMute ? (volume ?? 0) / 100 : 0;
            }}
          >
            {!toggleMute ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </div>
          <Slider.Root
            className="group relative mr-8 flex h-[20px] w-[35%] touch-none select-none items-center"
            defaultValue={[0]}
            value={[!toggleMute ? volume ?? 0 : 0]}
            max={100}
            step={1}
            onValueChange={(value: number[]): void => {
              setVolume(value[0]);
              value[0] === 0 ? setToggleMute(true) : setToggleMute(false);
              if (audioRef.current !== null)
                audioRef.current.volume = value[0] / 100;
            }}
          >
            <Slider.Track className="relative h-[4px] grow rounded-full bg-[#4D4D4D]">
              <Slider.Range className="absolute h-full rounded-full bg-whiteA-whiteA12 group-hover:bg-purple-500" />
            </Slider.Track>
            <Slider.Thumb
              className="hover:bg-violet-violet3 hidden h-[12px] w-[12px] rounded-[20px] bg-[#fff] shadow-[0_2px_10px_0_rgba(0,0,0,0.141)] focus:shadow-[0_0_0_5px_rgba(0,0,0,0.22)] focus:outline-none group-hover:block"
              aria-label="Volume"
            />
          </Slider.Root>
        </div>
      </div>
    </>
  );
}

export default MusicBar;
