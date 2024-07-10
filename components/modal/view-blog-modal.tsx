'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: {
    authorName: string;
    content: string;
    createdAt: string;
    picture: string;
    region: string;
    title: string;
    updatedAt: string;
  };
}

export const BlogViewModal: React.FC<BlogModalProps> = ({
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
      title={data.title}
      description={data.authorName}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="max-h-[60vh] overflow-y-auto pt-4">
        <div className="flex flex-col items-center space-y-4 px-4">
          <img
            src={data.picture}
            alt={data.title}
            className="w-full max-w-full h-auto max-h-60 object-cover rounded-md"
          />
          <p className="text-gray-500 text-sm">{new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="pt-4 px-4">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </div>
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Done
        </Button>
      </div>
    </Modal>
  );
};
