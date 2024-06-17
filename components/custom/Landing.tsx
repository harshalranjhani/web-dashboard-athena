"use client";
import { ScrollArea } from '@radix-ui/react-scroll-area'
import React from 'react'
import Hero from './Hero'

const Landing = () => {
  return (
    <ScrollArea className='h-full'>
        <Hero />
    </ScrollArea>
  )
}

export default Landing