"use client";
import { submissionData } from '@/data/submissions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Simulate QR scan and confirmation
function scanQrAndConfirm(userId: string, onConfirm: () => void) {
  // In a real app, this would open a QR scanner and verify the userId
  setTimeout(() => {
    onConfirm();
  }, 1000);
}

export default function OrganizerConfirmList({ questId }: { questId: string }) {
  const [confirmed, setConfirmed] = useState<{ [subId: string]: boolean }>({});
  const participants = submissionData.filter(sub => sub.questId === questId);

  if (participants.length === 0) {
    return <div className="text-muted-foreground text-sm">No participants yet.</div>;
  }

  return (
    <div className="space-y-4">
      {participants.map((sub) => (
        <div key={sub.id} className="flex items-center gap-4 p-2 border rounded-lg bg-white dark:bg-zinc-900">
          <div className="flex-1">
            <div className="font-semibold">{sub.userName}</div>
            <div className="text-xs text-muted-foreground">Submitted: {sub.submissionDate}</div>
            <div className="text-xs mt-1">{sub.userNotes}</div>
            <Badge variant={sub.status === 'Verified' ? 'default' : sub.status === 'Rejected' ? 'destructive' : 'secondary'}>{sub.status}</Badge>
          </div>
          <a href={sub.evidencePhoto} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">View Proof</a>
          {sub.status === 'Pending' && !confirmed[sub.id] && (
            <Button onClick={() => scanQrAndConfirm(sub.userName, () => setConfirmed(c => ({ ...c, [sub.id]: true })))}>
              Confirm via QR
            </Button>
          )}
          {confirmed[sub.id] && <span className="text-green-600 font-bold text-xs">Confirmed!</span>}
        </div>
      ))}
    </div>
  );
}
