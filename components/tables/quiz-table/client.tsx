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

export const QuizClient: React.FC<any> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) => state.analytics.quizzes);

  const fetchQuizzes = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quiz`);
    dispatch(analyticsActions.setQuizzes({ quizzes: res.data }));
  };

  React.useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Quizzes (${quizzes?.length})`}
          description="List of all quizzes in the system"
        />
      </div>
      <Separator />
      <DataTable tableType='quiz' searchKey="title" columns={columns} data={quizzes} />
    </>
  );
};
