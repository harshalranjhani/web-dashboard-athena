"use client";
import Surveys from '@/components/custom/Surveys';
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const downHtml2canvas = () => {
    let dom = document.getElementById('dash-data');
    if (dom) {
      html2canvas(dom, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      }).then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('dashboard.pdf');
      });
    }
  };

  return (
    <ScrollArea className="h-full">
    <div className="bg-background text-foreground h-screen">
      <div className="p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome Back 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button onClick={downHtml2canvas}>Download</Button>
          </div>
        </div>
        <div id="dash-data" className="p-4 rounded-md bg-card text-card-foreground">
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
                <Surveys />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>Overview (Number of queries vs date)</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-4 md:col-span-3 bg-card text-card-foreground">
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
      </div>
    </div>
    </ScrollArea>
  );
};

export default Dashboard;
