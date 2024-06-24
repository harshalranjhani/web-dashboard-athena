'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { ViewModal } from '@/components/modal/view-quiz-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/constants/data';
import { analyticsActions } from '@/utils/store/analytics-slice';
import axios from 'axios';
import { Edit, MoreHorizontal, Trash, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export const CellAction: React.FC<any> = ({ data }) => {
  const [alertModalLoading, setAlertModalLoading] = useState(false);
  const [viewModalLoading, setViewModalLoading] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const { toast } = useToast();
  const quizzes = useSelector((state: any) => state.analytics.quizzes);
  const dispatch = useDispatch();

  const onConfirm = async () => {
    // delete the quiz
    try {
      setAlertModalLoading(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/quiz/${data.id}`
      );
      if (response.status === 200) {
        toast({
          duration: 2000,
          title: 'Quiz deleted successfully'
        });
        // delete the Quiz from the Blogs array
        const newQuizzes = quizzes.filter(
          (quiz: any) => quiz.id !== data.id
        );
        dispatch(analyticsActions.setQuizzes({ quizzes: newQuizzes }));
      } else {
        toast({
          duration: 2000,
          title: 'An error occurred.',
          description: 'Failed to delete quiz',
          variant: 'destructive'
        });
      }
      setAlertModalLoading(false);
      setAlertModalOpen(false);
    } catch (e) {
      setAlertModalLoading(false);
      setAlertModalOpen(false);
      toast({
        duration: 2000,
        title: 'An error occurred.',
        description: 'Failed to delete quiz',
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      <AlertModal
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={onConfirm}
        loading={alertModalLoading}
      />
      <ViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        loading={viewModalLoading}
        data={data}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setViewModalOpen(true)}>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onClick={() => router.push(`/dashboard/quizzes/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => {
            setAlertModalOpen(true);
          }}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
