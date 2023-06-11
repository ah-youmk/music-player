import { LinkedList } from '../utils/LinkedList';
import { Stack } from '../utils/stack';

export type Song = {
  genre: string | undefined;
  fileName: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
};
export type ContentType = 'home' | 'search' | 'queue' | Playlist;
export type NavType = 'library' | 'playlist';
export type Playlist = {
  name: string;
  songs: LinkedList<Song>;
};
export type RecentlyPlayed = Stack<Song>;
export abstract class Collection<T> {
  protected storage: T[] = [];

  size(): number {
    return this.storage.length;
  }
  abstract isFull(): boolean;
}
