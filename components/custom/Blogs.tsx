'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FileText } from 'lucide-react';

const Blogs = () => {
  const totalBlogs = useSelector((state: any) => state.analytics.totalBlogs);
  const changeDuration = useSelector(
    (state: any) => state.analytics.changeDuration
  );
  const blogsChange = useSelector((state: any) => state.analytics.blogsChange);

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
          <FileText size={20} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBlogs}</div>
          <p className="text-xs text-muted-foreground">
            {blogsChange} from last {changeDuration}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blogs;
