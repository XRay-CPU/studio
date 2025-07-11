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
