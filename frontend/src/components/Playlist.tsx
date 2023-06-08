import { PlaylistProps } from '../types/PropsType';

export default function Playlist({ playlist }: PlaylistProps) {
  return <>{playlist.songs.traverse()}</>;
}
