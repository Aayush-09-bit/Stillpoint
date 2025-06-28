import { JournalEntry, User, MoodType } from '../types';

export interface MindfulSuggestion {
  type: 'mood-boost' | 'stress-relief' | 'reflection' | 'growth';
  title: string;
  description: string;
  duration: string;
  reason: string;
  relevanceScore: number;
  keywords?: string[];
}

// Enhanced mood-specific suggestions with content analysis
const enhancedMoodSuggestions = {
  joyful: {
    base: [
      {
        type: 'growth' as const,
        title: 'Amplify Your Joy',
        description: 'Write about what brought you joy today and how you can create more of these moments.',
        duration: '10-15 minutes',
        reason: 'Channel positive energy into intentional joy creation',
        keywords: ['celebration', 'success', 'achievement', 'love', 'happiness']
      },
      {
        type: 'reflection' as const,
        title: 'Gratitude Expansion',
        description: 'List 10 things you\'re grateful for, from the tiniest details to life\'s biggest gifts.',
        duration: '10 minutes',
        reason: 'Deepen appreciation and extend positive feelings',
        keywords: ['grateful', 'thankful', 'blessed', 'appreciate']
      },
      {
        type: 'growth' as const,
        title: 'Share Your Light',
        description: 'Think of someone who could use encouragement and send them a kind message.',
        duration: '5-10 minutes',
        reason: 'Spread joy and strengthen connections',
        keywords: ['friend', 'family', 'connection', 'love', 'support']
      }
    ],
    contextual: {
      'work': {
        type: 'growth' as const,
        title: 'Career Momentum Building',
        description: 'Use this positive work energy to plan your next professional goal or skill development.',
        duration: '15-20 minutes',
        reason: 'Leverage work satisfaction for career growth'
      },
      'relationship': {
        type: 'reflection' as const,
        title: 'Love Appreciation Ritual',
        description: 'Write a heartfelt note about what you love about your relationships and share it.',
        duration: '10-15 minutes',
        reason: 'Strengthen bonds during positive emotional states'
      },
      'achievement': {
        type: 'growth' as const,
        title: 'Success Pattern Analysis',
        description: 'Analyze what led to this achievement and create a blueprint for future success.',
        duration: '20 minutes',
        reason: 'Learn from success to replicate positive outcomes'
      }
    }
  },

  excited: [
    {
      type: 'growth' as const,
      title: 'Channel Your Energy',
      description: 'Use this excitement to plan or work on something meaningful to you.',
      duration: '15-30 minutes',
      reason: 'Transform excitement into productive action',
      keywords: ['energy', 'motivation', 'goal', 'plan', 'action']
    },
    {
      type: 'reflection' as const,
      title: 'Future Visioning',
      description: 'Visualize your goals and dreams with this positive energy as fuel.',
      duration: '10-15 minutes',
      reason: 'Harness enthusiasm for goal setting',
      keywords: ['future', 'dream', 'vision', 'goal', 'possibility']
    },
    {
      type: 'mood-boost' as const,
      title: 'Celebration Dance',
      description: 'Put on your favorite music and move your body to celebrate this feeling.',
      duration: '5-10 minutes',
      reason: 'Express and embody your excitement',
      keywords: ['music', 'movement', 'celebration', 'energy', 'dance']
    }
  ],

  content: [
    {
      type: 'reflection' as const,
      title: 'Peaceful Presence',
      description: 'Sit quietly and simply appreciate this moment of contentment.',
      duration: '10-15 minutes',
      reason: 'Savor and deepen feelings of peace',
      keywords: ['peace', 'calm', 'content', 'satisfied', 'balanced']
    },
    {
      type: 'growth' as const,
      title: 'Gentle Goal Setting',
      description: 'From this calm space, consider what small steps you\'d like to take forward.',
      duration: '15 minutes',
      reason: 'Use contentment as foundation for growth',
      keywords: ['goal', 'progress', 'growth', 'improvement']
    },
    {
      type: 'reflection' as const,
      title: 'Life Appreciation',
      description: 'Reflect on the journey that brought you to this peaceful moment.',
      duration: '10 minutes',
      reason: 'Acknowledge your path and progress',
      keywords: ['journey', 'path', 'progress', 'appreciation']
    }
  ],

  peaceful: [
    {
      type: 'reflection' as const,
      title: 'Mindful Meditation',
      description: 'Extend this peace with 15 minutes of silent meditation or gentle breathing.',
      duration: '15-20 minutes',
      reason: 'Deepen and sustain peaceful feelings',
      keywords: ['meditation', 'breath', 'stillness', 'quiet', 'calm']
    },
    {
      type: 'growth' as const,
      title: 'Wisdom Reflection',
      description: 'Consider what this peace is teaching you about yourself and life.',
      duration: '10-15 minutes',
      reason: 'Extract insights from peaceful states',
      keywords: ['wisdom', 'insight', 'understanding', 'clarity']
    },
    {
      type: 'stress-relief' as const,
      title: 'Body Blessing',
      description: 'Do a loving body scan, sending gratitude to each part of yourself.',
      duration: '15 minutes',
      reason: 'Extend peace throughout your being',
      keywords: ['body', 'gratitude', 'self-love', 'appreciation']
    }
  ],

  neutral: [
    {
      type: 'reflection' as const,
      title: 'Gentle Check-In',
      description: 'Explore what "neutral" feels like in your body and what it might need.',
      duration: '10 minutes',
      reason: 'Understand and honor neutral states',
      keywords: ['feeling', 'body', 'need', 'awareness']
    },
    {
      type: 'mood-boost' as const,
      title: 'Curiosity Practice',
      description: 'Find one thing around you to observe with fresh eyes and wonder.',
      duration: '5-10 minutes',
      reason: 'Spark interest and engagement',
      keywords: ['curiosity', 'wonder', 'explore', 'discover']
    },
    {
      type: 'growth' as const,
      title: 'Small Step Forward',
      description: 'Choose one tiny action that would make you feel slightly more alive.',
      duration: '5-15 minutes',
      reason: 'Gently move from neutral toward positive',
      keywords: ['action', 'step', 'movement', 'progress']
    }
  ],

  melancholy: [
    {
      type: 'stress-relief' as const,
      title: 'Gentle Self-Compassion',
      description: 'Place your hand on your heart and speak to yourself as you would a dear friend.',
      duration: '10 minutes',
      reason: 'Offer yourself comfort during difficult feelings',
      keywords: ['sad', 'down', 'heavy', 'lonely', 'empty']
    },
    {
      type: 'reflection' as const,
      title: 'Honoring Sadness',
      description: 'Allow yourself to feel this emotion fully without trying to fix or change it.',
      duration: '15 minutes',
      reason: 'Validate and process difficult emotions',
      keywords: ['sadness', 'grief', 'loss', 'missing', 'hurt']
    },
    {
      type: 'mood-boost' as const,
      title: 'Tiny Comfort Ritual',
      description: 'Make yourself a warm drink, wrap in a soft blanket, or do something nurturing.',
      duration: '10-20 minutes',
      reason: 'Provide gentle comfort and care',
      keywords: ['comfort', 'care', 'nurture', 'warmth', 'gentle']
    }
  ],

  anxious: [
    {
      type: 'stress-relief' as const,
      title: '4-7-8 Breathing',
      description: 'Breathe in for 4, hold for 7, exhale for 8. Repeat 4-8 times to calm your nervous system.',
      duration: '5-10 minutes',
      reason: 'Activate parasympathetic nervous system',
      keywords: ['anxious', 'worried', 'stressed', 'overwhelmed', 'panic']
    },
    {
      type: 'stress-relief' as const,
      title: 'Grounding Technique',
      description: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.',
      duration: '5 minutes',
      reason: 'Bring awareness back to the present moment',
      keywords: ['anxiety', 'worry', 'fear', 'nervous', 'tense']
    },
    {
      type: 'stress-relief' as const,
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and release each muscle group, starting from your toes up to your head.',
      duration: '15-20 minutes',
      reason: 'Release physical tension and anxiety',
      keywords: ['tension', 'muscle', 'relaxation', 'body', 'release']
    }
  ],

  frustrated: [
    {
      type: 'stress-relief' as const,
      title: 'Physical Release',
      description: 'Do jumping jacks, punch a pillow, or take a brisk walk to move the energy.',
      duration: '5-15 minutes',
      reason: 'Channel frustration into healthy physical expression',
      keywords: ['frustrated', 'angry', 'annoyed', 'mad', 'irritated']
    },
    {
      type: 'reflection' as const,
      title: 'Frustration Dialogue',
      description: 'Write an uncensored letter expressing your frustration, then burn or tear it up.',
      duration: '15-20 minutes',
      reason: 'Release pent-up emotions safely',
      keywords: ['anger', 'rage', 'fury', 'upset', 'fed up']
    },
    {
      type: 'growth' as const,
      title: 'Problem-Solving Mode',
      description: 'Once calmer, brainstorm three possible solutions or ways to improve the situation.',
      duration: '15 minutes',
      reason: 'Channel frustration into constructive action',
      keywords: ['solution', 'problem', 'action', 'improvement', 'change']
    }
  ]
};

