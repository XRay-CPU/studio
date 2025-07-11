
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
import { Progress } from "@/components/ui/progress";
import { PlusCircle, FileText } from "lucide-react";

const proposals = [
  {
    id: "prop-001",
    title: "Adjust $CARE rewards for Reforestation Quests by 10%",
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
    title: "Introduce 'Quest Marshal' role for Tier 2 Verification",
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

export default function GovernancePage() {
  const [daoProposals, setDaoProposals] = useState(proposals);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">DAO Governance</h1>
          <p className="text-muted-foreground">
            Review, vote on, and create new proposals for the Likas Bayani ecosystem.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Proposal
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Community Proposals</CardTitle>
           <CardDescription>
            {daoProposals.filter(p => p.status === 'Voting Active').length} proposal(s) currently active.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Proposal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Voting</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {daoProposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell>
                    <div className="font-medium">{proposal.title}</div>
                    <div className="text-sm text-muted-foreground">Proposed by {proposal.proposer}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={proposal.status === "Voting Active" ? "default" : proposal.status === "Passed" ? "secondary" : "destructive"}>
                      {proposal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                        <Progress value={proposal.votesFor} className="h-2" />
                        <span className="text-xs text-muted-foreground">{proposal.votesFor}% For / {proposal.votesAgainst}% Against</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
