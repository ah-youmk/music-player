import { ContentType, Playlist, Song } from './GlobalTypes';

export type ContetnProps = {
  content: ContentType;
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
};

export type HomeProps = {
  songs: Song[];
};
