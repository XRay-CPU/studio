
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Info, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function AutoSignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'user';
  const roleName = role === 'moderator' ? 'Makabayan' : 'Bayani';
  const [countdown, setCountdown] = useState(3);
  const redirectPath = role === 'moderator' ? '/dashboard/verify' : '/dashboard';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push(redirectPath);
    }
  }, [countdown, router, redirectPath]);

  return (
    <Card className="w-full shadow-2xl bg-card/60 backdrop-blur-lg border-border/20">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Creating Your {roleName} Account</CardTitle>
        <CardDescription>
          For this testing period, we'll automatically sign you in.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">
          Redirecting in {countdown}...
        </p>
      </CardContent>
    </Card>
  );
}

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <Button asChild variant="ghost" className="absolute top-4 left-4 z-20">
        <Link href="/auth">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Role Selection
        </Link>
      </Button>

      <div className="relative z-20 flex flex-col items-center space-y-6 w-full max-w-md">
        <Logo className="h-16 w-16" />
        <AutoSignIn />
      </div>
    </div>
  );
}
