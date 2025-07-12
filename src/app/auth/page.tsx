import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { User, Shield } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold font-headline mb-4 text-primary">Join as a...</h1>
        <p className="text-muted-foreground mb-8">Choose your path in the Likas Bayani ecosystem.</p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover:border-primary transition-all bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
            <CardHeader>
              <User className="h-12 w-12 mx-auto text-emerald-600 dark:text-emerald-400" />
              <CardTitle className="font-headline pt-4 text-foreground">Bayani</CardTitle>
              <CardDescription className="text-muted-foreground/90">
                Participate in quests, earn rewards, and track your environmental impact as a hero for nature.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="w-full font-bold bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600/90 dark:hover:bg-emerald-600 text-white" 
                asChild
              >
                <Link href="/auth/signup?role=user">I am a Bayani</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:border-primary transition-all bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
            <CardHeader>
              <Shield className="h-12 w-12 mx-auto text-blue-600 dark:text-blue-400" />
              <CardTitle className="font-headline pt-4 text-foreground">Quest Marshal</CardTitle>
              <CardDescription className="text-muted-foreground/90">
                Verify submissions, manage quests, and help maintain the integrity of the Likas Bayani platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="w-full font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600/90 dark:hover:bg-blue-600 text-white" 
                asChild
              >
                <Link href="/auth/signup?role=moderator">I am a Quest Marshal</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Button variant="ghost" className="mt-8" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
