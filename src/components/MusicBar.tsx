import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

function MusicBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(audioRef.current?.currentTime ?? 0);
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    }, 50);
    return () => clearInterval(interval);
  }, [audioRef.current?.currentTime]);

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex h-1/2 w-1/2 flex-col items-center justify-evenly">
          <audio ref={audioRef}>
            <source
              src="../public/01. Starboy (Feat. Daft Punk).mp3"
              type="audio/mpeg"
            ></source>
            <source
              src="../public/02. Party Monster.mp3"
              type="audio/mpeg"
            ></source>
            Your browser does not support the audio element.
          </audio>
          <button
            className="h-8 w-1/5 rounded bg-slate-800 text-whiteA-whiteA12"
            onClick={(e: MouseEvent): void => {
              e.preventDefault();
              audioRef.current?.play();
            }}
          >
            Play
          </button>
          <button
            className="h-8 w-1/5 rounded bg-slate-800 text-whiteA-whiteA12"
            onClick={(e: MouseEvent): void => {
              e.preventDefault();
              audioRef.current?.pause();
            }}
          >
            Pause
          </button>
          <form className="w-full">
            <Slider.Root
              className="relative flex h-[20px] w-full touch-none select-none items-center hover:cursor-pointer"
              defaultValue={[0]}
              value={[progress]}
              max={audioRef.current?.duration}
              step={1}
              onValueChange={(value: number[]): void => {
                audioRef.current!.currentTime = value[0];
                setProgress(value[0]);
              }}
            >
              <Slider.Track className="relative h-[3px] grow rounded-full bg-blackA-blackA10">
                <Slider.Range className="absolute h-full rounded-full bg-whiteA-whiteA12" />
              </Slider.Track>
              <Slider.Thumb
                className="hover:bg-violet-violet3 block h-[20px] w-[20px] rounded-[20px] bg-[#fff] shadow-[0_2px_10px_0_rgba(0,0,0,0.141)] hover:cursor-pointer focus:shadow-[0_0_0_5px_rgba(0,0,0,0.22)] focus:outline-none"
                aria-label="Volume"
              />
            </Slider.Root>
          </form>
          <div>
            {currentTime / 60 < 10 ? '0' : null}
            {Math.floor(currentTime / 60)}:{currentTime % 60 < 10 ? '0' : null}
            {Math.floor(currentTime % 60)}
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicBar;
