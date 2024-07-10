'use client';
import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { analyticsActions } from '@/utils/store/analytics-slice';

export default function BlogUpdatePage({currentBlog, blogId}: any) {
  const blogs = useSelector((state: any) => state.analytics.blogs);
  const blog = blogs.find((b: any) => b.id === parseInt(blogId as string));
  const [title, setTitle] = useState(blog?.title || '');
  const [region, setRegion] = useState(blog?.region || '');
  const [pic, setPic] = useState(blog?.picture || '');
  const [content, setContent] = useState(blog?.content || '');

  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const breadcrumbItems = [
    { title: 'Blogs', link: '/dashboard/blogs' },
    { title: 'Update', link: `/dashboard/blog/update/${blogId}` }
  ];

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${blogId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, region, pic, content })
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        toast({
          duration: 2000,
          title: 'Blog updated successfully!'
        });
        const updatedBlogs = blogs.map((b: any) =>
          b.blogId === parseInt(blogId as string) ? data.data : b
        );
        dispatch(analyticsActions.setBlogs({ blogs: updatedBlogs }));
        router.replace('/dashboard/blogs');
      } else {
        toast({
          duration: 2000,
          title: 'An error occurred',
          variant: "destructive",
          description: 'Failed to update blog'
        });
      }
    } catch (e) {
      toast({
        duration: 2000,
        title: 'An error occurred',
        variant: "destructive",
        description: 'Failed to update blog'
      });
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-6 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Input
                placeholder="Blog Title"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                className="text-lg font-semibold"
              />
            </div>
            <div>
              <Input
                placeholder="Region"
                value={region}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRegion(e.target.value)
                }
                className="text-lg"
              />
            </div>
            <div>
              <Input
                placeholder="Picture URL"
                value={pic}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPic(e.target.value)
                }
                className="text-lg"
              />
              {pic && (
                <img src={pic} alt="Blog Preview" className="mt-2 w-48 h-48 object-cover" />
              )}
            </div>
            <div>
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setContent(e.target.value)
                }
                className="w-full p-2 border rounded text-base"
                rows={5}
              />
            </div>
            <Button type="submit">Update Blog</Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
}
