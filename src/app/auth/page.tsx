import Image from 'next/image';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Philippine landscape"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
        data-ai-hint="philippines landscape nature"
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
