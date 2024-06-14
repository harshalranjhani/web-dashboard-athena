'use client';
import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { analyticsActions } from '@/utils/store/analytics-slice';

export default function BlogCreatePage() {
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [pic, setPic] = useState('');
  const [content, setContent] = useState('');
//   const [authorId, setAuthorId] = useState('');

  const { toast } = useToast();
  const router = useRouter();
  const blogs = useSelector((state: any) => state.analytics.blogs);
  const dispatch = useDispatch();

  const breadcrumbItems = [
    { title: 'Blogs', link: '/dashboard/blogs' },
    { title: 'Create', link: '/dashboard/blog/create' }
  ];

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, region, pic, content, authorId: 1 })
        }
      );
      const data = await response.json();
      if (data.status === 201) {
        toast({
          duration: 2000,
          title: 'Blog created successfully!'
        });
        // add the blog to the blogs array
        const newBlogs = [...blogs, data.data];
        dispatch(analyticsActions.setBlogs({ blogs: newBlogs }));
        router.replace('/dashboard/blogs');
      } else {
        toast({
          duration: 2000,
          title: 'An error occurred',
          variant: "destructive",
          description: 'Failed to create blog'
        });
      }
    } catch (e) {
      toast({
        duration: 2000,
        title: 'An error occurred',
        variant: "destructive",
        description: 'Failed to create blog'
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
            {/* <div>
              <Input
                placeholder="Author ID"
                value={authorId}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAuthorId(e.target.value)
                }
                className="text-lg"
              />
            </div> */}
            <Button type="submit">Create Blog</Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
}
