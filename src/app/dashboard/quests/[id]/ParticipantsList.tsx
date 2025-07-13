
import { submissionData, Submission } from '@/data/submissions';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function ParticipantsList({ questId }: { questId: string }) {
  const participants = submissionData.filter(sub => sub.questId === questId);

  if (participants.length === 0) {
    return <div className="text-muted-foreground text-sm">No participants yet.</div>;
  }

  return (
    <div className="space-y-4">
      {participants.map((sub) => (
        <div key={sub.id} className="flex items-center gap-4 p-2 border rounded-lg bg-white dark:bg-zinc-900">
          <Avatar>
            <AvatarImage src={sub.userAvatar} alt={sub.userName} />
            <AvatarFallback>{sub.userName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">{sub.userName}</div>
            <div className="text-xs text-muted-foreground">Submitted: {sub.submissionDate}</div>
            <div className="text-xs mt-1">{(sub as Submission).userNotes}</div>
            <Badge variant={sub.status === 'Verified' ? 'default' : sub.status === 'Rejected' ? 'destructive' : 'secondary'}>{sub.status}</Badge>
            {/* Show all per-todo proofs if available */}
            {sub.proofs && sub.proofs.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="font-semibold text-xs">Proofs of Action:</div>
                {sub.proofs.map((proof, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <a href={proof.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">View Step {idx + 1} Proof</a>
                    {proof.note && <span className="text-xs text-muted-foreground">{proof.note}</span>}
                  </div>
                ))}
              </div>
            )}
            {/* Fallback for old single-proof submissions */}
            {!("proofs" in sub) && (sub as Submission).evidencePhoto && (
              <div className="mt-2">
                <a href={(sub as Submission).evidencePhoto} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">View Proof</a>
                {(sub as Submission).userNotes && <div className="text-xs text-muted-foreground mt-1">{(sub as Submission).userNotes}</div>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
