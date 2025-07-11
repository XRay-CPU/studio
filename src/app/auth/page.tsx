import { SignUpForm } from '@/components/auth/SignUpForm';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background">
      <div
        className="absolute inset-0 z-0 h-full w-full bg-background"
        style={{
          backgroundImage:
            'linear-gradient(180deg, hsl(var(--background)) 0%, transparent 30%), radial-gradient(at 50% 100%, hsl(var(--primary) / 0.1), transparent 70%), linear-gradient(35deg, hsl(var(--primary)/0.15) 0%, transparent 25%), linear-gradient(-35deg, hsl(var(--accent)/0.15) 0%, transparent 25%)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent z-10" />

      <Button asChild variant="ghost" className="absolute top-4 left-4 z-20">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="relative z-20 flex flex-col items-center space-y-6">
        <Logo className="h-16 w-16" />
        <SignUpForm />
      </div>
    </div>
  );
}
