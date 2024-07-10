import BreadCrumb from '@/components/breadcrumb';
import { QuizClient } from '@/components/tables/quiz-table/client';

const breadcrumbItems = [{ title: 'Quizzes', link: '/dashboard/quizzes' }];
export default function page() {
  return (
    <>
      <div className="h-screen overflow-auto flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
        <QuizClient />
      </div>
    </>
  );
}
