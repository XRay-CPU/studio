
import type { Proposal } from '@/types';

export const proposalData: Proposal[] = [
  {
    id: "prop-001",
    title: "Adjust Moral rewards for Reforestation Quests by 10%",
    status: "Voting Active",
    proposer: "Juan dela Cruz",
    votesFor: 75,
    votesAgainst: 25,
  },
  {
    id: "prop-002",
    title: "New Partnership: Palawan Conservation Corps",
    status: "Passed",
    proposer: "Maria Clara",
    votesFor: 92,
    votesAgainst: 8,
  },
  {
    id: "prop-003",
    title: "Introduce 'Makabayan' role for Tier 2 Verification",
    status: "Voting Active",
    proposer: "Andres Bonifacio",
    votesFor: 55,
    votesAgainst: 45,
  },
  {
    id: "prop-004",
    title: "Decrease slashing penalty for first-time fraudulent submissions",
    status: "Failed",
    proposer: "Gabriela Silang",
    votesFor: 30,
    votesAgainst: 70,
  },
];
