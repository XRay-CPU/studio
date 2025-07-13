
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
import { proposalData } from "@/data/proposals";

export default function GovernancePage() {
  const [daoProposals, setDaoProposals] = useState(proposalData);

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
