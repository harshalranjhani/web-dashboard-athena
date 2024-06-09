'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { parseISO, format } from 'date-fns';
import { useSelector } from 'react-redux';

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

const groupByDate = (questions: any) => {
  const groupedData = questions.reduce((acc: any, question: any) => {
    const date = format(parseISO(question.createdAt), 'dd-MM-yyyy');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(groupedData).map(date => ({
    name: date,
    total: groupedData[date]
  }));
};

export function Overview() {
  const [data, setData] = useState([]);
  const reduxQuestions = useSelector((state: any) => state.analytics.questions);
  const reduxGroupedData = groupByDate(reduxQuestions)

  useEffect(() => {
    const groupedData = groupByDate(reduxQuestions || questions);
    setData(groupedData);
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
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
