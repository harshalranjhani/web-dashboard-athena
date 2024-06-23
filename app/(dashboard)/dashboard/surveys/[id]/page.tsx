'use client';
import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { analyticsActions } from '@/utils/store/analytics-slice';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';

interface Question {
  text: string;
  type: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export default function SurveyUpdatePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const surveys = useSelector((state: any) => state.analytics.surveys);
  const survey = surveys.find((s: any) => s.id === parseInt(id as string, 10));
  const router = useRouter();
  const [title, setTitle] = useState(survey?.title || '');
  const [description, setDescription] = useState(survey?.description || '');
  const [questions, setQuestions] = useState<Question[]>(survey?.questions || []);
  const { toast } = useToast();

  useEffect(() => {
    if (!survey) {
      router.replace('/dashboard/surveys');
    }
  }, [survey, router]);

  if (!survey) {
    return null;
  }

  const breadcrumbItems = [
    { title: 'Surveys', link: '/dashboard/surveys' },
    { title: 'Update', link: `/dashboard/survey/update/${id}` }
  ];

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', type: 'MULTIPLE_CHOICE', option1: '', option2: '', option3: '', option4: '' }
    ]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const questionDtos = questions.map((q) => ({
      text: q.text,
      type: q.type,
      options: [q.option1, q.option2, q.option3, q.option4].filter((opt) => opt !== '')
    }));

    if (questionDtos.length === 0 || questionDtos.some((q) => q.text.trim() === '' || q.type.trim() === '')) {
      toast({
        duration: 2000,
        title: 'Validation error',
        variant: 'destructive',
        description: 'At least one valid question is required with text and type.'
      });
      return;
    }

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/survey/${id}`, {
        topic: title,
        description,
        questions: questionDtos,
        userId: 1
      });

      if (response.status === 200) {
        toast({
          duration: 2000,
          title: 'Survey updated successfully!'
        });
        const updatedSurveys = surveys.map((survey: any) =>
          survey.id === parseInt(id as string, 10)
            ? { ...survey, topic: title, description, questions: questionDtos }
            : survey
        );
        dispatch(analyticsActions.setSurveys({ surveys: updatedSurveys }));
        router.replace('/dashboard/surveys');
      } else {
        toast({
          duration: 2000,
          title: 'An error occurred',
          variant: 'destructive',
          description: 'Failed to update survey'
        });
      }
    } catch (e: any) {
      toast({
        duration: 2000,
        title: 'An error occurred',
        variant: 'destructive',
        description: e.message
      });
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-6 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Input
                placeholder="Survey Topic"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                className="text-lg font-semibold"
              />
            </div>
            <div>
              <Input
                placeholder="Survey Description"
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                className="text-lg"
              />
            </div>
            <h1 className="text-3xl">Edit Questions in the survey.</h1>
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={index} className="relative space-y-2 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Question {index + 1}</p>
                    {questions.length > 1 && (
                      <Button variant="destructive" size="icon" onClick={() => removeQuestion(index)}>
                        <X className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder={`Question ${index + 1} Text`}
                    value={question.text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'text', e.target.value)}
                    className="text-base"
                  />
                  <Select value={question.type} onValueChange={(value) => handleQuestionChange(index, 'type', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Question Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Question Type</SelectLabel>
                        <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
                        <SelectItem value="OPEN_ENDED">Open Ended</SelectItem>
                        <SelectItem value="BOOLEAN">True/False</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {question.type === 'MULTIPLE_CHOICE' && (
                    <>
                      <Input
                        placeholder={`Question ${index + 1} Option 1`}
                        value={question.option1}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'option1', e.target.value)}
                        className="text-base"
                      />
                      <Input
                        placeholder={`Question ${index + 1} Option 2`}
                        value={question.option2}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'option2', e.target.value)}
                        className="text-base"
                      />
                      <Input
                        placeholder={`Question ${index + 1} Option 3`}
                        value={question.option3}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'option3', e.target.value)}
                        className="text-base"
                      />
                      <Input
                        placeholder={`Question ${index + 1} Option 4`}
                        value={question.option4}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'option4', e.target.value)}
                        className="text-base"
                      />
                    </>
                  )}
                </div>
              ))}
              <Button type="button" onClick={addQuestion}>
                Add Question
              </Button>
            </div>
            <Button type="submit">Update Survey</Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
}
