export type Quest = {
  id: string;
  title: string;
  description: string;
  location: string;
  category: 'Marine Protection' | 'Reforestation' | 'Urban Greening' | 'Waste Management';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  impactRating: number;
  partner: string;
  image: string;
  tokens: number;
  dataAiHint: string;
  todos: string[];
};

export type Moderator = {
  id: string;
  name: string;
  avatar: string;
  rating: number; // e.g., 4.5
  verifications: number;
  joinDate: string;
};
