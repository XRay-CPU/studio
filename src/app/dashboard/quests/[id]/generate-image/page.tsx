'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { generateQuestImage } from '@/ai/flows/generate-quest-image';
import { questData } from '@/data/quests';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function GenerateImagePage({
  params,
}: {
  params: { id: string };
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const quest = questData.find((q) => q.id === params.id);

  useEffect(() => {
    if (!quest) {
      return;
    }

    const generate = async () => {
      setIsLoading(true);
      try {
        const result = await generateQuestImage({
          title: quest.title,
          description: quest.description,
        });
        setImageUrl(result.imageUrl);
      } catch (e) {
        console.error(e);
        setError('Failed to generate image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    generate();
  }, [quest]);

  if (!quest) {
    notFound();
  }

  return (
    <div className="space-y-8">
       <div>
        <Button asChild variant="ghost" className="mb-4">
          <Link href={`/dashboard/quests/${quest.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quest Details
          </Link>
        </Button>
        <h1 className="text-4xl font-bold font-headline">AI-Generated Quest Image</h1>
        <p className="text-muted-foreground text-lg mt-2">
          A unique image for: {quest.title}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generated Image</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          {isLoading && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Generating your image... This may take a moment.</p>
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {imageUrl && (
             <div className="relative w-full max-w-2xl aspect-video rounded-md overflow-hidden border">
                <Image src={imageUrl} alt={`AI generated image for ${quest.title}`} layout="fill" objectFit="cover" />
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
