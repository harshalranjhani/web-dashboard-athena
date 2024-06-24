'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CircleHelp } from 'lucide-react';

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
          <CircleHelp size={20} />
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
