import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import { ContentType } from './types/GlobalTypes';

function App() {
  const [content, setContent] = useState<ContentType>('home');

  return (
    <>
      <div className="flex h-screen w-full">
        <Navbar active={content} setActive={setContent} />
        <Content content={content} />
      </div>
    </>
  );
}

export default App;
