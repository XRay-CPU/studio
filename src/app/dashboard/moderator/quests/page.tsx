
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
import { questData as initialQuests } from "@/data/quests";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function QuestManagementPage() {
  const [quests, setQuests] = useState(initialQuests);

  // In a real app, these actions would trigger forms/modals and API calls.
  const handleCreate = () => alert("Open 'Create Quest' form.");
  const handleEdit = (id: string) => alert(`Open 'Edit Quest' form for ${id}.`);
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this quest?")) {
      setQuests(quests.filter(q => q.id !== id));
      alert(`Quest ${id} deleted.`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Quest Management</h1>
          <p className="text-muted-foreground">
            Create, update, and manage all environmental quests.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Quest
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Quests</CardTitle>
           <CardDescription>
            {quests.length} quest(s) currently active on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Difficulty</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quests.length > 0 ? quests.map((quest) => (
                <TableRow key={quest.id}>
                  <TableCell className="font-medium">{quest.title}</TableCell>
                  <TableCell>{quest.location}</TableCell>
                   <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary">{quest.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={quest.difficulty === 'Easy' ? 'default' : quest.difficulty === 'Medium' ? 'outline' : 'destructive'}>{quest.difficulty}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(quest.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(quest.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No quests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
