import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

export default function Navbar() {
  return (
    <>
      <nav className="flex h-[90vh] w-16 flex-col gap-3 bg-black p-3 md:w-40 lg:w-64">
        <div className="flex h-[10%] w-full items-center justify-center">
          <p className="w-[95%] text-sm font-bold md:text-base lg:text-xl">
            Music Player™
          </p>
        </div>
        <ul className="flex h-[90%] w-full flex-col items-center gap-4 text-[#b3b3b3]">
          <li className="flex w-[95%] gap-3 hover:cursor-pointer">
            <div className="flex flex-[1] items-start">
              <HomeOutlinedIcon fontSize="large" />
            </div>
            <a href="/" className="flex flex-[4] items-center">
              <span className="font-semibold">Home</span>
            </a>
          </li>
          <li className="flex w-[95%] gap-3 hover:cursor-pointer">
            <div className="flex flex-[1] items-start">
              <SearchOutlinedIcon fontSize="large" />
            </div>
            <a href="/" className="flex flex-[4] items-center">
              <span className="font-semibold">Search</span>
            </a>
          </li>
          <li className="flex w-[95%] gap-3 hover:cursor-pointer">
            <div className="flex-[1]">
              <LibraryBooksOutlinedIcon fontSize="large" />
            </div>
            <a href="/" className="flex flex-[4] items-center">
              <span className="font-semibold">Library</span>
            </a>
          </li>
          <li className="flex w-[95%] gap-3 hover:cursor-pointer">
            <div className="flex-[1]">
              <ControlPointOutlinedIcon fontSize="large" />
            </div>
            <a href="/" className="flex flex-[4] items-center">
              <span className="font-semibold">Create Playlist</span>
            </a>
          </li>
        </ul>
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
