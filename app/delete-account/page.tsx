"use client";
import React from 'react';

const Notice: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Delete Your Account</h1>
        <p className="mb-6 text-gray-600">
          If you wish to delete your account, please send an email to the following address:
        </p>
        <div className="mb-6">
          <p className="text-lg font-medium">hacktivistst@gmail.com</p>
        </div>
        <p className="mb-6 text-gray-600">
          In your email, please include your account details and the reason for deletion. Our support team will handle your request as soon as possible.
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => window.location.href = 'mailto:hacktivistst@gmail.com'}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notice;
