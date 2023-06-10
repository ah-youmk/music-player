/** abso-fucking-lutely terrible idea
 * never gonna do this again...
 */
import { ContentType, NavType, Playlist, Song } from './GlobalTypes';
import { Node } from '../utils/LinkedList';
import React from 'react';
import { Stack } from '~shared/utils/stack';
import { QueueCollection } from '~shared/utils/queue';

export type ContetnProps = {
  queue: React.MutableRefObject<QueueCollection<Song>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  toggleQueue: boolean;
  recentPlaylist: React.MutableRefObject<Playlist>;
  recentlyPlayed: React.MutableRefObject<Stack<Song>>;
  volume: number | undefined;
  content: ContentType;
  songs: Map<string, Song>;
  currentPlaylist: Playlist;
  showSongs: (map: Map<string, Song>) => JSX.Element[];
  setVolume: React.Dispatch<React.SetStateAction<number | undefined>>;
  node: React.MutableRefObject<Node<Song> | null>;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
  currentSong: Song | undefined;
};
export type NavbarProps = {
  setToggleQueue: React.Dispatch<boolean>;
  node: React.MutableRefObject<Node<Song> | null>;
  recentPlaylist: React.MutableRefObject<Playlist>;
  currentPlaylist: Playlist;
  songs: Map<string, Song>;
  activePlaylist: string;
  setActivePlaylist: React.Dispatch<React.SetStateAction<string>>;
  allPlaylists: Playlist[];
  active: ContentType;
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<Playlist>>;
  setActive: React.Dispatch<React.SetStateAction<ContentType>>;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
};
export type PlaylistProps = {
  setNavContent: React.Dispatch<NavType>;
  node: React.MutableRefObject<Node<Song> | null>;
  recentPlaylist: React.MutableRefObject<Playlist>;
  allPlaylists: Playlist[];
  setAllPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<Playlist>>;
  playlist: Playlist;
  active: boolean;
  setActivePlaylist: React.Dispatch<React.SetStateAction<string>>;
  currentPlaylist: Playlist;
  setToggleQueue: React.Dispatch<boolean>;
};
export type SongProps = {
  queue: React.MutableRefObject<QueueCollection<Song>>;
  currentSong: Song | undefined;
  audioRef: React.RefObject<HTMLAudioElement>;
  recentPlaylist: React.MutableRefObject<Playlist>;
  recentlyPlayed: React.MutableRefObject<Stack<Song>>;
  volume: number | undefined;
  song: Song;
  node: React.MutableRefObject<Node<Song> | null>;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
  active: boolean;
  currentPlaylist: Playlist;
  setVolume: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export type HomeProps = {
  currentPlaylist: Playlist;
  showSongs: (map: Map<string, Song>) => JSX.Element[];
  songs: Map<string, Song>;
};
export type MusicBarProps = {
  queue: React.MutableRefObject<QueueCollection<Song>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  toggleQueue: boolean;
  setToggleQueue: React.Dispatch<React.SetStateAction<boolean>>;
  recentlyPlayed: React.MutableRefObject<Stack<Song>>;
  recentPlaylist: React.MutableRefObject<Playlist>;
  volume: number | undefined;
  setVolume: React.Dispatch<React.SetStateAction<number | undefined>>;
  node: React.MutableRefObject<Node<Song> | null>;
  currentPlaylist: Playlist;
  currentSong: Song | undefined;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
};
export type AddPlaylistProps = {
  songs: Map<string, Song>;
  playlists: Playlist[];
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
};
