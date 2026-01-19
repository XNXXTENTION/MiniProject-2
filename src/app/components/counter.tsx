'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CounterProps {
  initialLikes: number;
}

export default function Counter({ initialLikes }: CounterProps) {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-16 p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-slate-900">ถูกใจแล้ว</h2>
      <p className="text-4xl font-bold text-blue-600">{likes}</p>
      <Button onClick={handleLike} size="lg">
        👍 ถูกใจ
      </Button>
    </div>
  );
}