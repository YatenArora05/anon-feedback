'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { usePathname } from 'next/navigation';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const pathname = usePathname();

  // Hide Navbar on specific paths
  if (pathname === '/sign-in' || pathname === '/sign-up') {
    return null;
  }

  return (
    <nav className="p-4 md:p-6 bg-[#0f1629] text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-white hover:text-gray-200 transition"
        >
          True Feedback
        </Link>

        {/* User Info + Buttons */}
        {session ? (
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm md:text-base text-gray-200">
              Welcome, <span className="font-semibold text-white">{user?.username || user?.email}</span>
            </span>
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-white hover:bg-gray-100 text-black font-medium px-5 py-2 rounded-xl transition"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button asChild className="w-full md:w-auto bg-white hover:bg-gray-100 text-black font-medium px-5 py-2 rounded-xl transition">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
