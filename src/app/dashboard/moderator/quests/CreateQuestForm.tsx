"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export type CreateQuestInput = {
  title: string;
  location: string;
  category: string;
  difficulty: string;
  description: string;
  tokens: number;
  todos: string[];
};

export default function CreateQuestForm({ onCreateAction, onCancelAction }: {
  onCreateAction: (quest: CreateQuestInput) => void;
  onCancelAction: () => void;
}) {
  const [form, setForm] = useState<CreateQuestInput>({
    title: "",
    location: "",
    category: "",
    difficulty: "Easy",
    description: "",
    tokens: 0,
    todos: [""],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTodoChange = (idx: number, value: string) => {
    const todos = [...form.todos];
    todos[idx] = value;
    setForm({ ...form, todos });
  };

  const addTodo = () => setForm({ ...form, todos: [...form.todos, ""] });
  const removeTodo = (idx: number) => setForm({ ...form, todos: form.todos.filter((_, i) => i !== idx) });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAction(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Title</label>
        <Input name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div>
        <label className="block font-medium">Location</label>
        <Input name="location" value={form.location} onChange={handleChange} required />
      </div>
      <div>
        <label className="block font-medium">Category</label>
        <Input name="category" value={form.category} onChange={handleChange} required />
      </div>
      <div>
        <label className="block font-medium">Difficulty</label>
        <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full border rounded p-2">
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" required />
      </div>
      <div>
        <label className="block font-medium">Tokens</label>
        <Input name="tokens" type="number" value={form.tokens} onChange={handleChange} required min={0} />
      </div>
      <div>
        <label className="block font-medium">Todos</label>
        {form.todos.map((todo, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <Input value={todo} onChange={e => handleTodoChange(idx, e.target.value)} required />
            {form.todos.length > 1 && (
              <Button type="button" variant="destructive" onClick={() => removeTodo(idx)}>-</Button>
            )}
            {idx === form.todos.length - 1 && (
              <Button type="button" onClick={addTodo}>+</Button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="secondary" onClick={onCancelAction}>Cancel</Button>
        <Button type="submit">Create Quest</Button>
      </div>
    </form>
  );
}
