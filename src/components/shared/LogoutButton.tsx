"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem('isModerator');
    
    // Add any other cleanup needed
    localStorage.removeItem('lastQuest_');
    localStorage.removeItem('achievements_');
    
    // Redirect to home page
    router.push('/');
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="w-full justify-start"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log Out</span>
    </Button>
  );
}
