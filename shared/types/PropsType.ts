import { ContentType, Playlist, Song } from './GlobalTypes';
import { Node } from '../utils/LinkedList';

export type ContetnProps = {
  content: ContentType;
  songs: Map<string, Song>;
  currentPlaylist: Playlist;
  showSongs: (map: Map<string, Song>) => JSX.Element[];
};
export type NavbarProps = {
  active: ContentType;
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<Playlist>>;
  setActive: React.Dispatch<React.SetStateAction<ContentType>>;
};
export type PlaylistProps = {
  playlist: Playlist;
};
export type SongProps = {
  song: Song;
  node: React.MutableRefObject<Node<Song> | null>;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
  active: boolean;
  currentPlaylist: Playlist;
};
export type HomeProps = {
  currentPlaylist: Playlist;
  showSongs: (map: Map<string, Song>) => JSX.Element[];
  songs: Map<string, Song>;
};
export type MusicBarProps = {
  node: React.MutableRefObject<Node<Song> | null>;
  currentPlaylist: Playlist;
  currentSong: Song | undefined;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
};
