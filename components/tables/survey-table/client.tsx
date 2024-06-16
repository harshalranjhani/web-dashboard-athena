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

export const SurveyClient: React.FC<any> = ({ }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const surveys = useSelector((state: any) => state.analytics.surveys);

  const fetchSurveys = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/survey`);
    dispatch(analyticsActions.setSurveys({surveys: res.data.data}))
    console.log(res.data.data);
  };

  React.useEffect(() => {
    fetchSurveys();
  }, []);

  // fetch users complete: fix table

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Surveys (${surveys.length})`}
          description="List of all surveys in the system"
        />
      </div>
      <Separator />
      <DataTable searchKey="topic" columns={columns} data={surveys} />
    </>
  );
};
