import { ContentType, Playlist, Song } from './GlobalTypes';
import { Node } from '../utils/LinkedList';
import React from 'react';
import { Stack } from '~shared/utils/stack';

export type ContetnProps = {
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
  node: React.MutableRefObject<Node<Song> | null>;
  recentPlaylist: React.MutableRefObject<Playlist>;
  allPlaylists: Playlist[];
  setAllPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<Playlist>>;
  playlist: Playlist;
  active: boolean;
  setActivePlaylist: React.Dispatch<React.SetStateAction<string>>;
  currentPlaylist: Playlist;
};
export type SongProps = {
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
