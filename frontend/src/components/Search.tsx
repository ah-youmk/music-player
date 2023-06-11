import {
  Table,
  TableHead,
  TableCaption,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from './ui/table';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Playlist, Song } from '~shared/types/GlobalTypes';
import { BinarySearchTree } from '../../../shared/utils/bst';
import { Node } from '~shared/utils/LinkedList';

function convertToArray(songs: Map<string, Song>): Song[] {
  const converted: Song[] = [];
  for (const [_key, value] of songs) {
    converted.push(value);
  }
  return converted;
}

function comparator(a: string, b: string) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

type FilterType = 'artist' | 'title' | 'album' | 'genre' | undefined;

export default function Search({
  allSongs,
  setCurrentSong,
  audioRef,
  node,
  currentPlaylist,
  currentSong,
}: {
  allSongs: Map<string, Song>;
  setCurrentSong: React.Dispatch<Song | undefined>;
  audioRef: RefObject<HTMLAudioElement>;
  node: React.MutableRefObject<Node<Song> | null>;
  currentPlaylist: Playlist;
  currentSong: Song | undefined;
}) {
  const [result, setResult] = useState<Song[]>([]);
  const [filterMethod, setFilterMethod] = useState<FilterType>(undefined);
  const [input, setInput] = useState<string>('');
  const cachedSongs = useMemo(() => convertToArray(allSongs), [allSongs]);
  const [audioTrack, setAudioTrack] = useState<number>(0);
  const didMount = useRef<boolean>(false);

  const searchHandler = (input: string, filterMethod: FilterType): void => {
    if (!filterMethod) return;
    const itemsToBeFiltered: string[] = cachedSongs
      .map((song) => song[filterMethod])
      .filter((item): item is string => item !== undefined);
    if (input.length === 0) {
      setResult(cachedSongs);
      return;
    }

    const bst = new BinarySearchTree<string>(comparator);
    let characterCounter = 0;
    for (let i = 0; i < itemsToBeFiltered.length; i++)
      bst.insert(itemsToBeFiltered[i].charAt(characterCounter), i);
    characterCounter++;
    let result = bst.search(input.charAt(0));
    input = input.substring(1);
    while (input && result) {
      const bst = new BinarySearchTree<string>(comparator);
      result.indexes.forEach((index) => {
        bst.insert(itemsToBeFiltered[index].charAt(characterCounter), index);
      });
      characterCounter++;
      result = bst.search(input.charAt(0));
      input = input.substring(1);
    }
    if (result) setResult(result.indexes.map((index) => cachedSongs[index]));
    else setResult([]);
  };

  useEffect(() => {
    if (didMount.current) {
      audioRef.current?.play();
      console.log('first');
    } else {
      didMount.current = true;
    }
  }, [audioTrack]);

  return (
    <>
      <div className="flex flex-[3] flex-col gap-3 p-5">
        <div className="flex gap-5">
          <Input
            className="flex-[5] border-whiteA-whiteA10 placeholder:text-whiteA-whiteA10 focus-visible:outline-whiteA-whiteA10"
            type="text"
            placeholder="Search..."
            value={input}
            onChange={(e) => {
              const newInput = e.target.value;
              setInput(newInput);
              searchHandler(newInput, filterMethod);
            }}
          />
          <Select
            onValueChange={(value) => {
              if (
                value === 'title' ||
                value === 'album' ||
                value === 'genre' ||
                value === 'artist'
              ) {
                setFilterMethod(value);
                searchHandler(input, value);
              }
            }}
          >
            <SelectTrigger className="flex-[1] border-whiteA-whiteA10 placeholder:text-whiteA-whiteA10 focus:outline-whiteA-whiteA10">
              <SelectValue placeholder="Filter method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-[#121212] text-white">
                <SelectLabel>Filter by</SelectLabel>
                <SelectItem onClick={() => console.log('first')} value="title">
                  Title
                </SelectItem>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="genre">Genre</SelectItem>
                <SelectItem value="album">Album</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Table className="bg-[#2b2b2b]">
          <TableCaption>{result.length} songs found.</TableCaption>
          <TableHeader>
            <TableRow className="border-whiteA-whiteA10 text-[#b3b3b3]">
              <TableHead className="w-[100px] text-inherit">Cover</TableHead>
              <TableHead className="text-inherit">Title</TableHead>
              <TableHead className="text-inherit">Artist</TableHead>
              <TableHead className="text-inherit">Album</TableHead>
              <TableHead className="text-inherit">Genre</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {result.map((song) => (
              <TableRow
                onClick={() => {
                  setCurrentSong(song);
                  let newNode = currentPlaylist.songs.getHead;
                  while (newNode && newNode?.data.title !== song.title)
                    newNode = newNode?.next;
                  node.current = newNode;
                  setAudioTrack((prev) => prev + 1);
                }}
                key={song.title}
                className={`${
                  song.title === currentSong?.title ? 'bg-[#1A1A1A]' : ''
                } border-whiteA-whiteA10 hover:cursor-pointer hover:bg-[#1A1A1A]`}
              >
                <TableCell className="font-medium">
                  <img
                    src={`music/covers/${song.title}.jpg`}
                    alt={song.title}
                  />
                </TableCell>
                <TableCell>{song.title}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>{song.album}</TableCell>
                <TableCell>{song.genre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
