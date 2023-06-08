import { SongProps } from '~shared/types/PropsType';

export default function Song({ song }: SongProps) {
  return (
    <>
      <div className="flex h-[35vh] flex-col px-3 pb-5 pt-3">
        <div className="flex-[2]">
          <img src={`music/covers/${song.title}.jpg`} alt={song.title} />
        </div>
        <div className="flex flex-[1] flex-col items-start">
          <p className="flex flex-[1] items-center text-xl font-bold">
            {song.title}
          </p>
          <p className="font-base flex flex-[1] items-center text-base">
            {song.artist}
          </p>
        </div>
      </div>
    </>
  );
}
