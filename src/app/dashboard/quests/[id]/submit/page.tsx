
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


import * as React from 'react';
export default function SubmitQuestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { toast } = useToast();
  const quest = questData.find((q) => q.id === id);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<(File | null)[]>(quest ? quest.todos.map(() => null) : []);
  const [previews, setPreviews] = useState<(string | null)[]>(quest ? quest.todos.map(() => null) : []);
  const [notes, setNotes] = useState<string[]>(quest ? quest.todos.map(() => "") : []);

  const handleFileChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFiles(f => f.map((file, i) => i === idx ? selectedFile : file));
      setPreviews(p => p.map((prev, i) => i === idx ? URL.createObjectURL(selectedFile) : prev));
    }
  };

  const handleNoteChange = (idx: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(n => n.map((note, i) => i === idx ? e.target.value : note));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.some(f => !f)) {
      toast({
        title: 'Missing proof',
        description: 'Please upload a photo for each to-do item.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    // Construct per-todo proofs array
    const proofs = files.map((file, idx) => ({
      url: previews[idx] || '', // In real app, upload and get URL
      note: notes[idx]
    }));
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo: log the structure
      // eslint-disable-next-line no-console
      console.log({
        questId: quest?.id,
        userName: 'Current User',
        proofs
      });
      toast({
        title: 'Submission Successful!',
        description: `Your proof for "${quest?.title}" has been submitted for verification.`,
      });
      router.push(`/dashboard/quests/${id}`);
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
            Submit a clear photo and notes for each to-do item. Geo-tagged photos are preferred.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {quest.todos.map((todo, idx) => (
              <div key={idx} className="space-y-2 border-b pb-6 mb-6">
                <Label className="font-semibold">{todo}</Label>
                <div className="relative flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg">
                  {previews[idx] ? (
                    <Image src={previews[idx]!} alt={`Proof for ${todo}`} layout="fill" objectFit="contain" className="rounded-lg" />
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-xs text-muted-foreground">Click to upload or drag and drop</p>
                    </div>
                  )}
                  <Input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={e => handleFileChange(idx, e)}
                  />
                </div>
                <Textarea
                  placeholder="Add notes for this step (optional)"
                  className="min-h-[60px] mt-2"
                  value={notes[idx]}
                  onChange={e => handleNoteChange(idx, e)}
                />
              </div>
            ))}
            <Button type="submit" disabled={isLoading || files.some(f => !f)} className="w-full font-bold" size="lg">
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
