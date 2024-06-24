import React, { useEffect, useState } from 'react';
import QuestionComponent from './QuestionComponent';
import { useParams } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const SurveyComponent = () => {
  const { id } = useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/survey/response/${id}`);
        const data = await response.json();
        setSurveyData(data);
        setLoading(false);
      } catch (error: any) {
        toast({
          duration: 2000,
          title: 'An error occurred',
          variant: 'destructive',
          description: 'Failed to fetch survey data'
        })
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!surveyData) {
    return <p>No data available</p>;
  }

  const { description, questions, topic } = surveyData;

  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-6 text-3xl font-bold">{topic}</h1>
      <p className="mb-8">{description}</p>
      {(questions as any[])?.map((question: any, index: number) => (
        <QuestionComponent key={index} question={question} />
      ))}
    </div>
  );
};

export default SurveyComponent;
