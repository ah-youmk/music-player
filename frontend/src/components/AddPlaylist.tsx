import * as Label from '@radix-ui/react-label';
import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { columns } from './columns';
import { DataTable } from './data-table';
import { AddPlaylistProps } from '~shared/types/PropsType';
import { Playlist, Song } from '../../../shared/types/GlobalTypes';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { Button } from './ui/button';
import { LinkedList } from '../../../shared/utils/LinkedList';
import { DialogClose } from '@radix-ui/react-dialog';

export default function AddPlaylist({
  songs,
  playlists,
  setPlaylists,
}: AddPlaylistProps) {
  const [name, setName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex w-[95%] flex-col gap-5">
        <div className="flex w-full flex-[1] flex-wrap items-center justify-between gap-3 px-3">
          <Label.Root
            className="text-base font-medium text-white"
            htmlFor="playlistName"
          >
            Playlist name
          </Label.Root>
          <input
            className="inline-flex h-[35px] w-1/2 items-center justify-center rounded border-[1px] border-purple-300 bg-violet-violet1-violet4 px-2.5 leading-[1] text-black shadow-md shadow-blackA-blackA9 focus:shadow-blackA-blackA9 focus:outline-none focus:outline-[3px] focus:outline-purple-500"
            type="text"
            id="playlistName"
            value={name}
            ref={inputRef}
            onChange={() => setName(inputRef.current?.value ?? '')}
          />
        </div>
        <div className="flex w-full flex-[1] gap-5 px-3">
          <div className="flex flex-[1]">
            <Dialog open={open} onOpenChange={setOpen}>
              {name !== '' &&
              !playlists.map((playlist) => playlist.name).includes(name) ? (
                <DialogTrigger asChild className="m-auto w-1/2 justify-center">
                  <button className="focus:outline-5 h-8 rounded-2xl bg-purple-500 font-semibold text-purple-200 transition-colors duration-200 hover:bg-purple-700 focus:bg-purple-700 focus:outline focus:outline-offset-[3px] focus:outline-white">
                    Select Songs
                  </button>
                </DialogTrigger>
              ) : (
                <div className="flex w-full justify-center">
                  <button
                    onClick={() => {
                      if (name === '')
                        toast({
                          title: 'Choose a name!',
                          description: "Your playlist doesn't have any name.",
                          variant: 'destructive',
                        });
                      else
                        toast({
                          title: 'This playlist is already exists!',
                          description: 'Choose a different name maybe?',
                          variant: 'destructive',
                        });
                    }}
                    className="focus:outline-5 h-8 w-1/2 rounded-2xl bg-purple-500 font-semibold text-purple-200 transition-colors duration-200 hover:bg-purple-700 focus:bg-purple-700 focus:outline focus:outline-offset-[3px] focus:outline-white"
                  >
                    Select Songs
                  </button>
                </div>
              )}
              <DialogContent className="md:min-w-[50vw]">
                <DialogHeader>
                  <DialogTitle>Select</DialogTitle>
                  <DialogDescription>
                    Select the songs you want to add to the playlist
                  </DialogDescription>
                </DialogHeader>
                <div className="container mx-auto overflow-auto py-10">
                  <DataTable
                    setSelectedSongs={setSelectedSongs}
                    columns={columns}
                    data={Array.from(songs.values())}
                  />
                </div>
                <DialogFooter>
                  <div className="flex w-full justify-center">
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          if (selectedSongs.length === 0) {
                            toast({
                              variant: 'destructive',
                              title: 'No song selected!',
                              description: 'At least select one song.',
                            });
                            return;
                          }
                          const newPlaylist: Playlist = {
                            name: name,
                            songs: new LinkedList(),
                          };
                          for (const song of selectedSongs)
                            newPlaylist.songs.insertInBegin(song);
                          setPlaylists([...playlists, newPlaylist]);
                          toast({
                            title: 'Your playlist has been added to library.',
                            action: (
                              <ToastAction altText="Close">Got it</ToastAction>
                            ),
                          });
                        }}
                      >
                        Done
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
