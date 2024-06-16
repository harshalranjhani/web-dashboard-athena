'use server';
import ActiveUsers from '@/components/custom/ActiveUsers';
import Blogs from '@/components/custom/Blogs';
import Questions from '@/components/custom/Questions';
import Users from '@/components/custom/Users';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Overview } from '@/components/overview';
import { RecentQuestions } from '@/components/recent-questions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome Back 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Users />
              <Blogs />
              <Questions />
              <ActiveUsers />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview (Number of queries vs date)</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Queries in this time range</CardTitle>
                  <CardDescription>
                    {`Total queries asked in this time range`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentQuestions />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
