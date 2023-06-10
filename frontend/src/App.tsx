import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import { ContentType, Playlist, Song } from '~shared/types/GlobalTypes';
import MusicBar from './components/MusicBar';
import { LinkedList } from '../../shared/utils/LinkedList.ts';
import SongComponent from './components/Song.tsx';
import { Node } from '../../shared/utils/LinkedList';
import { Stack } from '../../shared/utils/stack.ts';
import { QueueCollection } from '../../shared/utils/queue.ts';

type FetchedSongs = {
  [key: string]: Song;
};

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [content, setContent] = useState<ContentType>('home');
  const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>({
    name: 'Home',
    songs: new LinkedList<Song>(),
  });
  const [songs, setSongs] = useState<Map<string, Song>>(new Map());
  const node = useRef<Node<Song> | null>(null);
  const [volume, setVolume] = useState<number | undefined>(100);
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);
  const [activePlaylist, setActivePlaylist] = useState<string>('');
  const recentlyPlayed = useRef<Stack<Song>>(new Stack());
  const [toggleQueue, setToggleQueue] = useState<boolean>(false);
  const recentPlaylist = useRef<Playlist>({
    name: 'Recently Played',
    songs: new LinkedList<Song>(),
  });
  const prevContent = useRef<{ content: ContentType }>({ content: 'home' });
  const queue = useRef<QueueCollection<Song>>(new QueueCollection());

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
          queue={queue}
          currentSong={currentSong}
          audioRef={audioRef}
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

  useEffect(() => {
    if (toggleQueue) {
      prevContent.current!.content = content;
      setContent('queue');
    } else {
      setContent(prevContent.current?.content ?? 'home');
    }
  }, [toggleQueue]);

  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <div className="flex h-[88vh] w-full">
          <Navbar
            setToggleQueue={setToggleQueue}
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
            queue={queue}
            audioRef={audioRef}
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
          queue={queue}
          audioRef={audioRef}
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
