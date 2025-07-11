import Image from 'next/image';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ConnectWalletButton } from '@/components/auth/ConnectWalletButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Map, Target, Award } from 'lucide-react';

const features = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Gamified Quests',
    description: 'Engage in real-world environmental missions, from reforestation to marine protection, and earn rewards for your impact.',
  },
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: 'Interactive Eco-Map',
    description: 'Discover and join conservation efforts across the Philippines using a live map of environmental quests.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Verifiable Impact',
    description: 'Your contributions are verified through a robust system, minting a "Proof-of-Action" NFT for every completed quest.',
  },
   {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Rewarding Action',
    description: 'Earn $CARE tokens and unique digital collectibles for your environmental stewardship, turning impact into tangible value.',
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[80vh] flex items-center justify-center">
            <Image
                src="https://placehold.co/1920x1080.png"
                alt="A beautiful beach in the Philippines"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 z-0 opacity-30"
                data-ai-hint="philippines beach nature"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

            <div className="relative z-20 text-center space-y-6 max-w-4xl mx-auto px-4">
                <Logo className="h-20 w-20 mx-auto" />
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground">
                    Play. Preserve. Prosper.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Likas Bayani transforms ecotourism into a gamified experience where your actions heal the planet and reward you with verifiable, on-chain credentials.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <ConnectWalletButton />
                    <Button variant="secondary" size="lg" asChild>
                        <Link href="#features">Learn More</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="features" className="py-12 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">A New Paradigm for Ecotourism</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                We're building a decentralized ecosystem that directly connects travelers, local communities, and environmental NGOs to create a regenerative economy.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-primary/20 transition-shadow">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                        {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
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
