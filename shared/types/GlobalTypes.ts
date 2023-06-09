import { LinkedList } from '../utils/LinkedList';
import { Stack } from '../utils/stack';

export type Song = {
  fileName: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
};
export type ContentType = 'home' | 'search' | Playlist;
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
