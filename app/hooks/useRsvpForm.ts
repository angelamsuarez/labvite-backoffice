import { useState } from 'react';

export interface GuestRow {
  name: string;
  attending: 'yes' | 'no' | null;
}

export function useRsvpForm(maxGuests: number) {
  const [guests, setGuests] = useState<GuestRow[]>(() =>
    Array.from({ length: maxGuests }, () => ({ name: '', attending: null }))
  );
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const updateGuest = (index: number, updates: Partial<GuestRow>) => {
    setGuests((prev) => prev.map((g, i) => (i === index ? { ...g, ...updates } : g)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return { guests, comments, setComments, updateGuest, submitted, handleSubmit };
}
