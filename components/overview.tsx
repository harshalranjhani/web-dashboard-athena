'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { parseISO, format, eachDayOfInterval, startOfDay } from 'date-fns';
import { useSelector } from 'react-redux';

// Sample questions data (remove if you use redux data only)
const questions = [
  {
    createdAt: "2024-06-09T08:56:48.192Z",
    id: 20,
    query: "Eos annus statua error textilis eaque quam ventus super supplanto. Circumvenio ad sono admoveo accusamus sequi cariosus deorsum patruus tyrannus. Torrens confugo dedico subvenio repudiandae.",
    response: "Cimentarius vicinus carmen volutabrum depulso baiulus tergum approbo utrum voluntarius. Deprimo arbustum coniecto toties animus optio vilis caecus. Sublime eum venustas adficio solutio adipiscor agnosco.",
    status: "PENDING",
    updatedAt: "2024-06-09T08:56:48.192Z",
    userId: 10
  },
  // Add more questions as needed
];

// Function to group data by date
const groupByDate = (questions: any) => {
  const groupedData = questions.reduce((acc: any, question: any) => {
    const date = format(parseISO(question.createdAt), 'dd-MM-yyyy');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return groupedData;
};

// Function to create a date range
const createDateRange = (start: Date, end: Date) => {
  return eachDayOfInterval({ start, end }).map(date => format(date, 'dd-MM-yyyy'));
};

// Function to fill missing dates with zero values
const fillMissingDates = (groupedData: any, dateRange: any) => {
  return dateRange.map((date: any) => ({
    name: date,
    total: groupedData[date] || 0
  }));
};

export function Overview() {
  const [data, setData] = useState([]);
  const reduxQuestions = useSelector((state: any) => state.analytics.questions);
  const startDate = useSelector((state: any) => state.analytics.startDate);
  const endDate = useSelector((state: any) => state.analytics.endDate);

  useEffect(() => {
    const questionsData = reduxQuestions.length ? reduxQuestions : questions;
    const groupedData = groupByDate(questionsData);
    const dates = Object.keys(groupedData).map(date => parseISO(date));
    const dateRange = createDateRange(startDate, endDate);
    const filledData = fillMissingDates(groupedData, dateRange);
    setData(filledData);
  }, [reduxQuestions]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#F3BE33" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
