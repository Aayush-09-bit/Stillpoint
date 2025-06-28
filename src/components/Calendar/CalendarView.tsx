import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, parseISO, isFuture } from 'date-fns';
import { ChevronLeft, ChevronRight, Book, Sparkles, Heart, Lightbulb, Target, Smile, X, Calendar as CalendarIcon, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { JournalEntry, User, MoodType } from '../../types';
import { moodOptions } from '../../data/moodOptions';
import { generateMindfulSuggestions, generateDateSpecificSuggestions } from '../../utils/mindfulSuggestions';

interface CalendarViewProps {
  entries: JournalEntry[];
  user: User;
}

export function CalendarView({ entries, user }: CalendarViewProps) {
  const userPreferences = user?.preferences || {
    theme: 'light',
    fontFamily: 'inter',
    inkColor: 'sage',
    fontSize: 'medium',
    notifications: false,
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showGeneralSuggestions, setShowGeneralSuggestions] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start from Monday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEntryForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return entries.find(entry => entry.date === dateString);
  };

  const getMoodColor = (mood: MoodType) => {
    return moodOptions.find(option => option.type === mood)?.color || '#94a3b8';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isDateClickable = (date: Date) => {
    const entry = getEntryForDate(date);
    const isCurrentMonth = isSameMonth(date, currentDate);
    return isCurrentMonth && !isFuture(date) && (entry || isToday(date));
  };

  const shouldShowSuggestions = (date: Date) => {
    const entry = getEntryForDate(date);
    return isToday(date) && !entry;
  };

  const handleDateClick = (date: Date) => {
    if (!isDateClickable(date)) return;
    
    const entry = getEntryForDate(date);
    if (entry) {
      setSelectedEntry(entry);
      setSelectedDate(null);
    } else if (shouldShowSuggestions(date)) {
      setSelectedDate(date);
      setSelectedEntry(null);
    }
  };

  const closeSidebar = () => {
    setSelectedDate(null);
    setSelectedEntry(null);
  };

  const getFontClass = () => {
    const fontMap: { [key: string]: string } = {
      inter: 'font-sans',
      playfair: 'font-display',
      crimson: 'font-serif',
      lora: 'font-serif',
      merriweather: 'font-serif'
    };
    return fontMap[userPreferences.fontFamily] || 'font-sans';
  };

  const getInkColor = () => {
    const colorMap: { [key: string]: string } = {
      sage: '#5c7a5c',
      lavender: '#8b5cf6',
      warm: '#92400e',
      ocean: '#0369a1',
      sunset: '#ea580c',
      forest: '#166534'
    };
    return colorMap[userPreferences.inkColor] || '#5c7a5c';
  };

  const getFontSize = () => {
    const sizeMap: { [key: string]: string } = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    return sizeMap[userPreferences.fontSize] || '16px';
  };

  const todaysEntry = getEntryForDate(new Date());
  const hasEntryToday = !!todaysEntry;

  const generalSuggestions = generateMindfulSuggestions(entries, user);
  const dateSpecificSuggestions = (selectedDate && isToday(selectedDate))
    ? generateDateSpecificSuggestions(selectedDate, entries, user)
    : [];
  const similarDaySuggestions = selectedEntry
    ? generateMindfulSuggestions([selectedEntry], user)
    : [];

  return (
    <div className={`min-h-screen transition-all duration-700 relative overflow-hidden ${
      userPreferences.theme === 'dark' 
        ? 'bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900' 
        : 'bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100'
    }`}>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 sm:top-20 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 rounded-full blur-3xl animate-float ${
          userPreferences.theme === 'dark' 
            ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20' 
            : 'bg-gradient-to-br from-sage-200/40 to-sage-300/40'
        }`}></div>
        <div className={`absolute top-20 sm:top-40 right-10 sm:right-20 w-16 sm:w-24 h-16 sm:h-24 rounded-full blur-2xl animate-float ${
          userPreferences.theme === 'dark' 
            ? 'bg-gradient-to-br from-stone-500/20 to-amber-600/20' 
            : 'bg-gradient-to-br from-cream-200/40 to-cream-300/40'
        }`} style={{animationDelay: '2s'}}></div>
        <div className={`absolute bottom-16 sm:bottom-32 left-1/4 w-12 sm:w-20 h-12 sm:h-20 rounded-full blur-2xl animate-float ${
          userPreferences.theme === 'dark' 
            ? 'bg-gradient-to-br from-orange-500/20 to-red-600/20' 
            : 'bg-gradient-to-br from-sage-300/40 to-sage-400/40'
        }`} style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        <div className="relative">
          {/* Suggestions Panel */}
          {hasEntryToday && (
            <div className={`rounded-2xl sm:rounded-3xl shadow-lg border-2 p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in backdrop-blur-xl ${
              userPreferences.theme === 'dark'
                ? 'bg-stone-800/80 border-stone-700/50 shadow-amber-500/10'
                : 'bg-white/80 border-white/50 shadow-sage-500/10'
            }`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg ${
                    userPreferences.theme === 'dark'
                      ? 'bg-gradient-to-br from-amber-600 to-amber-700'
                      : 'bg-gradient-to-br from-sage-500 to-sage-600'
                  }`}>
                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-base sm:text-lg lg:text-xl font-semibold ${
                      userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                    }`}>
                      Your Mindful Insights
                    </h2>
                    <p className={`text-xs sm:text-sm ${
                      userPreferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-600'
                    }`}>
                      Personalized suggestions based on your patterns
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowGeneralSuggestions(!showGeneralSuggestions)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all w-full sm:w-auto justify-center ${
                    showGeneralSuggestions
                      ? userPreferences.theme === 'dark'
                        ? 'bg-amber-600 text-white'
                        : 'bg-sage-600 text-white'
                      : userPreferences.theme === 'dark'
                        ? 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                        : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
                  }`}
                >
                  <span>{showGeneralSuggestions ? 'Hide' : 'Show'}</span>
                  {showGeneralSuggestions ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                </button>
              </div>

              {showGeneralSuggestions && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 animate-slide-up">
                  {generalSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all hover:scale-105 backdrop-blur-sm ${
                        userPreferences.theme === 'dark'
                          ? 'bg-stone-700/50 border-stone-600 hover:border-stone-500'
                          : 'bg-white/60 border-sage-200 hover:border-sage-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3 mb-3">
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          suggestion.type === 'mood-boost'
                            ? 'bg-yellow-500'
                            : suggestion.type === 'stress-relief'
                            ? 'bg-blue-500'
                            : suggestion.type === 'reflection'
                            ? 'bg-purple-500'
                            : 'bg-green-500'
                        }`}>
                          {suggestion.type === 'mood-boost' && <Smile className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                          {suggestion.type === 'stress-relief' && <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                          {suggestion.type === 'reflection' && <Book className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                          {suggestion.type === 'growth' && <Target className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-xs sm:text-sm mb-1 ${
                            userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                          }`}>
                            {suggestion.title}
                          </h3>
                          <p className={`text-xs leading-relaxed ${
                            userPreferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-600'
                          }`}>
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                        suggestion.type === 'mood-boost'
                          ? 'bg-yellow-100 text-yellow-800'
                          : suggestion.type === 'stress-relief'
                          ? 'bg-blue-100 text-blue-800'
                          : suggestion.type === 'reflection'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {suggestion.duration}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!hasEntryToday && (
            <div className={`rounded-2xl sm:rounded-3xl shadow-lg border-2 p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in backdrop-blur-xl ${
              userPreferences.theme === 'dark'
                ? 'bg-stone-800/80 border-stone-700/50 shadow-amber-500/10'
                : 'bg-white/80 border-white/50 shadow-sage-500/10'
            }`}>
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg ${
                  userPreferences.theme === 'dark'
                    ? 'bg-gradient-to-br from-amber-600 to-amber-700'
                    : 'bg-gradient-to-br from-sage-500 to-sage-600'
                }`}>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className={`text-base sm:text-lg lg:text-xl font-semibold ${
                    userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                  }`}>
                    Ready for Today's Reflection?
                  </h2>
                  <p className={`text-xs sm:text-sm ${
                    userPreferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-600'
                  }`}>
                    Start journaling today to unlock personalized insights
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Calendar Container */}
          <div className="relative">
            <div className={`transition-all duration-300 ${selectedDate || selectedEntry ? 'xl:pr-96' : ''}`}>
              <div className={`rounded-2xl sm:rounded-3xl shadow-xl border-2 overflow-hidden animate-fade-in backdrop-blur-xl ${
                userPreferences.theme === 'dark'
                  ? 'bg-stone-800/80 border-stone-700/50 shadow-amber-500/10'
                  : 'bg-white/80 border-white/50 shadow-sage-500/10'
              }`}>
                {/* Calendar Header */}
                <div className={`text-white p-4 sm:p-6 lg:p-8 ${
                  userPreferences.theme === 'dark'
                    ? 'bg-gradient-to-r from-amber-700 to-amber-800'
                    : 'bg-gradient-to-r from-sage-500 to-sage-600'
                }`}>
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-semibold">Your Journey Calendar</h1>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <button
                        onClick={() => navigateMonth('prev')}
                        className="p-2 sm:p-3 hover:bg-white/20 rounded-lg sm:rounded-xl transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <span className="text-base sm:text-lg lg:text-xl font-medium px-3 sm:px-4 lg:px-6">
                        {format(currentDate, 'MMMM yyyy')}
                      </span>
                      <button
                        onClick={() => navigateMonth('next')}
                        className="p-2 sm:p-3 hover:bg-white/20 rounded-lg sm:rounded-xl transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
                  {/* Day Headers - Starting from Monday */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3 mb-3 sm:mb-4 lg:mb-6">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <div key={day} className={`text-center text-xs sm:text-sm font-medium py-2 sm:py-3 ${
                        userPreferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-600'
                      }`}>
                        <span className="hidden sm:inline">{day.slice(0, 3)}</span>
                        <span className="sm:hidden">{day.slice(0, 1)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3">
                    {days.map((day) => {
                      const entry = getEntryForDate(day);
                      const isCurrentMonth = isSameMonth(day, currentDate);
                      const isCurrentDay = isToday(day);
                      const isSelected = (selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')) ||
                                       (selectedEntry && format(parseISO(selectedEntry.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
                      const moodOption = entry ? moodOptions.find(option => option.type === entry.mood) : null;
                      const isClickable = isDateClickable(day);
                      const isFutureDate = isFuture(day);
                      const showSuggestionIndicator = shouldShowSuggestions(day) && isCurrentMonth;

                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => isClickable && handleDateClick(day)}
                          className={`aspect-square p-1 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl lg:rounded-2xl text-xs sm:text-sm transition-all relative group min-h-[40px] sm:min-h-[50px] lg:min-h-[60px] flex flex-col items-center justify-center ${
                            !isCurrentMonth
                              ? 'opacity-40'
                              : isClickable
                              ? 'hover:scale-105 hover:shadow-lg cursor-pointer transform'
                              : 'cursor-default'
                          } ${
                            isSelected
                              ? userPreferences.theme === 'dark'
                                ? 'ring-2 ring-amber-400 bg-amber-400/20'
                                : 'ring-2 ring-sage-400 bg-sage-400/20'
                              : isCurrentDay && isCurrentMonth
                              ? userPreferences.theme === 'dark'
                                ? 'ring-2 ring-amber-400 ring-opacity-50 bg-stone-700/50'
                                : 'ring-2 ring-sage-400 ring-opacity-50 bg-sage-50'
                              : entry && isCurrentMonth
                              ? 'hover:bg-opacity-30'
                              : isCurrentMonth && isClickable
                              ? userPreferences.theme === 'dark'
                                ? 'hover:bg-stone-700'
                                : 'hover:bg-sage-50'
                              : ''
                          }`}
                          style={{
                            backgroundColor: entry && isCurrentMonth && !isSelected
                              ? `${getMoodColor(entry.mood)}20`
                              : 'transparent',
                            borderColor: entry && isCurrentMonth
                              ? getMoodColor(entry.mood)
                              : 'transparent',
                            borderWidth: entry && isCurrentMonth ? '2px' : '0px'
                          }}
                          title={
                            !isCurrentMonth
                              ? ''
                              : isFutureDate
                              ? 'Future date'
                              : (!isClickable && !isFutureDate)
                              ? 'Past date - no entry available'
                              : entry
                              ? 'Click to view entry'
                              : showSuggestionIndicator
                              ? 'Click for mindful suggestions'
                              : ''
                          }
                        >
                          <span className={`block mb-1 ${
                            isCurrentMonth ? 'font-bold' : 'font-medium'
                          } ${
                            isCurrentDay && isCurrentMonth
                              ? userPreferences.theme === 'dark' ? 'text-amber-300' : 'text-sage-800'
                              : isCurrentMonth
                                ? userPreferences.theme === 'dark' ? 'text-stone-200' : 'text-sage-700'
                                : userPreferences.theme === 'dark' ? 'text-stone-600' : 'text-sage-400'
                          }`}>
                            {format(day, 'd')}
                          </span>
                          
                          {entry && isCurrentMonth && moodOption && (
                            <div className="text-sm sm:text-base lg:text-lg opacity-80 group-hover:opacity-100 transition-opacity">
                              {moodOption.emoji}
                            </div>
                          )}

                          {isFutureDate && isCurrentMonth && (
                            <div className={`absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full flex items-center justify-center opacity-50 ${
                              userPreferences.theme === 'dark' ? 'bg-stone-600' : 'bg-gray-300'
                            }`}>
                              <Clock className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 text-white" />
                            </div>
                          )}

                          {showSuggestionIndicator && (
                            <div className={`absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full opacity-60 animate-pulse ${
                              userPreferences.theme === 'dark' ? 'bg-amber-400' : 'bg-sage-400'
                            }`}>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - FIXED WITH PROPER WHITE BACKGROUND */}
            {(selectedDate || selectedEntry) && (
              <>
                {/* Mobile Overlay - Click to close */}
                <div 
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm xl:hidden z-40"
                  onClick={closeSidebar}
                />
                
                {/* Sidebar - NOW WITH SOLID WHITE BACKGROUND IN LIGHT MODE */}
                <div className={`fixed top-16 sm:top-20 bottom-0 right-0 w-full sm:w-96 xl:absolute xl:top-0 xl:right-0 xl:bottom-0 xl:w-96 transform transition-transform duration-300 ease-in-out xl:rounded-2xl xl:shadow-2xl ${
                  userPreferences.theme === 'dark'
                    ? 'bg-stone-800 border-l xl:border border-stone-700 shadow-amber-500/20'
                    : 'bg-white border-l xl:border border-sage-200 shadow-sage-500/20'
                } overflow-hidden flex flex-col z-50`}>
                  
                  {/* Header */}
                  <div className={`flex-shrink-0 p-4 sm:p-6 border-b ${
                    userPreferences.theme === 'dark'
                      ? 'bg-stone-800 border-stone-700'
                      : 'bg-white border-sage-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          userPreferences.theme === 'dark'
                            ? 'bg-amber-600'
                            : 'bg-sage-600'
                        }`}>
                          {selectedEntry ? <Book className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className={`text-sm sm:text-base lg:text-lg font-semibold truncate ${
                            userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                          }`}>
                            {selectedEntry
                              ? format(parseISO(selectedEntry.date), 'EEEE, MMM do')
                              : selectedDate
                              ? format(selectedDate, 'EEEE, MMM do')
                              : ''
                            }
                          </h2>
                          <p className={`text-xs sm:text-sm ${
                            userPreferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-600'
                          }`}>
                            {selectedEntry ? 'Journal Entry' : 'Mindful Suggestions'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Close Button */}
                      <button
                        onClick={closeSidebar}
                        className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-110 flex-shrink-0 ml-3 ${
                          userPreferences.theme === 'dark'
                            ? 'hover:bg-stone-700 text-stone-400 hover:text-amber-50'
                            : 'hover:bg-sage-100 text-sage-600 hover:text-sage-800'
                        }`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {selectedEntry ? (
                      <>
                        {/* Mood Display */}
                        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                          userPreferences.theme === 'dark' ? 'bg-stone-700/50' : 'bg-sage-50'
                        }`}>
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-xl sm:text-2xl lg:text-3xl">
                              {moodOptions.find(option => option.type === selectedEntry.mood)?.emoji}
                            </span>
                            <div>
                              <h3 className={`font-semibold text-sm sm:text-base ${
                                userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                              }`}>
                                {moodOptions.find(option => option.type === selectedEntry.mood)?.label}
                              </h3>
                              <p className={`text-xs sm:text-sm capitalize ${
                                userPreferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-600'
                              }`}>
                                {selectedEntry.sentiment} sentiment
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Entry Content */}
                        <div>
                          <h3 className={`font-semibold mb-3 text-sm sm:text-base ${
                            userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                          }`}>
                            Your Reflection
                          </h3>
                          <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                            userPreferences.theme === 'dark' ? 'bg-stone-900/50' : 'bg-sage-50/50'
                          }`}>
                            <p className={`leading-relaxed whitespace-pre-wrap text-sm sm:text-base ${getFontClass()}`}
                                 style={{
                                   color: getInkColor(),
                                   fontSize: getFontSize()
                                 }}>
                              {selectedEntry.content}
                            </p>
                          </div>
                        </div>

                        {/* Keywords */}
                        {selectedEntry.keywords.length > 0 && (
                          <div>
                            <h3 className={`font-semibold mb-3 text-sm sm:text-base ${
                              userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                            }`}>
                              Key Themes
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedEntry.keywords.map((keyword, index) => (
                                <span
                                  key={index}
                                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                                    userPreferences.theme === 'dark'
                                      ? 'bg-stone-700 text-stone-300'
                                      : 'bg-sage-100 text-sage-700'
                                  }`}
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Similar Day Suggestions */}
                        <div>
                          <h3 className={`font-semibold mb-3 flex items-center space-x-2 text-sm sm:text-base ${
                            userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                          }`}>
                            <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Suggestions for Similar Days</span>
                          </h3>
                          <div className="space-y-3">
                            {similarDaySuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                                  userPreferences.theme === 'dark'
                                    ? 'bg-stone-700/50'
                                    : 'bg-white/60'
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    suggestion.type === 'mood-boost'
                                      ? 'bg-yellow-500'
                                      : suggestion.type === 'stress-relief'
                                      ? 'bg-blue-500'
                                      : suggestion.type === 'reflection'
                                      ? 'bg-purple-500'
                                      : 'bg-green-500'
                                  }`}>
                                    {suggestion.type === 'mood-boost' && <Smile className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                                    {suggestion.type === 'stress-relief' && <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                                    {suggestion.type === 'reflection' && <Book className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                                    {suggestion.type === 'growth' && <Target className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className={`font-medium text-xs sm:text-sm mb-1 ${
                                      userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                                    }`}>
                                      {suggestion.title}
                                    </h4>
                                    <p className={`text-xs leading-relaxed mb-2 ${
                                      userPreferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-600'
                                    }`}>
                                      {suggestion.description}
                                    </p>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      suggestion.type === 'mood-boost'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : suggestion.type === 'stress-relief'
                                        ? 'bg-blue-100 text-blue-800'
                                        : suggestion.type === 'reflection'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-green-100 text-green-800'
                                    }`}>
                                      {suggestion.duration}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : selectedDate && isToday(selectedDate) ? (
                      <>
                        {/* Today's Mindful Moment */}
                        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center ${
                          userPreferences.theme === 'dark' ? 'bg-stone-700/50' : 'bg-sage-50'
                        }`}>
                          <Sparkles className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-3 ${
                            userPreferences.theme === 'dark' ? 'text-amber-400' : 'text-sage-500'
                          }`} />
                          <h3 className={`font-semibold mb-2 text-sm sm:text-base ${
                            userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                          }`}>
                            Today's Mindful Moment
                          </h3>
                          <p className={`text-xs sm:text-sm ${
                            userPreferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-600'
                          }`}>
                            Perfect time for reflection and mindful practice
                          </p>
                        </div>

                        {/* Today's Suggestions */}
                        <div>
                          <h3 className={`font-semibold mb-4 text-sm sm:text-base ${
                            userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                          }`}>
                            Suggested Activities for Today
                          </h3>
                          <div className="space-y-4">
                            {dateSpecificSuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all hover:scale-105 ${
                                  userPreferences.theme === 'dark'
                                    ? 'bg-stone-700/50 border-stone-600 hover:border-stone-500'
                                    : 'bg-white/60 border-sage-200 hover:border-sage-300'
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                    suggestion.type === 'mood-boost'
                                      ? 'bg-yellow-500'
                                      : suggestion.type === 'stress-relief'
                                      ? 'bg-blue-500'
                                      : suggestion.type === 'reflection'
                                      ? 'bg-purple-500'
                                      : 'bg-green-500'
                                  }`}>
                                    {suggestion.type === 'mood-boost' && <Smile className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />}
                                    {suggestion.type === 'stress-relief' && <Heart className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />}
                                    {suggestion.type === 'reflection' && <Book className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />}
                                    {suggestion.type === 'growth' && <Target className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className={`font-semibold mb-2 text-xs sm:text-sm ${
                                      userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                                    }`}>
                                      {suggestion.title}
                                    </h4>
                                    <p className={`text-xs sm:text-sm leading-relaxed mb-3 ${
                                      userPreferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-600'
                                    }`}>
                                      {suggestion.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      <span className={`text-xs px-2 sm:px-3 py-1 rounded-full ${
                                        suggestion.type === 'mood-boost'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : suggestion.type === 'stress-relief'
                                          ? 'bg-blue-100 text-blue-800'
                                          : suggestion.type === 'reflection'
                                          ? 'bg-purple-100 text-purple-800'
                                          : 'bg-green-100 text-green-800'
                                      }`}>
                                        {suggestion.duration}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Encourage Journaling */}
                        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-dashed ${
                          userPreferences.theme === 'dark'
                            ? 'border-amber-600/50 bg-amber-900/20'
                            : 'border-sage-400/50 bg-sage-50/50'
                        }`}>
                          <div className="text-center">
                            <Book className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mx-auto mb-2 ${
                              userPreferences.theme === 'dark' ? 'text-amber-400' : 'text-sage-500'
                            }`} />
                            <h4 className={`font-semibold mb-1 text-xs sm:text-sm ${
                              userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                            }`}>
                              Start Journaling Today
                            </h4>
                            <p className={`text-xs sm:text-sm ${
                              userPreferences.theme === 'dark' ? 'text-amber-200' : 'text-sage-600'
                            }`}>
                              Capture your thoughts and feelings for today
                            </p>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}