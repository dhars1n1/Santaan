'use client'

import * as React from 'react'
import { User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    router.push('/');
  };

  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="text-xl font-bold text-blue-600">Medical Chatbot</div>
        <div className="flex-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
