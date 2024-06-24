'use client';
import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import Responses from '@/components/custom/Responses';
import { useParams } from 'next/navigation';

export default function SurveyUpdatePage() {
  const { id } = useParams();

  const breadcrumbItems = [
    { title: 'Surveys', link: '/dashboard/surveys' },
    { title: 'Responses', link: `/dashboard/surveys/responses/${id}` }
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-6 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <Responses />
      </div>
    </ScrollArea>
  );
}
