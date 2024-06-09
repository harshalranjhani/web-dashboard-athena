import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentQuestions({ questions }: { questions: any[] }) {
  return (
    <div className="h-[280px] overflow-auto">
      {questions.map((question: any, index: number) => {
        return (
          <div className="flex flex-row shawdow-lg drop-shadow-lg hover:shadow-lg p-2 rounded-xl my-2" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{question.query.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{question.query}</p>
            <p className="text-sm text-muted-foreground">{question.status}</p>
          </div>
        </div>
        );
      })}
    </div>
  );
}
