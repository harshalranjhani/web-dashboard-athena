'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: any;
}

export const ViewModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  loading,
  data
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={data.topic}
      description={data.description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="max-h-[60vh] overflow-y-auto pt-4">
        {data.questions && data.questions.length > 0 ? (
          <ul className="space-y-4">
            {data.questions.map((question: any, index: number) => (
              <li key={index} className="border-b pb-4">
                <p className="font-semibold">{`Question ${index + 1}:`}</p>
                <p className="mt-2">{question.text}</p>
                <p className="mt-1 text-sm text-gray-500">
                  <span className="font-medium">Correct Answer: </span>
                  {question.correctAnswer}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  <span className="font-medium">Question type: </span>
                  {question.type}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No questions available.</p>
        )}
      </div>
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Done
        </Button>
      </div>
    </Modal>
  );
};
