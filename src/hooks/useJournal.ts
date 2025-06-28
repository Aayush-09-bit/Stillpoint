import { useCallback } from 'react';
import { JournalEntry, MoodType } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { format } from 'date-fns';
import { analyzeMood } from '../utils/moodAnalyzer';

export function useJournal(userId: string | undefined) {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('stillpoint_entries', []);

  const userEntries = entries.filter(entry => entry.userId === userId);

  const addEntry = useCallback((content: string, date?: string) => {
    if (!userId || !content.trim()) return;

    const entryDate = date || format(new Date(), 'yyyy-MM-dd');
    const existingEntry = userEntries.find(entry => entry.date === entryDate);

    // Analyze the mood from the text content
    const analysis = analyzeMood(content);

    if (existingEntry) {
      // Update existing entry
      const updatedEntry: JournalEntry = {
        ...existingEntry,
        content,
        mood: analysis.mood,
        sentiment: analysis.sentiment,
        sentimentScore: analysis.sentimentScore,
        keywords: analysis.keywords,
        updatedAt: new Date().toISOString()
      };
      
      setEntries(prev => prev.map(entry => 
        entry.id === existingEntry.id ? updatedEntry : entry
      ));
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        userId,
        date: entryDate,
        content,
        mood: analysis.mood,
        sentiment: analysis.sentiment,
        sentimentScore: analysis.sentimentScore,
        keywords: analysis.keywords,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setEntries(prev => [...prev, newEntry]);
    }
  }, [userId, userEntries, setEntries]);

  const getEntryByDate = useCallback((date: string) => {
    return userEntries.find(entry => entry.date === date);
  }, [userEntries]);

  const getTodaysEntry = useCallback(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return getEntryByDate(today);
  }, [getEntryByDate]);

  return {
    entries: userEntries,
    addEntry,
    getEntryByDate,
    getTodaysEntry
  };
}