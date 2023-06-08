import { PlaylistProps } from '~shared/types/PropsType';

export default function Playlist({ playlist }: PlaylistProps) {
  return <>{playlist.songs.traverse()}</>;
}
