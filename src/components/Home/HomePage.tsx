import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { PenTool, Heart, CheckCircle, Feather, Sparkles } from 'lucide-react';
import { User, JournalEntry } from '../../types';
import { moodOptions } from '../../data/moodOptions';

interface HomePageProps {
  user: User;
  todaysEntry: JournalEntry | undefined;
  onSaveEntry: (content: string) => void;
}

function HomePage({ user, todaysEntry, onSaveEntry }: HomePageProps) {
  const [content, setContent] = useState(todaysEntry?.content || '');
  const [isWriting, setIsWriting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const today = format(new Date(), 'EEEE, MMMM do');
  const greeting = getGreeting();

  // Generate a consistent daily prompt based on the date
  const dailyPrompt = useMemo(() => {
    const prompts = [
      "What am I grateful for today?",
      "How am I feeling right now, and what might be influencing that?",
      "What challenged me today, and how did I respond?",
      "What brought me joy or peace today?",
      "What would I like to let go of today?",
      "What intention do I want to set for tomorrow?",
      "What did I learn about myself today?",
      "What small victory can I celebrate today?",
      "How did I show kindness to myself or others today?",
      "What moment today made me feel most alive?",
      "What am I looking forward to?",
      "How have I grown since yesterday?",
      "What would I tell my past self about today?",
      "What patterns am I noticing in my thoughts or feelings?",
      "How can I be more present in this moment?"
    ];
    
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return prompts[dayOfYear % prompts.length];
  }, []);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  useEffect(() => {
    let typingTimer: NodeJS.Timeout;
    if (content.length > 0) {
      setIsTyping(true);
      typingTimer = setTimeout(() => setIsTyping(false), 1000);
    }
    return () => clearTimeout(typingTimer);
  }, [content]);

  const handleSave = async () => {
    if (!content.trim()) return;
    
    setIsSaving(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSaveEntry(content);
    setIsSaving(false);
    setIsWriting(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const getMoodDisplay = () => {
    if (!todaysEntry) return null;
    const moodOption = moodOptions.find(option => option.type === todaysEntry.mood);
    return moodOption;
  };

  const moodDisplay = getMoodDisplay();

  const getFontClass = () => {
    const fontMap = {
      inter: 'font-sans',
      playfair: 'font-display',
      crimson: 'font-serif',
      lora: 'font-serif',
      merriweather: 'font-serif'
    };
    return fontMap[user.preferences.fontFamily] || 'font-sans';
  };

  const getInkColor = () => {
    const colorMap = {
      sage: '#5c7a5c',
      lavender: '#8b5cf6',
      warm: '#92400e',
      ocean: '#0369a1',
      sunset: '#ea580c',
      forest: '#166534'
    };
    return colorMap[user.preferences.inkColor] || '#5c7a5c';
  };

  const getFontSize = () => {
    const sizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    return sizeMap[user.preferences.fontSize] || '16px';
  };

  return (
    <div className={`min-h-screen transition-all duration-700 relative overflow-hidden ${
      user.preferences.theme === 'dark' 
        ? 'bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900' 
        : 'bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100'
    }`}>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-float ${
          user.preferences.theme === 'dark' 
            ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20' 
            : 'bg-gradient-to-br from-sage-200/40 to-sage-300/40'
        }`}></div>
        <div className={`absolute top-40 right-20 w-24 h-24 rounded-full blur-2xl animate-float ${
          user.preferences.theme === 'dark' 
            ? 'bg-gradient-to-br from-stone-500/20 to-amber-600/20' 
            : 'bg-gradient-to-br from-cream-200/40 to-cream-300/40'
        }`} style={{animationDelay: '2s'}}></div>
        <div className={`absolute bottom-32 left-1/4 w-20 h-20 rounded-full blur-2xl animate-float ${
          user.preferences.theme === 'dark' 
            ? 'bg-gradient-to-br from-orange-500/20 to-red-600/20' 
            : 'bg-gradient-to-br from-sage-300/40 to-sage-400/40'
        }`} style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-3 sm:mb-4 ${
            user.preferences.theme === 'dark' 
              ? 'text-amber-200' 
              : 'text-sage-800'
          }`}>
            {greeting}, {user.name}
          </h1>
          <p className={`text-lg sm:text-xl mb-4 sm:mb-6 font-medium ${
            user.preferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-700'
          }`}>
            {today}
          </p>
          
          {/* Streak Display with Sparkle Icon on Left */}
          <div className="flex justify-center">
            <div className={`inline-flex items-center space-x-3 rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-lg border backdrop-blur-xl animate-breathe ${
              user.preferences.theme === 'dark' 
                ? 'bg-stone-800/80 border-stone-700 shadow-amber-500/20' 
                : 'bg-white/80 border-sage-200 shadow-sage-500/20'
            }`}>
              <Sparkles className={`w-5 h-5 sm:w-6 sm:h-6 animate-pulse ${
                user.preferences.theme === 'dark' ? 'text-amber-400' : 'text-sage-600'
              }`} />
              <span className={`text-lg sm:text-xl font-bold ${
                user.preferences.theme === 'dark' ? 'text-amber-300' : 'text-sage-700'
              }`}>
                {user.streak} day{user.streak !== 1 ? 's' : ''} streak
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Success Message */}
        {showSuccess && (
          <div className="mb-6 sm:mb-8 animate-scale-in">
            <div className={`border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 shadow-xl backdrop-blur-xl ${
              user.preferences.theme === 'dark' 
                ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-600/50 shadow-green-500/20' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-green-500/20'
            }`}>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center animate-bounce-gentle ${
                user.preferences.theme === 'dark' ? 'bg-green-600' : 'bg-green-500'
              }`}>
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className={`font-bold text-base sm:text-lg ${
                  user.preferences.theme === 'dark' ? 'text-green-300' : 'text-green-800'
                }`}>
                  Entry saved successfully
                </p>
                <p className={`text-sm ${
                  user.preferences.theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}>
                  {format(new Date(), 'EEEE, MMM do')} • Streak: {user.streak} days
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Today's Entry Status */}
        {todaysEntry && !isWriting && (
          <div className="mb-6 sm:mb-8 animate-slide-up">
            <div className={`rounded-2xl sm:rounded-3xl shadow-2xl border-2 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden ${
              user.preferences.theme === 'dark' 
                ? 'bg-stone-800/80 border-stone-700/50 shadow-amber-500/10' 
                : 'bg-white/90 border-sage-200/50 shadow-sage-500/10'
            }`}>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-pulse-gentle ${
                      user.preferences.theme === 'dark' 
                        ? 'bg-gradient-to-br from-amber-600 to-amber-700' 
                        : 'bg-gradient-to-br from-sage-500 to-sage-600'
                    }`}>
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-xl sm:text-2xl font-bold ${
                        user.preferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                      }`}>
                        Today's Reflection Complete
                      </h2>
                      <p className={`text-base sm:text-lg ${
                        user.preferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-600'
                      }`}>
                        Keep your streak going strong!
                      </p>
                    </div>
                  </div>
                  
                  {moodDisplay && (
                    <div className="text-center animate-float self-center sm:self-auto">
                      <div className="text-3xl sm:text-4xl mb-2 filter drop-shadow-lg">{moodDisplay.emoji}</div>
                      <p className={`text-xs sm:text-sm font-bold ${
                        user.preferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-700'
                      }`}>
                        {moodDisplay.label}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 ${
                  user.preferences.theme === 'dark' 
                    ? 'bg-stone-900/50 border-stone-700/50' 
                    : 'bg-sage-50/50 border-sage-200/50'
                }`}>
                  <p className={`leading-relaxed line-clamp-4 ${getFontClass()}`}
                     style={{ 
                       color: getInkColor(),
                       fontSize: getFontSize()
                     }}>
                    {todaysEntry.content}
                  </p>
                </div>
                
                <button
                  onClick={() => setIsWriting(true)}
                  className={`font-bold transition-all duration-300 hover:scale-105 ${
                    user.preferences.theme === 'dark' 
                      ? 'text-amber-400 hover:text-amber-300' 
                      : 'text-sage-600 hover:text-sage-800'
                  }`}
                >
                  Edit today's entry →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Writing Interface */}
        {(!todaysEntry || isWriting) && (
          <div className="space-y-6 sm:space-y-8 animate-slide-up">
            {/* Enhanced Writing Prompt */}
            <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 backdrop-blur-xl relative overflow-hidden ${
              user.preferences.theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-900/40 to-amber-900/40 border-purple-700/50' 
                : 'bg-gradient-to-r from-sage-100/80 to-cream-100/80 border-sage-300'
            }`}>
              <div>
                <h3 className={`font-bold text-lg sm:text-xl mb-2 sm:mb-3 ${
                  user.preferences.theme === 'dark' ? 'text-purple-200' : 'text-sage-800'
                }`}>
                  Today's Reflection
                </h3>
                <p className={`text-base sm:text-lg leading-relaxed ${
                  user.preferences.theme === 'dark' ? 'text-purple-300' : 'text-sage-700'
                }`}>
                  {dailyPrompt}
                </p>
              </div>
            </div>

            {/* Enhanced Writing Area */}
            <div className={`rounded-2xl sm:rounded-3xl shadow-2xl border-2 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden ${
              user.preferences.theme === 'dark' 
                ? 'bg-stone-800/80 border-stone-700/50 shadow-amber-500/10' 
                : 'bg-white/90 border-sage-200/50 shadow-sage-500/10'
            }`}>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-breathe ${
                      user.preferences.theme === 'dark' 
                        ? 'bg-gradient-to-br from-amber-600 to-amber-700' 
                        : 'bg-gradient-to-br from-sage-500 to-sage-600'
                    }`}>
                      <Feather className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-xl sm:text-2xl font-bold ${
                        user.preferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                      }`}>
                        Your Writing Space
                      </h2>
                    </div>
                  </div>
                  
                  <div className="text-left sm:text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        isTyping 
                          ? user.preferences.theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                          : user.preferences.theme === 'dark' ? 'bg-stone-500' : 'bg-gray-400'
                      }`}></div>
                      <p className={`text-sm font-medium ${
                        user.preferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-500'
                      }`}>
                        {wordCount} words
                      </p>
                    </div>
                    {todaysEntry && (
                      <p className={`text-xs ${
                        user.preferences.theme === 'dark' ? 'text-stone-500' : 'text-sage-400'
                      }`}>
                        Last updated {format(new Date(todaysEntry.updatedAt), 'h:mm a')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind today?"
                    className={`w-full h-64 sm:h-80 lg:h-96 p-4 sm:p-6 lg:p-8 border-2 rounded-2xl sm:rounded-3xl resize-none focus:ring-4 focus:border-transparent transition-all duration-300 leading-relaxed backdrop-blur-sm ${getFontClass()} ${
                      user.preferences.theme === 'dark' 
                        ? 'bg-stone-900/70 border-stone-600 text-stone-100 placeholder-stone-500 focus:ring-amber-500/50 focus:bg-stone-900/90' 
                        : 'bg-white/80 border-sage-200 placeholder-sage-400 focus:ring-sage-400/50 focus:bg-white/95'
                    }`}
                    style={{ 
                      fontSize: getFontSize(),
                      lineHeight: '1.8',
                      color: getInkColor()
                    }}
                  />
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className={`absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center space-x-2 px-3 py-1 rounded-full ${
                      user.preferences.theme === 'dark' ? 'bg-stone-700/80' : 'bg-sage-100/80'
                    }`}>
                      <div className="flex space-x-1">
                        <div className={`w-1 h-1 rounded-full animate-bounce ${
                          user.preferences.theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                        }`}></div>
                        <div className={`w-1 h-1 rounded-full animate-bounce ${
                          user.preferences.theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                        }`} style={{animationDelay: '0.1s'}}></div>
                        <div className={`w-1 h-1 rounded-full animate-bounce ${
                          user.preferences.theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                        }`} style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className={`text-xs ${
                        user.preferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-600'
                      }`}>
                        Writing...
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 sm:mt-8 space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-3 text-sm">
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 animate-pulse-gentle ${
                      user.preferences.theme === 'dark' ? 'text-pink-400' : 'text-sage-500'
                    }`} />
                    <span className={`font-medium ${
                      user.preferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-500'
                    }`}>
                      {content.length > 0 ? 'Your thoughts are precious. Keep flowing...' : 'Take a deep breath and begin when ready'}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    {isWriting && (
                      <button
                        onClick={() => {
                          setIsWriting(false);
                          setContent(todaysEntry?.content || '');
                        }}
                        className={`px-4 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 hover:scale-105 ${
                          user.preferences.theme === 'dark' 
                            ? 'text-stone-300 hover:text-amber-50' 
                            : 'text-sage-600 hover:text-sage-800'
                        }`}
                      >
                        Cancel
                      </button>
                    )}
                    
                    <button
                      onClick={handleSave}
                      disabled={!content.trim() || isSaving}
                      className={`px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg focus:ring-4 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl transform hover:scale-105 active:scale-95 relative overflow-hidden w-full sm:w-auto ${
                        user.preferences.theme === 'dark' 
                          ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 focus:ring-amber-500/50 shadow-amber-500/30' 
                          : 'bg-gradient-to-r from-sage-500 to-sage-600 text-white hover:from-sage-600 hover:to-sage-700 focus:ring-sage-500/50 shadow-sage-500/30'
                      }`}
                    >
                      {isSaving ? (
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Saving your thoughts...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Save Entry</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export { HomePage };