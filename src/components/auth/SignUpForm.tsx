
"use client";

import * as React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const role = searchParams.get('role') || 'user';
  
  const roleName = role === 'moderator' ? 'Makabayan' : 'Bayani';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const redirectPath = role === 'moderator' ? '/dashboard/verify' : '/dashboard';
    toast({
      title: "Account Created!",
      description: `Welcome! You have signed up as a ${roleName}. Redirecting...`,
    });
    setTimeout(() => router.push(redirectPath), 1500);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/60 backdrop-blur-lg border-border/20">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Create Your {roleName} Account</CardTitle>
        <CardDescription>
          Begin your eco-hero adventure today. Feel free to use random information for now.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="name" placeholder="Juan dela Cruz" required className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
             <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="juan@example.com" required className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" required placeholder="••••••••" className="pl-10" />
            </div>
          </div>
          
          <Button type="submit" className="w-full font-bold">
            Start Your Adventure
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
