'use server';

import DialogflowChatbot from '@/components/custom/Chatbot';
import Dashboard from '@/components/custom/Dashboard';

export default async function Page() {
  return (
    <>
      <Dashboard />
      <DialogflowChatbot />
    </>
  );
}