// Content analysis for contextual suggestions
function analyzeContentContext(entries: JournalEntry[]): string[] {
  const recentEntries = entries.slice(-5);
  const allContent = recentEntries.map(e => e.content.toLowerCase()).join(' ');
  const allKeywords = recentEntries.flatMap(e => e.keywords);
  
  const contexts: string[] = [];
  
  // Work-related context
  if (/\b(work|job|career|boss|colleague|office|meeting|project|deadline|promotion)\b/.test(allContent) ||
      allKeywords.some(k => ['work', 'job', 'career', 'office', 'meeting'].includes(k))) {
    contexts.push('work');
  }
  
  // Relationship context
  if (/\b(relationship|partner|spouse|boyfriend|girlfriend|marriage|love|date|romantic)\b/.test(allContent) ||
      allKeywords.some(k => ['love', 'relationship', 'partner', 'romantic'].includes(k))) {
    contexts.push('relationship');
  }
  
  // Family context
  if (/\b(family|mother|father|parent|child|sibling|brother|sister|mom|dad)\b/.test(allContent) ||
      allKeywords.some(k => ['family', 'mother', 'father', 'parent', 'child'].includes(k))) {
    contexts.push('family');
  }
  
  // Achievement context
  if (/\b(achievement|success|accomplish|goal|win|victory|proud|celebration)\b/.test(allContent) ||
      allKeywords.some(k => ['success', 'achievement', 'goal', 'victory', 'proud'].includes(k))) {
    contexts.push('achievement');
  }
  
  // Loss/grief context
  if (/\b(loss|death|grief|goodbye|ended|lost|missing|departed)\b/.test(allContent) ||
      allKeywords.some(k => ['loss', 'grief', 'death', 'goodbye', 'missing'].includes(k))) {
    contexts.push('loss');
  }
  
  // Future/opportunity context
  if (/\b(opportunity|future|new|beginning|start|chance|possibility)\b/.test(allContent) ||
      allKeywords.some(k => ['opportunity', 'future', 'new', 'beginning', 'chance'].includes(k))) {
    contexts.push('opportunity');
  }
  
  // Nature context
  if (/\b(nature|outdoors|garden|trees|flowers|beach|mountains|hiking|walk)\b/.test(allContent) ||
      allKeywords.some(k => ['nature', 'outdoors', 'garden', 'trees', 'beach'].includes(k))) {
    contexts.push('nature');
  }
  
  // Health context
  if (/\b(health|exercise|fitness|diet|medical|doctor|therapy|wellness)\b/.test(allContent) ||
      allKeywords.some(k => ['health', 'exercise', 'fitness', 'medical', 'wellness'].includes(k))) {
    contexts.push('health');
  }
  
  return contexts;
}

