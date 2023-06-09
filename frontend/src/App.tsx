import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import { ContentType, Playlist, Song } from '~shared/types/GlobalTypes';
import MusicBar from './components/MusicBar';
import { LinkedList } from '../../shared/utils/LinkedList.ts';
import SongComponent from './components/Song.tsx';
import { Node } from '../../shared/utils/LinkedList';
import { Stack } from '../../shared/utils/stack.ts';

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
  const [volume, setVolume] = useState<number | undefined>(0);
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);
  const [activePlaylist, setActivePlaylist] = useState<string>('');
  const recentlyPlayed = useRef<Stack<Song>>(new Stack());
  const [toggleQueue, setToggleQueue] = useState<boolean>(false);
  const recentPlaylist = useRef<Playlist>({
    name: 'Recently Played',
    songs: new LinkedList<Song>(),
  });

  const getSongs = () => {
    fetch('http://localhost:5000/songs')
      .then((response: Response) => response.json())
      .then((result: FetchedSongs) => {
        setSongs(new Map(Object.entries(result)));
        const playlist: Playlist = {
          name: 'Home',
          songs: new LinkedList<Song>(),
        };
        for (const property in result) {
          playlist.songs.insertAtEnd(result[property]);
        }
        node.current = playlist.songs.getHead;
        setAllPlaylists([...allPlaylists, playlist]);
        setCurrentPlaylist(playlist);
        setActivePlaylist('Home');
      });
  };

  const showSongs = (map: Map<string, Song>) => {
    const elements: JSX.Element[] = [];
    for (const [key, value] of map) {
      elements.push(
        <SongComponent
          recentPlaylist={recentPlaylist}
          recentlyPlayed={recentlyPlayed}
          volume={volume}
          setVolume={setVolume}
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
            node={node}
            recentPlaylist={recentPlaylist}
            currentPlaylist={currentPlaylist}
            setPlaylists={setAllPlaylists}
            songs={songs}
            activePlaylist={activePlaylist}
            setActivePlaylist={setActivePlaylist}
            allPlaylists={allPlaylists}
            active={content}
            setActive={setContent}
            setCurrentPlaylist={setCurrentPlaylist}
          />
          <Content
            toggleQueue={toggleQueue}
            recentPlaylist={recentPlaylist}
            recentlyPlayed={recentlyPlayed}
            volume={volume}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            node={node}
            setVolume={setVolume}
            content={content}
            currentPlaylist={currentPlaylist}
            showSongs={showSongs}
            songs={songs}
          />
        </div>
        <MusicBar
          toggleQueue={toggleQueue}
          setToggleQueue={setToggleQueue}
          recentPlaylist={recentPlaylist}
          recentlyPlayed={recentlyPlayed}
          volume={volume}
          setVolume={setVolume}
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
