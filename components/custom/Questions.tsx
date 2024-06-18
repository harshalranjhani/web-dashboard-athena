'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Questions = () => {

  const totalQuestions = useSelector((state: any) => state.analytics.totalQuestions);
  const questionsChange = useSelector((state: any) => state.analytics.questionsChange);
  const changeDuration = useSelector(
    (state: any) => state.analytics.changeDuration
  );

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalQuestions}</div>
          <p className="text-xs text-muted-foreground">
            {questionsChange} from last {changeDuration}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Questions;
