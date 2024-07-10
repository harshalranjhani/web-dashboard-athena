import BreadCrumb from '@/components/breadcrumb';
import { BlogClient } from '@/components/tables/blog-table/client';

const breadcrumbItems = [{ title: 'Blogs', link: '/dashboard/blogs' }];
export default function page() {
  return (
    <>
      <div className="h-screen overflow-auto flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
        <BlogClient />
      </div>
    </>
  );
}
