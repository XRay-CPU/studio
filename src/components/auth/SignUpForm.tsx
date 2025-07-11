"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Leaf, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you'd handle form submission (e.g., API call)
    // For this demo, we'll just show a toast and redirect.
    toast({
      title: "Account Created!",
      description: "Welcome to Likas Bayani. Redirecting to your dashboard...",
    });
    setTimeout(() => router.push("/dashboard"), 1500);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
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
          <div className="space-y-2">
            <Label htmlFor="interests">Primary Interest</Label>
            <Select required>
              <SelectTrigger id="interests" className="w-full">
                <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <div className="pl-5">
                    <SelectValue placeholder="Select your interest" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marine">Marine Protection</SelectItem>
                <SelectItem value="reforestation">Reforestation</SelectItem>
                <SelectItem value="urban-greening">Urban Greening</SelectItem>
                <SelectItem value="waste-management">Waste Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full font-bold">
            Start Your Adventure
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
