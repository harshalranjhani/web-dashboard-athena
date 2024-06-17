'use client';
import { User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb
} from '@radix-ui/react-scroll-area';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const BlogsPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([] as any[]);
  const fetchBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
    const data = await res.json();
    // set the first 4 blogs
    setBlogs(data.data.slice(0, 4));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <ScrollArea className="h-full">
      <ScrollAreaViewport className="h-full w-full py-10 lg:py-10">
        <div className="container mx-auto">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-start gap-4">
              <div
                onClick={() => {
                  router.push('/');
                }}
                className='cursor-pointer flex items-center gap-2 text-primary-foreground'
              >
                <Badge>Athena</Badge>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl">
                  Blogs
                </h2>
                <p className="max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-lg">
                  Explore the latest blogs from our community. You can find all
                  of them in the app.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div
                className="flex aspect-square h-full flex-col justify-between rounded-md bg-muted p-6 lg:col-span-2 lg:aspect-auto"
                style={{
                  backgroundImage: `url(${blogs[0]?.picture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <User className="h-8 w-8 stroke-1" />
                <div className="flex flex-col">
                  <h3 className="text-xl tracking-tight">
                    {blogs[0]?.authorName}
                  </h3>
                  <p className="max-w-xs text-base text-muted-foreground">
                    {blogs[0]?.title}
                  </p>
                </div>
              </div>
              <div
                className="flex aspect-square flex-col justify-between rounded-md bg-muted p-6"
                style={{
                  backgroundImage: `url(${blogs[1]?.picture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <User className="h-8 w-8 stroke-1" />
                <div className="flex flex-col">
                  <h3 className="text-xl tracking-tight">
                    {blogs[1]?.authorName}
                  </h3>
                  <p className="max-w-xs text-base text-muted-foreground">
                    {blogs[1]?.title}
                  </p>
                </div>
              </div>

              <div
                className="flex aspect-square flex-col justify-between rounded-md bg-muted p-6"
                style={{
                  backgroundImage: `url(${blogs[2]?.picture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <User className="h-8 w-8 stroke-1" />
                <div className="flex flex-col">
                  <h3 className="text-xl tracking-tight">
                    {blogs[2]?.authorName}
                  </h3>
                  <p className="max-w-xs text-base text-muted-foreground">
                    {blogs[2]?.title}
                  </p>
                </div>
              </div>
              <div
                className="flex aspect-square h-full flex-col justify-between rounded-md bg-muted p-6 lg:col-span-2 lg:aspect-auto"
                style={{
                  backgroundImage: `url(${blogs[3]?.picture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <User className="h-8 w-8 stroke-1" />
                <div className="flex flex-col">
                  <h3 className="text-xl tracking-tight">
                    {blogs[3]?.authorName}
                  </h3>
                  <p className="max-w-xs text-base text-muted-foreground">
                    {blogs[3]?.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
};
