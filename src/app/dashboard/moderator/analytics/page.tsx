
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatCard } from "@/components/dashboard/StatCard";
import { CheckCircle, Clock, Users, ShieldAlert } from "lucide-react";

const questCompletionData = [
  { name: 'Jan', completed: 40, pending: 24 },
  { name: 'Feb', completed: 30, pending: 13 },
  { name: 'Mar', completed: 50, pending: 38 },
  { name: 'Apr', completed: 47, pending: 39 },
  { name: 'May', completed: 69, pending: 48 },
  { name: 'Jun', completed: 59, pending: 38 },
];

const categoryData = [
  { name: 'Marine', value: 400 },
  { name: 'Reforestation', value: 300 },
  { name: 'Waste Mgmt', value: 200 },
  { name: 'Urban Green', value: 278 },
];


export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time metrics on platform health and user engagement.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="2,453" icon={<Users className="h-6 w-6 text-blue-500" />} />
        <StatCard title="Quests Verified" value="1,892" icon={<CheckCircle className="h-6 w-6 text-green-500" />} />
        <StatCard title="Quests Pending" value="156" icon={<Clock className="h-6 w-6 text-yellow-500" />} />
        <StatCard title="Submissions Flagged" value="12" icon={<ShieldAlert className="h-6 w-6 text-red-500" />} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Quest Completions</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={questCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="hsl(var(--primary))" name="Completed" />
                <Bar dataKey="pending" fill="hsl(var(--secondary))" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quests by Category</CardTitle>
          </CardHeader>
           <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" name="Total Quests" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
