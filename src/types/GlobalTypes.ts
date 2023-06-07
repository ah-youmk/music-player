import { LinkedList } from '../utils/LinkedList';

export type Song = {
  fileName: string;
  title: string;
  artist: string;
  album: string;
};
export type ContentType = 'home' | 'search' | Playlist;
export type NavType = 'library' | 'playlist';
export type Playlist = {
  name: string;
  songs: LinkedList<Song>;
};
