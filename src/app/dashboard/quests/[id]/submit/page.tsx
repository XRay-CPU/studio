
'use client';

import { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { questData } from '@/data/quests';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';


export default function SubmitQuestPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const quest = questData.find((q) => q.id === params.id);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please upload a photo as evidence.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Submission Successful!',
        description: `Your proof for "${quest?.title}" has been submitted for verification.`,
      });
      router.push(`/dashboard/quests/${params.id}`);
    }, 2000);
  };

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
        <h1 className="text-4xl font-bold font-headline">Submit Proof of Action</h1>
        <p className="text-muted-foreground text-lg mt-2">
          For quest: {quest.title}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Your Evidence</CardTitle>
          <CardDescription>
            Submit a clear photo showing your completed work. Geo-tagged photos are preferred.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="evidence-photo">Evidence Photo</Label>
              <div className="relative flex justify-center items-center w-full h-64 border-2 border-dashed rounded-lg">
                {preview ? (
                  <Image src={preview} alt="Evidence preview" layout="fill" objectFit="contain" className="rounded-lg" />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  </div>
                )}
                 <Input 
                    id="evidence-photo" 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleFileChange}
                 />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any relevant notes, e.g., 'We collected 5 bags of trash.' or 'Planted 20 mangrove saplings.'"
                className="min-h-[100px]"
              />
            </div>
            
            <Button type="submit" disabled={isLoading || !file} className="w-full font-bold" size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit for Verification'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
