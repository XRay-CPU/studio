
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';

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
        
        <div className="w-full bg-primary/20 border border-primary/50 text-white p-4 rounded-lg flex items-center gap-4">
          <Info className="h-6 w-6 text-primary" />
          <div>
            <h4 className="font-bold">Just Testing?</h4>
            <p className="text-sm text-white/80">Feel free to use random information to create your account.</p>
          </div>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
}