// Calculate suggestion relevance based on content and mood patterns
function calculateRelevance(suggestion: any, entry: JournalEntry, contexts: string[]): number {
  let relevance = 0.5; // Base relevance
  
  // Keyword matching
  if (suggestion.keywords) {
    const matchingKeywords = suggestion.keywords.filter(keyword => 
      entry.keywords.includes(keyword) || 
      entry.content.toLowerCase().includes(keyword)
    );
    relevance += (matchingKeywords.length / suggestion.keywords.length) * 0.3;
  }
  
  // Context matching
  if (suggestion.context && contexts.includes(suggestion.context)) {
    relevance += 0.4;
  }
  
  // Sentiment alignment
  if (suggestion.type === 'mood-boost' && entry.sentiment === 'negative') {
    relevance += 0.3;
  } else if (suggestion.type === 'stress-relief' && entry.sentiment === 'negative') {
    relevance += 0.4;
  } else if (suggestion.type === 'growth' && entry.sentiment === 'positive') {
    relevance += 0.3;
  }
  
  // Mood-specific relevance
  if (suggestion.mood === entry.mood) {
    relevance += 0.2;
  }
  
  return Math.min(relevance, 1.0);
}

export function generateMindfulSuggestions(entries: JournalEntry[], user: User): MindfulSuggestion[] {
  if (entries.length === 0) {
    return getDefaultSuggestions();
  }

  const suggestions: MindfulSuggestion[] = [];
  const recentEntries = entries.slice(-7);
  const contexts = analyzeContentContext(entries);
  
  // Analyze mood patterns
  const moodCounts = recentEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);

  const dominantMood = Object.entries(moodCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0] as MoodType || 'neutral';

  // Get suggestions for the dominant mood
  const moodSuggestions = enhancedMoodSuggestions[dominantMood];
  if (moodSuggestions) {
    // Handle joyful mood with base + contextual structure
    if (dominantMood === 'joyful' && typeof moodSuggestions === 'object' && 'base' in moodSuggestions) {
      // Add base suggestions
      moodSuggestions.base.forEach(baseSuggestion => {
        const lastEntry = recentEntries[recentEntries.length - 1];
        const relevance = lastEntry ? calculateRelevance(
          { ...baseSuggestion, mood: dominantMood }, 
          lastEntry, 
          contexts
        ) : 0.5;
        
        suggestions.push({
          ...baseSuggestion,
          relevanceScore: relevance
        });
      });

      // Add contextual suggestions if applicable
      contexts.forEach(context => {
        const contextualSuggestion = moodSuggestions.contextual[context];
        if (contextualSuggestion) {
          const lastEntry = recentEntries[recentEntries.length - 1];
          const relevance = lastEntry ? calculateRelevance(
            { ...contextualSuggestion, mood: dominantMood, context }, 
            lastEntry, 
            contexts
          ) : 0.5;
          
          suggestions.push({
            ...contextualSuggestion,
            relevanceScore: relevance,
            reason: `${contextualSuggestion.reason} (based on ${context} themes in your entries)`
          });
        }
      });
    } else if (Array.isArray(moodSuggestions)) {
      // Handle other moods with array structure
      moodSuggestions.forEach(suggestion => {
        const lastEntry = recentEntries[recentEntries.length - 1];
        const relevance = lastEntry ? calculateRelevance(
          { ...suggestion, mood: dominantMood }, 
          lastEntry, 
          contexts
        ) : 0.5;
        
        suggestions.push({
          ...suggestion,
          relevanceScore: relevance
        });
      });
    }
  }

  // Add pattern-based suggestions
  const patternSuggestions = generatePatternBasedSuggestions(recentEntries, contexts);
  suggestions.push(...patternSuggestions);

  // Sort by relevance and return exactly 3 suggestions
  const finalSuggestions = suggestions
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3); // ALWAYS LIMIT TO EXACTLY 3 SUGGESTIONS

  // If we don't have 3 suggestions, pad with defaults
  while (finalSuggestions.length < 3) {
    const defaultSuggestions = getDefaultSuggestions();
    const nextDefault = defaultSuggestions[finalSuggestions.length % defaultSuggestions.length];
    finalSuggestions.push(nextDefault);
  }

  return finalSuggestions.map(suggestion => ({
    ...suggestion,
    relevanceScore: Math.round(suggestion.relevanceScore * 100) / 100
  }));
}

