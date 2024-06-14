import BreadCrumb from '@/components/breadcrumb';
import { Heading } from '@/components/ui/heading';

const breadcrumbItems = [{ title: 'Blogs', link: '/dashboard/blogs' }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
      </div>
    </>
  );
}
