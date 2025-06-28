import React, { useMemo, useState } from 'react';
import { format, subDays, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Calendar, BarChart3, Sparkles } from 'lucide-react';
import { JournalEntry, MoodType, User } from '../../types';
import { moodOptions } from '../../data/moodOptions';

interface MoodAnalyticsProps {
  entries: JournalEntry[];
  user: User;
}

const getMoodScore = (mood: MoodType): number => {
  const scores: Record<MoodType, number> = {
    frustrated: 1,
    anxious: 2,
    melancholy: 3,
    neutral: 4,
    peaceful: 5,
    content: 6,
    joyful: 7,
    excited: 8
  };
  return scores[mood] || 4;
};

export function MoodAnalytics({ entries, user }: MoodAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  const userPreferences = user?.preferences || {
    theme: 'light',
    fontFamily: 'inter',
    inkColor: 'sage',
    fontSize: 'medium',
    notifications: false,
  };

  const moodData = useMemo(() => {
    const moodCounts: Record<MoodType, number> = {
      joyful: 0,
      excited: 0,
      content: 0,
      peaceful: 0,
      neutral: 0,
      melancholy: 0,
      anxious: 0,
      frustrated: 0
    };

    entries.forEach(entry => {
      moodCounts[entry.mood]++;
    });

    return moodOptions.map(option => ({
      name: option.label,
      value: moodCounts[option.type],
      color: option.color,
      emoji: option.emoji
    })).filter(item => item.value > 0);
  }, [entries]);

  const timeSeriesData = useMemo(() => {
    let dateRange: string[];
    
    if (timeRange === 'week') {
      // Last 7 days (existing logic)
      dateRange = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), i);
        return format(date, 'yyyy-MM-dd');
      }).reverse();
    } else {
      // Current month: from 1st day to last day of current month
      const now = new Date();
      const monthStart = startOfMonth(now);
      const monthEnd = endOfMonth(now);
      
      // Get all days in the current month
      const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
      dateRange = daysInMonth.map(date => format(date, 'yyyy-MM-dd'));
    }

    return dateRange.map((date, index) => {
      const entry = entries.find(e => e.date === date);
      const moodScore = entry ? getMoodScore(entry.mood) : null;
      
      // For month view, show every 3rd day to avoid crowding, but ensure first and last days are shown
      let shouldShowLabel = true;
      if (timeRange === 'month') {
        const isFirstDay = index === 0;
        const isLastDay = index === dateRange.length - 1;
        const isMultipleOfThree = (index + 1) % 3 === 0;
        shouldShowLabel = isFirstDay || isLastDay || isMultipleOfThree;
      }
      
      return {
        date: shouldShowLabel 
          ? format(parseISO(date), timeRange === 'week' ? 'EEE' : 'd')
          : '', // Empty string for dates we don't want to show labels for
        fullDate: date,
        mood: moodScore,
        hasEntry: !!entry,
        moodType: entry?.mood,
        emoji: entry ? moodOptions.find(opt => opt.type === entry.mood)?.emoji : null,
        dayNumber: format(parseISO(date), 'd') // Always keep the day number for tooltip
      };
    });
  }, [entries, timeRange]);

  const stats = {
    totalEntries: entries.length,
    averageMood: entries.length > 0 
      ? (entries.reduce((sum, entry) => sum + getMoodScore(entry.mood), 0) / entries.length).toFixed(1)
      : '0',
    mostCommonMood: moodData.length > 0 
      ? moodData.reduce((a, b) => a.value > b.value ? a : b)
      : null,
    entriesThisWeek: entries.filter(entry => {
      const entryDate = parseISO(entry.date);
      const weekAgo = subDays(new Date(), 7);
      return entryDate >= weekAgo;
    }).length
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom dot component to render emojis
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (!payload.hasEntry || !payload.emoji) return null;
    
    return (
      <g>
        <circle 
          cx={cx} 
          cy={cy} 
          r={12} 
          fill="white" 
          stroke={userPreferences.theme === 'dark' ? '#f97316' : '#5c7a5c'} 
          strokeWidth={2} 
        />
        <text 
          x={cx} 
          y={cy + 1} 
          textAnchor="middle" 
          dominantBaseline="central" 
          fontSize="14"
        >
          {payload.emoji}
        </text>
      </g>
    );
  };

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

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center animate-fade-in px-2">
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-display font-semibold mb-2 sm:mb-3 ${
            userPreferences.theme === 'dark' ? 'text-amber-200' : 'text-sage-800'
          }`}>
            Your Emotional Insights
          </h1>
          <p className={`text-base sm:text-lg ${
            userPreferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-600'
          }`}>
            Patterns and growth in your mindful journey
          </p>
        </div>

        {/* Stats Cards - Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white animate-slide-up shadow-lg backdrop-blur-xl ${
            userPreferences.theme === 'dark'
              ? 'bg-gradient-to-br from-amber-600 to-amber-700 shadow-amber-500/20'
              : 'bg-gradient-to-br from-sage-400 to-sage-600 shadow-sage-500/20'
          }`}>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
              <span className="text-2xl sm:text-3xl font-bold">{stats.totalEntries}</span>
            </div>
            <h3 className="font-semibold text-base sm:text-lg">Total Entries</h3>
          </div>

          <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white animate-slide-up shadow-lg backdrop-blur-xl ${
            userPreferences.theme === 'dark'
              ? 'bg-gradient-to-br from-stone-600 to-stone-700 shadow-stone-500/20'
              : 'bg-gradient-to-br from-cream-400 to-cream-600 shadow-cream-500/20'
          }`} style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
              <span className="text-2xl sm:text-3xl font-bold">{stats.averageMood}/8</span>
            </div>
            <h3 className="font-semibold text-base sm:text-lg">Average Mood</h3>
          </div>

          <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white animate-slide-up shadow-lg backdrop-blur-xl sm:col-span-2 lg:col-span-1 ${
            userPreferences.theme === 'dark'
              ? 'bg-gradient-to-br from-orange-600 to-red-700 shadow-orange-500/20'
              : 'bg-gradient-to-br from-stone-400 to-stone-600 shadow-stone-500/20'
          }`} style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
              <span className="text-2xl sm:text-3xl">
                {stats.mostCommonMood?.emoji || '😐'}
              </span>
            </div>
            <h3 className="font-semibold text-base sm:text-lg">Most Common</h3>
            <p className={`text-xs sm:text-sm opacity-80 ${
              userPreferences.theme === 'dark' ? 'text-orange-100' : 'text-stone-100'
            }`}>
              {stats.mostCommonMood?.name || 'N/A'}
            </p>
          </div>
        </div>

        {/* Charts Section - Mobile: Stack vertically, Desktop: Side by side */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Mood Trends Chart */}
          <div className={`rounded-2xl sm:rounded-3xl shadow-xl border-2 p-4 sm:p-6 lg:p-8 animate-slide-up backdrop-blur-xl ${
            userPreferences.theme === 'dark'
              ? 'bg-stone-800/80 border-stone-700/50 shadow-amber-500/10'
              : 'bg-white/80 border-white/50 shadow-sage-500/10'
          }`} style={{animationDelay: '0.3s'}}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <h2 className={`text-xl sm:text-2xl font-semibold ${
                userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
              }`}>
                Mood Trends
              </h2>
              <div className={`flex rounded-lg sm:rounded-xl p-1 w-full sm:w-auto ${
                userPreferences.theme === 'dark' ? 'bg-stone-700' : 'bg-sage-100'
              }`}>
                <button
                  onClick={() => setTimeRange('week')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md sm:rounded-lg text-sm font-medium transition-all ${
                    timeRange === 'week'
                      ? userPreferences.theme === 'dark'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white text-sage-800 shadow-sm'
                      : userPreferences.theme === 'dark'
                        ? 'text-stone-300 hover:text-amber-50'
                        : 'text-sage-600 hover:text-sage-800'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md sm:rounded-lg text-sm font-medium transition-all ${
                    timeRange === 'month'
                      ? userPreferences.theme === 'dark'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white text-sage-800 shadow-sm'
                      : userPreferences.theme === 'dark'
                        ? 'text-stone-300 hover:text-amber-50'
                        : 'text-sage-600 hover:text-sage-800'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>
            
            {timeSeriesData.some(d => d.mood !== null) ? (
              <div className="h-64 sm:h-80 lg:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={userPreferences.theme === 'dark' ? '#78716c' : '#e2e8f0'} 
                    />
                    <XAxis 
                      dataKey="date" 
                      tick={{ 
                        fontSize: 10, 
                        fill: userPreferences.theme === 'dark' ? '#d6d3d1' : '#64748b' 
                      }}
                      axisLine={{ 
                        stroke: userPreferences.theme === 'dark' ? '#78716c' : '#cbd5e1' 
                      }}
                      interval={0} // Show all ticks (but we control which ones have labels)
                      tickLine={{ 
                        stroke: userPreferences.theme === 'dark' ? '#78716c' : '#cbd5e1' 
                      }}
                    />
                    <YAxis 
                      domain={[1, 8]}
                      tick={{ 
                        fontSize: 10, 
                        fill: userPreferences.theme === 'dark' ? '#d6d3d1' : '#64748b' 
                      }}
                      axisLine={{ 
                        stroke: userPreferences.theme === 'dark' ? '#78716c' : '#cbd5e1' 
                      }}
                      tickFormatter={(value) => {
                        const moodLabels = ['', 'Low', '', '', 'Neutral', '', '', 'High', ''];
                        return moodLabels[value] || '';
                      }}
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload[0]) {
                          const data = payload[0].payload;
                          if (data.hasEntry) {
                            return (
                              <div className={`p-3 sm:p-4 rounded-xl shadow-lg border backdrop-blur-sm ${
                                userPreferences.theme === 'dark'
                                  ? 'bg-stone-800/95 border-amber-500/30'
                                  : 'bg-white/95 border-sage-200'
                              }`}>
                                <p className={`font-medium text-sm ${
                                  userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                                }`}>
                                  {timeRange === 'month' 
                                    ? `${format(new Date(), 'MMMM')} ${data.dayNumber}` 
                                    : label
                                  }
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-lg">{data.emoji}</span>
                                  <span className={`text-sm ${
                                    userPreferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-600'
                                  }`}>
                                    {moodOptions.find(opt => opt.type === data.moodType)?.label}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke={userPreferences.theme === 'dark' ? '#f97316' : '#5c7a5c'} 
                      strokeWidth={3}
                      dot={<CustomDot />}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className={`flex items-center justify-center h-64 ${
                userPreferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-500'
              }`}>
                <div className="text-center">
                  <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm sm:text-base">Start journaling to see your mood trends</p>
                </div>
              </div>
            )}
          </div>

          {/* Mood Distribution Chart */}
          <div className={`rounded-2xl sm:rounded-3xl shadow-xl border-2 p-4 sm:p-6 lg:p-8 animate-slide-up backdrop-blur-xl ${
            userPreferences.theme === 'dark'
              ? 'bg-stone-800/80 border-stone-700/50 shadow-amber-500/10'
              : 'bg-white/80 border-white/50 shadow-sage-500/10'
          }`} style={{animationDelay: '0.4s'}}>
            <h2 className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${
              userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
            }`}>
              Mood Distribution
            </h2>
            
            {moodData.length > 0 ? (
              <div className="h-64 sm:h-80 lg:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius="70%"
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {moodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend 
                      content={({ payload }) => (
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 px-2">
                          {payload?.map((entry, index) => (
                            <div key={index} className="flex items-center space-x-1 sm:space-x-2">
                              <div 
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className={`text-xs sm:text-sm ${
                                userPreferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-700'
                              }`}>
                                {moodData[index]?.emoji} {entry.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className={`p-3 sm:p-4 rounded-xl shadow-lg border backdrop-blur-sm ${
                              userPreferences.theme === 'dark'
                                ? 'bg-stone-800/95 border-amber-500/30'
                                : 'bg-white/95 border-sage-200'
                            }`}>
                              <p className={`font-medium text-sm ${
                                userPreferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                              }`}>
                                {data.emoji} {data.name}
                              </p>
                              <p className={`text-sm ${
                                userPreferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-600'
                              }`}>
                                {data.value} entries ({((data.value / entries.length) * 100).toFixed(1)}%)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className={`flex items-center justify-center h-64 ${
                userPreferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-500'
              }`}>
                <div className="text-center">
                  <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm sm:text-base">No mood data available yet</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}