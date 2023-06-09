import { ColumnDef } from '@tanstack/react-table';
import { Song } from '~shared/types/GlobalTypes';
import { Checkbox } from './ui/checkbox';

export const columns: ColumnDef<Song>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'cover',
    header: 'Cover',
    cell({ row }) {
      const song = row.original;
      return (
        <img
          className="h-[50px] object-contain"
          src={`music/covers/${song.title}.jpg`}
          alt={song.title}
        />
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'artist',
    header: 'Artist',
  },
  {
    accessorKey: 'album',
    header: 'Header',
  },
];
