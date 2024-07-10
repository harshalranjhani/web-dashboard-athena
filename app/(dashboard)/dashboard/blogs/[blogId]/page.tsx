import React from 'react';
import BlogUpdatePage from '@/components/custom/BlogUpdatePage';

const fetchBlog = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`);
  const data = await res.json();
  return data.data;
};

const EditBlog = async ({ params }: any) => {
  const blog = await fetchBlog(params.blogId);
  return (
    <div>
      <BlogUpdatePage blog={blog} />
    </div>
  );
};

export default EditBlog;
