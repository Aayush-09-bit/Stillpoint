import { JournalEntry, MoodType } from '../types';

export interface SentimentInsight {
  type: 'pattern' | 'trend' | 'concern' | 'strength';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  suggestion?: string;
}

export interface EmotionalPattern {
  dominantMood: MoodType;
  frequency: number;
  trend: 'improving' | 'declining' | 'stable';
  consistency: number;
  triggers?: string[];
}

// Analyze emotional patterns over time
export function analyzeEmotionalPatterns(entries: JournalEntry[]): EmotionalPattern[] {
  if (entries.length < 3) return [];

  const patterns: EmotionalPattern[] = [];
  const recentEntries = entries.slice(-14); // Last 2 weeks
  const olderEntries = entries.slice(-28, -14); // Previous 2 weeks

  // Analyze mood frequency
  const moodCounts = recentEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);

  const olderMoodCounts = olderEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);

  // Find dominant moods
  const sortedMoods = Object.entries(moodCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  sortedMoods.forEach(([mood, frequency]) => {
    const moodType = mood as MoodType;
    const recentFreq = frequency / recentEntries.length;
    const olderFreq = (olderMoodCounts[moodType] || 0) / Math.max(olderEntries.length, 1);
    
    let trend: 'improving' | 'declining' | 'stable';
    if (recentFreq > olderFreq + 0.1) {
      trend = ['joyful', 'excited', 'content', 'peaceful'].includes(moodType) ? 'improving' : 'declining';
    } else if (recentFreq < olderFreq - 0.1) {
      trend = ['joyful', 'excited', 'content', 'peaceful'].includes(moodType) ? 'declining' : 'improving';
    } else {
      trend = 'stable';
    }

    // Calculate consistency (how regularly this mood appears)
    const consistency = calculateMoodConsistency(recentEntries, moodType);

    // Extract potential triggers from keywords
    const triggers = extractMoodTriggers(recentEntries.filter(e => e.mood === moodType));

    patterns.push({
      dominantMood: moodType,
      frequency: recentFreq,
      trend,
      consistency,
      triggers
    });
  });

  return patterns;
}

// Generate insights based on sentiment analysis and patterns
export function generateSentimentInsights(entries: JournalEntry[]): SentimentInsight[] {
  const insights: SentimentInsight[] = [];
  
  if (entries.length < 5) {
    insights.push({
      type: 'pattern',
      title: 'Building Your Emotional Awareness',
      description: 'You\'re just starting your mindful journey. Keep writing to discover your emotional patterns.',
      confidence: 0.8,
      actionable: true,
      suggestion: 'Try to journal daily for at least a week to establish baseline patterns.'
    });
    return insights;
  }

  const recentEntries = entries.slice(-10);
  const patterns = analyzeEmotionalPatterns(entries);

  // Analyze sentiment trends
  const sentimentTrend = analyzeSentimentTrend(recentEntries);
  if (sentimentTrend.significance > 0.6) {
    insights.push({
      type: sentimentTrend.direction === 'positive' ? 'strength' : 'concern',
      title: `${sentimentTrend.direction === 'positive' ? 'Positive' : 'Concerning'} Emotional Trend`,
      description: `Your recent entries show a ${sentimentTrend.direction} emotional trend with ${(sentimentTrend.significance * 100).toFixed(0)}% consistency.`,
      confidence: sentimentTrend.significance,
      actionable: true,
      suggestion: sentimentTrend.direction === 'positive' 
        ? 'Consider what factors are contributing to this positive trend and how to maintain them.'
        : 'This pattern suggests you might benefit from additional emotional support or stress management techniques.'
    });
  }

  // Analyze mood consistency
  patterns.forEach(pattern => {
    if (pattern.frequency > 0.4 && pattern.consistency > 0.7) {
      const isPositiveMood = ['joyful', 'excited', 'content', 'peaceful'].includes(pattern.dominantMood);
      insights.push({
        type: isPositiveMood ? 'strength' : 'concern',
        title: `Consistent ${pattern.dominantMood.charAt(0).toUpperCase() + pattern.dominantMood.slice(1)} Pattern`,
        description: `You've been experiencing ${pattern.dominantMood} feelings in ${(pattern.frequency * 100).toFixed(0)}% of recent entries with high consistency.`,
        confidence: pattern.consistency,
        actionable: true,
        suggestion: isPositiveMood 
          ? `Your consistent ${pattern.dominantMood} state is a strength. Consider what maintains this positive pattern.`
          : `This consistent pattern might indicate an area needing attention. Consider exploring what triggers these feelings.`
      });
    }
  });

  // Analyze emotional volatility
  const volatility = calculateEmotionalVolatility(recentEntries);
  if (volatility > 0.7) {
    insights.push({
      type: 'concern',
      title: 'High Emotional Variability',
      description: 'Your recent entries show significant emotional ups and downs, which might indicate stress or major life changes.',
      confidence: volatility,
      actionable: true,
      suggestion: 'Consider incorporating grounding techniques or speaking with a counselor about managing emotional fluctuations.'
    });
  } else if (volatility < 0.3) {
    insights.push({
      type: 'pattern',
      title: 'Emotional Stability',
      description: 'Your emotions have been relatively stable recently, showing good emotional regulation.',
      confidence: 1 - volatility,
      actionable: false
    });
  }

  // Analyze keyword patterns for deeper insights
  const keywordInsights = analyzeKeywordPatterns(recentEntries);
  insights.push(...keywordInsights);

  // Check for concerning patterns
  const concerningPatterns = detectConcerningPatterns(recentEntries);
  insights.push(...concerningPatterns);

  return insights.sort((a, b) => b.confidence - a.confidence).slice(0, 6);
}

