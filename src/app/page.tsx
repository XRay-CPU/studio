
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
      'Earn Moral tokens and unique digital collectibles for your environmental stewardship, turning impact into tangible value.',
  },
];

//
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] text-white">
      {/* Techy Navigation Ribbon */}
      <nav className="sticky top-0 z-50 w-full bg-[#181c24]/80 backdrop-blur border-b border-[#2c5364]/40 shadow-lg">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10 drop-shadow-neon" />
            <span className="font-headline font-bold text-xl tracking-tight text-cyan-400 drop-shadow-neon">Likas Bayani</span>
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            <a href="#" className="text-sm font-medium hover:text-cyan-400 transition-colors">Home</a>
            <a href="#features" className="text-sm font-medium hover:text-cyan-400 transition-colors">Features</a>
            <a href="#faq" className="text-sm font-medium hover:text-cyan-400 transition-colors">FAQ</a>
            <Link href="/auth" className="text-sm font-medium hover:text-cyan-400 transition-colors">Sign In</Link>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        {/* Hero Section with vibrant eco gradient and SVG overlay */}
        <section className="relative w-full min-h-screen flex items-center justify-center p-4 overflow-hidden">
          {/* Eco gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-emerald-100 to-blue-100 dark:from-green-900 dark:via-emerald-950 dark:to-blue-950" aria-hidden="true" />
          {/* Decorative SVG leaves overlay */}
          <svg className="absolute left-0 top-0 w-64 h-64 opacity-20 text-green-400 dark:text-green-700" fill="none" viewBox="0 0 256 256"><ellipse cx="128" cy="128" rx="120" ry="60" fill="currentColor" /></svg>
          <svg className="absolute right-0 bottom-0 w-64 h-64 opacity-10 text-blue-400 dark:text-blue-700" fill="none" viewBox="0 0 256 256"><ellipse cx="128" cy="128" rx="120" ry="60" fill="currentColor" /></svg>
          <div className="relative z-10 w-full max-w-4xl">
            <Card className="bg-card/70 backdrop-blur-lg border-border/20 shadow-2xl">
              <CardContent className="p-8 md:p-12 text-center space-y-8">
                <Logo className="h-24 w-24 mx-auto animate-bounce-slow" />
                <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-foreground drop-shadow-lg">
                  Play. Preserve. Prosper.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Likas Bayani transforms ecotourism into a gamified experience
                  where your actions heal the planet and reward you with verifiable,
                  on-chain credentials.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <ConnectWalletButton />
                  <Button
                    variant="secondary"
                    size="lg"
                    asChild
                    className="transition-transform duration-200 hover:scale-105 shadow-lg animate-glow"
                  >
                    <Link href="/auth">
                      Create an Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                {/* Scroll chevron */}
                <a href="#features" className="block mx-auto mt-8 animate-bounce-slow text-emerald-500 dark:text-emerald-300">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 5v14m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </CardContent>
            </Card>
          </div>
          {/* Decorative divider */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-emerald-200/80 to-transparent dark:from-emerald-900/80" />
        </section>

        <section id="features" className="py-16 md:py-28 bg-background/60 backdrop-blur-sm relative">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-emerald-700 dark:text-emerald-300">
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
                <Card
                  key={index}
                  className="bg-card/70 backdrop-blur-md border-border/20 text-center p-8 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-xl group"
                >
                  <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-200">{feature.icon}</div>
                  <h3 className="text-xl font-bold font-headline mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
          {/* Decorative eco wave divider */}
          <svg className="absolute left-0 -bottom-1 w-full h-12 text-emerald-200 dark:text-emerald-900" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,53.3C672,43,768,21,864,16C960,11,1056,21,1152,32C1248,43,1344,53,1392,58.7L1440,64L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"/></svg>
        </section>
      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-background/80 border-t border-border/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold mb-2 text-emerald-700 dark:text-emerald-300">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Learn more about Likas Bayani and how we empower eco-heroes through technology.</p>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-2">Why use blockchain?</h3>
              <p className="text-muted-foreground">Blockchain ensures that every environmental action is transparently recorded and verifiable. By minting Proof-of-Action NFTs and using Moral tokens, we create a tamper-proof record of your impact, reward real-world stewardship, and enable a decentralized, trustless ecosystem for ecotourism and conservation.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">How do I join a quest?</h3>
              <p className="text-muted-foreground">Simply connect your wallet, browse the Eco-Map, and select a quest that inspires you. You can join as a participant, complete the to-dos, and submit your proof of action directly through the platform.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">What is a Proof-of-Action NFT?</h3>
              <p className="text-muted-foreground">A Proof-of-Action NFT is a unique digital credential minted on the blockchain when you complete and verify a quest. It serves as a permanent, public record of your environmental contribution and can unlock rewards, recognition, and future opportunities.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">What are Moral tokens?</h3>
              <p className="text-muted-foreground">Moral tokens are digital rewards you earn for verified environmental actions. They can be used for exclusive experiences, collectibles, or to support further conservation efforts within the Likas Bayani ecosystem.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">How is my impact verified?</h3>
              <p className="text-muted-foreground">Your quest submissions are reviewed by organizers and, in some cases, require on-site QR code confirmation. Each to-do can include photo or video proof, ensuring authenticity and transparency for every action.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Who can create or organize quests?</h3>
              <p className="text-muted-foreground">Environmental NGOs, local communities, and trusted partners can create and manage quests. This ensures that all activities are meaningful, impactful, and aligned with real conservation needs.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Is Likas Bayani open to everyone?</h3>
              <p className="text-muted-foreground">Yes! Whether you’re a traveler, student, local resident, or environmental advocate, you can join, contribute, and be recognized for your positive impact.</p>
            </div>
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

