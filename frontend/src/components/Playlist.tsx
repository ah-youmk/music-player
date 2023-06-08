import { Song } from '../../../shared/types/GlobalTypes';
import { PlaylistProps } from '../../../shared/types/PropsType';

export default function Playlist({ playlist }: PlaylistProps) {
  return (
    <>
      {playlist.songs.traverse().map((song: Song, index) => (
        <div key={index}>
          {song.album}
          {song.artist}
          {song.title}
        </div>
      ))}
    </>
  );
}
