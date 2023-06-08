import NodeID3 from 'node-id3';
import { Song } from '~shared/types/GlobalTypes.ts';
import { glob } from 'glob';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

const getSongs = async (): Promise<Song[]> => {
  const songs: Song[] = [];
  const mp3Files = await glob('**/*.mp3', {
    ignore: 'node_modules/**',
  });
  mp3Files.forEach((file: string) => {
    const tags = NodeID3.read(file);
    if (
      tags.image !== undefined &&
      typeof tags.image !== 'string' &&
      !songs.map((song: Song) => song.title).includes(tags.title ?? 'TITLE')
    ) {
      const imagePath = pathToFileURL(
        `${
          path.parse(
            path.parse(path.parse(`${fileURLToPath(import.meta.url)}`).dir).dir
          ).dir
        }\\public\\music\\covers\\${tags.title}.jpg`
      );
      songs.push({
        fileName: path.parse(file).base,
        artist: tags.artist ?? 'ARTIST',
        album: tags.album ?? 'ALBUM',
        title: tags.title ?? 'TITLE',
      });
      fs.writeFileSync(imagePath, tags.image.imageBuffer);
    }
  });
  return songs;
};

export default getSongs;
