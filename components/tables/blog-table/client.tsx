'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyticsActions } from '@/utils/store/analytics-slice';

export const BlogClient: React.FC<any> = ({ }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const blogs = useSelector((state: any) => state.analytics.blogs);

  const fetchBlogs = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
    dispatch(analyticsActions.setBlogs({blogs: res.data.data}))
  };

  React.useEffect(() => {
    fetchBlogs();
  }, []);

  // fetch users complete: fix table

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Blogs (${blogs.length})`}
          description="List of all blogs in the system"
        />
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={blogs} />
    </>
  );
};
