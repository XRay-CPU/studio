
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = React.useState("user");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const redirectPath = role === 'moderator' ? '/dashboard/verify' : '/dashboard';
    toast({
      title: "Account Created!",
      description: `Welcome! You are signing up as a ${role === 'user' ? 'Bayani' : 'Quest Marshal'}. Redirecting...`,
    });
    setTimeout(() => router.push(redirectPath), 1500);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/60 backdrop-blur-lg border-border/20">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Create Your Account</CardTitle>
        <CardDescription>
          Begin your eco-hero adventure today.
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
          
          <div className="space-y-3">
             <Label>Choose your role</Label>
            <RadioGroup defaultValue="user" onValueChange={setRole} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="user" id="user" className="peer sr-only" />
                <Label
                  htmlFor="user"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Bayani
                  <span className="text-xs text-muted-foreground">Regular User</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="moderator" id="moderator" className="peer sr-only" />
                 <Label
                  htmlFor="moderator"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Quest Marshal
                  <span className="text-xs text-muted-foreground">Moderator</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full font-bold">
            Start Your Adventure
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
