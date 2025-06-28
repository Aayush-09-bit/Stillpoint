import React, { useState, useEffect } from 'react';
import { format, parseISO, differenceInDays } from 'date-fns';
import { AuthForm } from './components/Auth/AuthForm';
import { Header } from './components/Layout/Header';
import { HomePage } from './components/Home/HomePage';
import { CalendarView } from './components/Calendar/CalendarView';
import { MoodAnalytics } from './components/Analytics/MoodAnalytics';
import { Settings } from './components/Settings/Settings';
import { useAuth } from './hooks/useAuth';
import { useJournal } from './hooks/useJournal';
import { ViewType } from './types';

function App() {
  const { currentUser, isAuthenticated, login, signup, logout, updateUser, deleteProfile } = useAuth();
  const { entries, addEntry, getTodaysEntry } = useJournal(currentUser?.id);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  
  const todaysEntry = getTodaysEntry();

  // Apply user preferences to the app
  const fontClass = currentUser?.preferences?.fontFamily || 'font-sans';
  const backgroundClass = getBackgroundClass(currentUser?.preferences?.background || 'sage');
  const themeClass = currentUser?.preferences?.theme === 'dark' ? 'dark' : '';

  // Streak calculation effect
  useEffect(() => {
    if (!currentUser || !entries.length) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    const lastUpdate = currentUser.lastStreakUpdate ? format(parseISO(currentUser.lastStreakUpdate), 'yyyy-MM-dd') : null;
    
    // Only update streak if it hasn't been updated today
    if (lastUpdate !== today) {
      // Get all entry dates sorted in descending order (most recent first)
      const entryDates = entries
        .map(entry => entry.date)
        .sort()
        .reverse();

      let newStreak = 0;
      const todayDate = new Date();

      // Check if there's an entry for today
      const hasTodayEntry = entryDates.includes(today);
      
      if (hasTodayEntry) {
        // Start counting from today
        newStreak = 1;
        
        // Check consecutive days backwards from today
        for (let i = 1; i < entryDates.length; i++) {
          const currentEntryDate = new Date(entryDates[i]);
          const expectedDate = new Date(todayDate);
          expectedDate.setDate(todayDate.getDate() - newStreak);
          
          const currentDateString = format(currentEntryDate, 'yyyy-MM-dd');
          const expectedDateString = format(expectedDate, 'yyyy-MM-dd');
          
          if (currentDateString === expectedDateString) {
            newStreak++;
          } else {
            // Found a gap, stop counting
            break;
          }
        }
      } else {
        // No entry today, check if we need to reset streak
        if (entryDates.length > 0) {
          const lastEntryDate = new Date(entryDates[0]);
          const daysSinceLastEntry = differenceInDays(todayDate, lastEntryDate);
          
          if (daysSinceLastEntry > 1) {
            // More than 1 day gap, reset streak to 0
            newStreak = 0;
          } else {
            // Keep current streak if it's just 1 day (yesterday)
            newStreak = currentUser.streak;
          }
        }
      }

      // Update user with new streak (removed totalEntries)
      updateUser({ 
        streak: newStreak,
        lastStreakUpdate: new Date().toISOString()
      });
    }
  }, [entries, currentUser?.id, currentUser?.streak, currentUser?.lastStreakUpdate, updateUser]);

  const handleSaveEntry = (content: string) => {
    addEntry(content);
  };

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <AuthForm onLogin={login} onSignup={signup} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomePage
            user={currentUser!}
            todaysEntry={todaysEntry}
            onSaveEntry={handleSaveEntry}
          />
        );
      case 'calendar':
        return <CalendarView entries={entries} user={currentUser!} />;
      case 'analytics':
        return <MoodAnalytics entries={entries} user={currentUser!} />;
      case 'settings':
        return <Settings user={currentUser!} onUpdateUser={updateUser} onDeleteProfile={deleteProfile} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${fontClass} ${themeClass}`}>
      <div className={`min-h-screen bg-gradient-to-br ${backgroundClass}`}>
        <Header
          user={currentUser!}
          currentView={currentView}
          onViewChange={setCurrentView}
          onLogout={handleLogout}
        />
        <main>
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

function getBackgroundClass(background: string): string {
  const backgrounds: { [key: string]: string } = {
    sage: 'from-sage-50 via-cream-50 to-lavender-50',
    ocean: 'from-blue-50 via-cyan-50 to-teal-50',
    sunset: 'from-orange-50 via-pink-50 to-purple-50',
    forest: 'from-green-50 via-emerald-50 to-teal-50',
    lavender: 'from-purple-50 via-pink-50 to-indigo-50',
    earth: 'from-amber-50 via-orange-50 to-red-50',
  };
  return backgrounds[background] || backgrounds.sage;
}

export default App;