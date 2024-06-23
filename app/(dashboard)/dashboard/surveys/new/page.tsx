'use client';
import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { analyticsActions } from '@/utils/store/analytics-slice';

interface Question {
  text: string;
  type: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export default function SurveyCreatePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { text: '', type: '', option1: '', option2: '', option3: '', option4: '' }
  ]);
  const { toast } = useToast();
  const router = useRouter();
  const surveys = useSelector((state: any) => state.analytics.surveys);
  const dispatch = useDispatch();

  const breadcrumbItems = [
    { title: 'Surveys', link: '/dashboard/surveys' },
    { title: 'Create', link: '/dashboard/survey/create' }
  ];

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', type: '', option1: '', option2: '', option3: '', option4: '' }
    ]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const questionDtos = questions.map((q) => ({
      text: q.text,
      type: q.type,
      options: [q.option1, q.option2, q.option3, q.option4].filter(
        (opt) => opt !== ''
      )
    }));

    if (
      questionDtos.length === 0 ||
      questionDtos.some((q) => q.text.trim() === '' || q.type.trim() === '')
    ) {
      toast({
        duration: 2000,
        title: 'Validation error',
        variant: 'destructive',
        description:
          'At least one valid question is required with text and type.'
      });
      return;
    }

    console.log({
      topic: title,
      description,
      questions: questionDtos,
      userId: 1
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/survey`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            topic: title,
            description,
            questions: questionDtos,
            userId: 1
          })
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.status === 201) {
        toast({
          duration: 2000,
          title: 'Survey created successfully!'
        });
        // add the survey to the surveys array
        const newSurveys = [...surveys, data.data];
        dispatch(analyticsActions.setSurveys({ surveys: newSurveys }));
        router.replace('/dashboard/surveys');
      } else {
        toast({
          duration: 2000,
          title: 'An error occurred',
          variant: 'destructive',
          description: 'Failed to create survey'
        });
      }
    } catch (e: any) {
      alert(e);
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                className="text-lg font-semibold"
              />
            </div>
            <div>
              <Input
                placeholder="Survey Description"
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
                className="text-lg"
              />
            </div>
            <h1 className="text-3xl">Add Questions to the survey.</h1>
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={index} className="relative space-y-2 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Question {index + 1}</p>
                    {questions.length > 1 && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeQuestion(index)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder={`Question ${index + 1} Text`}
                    value={question.text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleQuestionChange(index, 'text', e.target.value)
                    }
                    className="text-base"
                  />
                  <Input
                    placeholder={`Question ${index + 1} Type`}
                    value={question.type}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleQuestionChange(index, 'type', e.target.value)
                    }
                    className="text-base"
                  />
                  <Input
                    placeholder={`Question ${index + 1} Option 1`}
                    value={question.option1}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleQuestionChange(index, 'option1', e.target.value)
                    }
                    className="text-base"
                  />
                  <Input
                    placeholder={`Question ${index + 1} Option 2`}
                    value={question.option2}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleQuestionChange(index, 'option2', e.target.value)
                    }
                    className="text-base"
                  />
                  <Input
                    placeholder={`Question ${index + 1} Option 3`}
                    value={question.option3}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleQuestionChange(index, 'option3', e.target.value)
                    }
                    className="text-base"
                  />
                  <Input
                    placeholder={`Question ${index + 1} Option 4`}
                    value={question.option4}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleQuestionChange(index, 'option4', e.target.value)
                    }
                    className="text-base"
                  />
                </div>
              ))}
              <Button type="button" onClick={addQuestion}>
                Add Question
              </Button>
            </div>
            <Button type="submit">Create Survey</Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
}
