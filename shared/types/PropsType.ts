import { ContentType, Playlist, Song } from './GlobalTypes';
import { Node } from '../utils/LinkedList';
import React from 'react';

export type ContetnProps = {
  content: ContentType;
  songs: Map<string, Song>;
  currentPlaylist: Playlist;
  showSongs: (map: Map<string, Song>) => JSX.Element[];
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  node: React.MutableRefObject<Node<Song> | null>;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
  currentSong: Song | undefined;
};
export type NavbarProps = {
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
  allPlaylists: Playlist[];
  setAllPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<Playlist>>;
  playlist: Playlist;
  active: boolean;
  setActivePlaylist: React.Dispatch<React.SetStateAction<string>>;
  currentPlaylist: Playlist;
};
export type SongProps = {
  song: Song;
  node: React.MutableRefObject<Node<Song> | null>;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
  active: boolean;
  currentPlaylist: Playlist;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
};
export type HomeProps = {
  currentPlaylist: Playlist;
  showSongs: (map: Map<string, Song>) => JSX.Element[];
  songs: Map<string, Song>;
};
export type MusicBarProps = {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
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
