'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, CheckCircle2, Circle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'newest' | 'oldest' | 'priority';

const STORAGE_KEY = 'nexa-todos';
const CATEGORIES = ['Personal', 'Work', 'Shopping', 'Health', 'Other'];

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('newest');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTodos(parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        })));
      } catch (e) {
        console.error('Failed to load todos:', e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input,
      completed: false,
      createdAt: new Date(),
      priority,
      category: selectedCategory === 'All' ? 'Personal' : selectedCategory,
    };

    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filter todos
  let filtered = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (selectedCategory !== 'All') {
    filtered = filtered.filter(todo => todo.category === selectedCategory);
  }

  // Sort todos
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sort === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'low':
        return 'bg-green-500/10 border-green-500/30 text-green-400';
      default:
        return '';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Personal': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'Work': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'Shopping': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
      'Health': 'bg-green-500/10 text-green-400 border-green-500/30',
      'Other': 'bg-gray-500/10 text-gray-400 border-gray-500/30',
    };
    return colors[category] || colors['Other'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nexa-900 via-nexa-800 to-nexa-950">
      {/* Header */}
      <header className="border-b border-nexa-700/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold text-white cursor-pointer hover:text-nexa-400 transition">
              NEXA <span className="text-nexa-400">🚀</span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-nexa-300 hover:text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and Stats */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">My Tasks 📋</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-4">
              <p className="text-nexa-400 text-sm">Total Tasks</p>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-4">
              <p className="text-nexa-400 text-sm">Active</p>
              <p className="text-3xl font-bold text-yellow-400">{stats.active}</p>
            </div>
            <div className="bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-4">
              <p className="text-nexa-400 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
            </div>
          </div>
        </div>

        {/* Add Todo */}
        <div className="bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Add New Task</h2>
          <div className="space-y-4">
            <Input
              placeholder="What needs to be done?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="bg-nexa-900/50 border-nexa-600/50"
            />
            <div className="flex gap-4 flex-wrap">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="px-4 py-2 bg-nexa-900/50 border border-nexa-600/50 rounded-md text-nexa-200 focus:outline-none focus:ring-2 focus:ring-nexa-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-nexa-900/50 border border-nexa-600/50 rounded-md text-nexa-200 focus:outline-none focus:ring-2 focus:ring-nexa-500"
              >
                <option>All</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <Button onClick={addTodo} className="bg-nexa-600 hover:bg-nexa-700 ml-auto">
                <Plus size={20} /> Add Task
              </Button>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex gap-4 mb-6 flex-wrap items-center">
          <div className="flex gap-2">
            {(['all', 'active', 'completed'] as FilterType[]).map(f => (
              <Button
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f)}
                className="capitalize"
              >
                <Filter size={16} />
                {f}
              </Button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="px-3 py-1.5 bg-nexa-800/40 border border-nexa-600/50 rounded-md text-nexa-200 text-sm focus:outline-none focus:ring-2 focus:ring-nexa-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">By Priority</option>
          </select>

          {stats.completed > 0 && (
            <Button
              onClick={clearCompleted}
              variant="outline"
              size="sm"
              className="ml-auto border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              Clear Completed
            </Button>
          )}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {sorted.length === 0 ? (
            <div className="bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-12 text-center">
              <p className="text-nexa-400 text-lg">No tasks yet. Create one to get started! 🎯</p>
            </div>
          ) : (
            sorted.map(todo => (
              <div
                key={todo.id}
                className={`bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-4 flex items-center gap-4 hover:border-nexa-600/50 transition ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="flex-shrink-0 text-nexa-400 hover:text-nexa-300 transition"
                >
                  {todo.completed ? (
                    <CheckCircle2 size={24} className="text-green-500" />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-base ${
                      todo.completed
                        ? 'line-through text-nexa-500'
                        : 'text-nexa-100'
                    }`}
                  >
                    {todo.text}
                  </p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(todo.priority)}`}>
                      {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded border ${getCategoryColor(todo.category)}`}>
                      {todo.category}
                    </span>
                    <span className="text-xs text-nexa-500">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="flex-shrink-0 text-nexa-500 hover:text-red-400 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
