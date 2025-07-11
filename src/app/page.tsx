import Image from 'next/image';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Logo } from '@/components/shared/Logo';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="A beautiful beach in the Philippines"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-40"
        data-ai-hint="philippines beach nature"
      />
      <div className="absolute inset-0 bg-background/70 z-10" />

      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-6xl mx-auto">
        <div className="text-center lg:text-left space-y-4 max-w-lg">
          <Logo className="h-16 w-16 mx-auto lg:mx-0" />
          <h1 className="text-4xl lg:text-6xl font-headline font-bold text-foreground">
            Be the <span className="text-primary">Bayani</span>.
          </h1>
          <p className="text-lg text-muted-foreground">
            Join a movement to transform tourism into a force for good. Heal the Philippines—one quest at a time.
          </p>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
