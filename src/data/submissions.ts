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
    questId: 'siargao-mangrove',
    questTitle: 'Siargao Mangrove Reforestation',
    questCategory: 'Reforestation',
    userName: 'Maria Clara',
    userAvatar: 'https://placehold.co/40x40.png',
    submissionDate: '2024-07-20',
    status: 'Pending',
    evidencePhoto: 'https://placehold.co/600x400.png',
    userNotes: 'We planted over 50 saplings today! The community was very supportive.'
  },
  {
    id: 'sub-002',
    questId: 'bohol-beach-cleanup',
    questTitle: 'Bohol Beach Cleanup Drive',
    questCategory: 'Waste Management',
    userName: 'Andres Bonifacio',
    userAvatar: 'https://placehold.co/40x40.png',
    submissionDate: '2024-07-19',
    status: 'Pending',
    evidencePhoto: 'https://placehold.co/600x400.png',
    userNotes: 'Collected 3 large bags of plastic waste. Most of it was single-use plastic bottles.'
  },
  {
    id: 'sub-003',
    questId: 'manila-rooftop-garden',
    questTitle: 'Manila Urban Rooftop Garden',
    questCategory: 'Urban Greening',
    userName: 'Gabriela Silang',
    userAvatar: 'https://placehold.co/40x40.png',
    submissionDate: '2024-07-18',
    status: 'Pending',
    evidencePhoto: 'https://placehold.co/600x400.png',
    userNotes: 'The irrigation system is now set up. Planted tomatoes and lettuce seedlings.'
  }
];
