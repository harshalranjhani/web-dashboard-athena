'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { ViewModal } from '@/components/modal/view-survey-modal';
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
import { Edit, MoreHorizontal, Trash, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export const CellAction: React.FC<any> = ({ data }) => {
  const [alertModalLoading, setAlertModalLoading] = useState(false);
  const [viewModalLoading, setViewModalLoading] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const surveys = useSelector((state: any) => state.analytics.surveys);
  const dispatch = useDispatch();

  const onConfirm = async () => {
    // delete the survey
    try {
      setAlertModalLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/survey/${data.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const respData = await response.json();
      if (respData.status === 200) {
        toast({
          duration: 2000,
          title: 'Survey deleted successfully'
        });
        // delete the survey from the surveys array
        const newSurveys = surveys.filter(
          (survey: any) => survey.id !== data.id
        );
        dispatch(analyticsActions.setSurveys({ surveys: newSurveys }));
      } else {
        toast({
          duration: 2000,
          title: 'An error occurred.',
          description: 'Failed to delete survey',
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
        description: 'Failed to delete survey',
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
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/user/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
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