function generatePatternBasedSuggestions(entries: JournalEntry[], contexts: string[]): MindfulSuggestion[] {
  const suggestions: MindfulSuggestion[] = [];
  
  // Stress pattern detection
  const stressfulEntries = entries.filter(e => 
    ['anxious', 'frustrated'].includes(e.mood) || 
    e.sentiment === 'negative'
  );
  
  if (stressfulEntries.length >= 3) {
    suggestions.push({
      type: 'stress-relief',
      title: 'Weekly Stress Reset',
      description: 'Plan 3 stress-relief activities for this week: one physical, one mental, one social.',
      duration: '20 minutes planning',
      reason: 'Recent pattern of stress detected in your entries',
      relevanceScore: 0.8
    });
  }

  // Positive momentum detection
  const positiveEntries = entries.filter(e => e.sentiment === 'positive');
  if (positiveEntries.length >= 4) {
    suggestions.push({
      type: 'growth',
      title: 'Positive Momentum Amplification',
      description: 'Identify the key factors contributing to your positive streak and create a plan to maintain them.',
      duration: '15-20 minutes',
      reason: 'Strong positive pattern detected in recent entries',
      relevanceScore: 0.9
    });
  }

  // Relationship focus detection
  if (contexts.includes('relationship') || contexts.includes('family')) {
    suggestions.push({
      type: 'reflection',
      title: 'Relationship Appreciation Practice',
      description: 'Write about the people who matter most to you and plan a meaningful way to show appreciation.',
      duration: '15 minutes',
      reason: 'Relationship themes prominent in your recent reflections',
      relevanceScore: 0.7
    });
  }

  return suggestions;
}

