import type { Quest } from '@/types';

type SubmissionStatus = 'Pending' | 'Verified' | 'Rejected';

export type Submission = {
  id: string;
  questId: string;
  questTitle: string;
  questCategory: Quest['category'];
  userName: string;
  userAvatar: string;
  submissionDate: string;
  status: SubmissionStatus;
  evidencePhoto: string;
  userNotes: string;
};

export const submissionData: Submission[] = [
  {
    id: 'sub-001',
    questId: 'hundred-islands-cleanup',
    questTitle: 'Hundred Islands Marine Debris Cleanup',
    questCategory: 'Marine Protection',
    userName: 'Maria Clara',
    userAvatar: 'https://placehold.co/40x40.png',
    submissionDate: '2024-07-20',
    status: 'Pending',
    evidencePhoto: 'https://placehold.co/600x400.png',
    userNotes: 'We collected so much plastic from Quezon Island. The boatmen were a great help!'
  },
  {
    id: 'sub-002',
    questId: 'patar-beach-coastal-cleanup',
    questTitle: 'Patar Beach Coastal Cleanup',
    questCategory: 'Waste Management',
    userName: 'Andres Bonifacio',
    userAvatar: 'https://placehold.co/40x40.png',
    submissionDate: '2024-07-19',
    status: 'Pending',
    evidencePhoto: 'https://placehold.co/600x400.png',
    userNotes: 'Collected 3 large bags of plastic waste. Most of it was single-use plastic bottles and food wrappers.'
  },
  {
    id: 'sub-003',
    questId: 'bolinao-giant-clam',
    questTitle: 'Bolinao Giant Clam Seeding',
    questCategory: 'Marine Protection',
    userName: 'Gabriela Silang',
    userAvatar: 'https://placehold.co/40x40.png',
    submissionDate: '2024-07-18',
    status: 'Pending',
    evidencePhoto: 'https://placehold.co/600x400.png',
    userNotes: 'The team at UP MSI was so knowledgeable. It was amazing to see the giant clams up close.'
  }
];
