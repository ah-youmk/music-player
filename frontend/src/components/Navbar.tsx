import { useState, MouseEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PageviewIcon from '@mui/icons-material/Pageview';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { NavType } from '~shared/types/GlobalTypes';
import { NavbarProps } from '~shared/types/PropsType';
import NavbarPlaylist from './NavbarPlaylist';
import AddPlaylist from './AddPlaylist';

export default function Navbar({
  active,
  setActive,
  setCurrentPlaylist,
  allPlaylists,
  activePlaylist,
  setActivePlaylist,
  setPlaylists,
  songs,
  currentPlaylist,
  recentPlaylist,
  node,
}: NavbarProps) {
  const [navContent, setNavContent] = useState<NavType>('library');

  return (
    <>
      <nav className="flex h-[88vh] w-16 flex-col gap-3 bg-black px-3 pt-3 md:w-72 lg:flex-[1]">
        <div className="flex w-full flex-[1] items-center justify-center p-3">
          <p className="w-[95%] text-sm font-bold md:text-base lg:text-xl">
            Music Player™
          </p>
        </div>
        <ul className="flex flex-[2] flex-col items-center gap-4 bg-[#121212] p-3 text-[#b3b3b3]">
          <li
            className={`flex w-[95%] flex-[1] gap-3 transition-all duration-300 hover:cursor-pointer ${
              active === 'home' ? 'text-white' : 'hover:text-white'
            }`}
            onClick={() => setActive('home')}
          >
            <div className="flex flex-[1] items-start">
              {active === 'home' ? (
                <HomeIcon fontSize="large" />
              ) : (
                <HomeOutlinedIcon fontSize="large" />
              )}
            </div>
            <a
              href="/"
              className="flex flex-[4] items-center"
              onClick={(e: MouseEvent) => e.preventDefault()}
            >
              <span className="font-semibold">Home</span>
            </a>
          </li>
          <li
            className={`flex w-[95%] flex-[1] gap-3 transition-all duration-300 hover:cursor-pointer ${
              active === 'search' ? 'text-white' : 'hover:text-white'
            }`}
            onClick={() => setActive('search')}
          >
            <div className="flex flex-[1] items-start">
              {active === 'search' ? (
                <PageviewIcon fontSize="large" />
              ) : (
                <SearchOutlinedIcon fontSize="large" />
              )}
            </div>
            <a
              href="/"
              className="flex flex-[4] items-center"
              onClick={(e: MouseEvent) => e.preventDefault()}
            >
              <span className="font-semibold">Search</span>
            </a>
          </li>
        </ul>
        <div className="flex w-full flex-[10] flex-col gap-3 overflow-auto rounded-lg bg-[#121212]">
          <div className="flex h-full w-full flex-col rounded-lg">
            <ul className="flex-1/6 flex w-full flex-col items-center gap-4 p-3 text-[#b3b3b3]">
              <li
                className={`flex w-[95%] gap-3 transition-all duration-300 hover:cursor-pointer ${
                  navContent === 'library' ? 'text-white' : 'hover:text-white'
                }`}
                onClick={() => setNavContent('library')}
              >
                <div className="flex-[1]">
                  {navContent === 'library' ? (
                    <LibraryBooksIcon fontSize="large" />
                  ) : (
                    <LibraryBooksOutlinedIcon fontSize="large" />
                  )}
                </div>
                <a
                  href="/"
                  className="flex flex-[4] items-center"
                  onClick={(e: MouseEvent) => e.preventDefault()}
                >
                  <span className="font-semibold">Library</span>
                </a>
              </li>
              <li
                className={`flex w-[95%] gap-3 transition-all duration-300 hover:cursor-pointer ${
                  navContent === 'playlist' ? 'text-white' : 'hover:text-white'
                }`}
                onClick={() => setNavContent('playlist')}
              >
                <div className="flex-[1]">
                  {navContent === 'playlist' ? (
                    <AddCircleOutlinedIcon fontSize="large" />
                  ) : (
                    <ControlPointOutlinedIcon fontSize="large" />
                  )}
                </div>
                <a
                  href="/"
                  className="flex flex-[4] items-center"
                  onClick={(e: MouseEvent) => e.preventDefault()}
                >
                  <span className="font-semibold">Add Playlist</span>
                </a>
              </li>
            </ul>

            {navContent === 'playlist' && (
              <div className="flex w-full flex-[1] flex-col items-center overflow-auto p-3">
                <AddPlaylist
                  playlists={allPlaylists}
                  setPlaylists={setPlaylists}
                  songs={songs}
                />
              </div>
            )}
            {navContent === 'library' && (
              <ul className="flex w-full flex-col items-center px-3">
                <NavbarPlaylist
                  node={node}
                  currentPlaylist={currentPlaylist}
                  recentPlaylist={recentPlaylist}
                  allPlaylists={allPlaylists}
                  setAllPlaylists={setPlaylists}
                  setCurrentPlaylist={setCurrentPlaylist}
                  playlist={recentPlaylist.current}
                  setActivePlaylist={setActivePlaylist}
                  active={recentPlaylist.current.name === activePlaylist}
                />
                {allPlaylists.map((playlist, index) => (
                  <NavbarPlaylist
                    node={node}
                    currentPlaylist={currentPlaylist}
                    recentPlaylist={recentPlaylist}
                    allPlaylists={allPlaylists}
                    setAllPlaylists={setPlaylists}
                    setCurrentPlaylist={setCurrentPlaylist}
                    key={index}
                    playlist={playlist}
                    setActivePlaylist={setActivePlaylist}
                    active={playlist.name === activePlaylist}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="block md:hidden">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="Button violet">Edit profile</button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="DialogOverlay" />
              <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">
                  Edit profile
                </Dialog.Title>
                <Dialog.Description className="DialogDescription">
                  Make changes to your profile here. Click save when you're
                  done.
                </Dialog.Description>
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="Input"
                    id="name"
                    defaultValue="Pedro Duarte"
                  />
                </fieldset>
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="Input"
                    id="username"
                    defaultValue="@peduarte"
                  />
                </fieldset>
                <div
                  style={{
                    display: 'flex',
                    marginTop: 25,
                    justifyContent: 'flex-end',
                  }}
                >
                  <Dialog.Close asChild>
                    <button className="Button green">Save changes</button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button className="IconButton" aria-label="Close">
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </>
  );
}
