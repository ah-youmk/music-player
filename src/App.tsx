import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';

function App() {
  return (
    <>
      <div className="flex h-screen w-full">
        <Navbar />
        <Content contentType="" />
      </div>
    </>
  );
}

export default App;
