import DialogflowChatbot from '@/components/custom/Chatbot'
import Landing from '@/components/custom/Landing'
import React from 'react'

const Page = () => {
  return (
    <div className='flex justify-center items-center'>
        <Landing />
        <DialogflowChatbot />
    </div>
  )
}

export default Page