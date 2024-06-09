import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentQuestions({ questions }: { questions: any[] }) {
  return (
    <div className="space-y-8 h-[280px] overflow-scroll">
      {questions.map((question: any, index: number) => {
        return (
          <div className="flex items-center" key={index}>
            <Avatar className="h-9 w-9">
              <AvatarFallback>Q</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {question.query}
              </p>
            </div>
            <div className="ml-auto font-medium"></div>
          </div>
        );
      })}
    </div>
  );
}
