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
      // Get all entry dates sorted in ascending order (oldest first)
      const entryDates = entries
        .map(entry => entry.date)
        .sort()
        .map(date => new Date(date));

      let newStreak = 0;
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);

      // Check if there's an entry for today
      const hasTodayEntry = entryDates.some(date => 
        format(date, 'yyyy-MM-dd') === today
      );

      if (hasTodayEntry) {
        newStreak = 1;
        let previousDate = new Date(todayDate);
        previousDate.setDate(previousDate.getDate() - 1);

        // Check consecutive days backwards from yesterday
        for (let i = entryDates.length - 1; i >= 0; i--) {
          const entryDate = new Date(entryDates[i]);
          entryDate.setHours(0, 0, 0, 0);

          if (format(entryDate, 'yyyy-MM-dd') === format(previousDate, 'yyyy-MM-dd')) {
            newStreak++;
            previousDate.setDate(previousDate.getDate() - 1);
          } else if (entryDate < previousDate) {
            // Found a gap, stop counting
            break;
          }
        }
      } else {
        // No entry today, check if we need to reset streak
        if (entryDates.length > 0) {
          const lastEntryDate = new Date(entryDates[entryDates.length - 1]);
          lastEntryDate.setHours(0, 0, 0, 0);
          const yesterday = new Date(todayDate);
          yesterday.setDate(yesterday.getDate() - 1);

          if (format(lastEntryDate, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
            // Entry from yesterday, keep current streak
            newStreak = currentUser.streak;
          } else {
            // No entry yesterday, reset streak
            newStreak = 0;
          }
        }
      }

      // Only update if streak has changed
      if (newStreak !== currentUser.streak) {
        updateUser({ 
          streak: newStreak,
          lastStreakUpdate: new Date().toISOString()
        });
      }
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