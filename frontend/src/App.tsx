import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import { ContentType, Song } from '~shared/types/GlobalTypes';
import MusicBar from './components/MusicBar';

function App() {
  const [content, setContent] = useState<ContentType>('home');
  const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined);

  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <div className="flex h-[88vh] w-full">
          <Navbar active={content} setActive={setContent} />
          <Content content={content} setCurrentSong={setCurrentSong} />
        </div>
        <MusicBar currentSong={currentSong} />
      </div>
    </>
  );
}

export default App;
