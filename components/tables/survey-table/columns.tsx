'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<any>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'topic',
    header: 'TOPIC'
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },
  {
    accessorKey: 'questions',
    header: 'QUESTIONS',
    accessorFn: row => row.questions.length,
    cell: ({ row }) => row.original.questions.length, 
  },
  {
    accessorKey: 'open_ended',
    header: 'OPEN-ENDED',
    accessorFn: row => row.questions.filter((q: any) => q.type === 'OPEN_ENDED').length,
    cell: ({ row }) => row.original.questions.filter((q: any) => q.type === 'OPEN_ENDED').length,
  },
  {
    accessorKey: 'boolean',
    header: 'BOOLEAN',
    accessorFn: row => row.questions.filter((q: any) => q.type === 'BOOLEAN').length,
    cell: ({ row }) => row.original.questions.filter((q: any) => q.type === 'BOOLEAN').length,
  },
  {
    accessorKey: 'multiple_choice',
    header: 'MULTIPLE CHOICE',
    accessorFn: row => row.questions.filter((q: any) => q.type === 'MULTIPLE_CHOICE').length,
    cell: ({ row }) => row.original.questions.filter((q: any) => q.type === 'MULTIPLE_CHOICE').length,
  },
  // {
  //   accessorKey: 'email',
  //   header: 'EMAIL'
  // },
  // {
  //   accessorKey: 'gender',
  //   header: 'GENDER'
  // },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
