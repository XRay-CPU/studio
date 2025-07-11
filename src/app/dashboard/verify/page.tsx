"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { submissionData as initialSubmissions } from "@/data/submissions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";

export default function VerifyPage() {
  const [submissions, setSubmissions] = useState(initialSubmissions.filter(s => s.status === 'Pending'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<typeof initialSubmissions[0] | null>(null);

  const handleAction = (id: string, newStatus: 'Verified' | 'Rejected') => {
    setSubmissions(submissions.filter(s => s.id !== id));
    // In a real app, you would send this update to your backend.
    console.log(`Submission ${id} has been ${newStatus}.`);
  };

  const openModal = (submission: typeof initialSubmissions[0]) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Verify Submissions</h1>
        <p className="text-muted-foreground">
          Review pending quest submissions from Bayanis.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending for Review</CardTitle>
           <CardDescription>
            {submissions.length} submission(s) awaiting verification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Quest</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.length > 0 ? submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <UserAvatar name={submission.userName} src={submission.userAvatar} />
                      <span className="font-medium">{submission.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        <span className="font-medium">{submission.questTitle}</span>
                        <Badge variant="secondary" className="w-fit mt-1">{submission.questCategory}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{submission.submissionDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => openModal(submission)}>View Evidence</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleAction(submission.id, 'Rejected')}>
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm" onClick={() => handleAction(submission.id, 'Verified')}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">
                    No pending submissions.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedSubmission && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Submission Evidence</DialogTitle>
                    <DialogDescription>
                        Reviewing for: <strong>{selectedSubmission.questTitle}</strong> by {selectedSubmission.userName}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <p className="text-sm text-muted-foreground">Geo-tagged Photo</p>
                    <div className="relative w-full aspect-video rounded-md overflow-hidden border">
                         <Image src={selectedSubmission.evidencePhoto} alt="Submission evidence" layout="fill" objectFit="cover" data-ai-hint="submission evidence" />
                    </div>
                    <p className="text-sm text-muted-foreground">User Notes</p>
                    <p className="text-sm p-4 bg-muted rounded-md">{selectedSubmission.userNotes}</p>
                </div>
                 <DialogFooter>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
