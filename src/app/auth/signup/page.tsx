import { SignUpForm } from '@/components/auth/SignUpForm';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <Button asChild variant="ghost" className="absolute top-4 left-4 z-20">
        <Link href="/auth">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Role Selection
        </Link>
      </Button>

      <div className="relative z-20 flex flex-col items-center space-y-6">
        <Logo className="h-16 w-16" />
        <SignUpForm />
      </div>
    </div>
  );
}
