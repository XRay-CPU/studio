"use client";
import dynamic from "next/dynamic";

const ParticipantsList = dynamic(() => import("./ParticipantsList"), { ssr: false, loading: () => <div>Loading participants...</div> });
const OrganizerConfirmList = dynamic(() => import("./OrganizerConfirmList"), { ssr: false, loading: () => <div>Loading organizer confirmations...</div> });

export default function QuestClientPanels({ questId }: { questId: string }) {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Participants</h2>
        <ParticipantsList questId={questId} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Organizer Confirmations</h2>
        <OrganizerConfirmList questId={questId} />
      </div>
    </div>
  );
}
