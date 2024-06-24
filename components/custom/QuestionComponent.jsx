import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const QuestionComponent = ({ question }) => {
  const { text, answers } = question;

  const ageData = answers.reduce((acc, answer) => {
    acc[answer.age] = (acc[answer.age] || 0) + 1;
    return acc;
  }, {});

  const genderData = answers.reduce((acc, answer) => {
    acc[answer.gender] = (acc[answer.gender] || 0) + 1;
    return acc;
  }, {});

  const pieChartColors = [
    '#D31F16', '#EB781A', '#F3BE33', '#FDFDFD', '#73504B',
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FFCD56', '#4B0082', '#9400D3', '#8B0000',
    '#FF4500', '#FFD700', '#ADFF2F', '#00FF7F', '#4682B4'
  ];
  

  const ageChartData = {
    labels: Object.keys(ageData),
    datasets: [
      {
        label: 'Age Distribution',
        data: Object.values(ageData),
        backgroundColor: pieChartColors,
      },
    ],
  };

  const genderChartData = {
    labels: Object.keys(genderData),
    datasets: [
      {
        label: 'Gender Distribution',
        data: Object.values(genderData),
        backgroundColor: pieChartColors,
      },
    ],
  };

  return (
    <div className="p-4 my-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{text}</h2>
      <div className="flex justify-around mb-4">
        <div className="w-1/2">
          <Pie data={ageChartData} />
        </div>
        <div className="w-1/2">
          <Pie data={genderChartData} />
        </div>
      </div>
      <div className="h-[100px] overflow-y-auto border-t border-gray-200">
        {answers.map((answer, index) => (
          <div key={index} className="p-2 border-b">
            <p><strong>Location:</strong> {answer.location}</p>
            <p><strong>Response:</strong> {answer.response}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
