'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { analyticsActions } from '@/utils/store/analytics-slice';
import { CalendarIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { addDays, format } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { toast, useToast } from './ui/use-toast';

export const fetchAnalytics = async (
  startDate: any,
  endDate: any,
  dispatch: any,
  toast: any
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/analytics`,
      {
        startDate,
        endDate
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('response', response.data.data.currentPeriod.totalSurveys);
    dispatch(
      analyticsActions.setData({
        totalUsers: response.data.data.currentPeriod.totalUsers,
        totalBlogs: response.data.data.currentPeriod.totalBlogs,
        totalQuestions: response.data.data.currentPeriod.questions.length,
        totalSurveys: response.data.data.currentPeriod.totalSurveys,
        questions: response.data.data.currentPeriod.questions,
        usersChange: response.data.data.changes.userChange,
        blogsChange: response.data.data.changes.blogChange,
        questionsChange: response.data.data.changes.queryChange,
        surveysChange: response.data.data.changes.surveyChange,
        changeDuration: response.data.data.duration.months
          ? response.data.data.duration.months > 1
            ? `${response.data.data.duration.months} months`
            : `${response.data.data.duration.months} month`
          : response.data.data.duration.days > 1
            ? `${response.data.data.duration.days} days`
            : `${response.data.data.duration.days} day`
      })
    );
    toast({
      duration: 1000,
      title: 'Analytics fetched!',
      description:
        'New analytics data has been updated according to the selected date range.'
    });
  } catch (e: any) {
    console.error(e);
    toast({
      duration: 1000,
      variant: 'destructive',
      title: 'Something went wrong!',
      description: e.message
    });
  }
};

export function CalendarDateRangePicker({
  className
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -2),
    to: new Date()
  });
  const dispatch = useDispatch();
  const { toast } = useToast();

  React.useEffect(() => {
    if (date) {
      dispatch(analyticsActions.setStartDate({ startDate: date.from }));
      dispatch(analyticsActions.setEndDate({ endDate: date.to }));
      fetchAnalytics(date.from, date.to, dispatch, toast);
    }
  }, [date]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
