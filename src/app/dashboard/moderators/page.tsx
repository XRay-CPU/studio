
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
import { Button } from "@/components/ui/button";
import { moderatorData } from "@/data/moderators";
import { Star, MessageSquarePlus } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useToast } from "@/hooks/use-toast";

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
      ))}
      {halfStar && <Star key="half" className="h-4 w-4 text-yellow-500" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-yellow-500" />
      ))}
      <span className="ml-2 text-xs text-muted-foreground">({rating.toFixed(1)})</span>
    </div>
  );
};


export default function ModeratorReviewPage() {
    const { toast } = useToast();
  const [moderators, setModerators] = useState(moderatorData);

  const handleReview = (name: string) => {
    toast({
        title: "Review Submitted",
        description: `Thank you for your feedback on ${name}.`,
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Makabayan</h1>
        <p className="text-muted-foreground">
          Review the performance and competence of our platform's moderators.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Moderator Leaderboard</CardTitle>
           <CardDescription>
            Help maintain platform integrity by providing feedback on moderator actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Moderator</TableHead>
                <TableHead>Competence Rating</TableHead>
                <TableHead className="hidden md:table-cell">Total Verifications</TableHead>
                <TableHead className="hidden md:table-cell">Member Since</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moderators.map((moderator) => (
                <TableRow key={moderator.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <UserAvatar name={moderator.name} src={moderator.avatar} />
                      <span className="font-medium">{moderator.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StarRating rating={moderator.rating} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{moderator.verifications}</TableCell>
                  <TableCell className="hidden md:table-cell">{moderator.joinDate}</TableCell>
                  <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleReview(moderator.name)}>
                        <MessageSquarePlus className="mr-2 h-4 w-4" />
                        Review
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