// Helper functions
function calculateMoodConsistency(entries: JournalEntry[], mood: MoodType): number {
  const moodEntries = entries.filter(e => e.mood === mood);
  if (moodEntries.length < 2) return 0;

  // Calculate how evenly distributed the mood is across the time period
  const dates = moodEntries.map(e => new Date(e.date).getTime());
  const timeSpan = Math.max(...dates) - Math.min(...dates);
  const expectedInterval = timeSpan / (moodEntries.length - 1);
  
  let consistencyScore = 0;
  for (let i = 1; i < dates.length; i++) {
    const actualInterval = dates[i] - dates[i-1];
    const deviation = Math.abs(actualInterval - expectedInterval) / expectedInterval;
    consistencyScore += Math.max(0, 1 - deviation);
  }

  return consistencyScore / (dates.length - 1);
}

function extractMoodTriggers(entries: JournalEntry[]): string[] {
  const allKeywords = entries.flatMap(e => e.keywords);
  const keywordCounts = allKeywords.reduce((acc, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(keywordCounts)
    .filter(([, count]) => count >= 2)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([keyword]) => keyword);
}

function analyzeSentimentTrend(entries: JournalEntry[]): { direction: 'positive' | 'negative' | 'neutral', significance: number } {
  if (entries.length < 3) return { direction: 'neutral', significance: 0 };

  const scores = entries.map(e => e.sentimentScore);
  const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
  const secondHalf = scores.slice(Math.floor(scores.length / 2));

  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

  const difference = secondAvg - firstAvg;
  const significance = Math.abs(difference) / Math.max(Math.abs(firstAvg), Math.abs(secondAvg), 0.1);

  return {
    direction: difference > 0.1 ? 'positive' : difference < -0.1 ? 'negative' : 'neutral',
    significance: Math.min(significance, 1)
  };
}

function calculateEmotionalVolatility(entries: JournalEntry[]): number {
  if (entries.length < 3) return 0;

  const scores = entries.map(e => e.sentimentScore);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) / scores.length;
  
  return Math.min(Math.sqrt(variance), 1);
}

function analyzeKeywordPatterns(entries: JournalEntry[]): SentimentInsight[] {
  const insights: SentimentInsight[] = [];
  const allKeywords = entries.flatMap(e => e.keywords);
  const keywordCounts = allKeywords.reduce((acc, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const frequentKeywords = Object.entries(keywordCounts)
    .filter(([, count]) => count >= 3)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  frequentKeywords.forEach(([keyword, count]) => {
    const keywordEntries = entries.filter(e => e.keywords.includes(keyword));
    const avgSentiment = keywordEntries.reduce((acc, e) => acc + e.sentimentScore, 0) / keywordEntries.length;
    
    if (Math.abs(avgSentiment) > 0.3) {
      insights.push({
        type: 'pattern',
        title: `"${keyword}" Pattern Detected`,
        description: `The theme "${keyword}" appears frequently in your entries and is associated with ${avgSentiment > 0 ? 'positive' : 'negative'} emotions.`,
        confidence: Math.min(count / entries.length * 2, 0.9),
        actionable: true,
        suggestion: avgSentiment > 0 
          ? `"${keyword}" seems to be a positive influence in your life. Consider how to cultivate more of this.`
          : `"${keyword}" appears to be challenging for you. Consider strategies to address or reframe this area.`
      });
    }
  });

  return insights;
}

function detectConcerningPatterns(entries: JournalEntry[]): SentimentInsight[] {
  const insights: SentimentInsight[] = [];
  
  // Check for consistent negative sentiment
  const negativeEntries = entries.filter(e => e.sentiment === 'negative');
  if (negativeEntries.length >= entries.length * 0.7) {
    insights.push({
      type: 'concern',
      title: 'Persistent Negative Emotions',
      description: `${Math.round(negativeEntries.length / entries.length * 100)}% of your recent entries reflect negative emotions.`,
      confidence: 0.9,
      actionable: true,
      suggestion: 'Consider reaching out to a mental health professional or trusted friend for support.'
    });
  }

  // Check for anxiety/stress patterns
  const anxiousEntries = entries.filter(e => ['anxious', 'frustrated'].includes(e.mood));
  if (anxiousEntries.length >= entries.length * 0.6) {
    insights.push({
      type: 'concern',
      title: 'High Stress/Anxiety Pattern',
      description: 'Your recent entries frequently mention stress, anxiety, or frustration.',
      confidence: 0.8,
      actionable: true,
      suggestion: 'Consider stress management techniques like deep breathing, meditation, or regular exercise.'
    });
  }

  // Check for isolation keywords
  const isolationKeywords = ['alone', 'lonely', 'isolated', 'disconnected', 'empty'];
  const isolationCount = entries.reduce((count, entry) => {
    return count + entry.keywords.filter(k => isolationKeywords.includes(k)).length;
  }, 0);

  if (isolationCount >= 3) {
    insights.push({
      type: 'concern',
      title: 'Social Connection Concerns',
      description: 'Your entries frequently mention feelings of loneliness or isolation.',
      confidence: 0.7,
      actionable: true,
      suggestion: 'Consider reaching out to friends, family, or joining social activities to build connections.'
    });
  }

  return insights;
}