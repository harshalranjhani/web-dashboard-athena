import BreadCrumb from '@/components/breadcrumb';
import { SurveyClient } from '@/components/tables/survey-table/client';

const breadcrumbItems = [{ title: 'Surveys', link: '/dashboard/surveys' }];

export default function Page() {
  return (
    <>
      <div className="h-screen overflow-auto flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SurveyClient />
      </div>
    </>
  );
}
