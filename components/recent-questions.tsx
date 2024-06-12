'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';

export function RecentQuestions() {
  const questions = useSelector((state: any) => state.analytics.questions);
  return (
    <div className="h-[280px] overflow-auto">
      {questions.map((question: any, index: number) => {
        return (
          <div
            className="shawdow-lg my-2 flex flex-row rounded-xl p-2 drop-shadow-lg hover:shadow-lg"
            key={index}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>{question.query.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {question.query}
              </p>
              <p className="text-sm text-muted-foreground">{question.status}</p>
            </div>
          </div>
        );
      })}
      {questions.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No queries found</p>
        </div>
      )}
    </div>
  );
}
