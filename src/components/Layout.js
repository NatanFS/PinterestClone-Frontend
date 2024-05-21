import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <span className="text-3xl font-bold text-gray-900 cursor-pointer">Pinterest Clone</span>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