export function generateDateSpecificSuggestions(date: Date, entries: JournalEntry[], user: User): MindfulSuggestion[] {
  const suggestions: MindfulSuggestion[] = [];
  const dayOfWeek = date.getDay();
  const hour = new Date().getHours();
  const contexts = analyzeContentContext(entries);
  
  // Get recent mood and sentiment for context
  const recentEntries = entries.slice(-3);
  let recentMood: MoodType | null = null;
  let recentSentiment: string | null = null;
  
  if (recentEntries.length > 0) {
    const lastEntry = recentEntries[recentEntries.length - 1];
    recentMood = lastEntry.mood;
    recentSentiment = lastEntry.sentiment;
  }

  // Enhanced day-specific suggestions
  if (dayOfWeek === 0) { // Sunday
    if (recentSentiment === 'negative') {
      suggestions.push({
        type: 'stress-relief',
        title: 'Sunday Soul Reset',
        description: 'Create a nurturing routine: warm bath, gentle music, and self-compassion practice.',
        duration: '45-60 minutes',
        reason: 'Sunday renewal after challenging times',
        relevanceScore: 0.8
      });
    } else {
      suggestions.push({
        type: 'reflection',
        title: 'Weekly Wisdom Gathering',
        description: 'Reflect on the week\'s lessons and set 3 intentions for the coming week.',
        duration: '20-30 minutes',
        reason: 'Sunday is perfect for weekly reflection and planning',
        relevanceScore: 0.7
      });
    }
  }

  // Time-based suggestions with mood consideration
  if (hour < 10) {
    if (recentMood === 'anxious') {
      suggestions.push({
        type: 'stress-relief',
        title: 'Morning Anxiety Ease',
        description: 'Start with 5 minutes of box breathing, followed by gentle affirmations.',
        duration: '10 minutes',
        reason: 'Address morning anxiety with calming practices',
        relevanceScore: 0.9
      });
    } else {
      suggestions.push({
        type: 'growth',
        title: 'Morning Power Hour',
        description: 'Set your top 3 priorities for the day and visualize accomplishing them with ease.',
        duration: '10 minutes',
        reason: 'Morning intention setting for productive days',
        relevanceScore: 0.6
      });
    }
  }

  // Context-aware suggestions
  if (contexts.includes('work')) {
    suggestions.push({
      type: 'stress-relief',
      title: 'Work-Life Balance Check',
      description: 'Assess your work boundaries and plan one non-work activity that brings you joy.',
      duration: '15 minutes',
      reason: 'Work themes detected in recent entries',
      relevanceScore: 0.8
    });
  }

  // Add more suggestions to ensure we have at least 3
  if (suggestions.length < 3) {
    const additionalSuggestions = [
      {
        type: 'reflection' as const,
        title: 'Present Moment Awareness',
        description: 'Simply sit and notice what you\'re experiencing right now without judgment.',
        duration: '5-10 minutes',
        reason: 'Cultivate mindful presence',
        relevanceScore: 0.6
      },
      {
        type: 'mood-boost' as const,
        title: 'Gratitude Moment',
        description: 'Think of three things you\'re grateful for right now, however small.',
        duration: '5 minutes',
        reason: 'Shift focus to positive aspects of life',
        relevanceScore: 0.7
      },
      {
        type: 'stress-relief' as const,
        title: 'Gentle Movement',
        description: 'Do some light stretching or take a short walk to connect with your body.',
        duration: '10-15 minutes',
        reason: 'Physical movement supports emotional well-being',
        relevanceScore: 0.6
      }
    ];

    // Add additional suggestions until we have exactly 3
    while (suggestions.length < 3) {
      const nextSuggestion = additionalSuggestions[(suggestions.length) % additionalSuggestions.length];
      suggestions.push(nextSuggestion);
    }
  }

  // ALWAYS RETURN EXACTLY 3 SUGGESTIONS
  return suggestions.slice(0, 3);
}

function getDefaultSuggestions(): MindfulSuggestion[] {
  return [
    {
      type: 'reflection',
      title: 'Mindful Check-In',
      description: 'Take a moment to notice how you\'re feeling in your body and mind right now.',
      duration: '5-10 minutes',
      reason: 'Build self-awareness and presence',
      relevanceScore: 0.7
    },
    {
      type: 'stress-relief',
      title: 'Three Deep Breaths',
      description: 'Take three slow, deep breaths, focusing on the sensation of breathing.',
      duration: '2-3 minutes',
      reason: 'Simple way to center and calm yourself',
      relevanceScore: 0.8
    },
    {
      type: 'mood-boost',
      title: 'Gratitude Moment',
      description: 'Think of one thing you\'re grateful for right now, however small.',
      duration: '2-5 minutes',
      reason: 'Shift focus to positive aspects of life',
      relevanceScore: 0.6
    }
  ];
}