import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { MusicBarProps } from '~shared/types/PropsType';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

function MusicBar({
  currentSong,
  currentPlaylist,
  node,
  setCurrentSong,
}: MusicBarProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const duration = currentSong?.duration ?? 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(audioRef.current?.currentTime ?? 0);
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    }, 50);
    return () => clearInterval(interval);
  }, [audioRef.current?.currentTime]);

  useEffect(() => {
    audioRef.current?.play();
  }, [currentSong]);

  return (
    <>
      <div className="flex h-[12vh] w-full items-center justify-center bg-[#000]">
        <div className="flex flex-[1]"></div>
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
                    if (node.current !== null && node.current.prev !== null) {
                      setCurrentSong(node.current.prev.data);
                      node.current = node.current.prev;
                    }
                  }}
                >
                  <SkipPreviousIcon fontSize="inherit" />
                </button>
                <button
                  className="flex h-[2.1875rem] w-[2.1875rem] text-white hover:cursor-default hover:text-whiteA-whiteA12"
                  onClick={(e: MouseEvent): void => {
                    e.preventDefault();
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
                    if (node.current !== null && node.current.next !== null) {
                      setCurrentSong(node.current.next.data);
                      node.current = node.current.next;
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
        <div className="flex flex-[1]"></div>
      </div>
    </>
  );
}

export default MusicBar;
