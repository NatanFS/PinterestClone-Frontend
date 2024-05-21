"use client";

import { useState } from 'react';
import Link from 'next/link';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Layout = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/">
            <span className="text-3xl font-bold text-gray-900 cursor-pointer">Pinterest Clone</span>
          </Link>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200 "
            >
              Login
            </button>
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200"
            >
              Register
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <LoginModal isOpen={isLoginModalOpen} onRequestClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onRequestClose={() => setIsRegisterModalOpen(false)} />
    </div>
  );
};

export default Layout;
