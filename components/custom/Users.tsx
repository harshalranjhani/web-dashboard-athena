'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { User } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState(0);
  const startDate = useSelector((state: any) => state.analytics.startDate);
  const endDate = useSelector((state: any) => state.analytics.endDate);
  const totalUsers = useSelector((state: any) => state.analytics.totalUsers);
  const usersChange = useSelector((state: any) => state.analytics.usersChange);
  const changeDuration = useSelector(
    (state: any) => state.analytics.changeDuration
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        <User size={20} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalUsers}</div>
        <p className="text-xs text-muted-foreground">
          {usersChange} from last {changeDuration}
        </p>
      </CardContent>
    </Card>
  );
};

export default Users;
