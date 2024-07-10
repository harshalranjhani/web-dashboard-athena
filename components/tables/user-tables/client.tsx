'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { columns } from './columns';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyticsActions } from '@/utils/store/analytics-slice';

export const UserClient: React.FC<any> = ({}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.analytics.users);

  const fetchUsers = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/all`);
    dispatch(analyticsActions.setUsers({users: res.data}))
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  // fetch users complete: fix table

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${users.length})`}
          description="List of all users in the system"
        />
      </div>
      <Separator />
      <DataTable tableType="user" searchKey="name" columns={columns} data={users} />
    </>
  );
};
