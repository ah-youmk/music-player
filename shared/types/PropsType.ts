import { ContentType, Playlist, Song } from './GlobalTypes';

export type ContetnProps = {
  content: ContentType;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
};
export type NavbarProps = {
  active: ContentType;
  setActive: React.Dispatch<React.SetStateAction<ContentType>>;
};
export type PlaylistProps = {
  playlist: Playlist;
};
export type SongProps = {
  song: Song;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
};
export type HomeProps = {
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
};
export type MusicBarProps = {
  currentSong: Song | undefined;
};
