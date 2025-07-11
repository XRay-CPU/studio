import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ConnectWalletButton } from '@/components/auth/ConnectWalletButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Map, Target, Award, UserPlus, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Gamified Quests',
    description:
      'Engage in real-world environmental missions, from reforestation to marine protection, and earn rewards for your impact.',
  },
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: 'Interactive Eco-Map',
    description:
      'Discover and join conservation efforts across the Philippines using a live map of environmental quests.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Verifiable Impact',
    description:
      'Your contributions are verified through a robust system, minting a "Proof-of-Action" NFT for every completed quest.',
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Rewarding Action',
    description:
      'Earn $CARE tokens and unique digital collectibles for your environmental stewardship, turning impact into tangible value.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full min-h-screen flex items-center justify-center p-4">
          <div className="relative z-10 w-full max-w-4xl">
            <Card className="bg-card/60 backdrop-blur-lg border-border/20 shadow-2xl">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <Logo className="h-20 w-20 mx-auto" />
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground">
                  Play. Preserve. Prosper.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Likas Bayani transforms ecotourism into a gamified experience
                  where your actions heal the planet and reward you with verifiable,
                  on-chain credentials.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <ConnectWalletButton />
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/auth">
                      Create an Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                A New Paradigm for Ecotourism
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                We're building a decentralized ecosystem that directly connects
                travelers, local communities, and environmental NGOs to create a
                regenerative economy.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div
                    className="hexagon bg-card/60 backdrop-blur-sm border-2 border-primary/20 w-64 h-72 flex flex-col justify-center items-center p-8 transition-all duration-300 hover:border-primary/50 hover:scale-105"
                  >
                    <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold font-headline mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Likas Bayani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}