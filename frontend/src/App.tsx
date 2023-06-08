import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import { ContentType, Playlist, Song } from '~shared/types/GlobalTypes';
import MusicBar from './components/MusicBar';
import { LinkedList } from '../../shared/utils/LinkedList.ts';
import SongComponent from './components/Song.tsx';
import { Node } from '../../shared/utils/LinkedList';

type FetchedSongs = {
  [key: string]: Song;
};

function App() {
  const [content, setContent] = useState<ContentType>('home');
  const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>({
    name: 'Home',
    songs: new LinkedList<Song>(),
  });
  const [songs, setSongs] = useState<Map<string, Song>>(new Map());
  const node = useRef<Node<Song> | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const getSongs = () => {
    fetch('http://localhost:5000/songs')
      .then((response: Response) => response.json())
      .then((result: FetchedSongs) => {
        setSongs(new Map(Object.entries(result)));
        const playlist: Playlist = {
          name: 'Home',
          songs: new LinkedList<Song>(),
        };
        const arr = Object.entries(result);
        for (let i = 0; i < arr.length; i++) {
          if (i === 0) {
            node.current = new Node(arr[i][1]);
            node.current.next = new Node(arr[i + 1][1]);
            node.current = node.current.next;
          } else if (node.current !== null && i < arr.length - 1) {
            node.current.next = new Node(arr[i + 1][1]);
            node.current.next.prev = node.current;
            node.current = node.current.next;
          }
          playlist.songs.insertAtEnd(arr[i][1]);
        }
        setCurrentPlaylist(playlist);
      });
  };

  const showSongs = (map: Map<string, Song>) => {
    const elements: JSX.Element[] = [];
    for (const [key, value] of map) {
      elements.push(
        <SongComponent
          node={node}
          key={key}
          song={value}
          setCurrentSong={setCurrentSong}
          active={currentSong?.title === value.title}
          currentPlaylist={currentPlaylist}
        />
      );
    }
    return elements;
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <div className="flex h-[88vh] w-full">
          <Navbar
            currentPlaylist={currentPlaylist}
            active={content}
            setActive={setContent}
            setCurrentPlaylist={setCurrentPlaylist}
          />
          <Content
            content={content}
            currentPlaylist={currentPlaylist}
            showSongs={showSongs}
            songs={songs}
          />
        </div>
        <MusicBar
          playlists={playlists}
          setPlaylists={setPlaylists}
          node={node}
          currentSong={currentSong}
          currentPlaylist={currentPlaylist}
          setCurrentSong={setCurrentSong}
        />
      </div>
    </>
  );
}

export default App;
