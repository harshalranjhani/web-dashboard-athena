// components/DialogflowChatbot.js
"use client";
import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

const DialogflowChatbot = () => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
        />
      </Head>
      <Script
        src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"
        strategy="afterInteractive"
      />
      <df-messenger
        project-id="athena-415810"
        agent-id="7b2953bf-b348-4e3f-b2cb-ffc566fd7e90"
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title="Say Hi to get started👋🏼"></df-messenger-chat-bubble>
      </df-messenger>
      <style jsx global>{`
      df-messenger {
        z-index: 999;
        position: fixed;
        --df-messenger-font-color: #000;
        --df-messenger-font-family: Google Sans;
        --df-messenger-message-user-background: #fed8b1;
        --df-messenger-message-bot-background: #F5c0c9;
        --df-messenger-message-highlight-color: #f3be33;
        --df-messenger-message-highlight-background: #f3be33;
        --df-messenger-titlebar-background: #73504b;
        --df-messenger-chat-background: #fdfdfd;
        --df-messenger-chat-background: no-repeat url(./logo.svg) #fdfdfd center;
        --df-messenger-chat-bubble-background	: #eb781a;
        bottom: 16px;
        right: 16px;
      }
      `}</style>
    </>
  );
};

export default DialogflowChatbot;
