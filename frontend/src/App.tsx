import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import { ContentType } from '~shared/types/GlobalTypes';
import MusicBar from './components/MusicBar';

function App() {
  const [content, setContent] = useState<ContentType>('home');

  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <div className="flex h-[88vh] w-full">
          <Navbar active={content} setActive={setContent} />
          <Content content={content} />
        </div>
        <MusicBar />
      </div>
    </>
  );
}

export default App;
