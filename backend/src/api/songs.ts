import { Song } from '~shared/types/GlobalTypes.ts';
import { glob } from 'glob';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import { parseFile } from 'music-metadata';

const parseFiles = async (files: string[]): Promise<Map<string, Song>> => {
  const songs: Map<string, Song> = new Map();
  for (const file of files) {
    const metadata = await parseFile(file);
    if (
      metadata.common.picture !== undefined &&
      !songs.has(metadata.common.title ?? 'TITLE')
    ) {
      const imagePath = pathToFileURL(
        `${
          path.parse(
            path.parse(path.parse(`${fileURLToPath(import.meta.url)}`).dir).dir
          ).dir
        }\\public\\music\\covers\\${metadata.common.title}.jpg`
      );
      songs.set(metadata.common.title ?? 'TITLE', {
        fileName: path.parse(file).base,
        artist: metadata.common.artist ?? 'ARTIST',
        album: metadata.common.album ?? 'ALBUM',
        title: metadata.common.title ?? 'TITLE',
        duration: metadata.format.duration ?? 0,
      });
      fs.writeFileSync(imagePath, metadata.common.picture[0].data);
    }
  }
  return songs;
};

const getAudioFiles = async (): Promise<string[]> => {
  const mp3Files = await glob('**/*.mp3', {
    ignore: 'node_modules/**',
  });
  return mp3Files;
};

const getSongs = async () => {
  return await parseFiles(await getAudioFiles());
};

export default getSongs;
