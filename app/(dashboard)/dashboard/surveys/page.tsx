import BreadCrumb from '@/components/breadcrumb';
import { SurveyClient } from '@/components/tables/survey-table/client';
import { users } from '@/constants/data';

const breadcrumbItems = [{ title: 'User', link: '/dashboard/user' }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SurveyClient data={users} />
      </div>
    </>
  );
}
