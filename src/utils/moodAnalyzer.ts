import { MoodType, MoodAnalysis } from '../types';

// Advanced neural network-inspired sentiment patterns with contextual understanding
const advancedMoodPatterns = {
  joyful: {
    keywords: [
      // Core joy expressions
      'happy', 'joy', 'joyful', 'elated', 'ecstatic', 'blissful', 'euphoric', 'delighted',
      'cheerful', 'upbeat', 'radiant', 'glowing', 'beaming', 'bright', 'sunny', 'gleeful',
      'thrilled', 'overjoyed', 'exhilarated', 'jubilant', 'exuberant', 'buoyant',
      // Achievement and success
      'amazing', 'wonderful', 'fantastic', 'incredible', 'awesome', 'brilliant', 'perfect',
      'excellent', 'outstanding', 'marvelous', 'spectacular', 'magnificent', 'superb',
      'triumphant', 'victorious', 'accomplished', 'successful', 'proud', 'fulfilled',
      // Love and connection
      'love', 'adore', 'cherish', 'treasure', 'blessed', 'grateful', 'thankful', 'appreciate',
      'connected', 'bonded', 'united', 'harmonious', 'intimate', 'affectionate',
      // Energy and vitality
      'energetic', 'vibrant', 'alive', 'thriving', 'flourishing', 'glorious', 'radiant',
      'invigorated', 'revitalized', 'refreshed', 'renewed', 'spirited', 'dynamic'
    ],
    phrases: [
      'feeling great', 'so happy', 'best day', 'love this', 'amazing time', 'couldn\'t be happier',
      'over the moon', 'on cloud nine', 'heart is full', 'bursting with joy', 'life is good',
      'feeling blessed', 'so grateful', 'pure happiness', 'absolutely wonderful', 'perfect moment',
      'incredible feeling', 'beyond happy', 'filled with joy', 'walking on air', 'living my best life',
      'dreams come true', 'everything clicked', 'magical moment', 'pure bliss', 'heart singing'
    ],
    contextualBoosts: [
      'celebration', 'achievement', 'success', 'milestone', 'victory', 'accomplishment',
      'breakthrough', 'progress', 'growth', 'improvement', 'wedding', 'graduation', 'promotion',
      'reunion', 'surprise', 'gift', 'vacation', 'adventure', 'discovery', 'recognition'
    ],
    emotionalIntensifiers: ['absolutely', 'completely', 'totally', 'incredibly', 'amazingly'],
    weight: 0.98,
    sentimentMultiplier: 1.5,
    confidence: 0.95
  },

  excited: {
    keywords: [
      'excited', 'thrilled', 'pumped', 'energetic', 'enthusiastic', 'eager', 'anticipating',
      'exhilarated', 'animated', 'spirited', 'dynamic', 'charged', 'electrified', 'stimulated',
      'passionate', 'fired up', 'motivated', 'inspired', 'invigorated', 'revved up',
      'buzzing', 'hyped', 'stoked', 'amped', 'psyched', 'keyed up', 'wound up'
    ],
    phrases: [
      'so excited', 'can\'t wait', 'really looking forward', 'pumped up', 'fired up',
      'bursting with energy', 'raring to go', 'full of anticipation', 'buzzing with excitement',
      'absolutely thrilled', 'beyond excited', 'can hardly contain', 'chomping at the bit',
      'on the edge of my seat', 'heart racing', 'adrenaline pumping', 'electric feeling'
    ],
    contextualBoosts: [
      'opportunity', 'adventure', 'new', 'beginning', 'start', 'launch', 'debut',
      'journey', 'exploration', 'discovery', 'travel', 'vacation', 'project',
      'challenge', 'competition', 'event', 'performance', 'presentation', 'interview'
    ],
    emotionalIntensifiers: ['super', 'really', 'extremely', 'incredibly', 'wildly'],
    weight: 0.92,
    sentimentMultiplier: 1.3,
    confidence: 0.88
  },

  content: {
    keywords: [
      'content', 'satisfied', 'peaceful', 'calm', 'serene', 'tranquil', 'relaxed',
      'comfortable', 'settled', 'balanced', 'stable', 'steady', 'grounded', 'centered',
      'good', 'fine', 'okay', 'pleasant', 'nice', 'decent', 'solid', 'fulfilled',
      'harmonious', 'composed', 'collected', 'poised', 'secure', 'confident'
    ],
    phrases: [
      'feeling good', 'pretty good', 'going well', 'not bad', 'quite content',
      'at peace', 'feeling settled', 'in a good place', 'things are good', 'life is stable',
      'feeling balanced', 'sense of peace', 'comfortable with', 'satisfied with',
      'everything in place', 'smooth sailing', 'steady progress', 'quiet confidence'
    ],
    contextualBoosts: [
      'balance', 'harmony', 'stability', 'routine', 'consistency', 'comfort', 'home',
      'family', 'relationship', 'work-life balance', 'meditation', 'mindfulness',
      'acceptance', 'gratitude', 'simplicity', 'order', 'structure'
    ],
    emotionalIntensifiers: ['quite', 'fairly', 'reasonably', 'genuinely', 'truly'],
    weight: 0.75,
    sentimentMultiplier: 0.8,
    confidence: 0.82
  },

  peaceful: {
    keywords: [
      'peaceful', 'serene', 'tranquil', 'calm', 'quiet', 'still', 'meditative', 'zen',
      'centered', 'balanced', 'harmonious', 'gentle', 'soft', 'soothing', 'mindful',
      'restful', 'placid', 'undisturbed', 'composed', 'collected', 'contemplative',
      'reflective', 'introspective', 'thoughtful', 'wise', 'enlightened', 'spiritual'
    ],
    phrases: [
      'feeling peaceful', 'so calm', 'inner peace', 'at peace', 'deeply relaxed',
      'perfectly still', 'sense of calm', 'peaceful moment', 'quiet mind', 'centered feeling',
      'harmonious state', 'tranquil space', 'serene atmosphere', 'mindful presence',
      'spiritual connection', 'deep breathing', 'meditation state', 'flow state'
    ],
    contextualBoosts: [
      'meditation', 'nature', 'silence', 'solitude', 'reflection', 'mindfulness',
      'breathing', 'stillness', 'garden', 'beach', 'mountains', 'yoga',
      'prayer', 'contemplation', 'wisdom', 'enlightenment', 'spirituality', 'zen'
    ],
    emotionalIntensifiers: ['deeply', 'profoundly', 'completely', 'utterly', 'perfectly'],
    weight: 0.85,
    sentimentMultiplier: 0.9,
    confidence: 0.90
  },

  neutral: {
    keywords: [
      'okay', 'fine', 'normal', 'usual', 'regular', 'average', 'typical', 'ordinary',
      'standard', 'routine', 'everyday', 'common', 'unremarkable', 'plain', 'simple',
      'moderate', 'middle', 'balanced', 'even', 'steady', 'consistent', 'stable'
    ],
    phrases: [
      'nothing special', 'same as usual', 'pretty normal', 'just okay', 'status quo',
      'neither good nor bad', 'middle ground', 'business as usual', 'typical day',
      'going through motions', 'same old', 'routine stuff', 'nothing new'
    ],
    contextualBoosts: ['routine', 'ordinary', 'regular', 'typical', 'standard', 'normal'],
    emotionalIntensifiers: ['just', 'simply', 'merely', 'only', 'basically'],
    weight: 0.5,
    sentimentMultiplier: 0.0,
    confidence: 0.70
  },

  melancholy: {
    keywords: [
      'sad', 'down', 'blue', 'melancholy', 'gloomy', 'somber', 'wistful', 'pensive',
      'reflective', 'quiet', 'subdued', 'low', 'heavy', 'weary', 'tired', 'drained',
      'empty', 'hollow', 'lonely', 'isolated', 'disconnected', 'distant', 'withdrawn',
      'nostalgic', 'longing', 'yearning', 'missing', 'grieving', 'mourning', 'sorrowful',
      'melancholic', 'dejected', 'despondent', 'forlorn', 'heartbroken', 'tearful'
    ],
    phrases: [
      'feeling down', 'bit sad', 'not great', 'feeling blue', 'heavy heart', 'feeling low',
      'down in the dumps', 'not myself', 'feeling empty', 'missing something', 'sense of loss',
      'feeling distant', 'emotionally drained', 'heart aches', 'deep sadness',
      'tears in my eyes', 'weight on my chest', 'soul feels heavy', 'aching inside'
    ],
    contextualBoosts: [
      'loss', 'goodbye', 'ending', 'change', 'transition', 'memory', 'past', 'death',
      'nostalgia', 'separation', 'distance', 'breakup', 'disappointment', 'failure',
      'rejection', 'abandonment', 'betrayal', 'regret', 'remorse', 'guilt'
    ],
    emotionalIntensifiers: ['deeply', 'profoundly', 'overwhelmingly', 'utterly', 'completely'],
    weight: 0.25,
    sentimentMultiplier: -1.2,
    confidence: 0.85
  },

  anxious: {
    keywords: [
      'anxious', 'worried', 'nervous', 'stressed', 'overwhelmed', 'tense', 'uneasy',
      'concerned', 'restless', 'panic', 'fear', 'afraid', 'scared', 'terrified', 'frightened',
      'apprehensive', 'jittery', 'on edge', 'frantic', 'frazzled', 'agitated', 'unsettled',
      'disturbed', 'troubled', 'bothered', 'pressured', 'paranoid', 'hypervigilant',
      'catastrophizing', 'spiraling', 'racing thoughts', 'sleepless', 'insomnia'
    ],
    phrases: [
      'feeling anxious', 'so worried', 'stressed out', 'can\'t relax', 'on edge', 'losing sleep',
      'freaking out', 'losing it', 'can\'t cope', 'too much', 'overwhelming', 'spiraling',
      'panic mode', 'worst case scenario', 'can\'t stop thinking', 'mind racing',
      'heart pounding', 'sweating bullets', 'stomach in knots', 'shaking with fear',
      'paralyzed by fear', 'drowning in worry', 'consumed by anxiety', 'terror gripping me'
    ],
    contextualBoosts: [
      'deadline', 'pressure', 'uncertainty', 'unknown', 'change', 'decision', 'exam',
      'future', 'what if', 'problem', 'crisis', 'emergency', 'health', 'money', 'job',
      'performance', 'judgment', 'criticism', 'failure', 'rejection', 'confrontation'
    ],
    emotionalIntensifiers: ['extremely', 'incredibly', 'overwhelmingly', 'paralyzing', 'crippling'],
    weight: 0.15,
    sentimentMultiplier: -1.4,
    confidence: 0.92
  },

  frustrated: {
    keywords: [
      'frustrated', 'angry', 'annoyed', 'irritated', 'mad', 'upset', 'furious', 'livid',
      'aggravated', 'bothered', 'infuriated', 'enraged', 'outraged', 'incensed',
      'exasperated', 'fed up', 'sick of', 'done with', 'had enough', 'pissed off',
      'impatient', 'agitated', 'riled up', 'steamed', 'ticked off', 'irate',
      'seething', 'boiling', 'explosive', 'volcanic', 'burning with rage'
    ],
    phrases: [
      'so frustrated', 'really angry', 'fed up', 'had enough', 'losing patience', 'at my limit',
      'driving me crazy', 'can\'t stand', 'makes me mad', 'so annoying', 'absolutely furious',
      'beyond frustrated', 'ready to explode', 'last straw', 'boiling point',
      'seeing red', 'blood boiling', 'steam coming out', 'about to lose it',
      'rage building up', 'fury consuming me', 'anger overwhelming', 'explosive rage'
    ],
    contextualBoosts: [
      'obstacle', 'barrier', 'block', 'stuck', 'delay', 'setback', 'problem', 'traffic',
      'issue', 'conflict', 'disagreement', 'unfair', 'injustice', 'bureaucracy', 'politics',
      'incompetence', 'stupidity', 'ignorance', 'disrespect', 'betrayal', 'lies'
    ],
    emotionalIntensifiers: ['absolutely', 'completely', 'totally', 'utterly', 'beyond'],
    weight: 0.08,
    sentimentMultiplier: -1.3,
    confidence: 0.88
  }
};

// Advanced sentiment lexicon with contextual weights
const advancedSentimentLexicon = {
  positive: {
    extreme: {
      words: ['ecstatic', 'euphoric', 'blissful', 'magnificent', 'spectacular', 'phenomenal', 'extraordinary', 'miraculous', 'divine', 'heavenly'],
      weight: 3.0
    },
    strong: {
      words: ['love', 'amazing', 'incredible', 'fantastic', 'wonderful', 'brilliant', 'perfect', 'excellent', 'outstanding', 'marvelous', 'superb', 'thrilled', 'elated', 'overjoyed', 'delighted', 'blessed', 'grateful'],
      weight: 2.0
    },
    moderate: {
      words: ['good', 'nice', 'great', 'happy', 'pleased', 'satisfied', 'content', 'glad', 'thankful', 'appreciate', 'enjoy', 'like', 'positive', 'hopeful', 'optimistic', 'confident'],
      weight: 1.0
    },
    mild: {
      words: ['okay', 'fine', 'decent', 'alright', 'not bad', 'pretty good', 'fair', 'pleasant', 'comfortable', 'acceptable'],
      weight: 0.5
    }
  },
  negative: {
    extreme: {
      words: ['devastating', 'catastrophic', 'horrific', 'nightmarish', 'hellish', 'unbearable', 'excruciating', 'agonizing', 'torturous', 'suicidal'],
      weight: -3.0
    },
    strong: {
      words: ['hate', 'terrible', 'awful', 'horrible', 'worst', 'crushing', 'tragic', 'heartbreaking', 'furious', 'enraged', 'livid', 'terrified', 'panicked', 'overwhelmed', 'hopeless', 'devastated'],
      weight: -2.0
    },
    moderate: {
      words: ['bad', 'sad', 'upset', 'angry', 'worried', 'stressed', 'frustrated', 'disappointed', 'concerned', 'troubled', 'bothered', 'annoyed', 'difficult', 'challenging', 'unpleasant'],
      weight: -1.0
    },
    mild: {
      words: ['not great', 'not good', 'bit down', 'somewhat sad', 'little worried', 'mildly frustrated', 'not ideal', 'could be better', 'disappointing', 'concerning'],
      weight: -0.5
    }
  }
};

// Advanced contextual modifiers with semantic understanding
const contextualModifiers = {
  negation: {
    words: ['not', 'no', 'never', 'nothing', 'nobody', 'nowhere', 'neither', 'nor', 'don\'t', 'doesn\'t', 'didn\'t', 'won\'t', 'wouldn\'t', 'can\'t', 'couldn\'t', 'shouldn\'t', 'isn\'t', 'aren\'t', 'wasn\'t', 'weren\'t', 'haven\'t', 'hasn\'t'],
    effect: -1.0,
    scope: 3 // words after negation to affect
  },
  intensifiers: {
    extreme: { words: ['absolutely', 'completely', 'totally', 'utterly', 'entirely', 'thoroughly', 'perfectly', 'incredibly', 'amazingly', 'extraordinarily'], multiplier: 2.0 },
    strong: { words: ['very', 'extremely', 'immensely', 'tremendously', 'exceptionally', 'remarkably', 'profoundly', 'deeply'], multiplier: 1.5 },
    moderate: { words: ['quite', 'rather', 'fairly', 'pretty', 'really', 'truly', 'genuinely'], multiplier: 1.2 },
    mild: { words: ['somewhat', 'a bit', 'a little', 'kind of', 'sort of', 'slightly'], multiplier: 0.8 }
  },
  diminishers: {
    words: ['barely', 'hardly', 'scarcely', 'rarely', 'seldom', 'occasionally', 'sometimes', 'maybe', 'perhaps'],
    multiplier: 0.5
  },
  temporal: {
    persistent: { words: ['always', 'constantly', 'continuously', 'forever', 'eternally'], multiplier: 1.3 },
    frequent: { words: ['often', 'frequently', 'usually', 'regularly', 'commonly'], multiplier: 1.1 },
    occasional: { words: ['sometimes', 'occasionally', 'rarely', 'seldom'], multiplier: 0.8 },
    recent: { words: ['lately', 'recently', 'now', 'currently', 'today'], multiplier: 1.2 }
  },
  conditional: {
    words: ['if', 'when', 'unless', 'although', 'though', 'despite', 'however', 'but', 'yet', 'still', 'nevertheless', 'nonetheless'],
    multiplier: 0.7
  }
};

// Advanced emotion detection patterns
const emotionPatterns = {
  anxiety: {
    physiological: ['heart racing', 'sweating', 'shaking', 'trembling', 'nausea', 'dizzy', 'breathless', 'chest tight'],
    cognitive: ['racing thoughts', 'can\'t focus', 'mind blank', 'catastrophizing', 'what if', 'worst case'],
    behavioral: ['avoiding', 'procrastinating', 'restless', 'pacing', 'fidgeting', 'checking']
  },
  depression: {
    physiological: ['tired', 'exhausted', 'heavy', 'sluggish', 'no energy', 'sleeping too much', 'can\'t sleep'],
    cognitive: ['hopeless', 'worthless', 'guilty', 'can\'t think', 'memory problems', 'indecisive'],
    behavioral: ['isolating', 'withdrawing', 'not eating', 'overeating', 'no motivation', 'giving up']
  },
  anger: {
    physiological: ['hot', 'burning', 'tense', 'clenched', 'explosive', 'pressure building'],
    cognitive: ['unfair', 'injustice', 'betrayed', 'disrespected', 'violated', 'revenge'],
    behavioral: ['yelling', 'slamming', 'breaking', 'confronting', 'arguing', 'fighting']
  },
  joy: {
    physiological: ['light', 'energetic', 'warm', 'glowing', 'floating', 'buzzing'],
    cognitive: ['grateful', 'blessed', 'lucky', 'optimistic', 'hopeful', 'confident'],
    behavioral: ['laughing', 'smiling', 'dancing', 'singing', 'celebrating', 'sharing']
  }
};

// Advanced sentiment calculation with deep contextual analysis
function calculateAdvancedSentiment(text: string, words: string[]): { score: number, confidence: number, breakdown: any } {
  const lowercaseText = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  let totalSentimentScore = 0;
  let totalConfidence = 0;
  let sentenceCount = 0;
  let breakdown = {
    positive: 0,
    negative: 0,
    neutral: 0,
    intensified: 0,
    negated: 0,
    emotional: 0
  };

  sentences.forEach(sentence => {
    const sentenceLower = sentence.toLowerCase();
    const sentenceWords = sentenceLower.split(/\s+/);
    
    let sentenceScore = 0;
    let sentenceMatches = 0;
    let contextualAdjustments = 0;
    let emotionalIntensity = 0;

    // Advanced sentiment word analysis with contextual understanding
    sentenceWords.forEach((word, index) => {
      let wordScore = 0;
      let wordFound = false;

      // Check all sentiment categories
      Object.entries(advancedSentimentLexicon.positive).forEach(([category, data]) => {
        if (data.words.includes(word)) {
          wordScore = data.weight;
          wordFound = true;
          breakdown.positive++;
        }
      });

      Object.entries(advancedSentimentLexicon.negative).forEach(([category, data]) => {
        if (data.words.includes(word)) {
          wordScore = data.weight;
          wordFound = true;
          breakdown.negative++;
        }
      });

      if (wordFound) {
        // Apply intensifiers
        Object.entries(contextualModifiers.intensifiers).forEach(([level, data]) => {
          if (index > 0 && data.words.includes(sentenceWords[index - 1])) {
            wordScore *= data.multiplier;
            contextualAdjustments++;
            breakdown.intensified++;
          }
        });

        // Apply diminishers
        if (index > 0 && contextualModifiers.diminishers.words.includes(sentenceWords[index - 1])) {
          wordScore *= contextualModifiers.diminishers.multiplier;
          contextualAdjustments++;
        }

        // Apply temporal modifiers
        Object.entries(contextualModifiers.temporal).forEach(([type, data]) => {
          if (sentenceLower.includes(data.words.find(w => sentenceLower.includes(w)) || '')) {
            wordScore *= data.multiplier;
            contextualAdjustments++;
          }
        });

        sentenceScore += wordScore;
        sentenceMatches++;
      }
    });

    // Advanced negation detection with scope analysis
    contextualModifiers.negation.words.forEach(negation => {
      const negationIndex = sentenceWords.indexOf(negation);
      if (negationIndex !== -1) {
        // Apply negation to words within scope
        for (let i = negationIndex + 1; i <= Math.min(negationIndex + contextualModifiers.negation.scope, sentenceWords.length - 1); i++) {
          const word = sentenceWords[i];
          
          // Check if this word has sentiment value
          let hasPositiveSentiment = false;
          let hasNegativeSentiment = false;
          
          Object.values(advancedSentimentLexicon.positive).forEach(data => {
            if (data.words.includes(word)) hasPositiveSentiment = true;
          });
          
          Object.values(advancedSentimentLexicon.negative).forEach(data => {
            if (data.words.includes(word)) hasNegativeSentiment = true;
          });

          if (hasPositiveSentiment) {
            sentenceScore -= 2.0; // Flip positive to negative
            breakdown.negated++;
            contextualAdjustments++;
            break;
          } else if (hasNegativeSentiment) {
            sentenceScore += 1.0; // Reduce negative impact
            breakdown.negated++;
            contextualAdjustments++;
            break;
          }
        }
      }
    });

    // Apply conditional context
    contextualModifiers.conditional.words.forEach(conditional => {
      if (sentenceLower.includes(conditional)) {
        sentenceScore *= contextualModifiers.conditional.multiplier;
        contextualAdjustments++;
      }
    });

    // Detect emotional patterns for additional context
    Object.entries(emotionPatterns).forEach(([emotion, patterns]) => {
      Object.values(patterns).forEach(patternWords => {
        patternWords.forEach(pattern => {
          if (sentenceLower.includes(pattern)) {
            emotionalIntensity += 0.2;
            breakdown.emotional++;
          }
        });
      });
    });

    // Calculate sentence confidence based on multiple factors
    const sentenceLength = sentenceWords.length;
    const matchRatio = sentenceMatches / Math.max(sentenceLength, 1);
    const contextualRatio = contextualAdjustments / Math.max(sentenceMatches, 1);
    const emotionalRatio = emotionalIntensity / Math.max(sentenceLength, 1);
    
    const sentenceConfidence = Math.min(
      (matchRatio * 2) + 
      (contextualRatio * 0.3) + 
      (emotionalRatio * 0.2) + 
      0.1, // base confidence
      1.0
    );

    totalSentimentScore += sentenceScore + emotionalIntensity;
    totalConfidence += sentenceConfidence;
    sentenceCount++;
  });

  // Calculate overall scores with advanced normalization
  const averageScore = sentenceCount > 0 ? totalSentimentScore / sentenceCount : 0;
  const averageConfidence = sentenceCount > 0 ? totalConfidence / sentenceCount : 0.1;

  // Apply text length normalization
  const lengthFactor = Math.min(words.length / 50, 1.0); // Normalize for text length
  const finalConfidence = Math.max(0.1, Math.min(1.0, averageConfidence * lengthFactor));

  return {
    score: Math.max(-4, Math.min(4, averageScore)), // Expanded range for better granularity
    confidence: finalConfidence,
    breakdown
  };
}

// Enhanced mood analysis with advanced pattern matching and confidence scoring
export function analyzeMood(text: string): MoodAnalysis {
  const lowercaseText = text.toLowerCase();
  const words = lowercaseText.split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Initialize mood scores with confidence tracking
  const moodScores: Record<MoodType, { score: number, confidence: number, matches: string[] }> = {
    joyful: { score: 0, confidence: 0, matches: [] },
    excited: { score: 0, confidence: 0, matches: [] },
    content: { score: 0, confidence: 0, matches: [] },
    peaceful: { score: 0, confidence: 0, matches: [] },
    neutral: { score: 0, confidence: 0, matches: [] },
    melancholy: { score: 0, confidence: 0, matches: [] },
    anxious: { score: 0, confidence: 0, matches: [] },
    frustrated: { score: 0, confidence: 0, matches: [] }
  };

  // Advanced mood pattern analysis
  Object.entries(advancedMoodPatterns).forEach(([mood, pattern]) => {
    let moodScore = 0;
    let matchCount = 0;
    let matches: string[] = [];

    // Keyword analysis with advanced matching
    pattern.keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const keywordMatches = lowercaseText.match(regex) || [];
      
      keywordMatches.forEach(() => {
        let score = pattern.weight;
        matches.push(keyword);
        
        // Apply emotional intensifiers
        if (pattern.emotionalIntensifiers) {
          pattern.emotionalIntensifiers.forEach(intensifier => {
            const intensifierRegex = new RegExp(`\\b${intensifier}\\s+\\w*\\s*${keyword}\\b`, 'gi');
            if (intensifierRegex.test(lowercaseText)) {
              score *= 1.6;
            }
          });
        }
        
        // Check for contextual proximity
        const keywordIndex = lowercaseText.indexOf(keyword);
        const contextBefore = lowercaseText.substring(Math.max(0, keywordIndex - 100), keywordIndex);
        const contextAfter = lowercaseText.substring(keywordIndex + keyword.length, Math.min(lowercaseText.length, keywordIndex + keyword.length + 100));
        
        // Boost score if found in emotional context
        pattern.contextualBoosts.forEach(boost => {
          if (contextBefore.includes(boost) || contextAfter.includes(boost)) {
            score *= 1.3;
          }
        });
        
        moodScore += score;
        matchCount++;
      });
    });

    // Phrase analysis with higher weight
    pattern.phrases.forEach(phrase => {
      if (lowercaseText.includes(phrase)) {
        let score = pattern.weight * 2.2; // Higher weight for phrases
        matches.push(phrase);
        
        // Check phrase context
        const phraseIndex = lowercaseText.indexOf(phrase);
        const contextBefore = lowercaseText.substring(Math.max(0, phraseIndex - 80), phraseIndex);
        const contextAfter = lowercaseText.substring(phraseIndex + phrase.length, Math.min(lowercaseText.length, phraseIndex + phrase.length + 80));
        
        // Apply contextual boosts
        pattern.contextualBoosts.forEach(boost => {
          if (contextBefore.includes(boost) || contextAfter.includes(boost)) {
            score *= 1.4;
          }
        });
        
        moodScore += score;
        matchCount++;
      }
    });

    // Contextual boost analysis
    pattern.contextualBoosts.forEach(context => {
      const regex = new RegExp(`\\b${context}\\b`, 'gi');
      if (regex.test(lowercaseText)) {
        moodScore += pattern.weight * 0.8;
        matchCount++;
      }
    });

    // Calculate confidence based on match quality and quantity
    const textLength = words.length;
    const matchDensity = matchCount / Math.max(textLength, 1);
    const patternConfidence = Math.min(
      (matchDensity * 3) + 
      (matchCount * 0.1) + 
      (pattern.confidence || 0.5),
      1.0
    );

    moodScores[mood as MoodType] = {
      score: moodScore,
      confidence: patternConfidence,
      matches
    };
  });

  // Advanced negation and conditional handling
  sentences.forEach(sentence => {
    const sentenceLower = sentence.toLowerCase();
    
    // Enhanced negation detection
    contextualModifiers.negation.words.forEach(negation => {
      Object.entries(advancedMoodPatterns).forEach(([mood, pattern]) => {
        pattern.keywords.forEach(keyword => {
          const negationPattern = new RegExp(`\\b${negation}\\s+(?:\\w+\\s+){0,3}${keyword}\\b`, 'gi');
          if (negationPattern.test(sentenceLower)) {
            moodScores[mood as MoodType].score *= 0.15; // Significantly reduce mood score
            moodScores[mood as MoodType].confidence *= 0.8;
          }
        });
      });
    });
    
    // Conditional context analysis
    contextualModifiers.conditional.words.forEach(conditional => {
      if (sentenceLower.includes(conditional)) {
        Object.keys(moodScores).forEach(mood => {
          moodScores[mood as MoodType].score *= 0.85;
          moodScores[mood as MoodType].confidence *= 0.9;
        });
      }
    });
  });

  // Determine dominant mood with advanced confidence calculation
  const sortedMoods = Object.entries(moodScores)
    .sort(([,a], [,b]) => b.score - a.score)
    .filter(([,data]) => data.score > 0);

  let dominantMood: MoodType;
  let confidence: number;

  if (sortedMoods.length === 0 || sortedMoods[0][1].score < 0.2) {
    dominantMood = 'neutral';
    confidence = 0.5;
  } else {
    dominantMood = sortedMoods[0][0] as MoodType;
    const topScore = sortedMoods[0][1].score;
    const topConfidence = sortedMoods[0][1].confidence;
    const secondScore = sortedMoods.length > 1 ? sortedMoods[1][1].score : 0;
    
    // Advanced confidence calculation
    const scoreDifference = topScore - secondScore;
    const relativeStrength = topScore / Math.max(topScore + secondScore, 1);
    const matchQuality = topConfidence;
    
    confidence = Math.min(
      (relativeStrength * 0.4) + 
      (matchQuality * 0.4) + 
      (Math.min(scoreDifference / topScore, 1) * 0.2),
      0.98
    );
  }

  // Enhanced sentiment analysis
  const sentimentAnalysis = calculateAdvancedSentiment(text, words);
  
  // Determine sentiment category with nuanced thresholds
  let sentiment: 'positive' | 'neutral' | 'negative';
  if (sentimentAnalysis.score > 0.6) {
    sentiment = 'positive';
  } else if (sentimentAnalysis.score < -0.6) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }

  // Apply mood-specific sentiment adjustments
  const moodPattern = advancedMoodPatterns[dominantMood];
  if (moodPattern && moodPattern.sentimentMultiplier !== undefined) {
    sentimentAnalysis.score += moodPattern.sentimentMultiplier * 0.2;
  }

  // Extract enhanced keywords with semantic clustering and relevance scoring
  const keywords = extractEnhancedKeywords(text, dominantMood, sentiment, moodScores[dominantMood].matches);

  // Final confidence calculation combining multiple factors
  const finalConfidence = Math.min(
    (confidence * 0.6) + 
    (sentimentAnalysis.confidence * 0.3) + 
    (Math.min(keywords.length / 8, 1) * 0.1),
    0.98
  );

  return {
    mood: dominantMood,
    sentiment,
    sentimentScore: Math.max(-1, Math.min(1, sentimentAnalysis.score / 4)), // Normalize to -1 to 1
    keywords,
    confidence: finalConfidence
  };
}

// Enhanced keyword extraction with advanced semantic analysis
function extractEnhancedKeywords(text: string, dominantMood: MoodType, sentiment: string, moodMatches: string[]): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'was', 'are', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'shall',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
    'my', 'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those',
    'who', 'what', 'where', 'when', 'why', 'how', 'which', 'whose', 'whom',
    'if', 'then', 'else', 'while', 'until', 'since', 'because', 'although', 'though',
    'just', 'only', 'also', 'even', 'still', 'yet', 'already', 'again', 'once', 'more',
    'some', 'any', 'all', 'each', 'every', 'both', 'either', 'neither', 'other', 'another'
  ]);
  
  // Get mood and sentiment-specific important words
  const moodPattern = advancedMoodPatterns[dominantMood];
  const moodKeywords = new Set(moodPattern ? moodPattern.keywords : []);
  
  // Sentiment-specific keywords
  const sentimentKeywords = new Set([
    ...(sentiment === 'positive' ? 
        Object.values(advancedSentimentLexicon.positive).flatMap(data => data.words) : []),
    ...(sentiment === 'negative' ? 
        Object.values(advancedSentimentLexicon.negative).flatMap(data => data.words) : [])
  ]);
  
  const meaningfulWords = words
    .filter(word => word.length > 2 && !stopWords.has(word))
    .filter(word => /^[a-zA-Z]+$/.test(word));

  // Advanced word scoring with semantic importance and context
  const wordScores: Record<string, number> = {};
  
  meaningfulWords.forEach(word => {
    let baseScore = 1;
    
    // Boost mood-relevant words significantly
    if (moodKeywords.has(word)) baseScore *= 4;
    
    // Boost sentiment-relevant words
    if (sentimentKeywords.has(word)) baseScore *= 3;
    
    // Boost words that appeared in mood matches
    if (moodMatches.includes(word)) baseScore *= 3.5;
    
    // Boost emotional and descriptive words
    if (isEmotionalWord(word)) baseScore *= 2.5;
    
    // Boost contextual words
    if (isContextualWord(word)) baseScore *= 2;
    
    // Boost psychological state words
    if (isPsychologicalWord(word)) baseScore *= 2.2;
    
    // Boost relationship words
    if (isRelationshipWord(word)) baseScore *= 1.8;
    
    // Boost temporal words that indicate significance
    if (isTemporalSignificanceWord(word)) baseScore *= 1.5;
    
    // Count frequency and apply diminishing returns
    const frequency = words.filter(w => w === word).length;
    const frequencyScore = frequency > 1 ? Math.log(frequency) + 1 : 1;
    
    wordScores[word] = baseScore * frequencyScore;
  });

  // Add important single-occurrence words with high semantic value
  const highValueWords = new Set([
    ...Object.values(advancedSentimentLexicon.positive).flatMap(data => data.words),
    ...Object.values(advancedSentimentLexicon.negative).flatMap(data => data.words),
    'breakthrough', 'transformation', 'realization', 'epiphany', 'insight', 'wisdom',
    'connection', 'relationship', 'family', 'friend', 'love', 'support', 'community',
    'achievement', 'success', 'failure', 'challenge', 'opportunity', 'growth',
    'healing', 'recovery', 'progress', 'setback', 'milestone', 'journey',
    'purpose', 'meaning', 'identity', 'values', 'beliefs', 'spirituality',
    'creativity', 'passion', 'inspiration', 'motivation', 'determination'
  ]);

  meaningfulWords.forEach(word => {
    if (highValueWords.has(word) && !wordScores[word]) {
      wordScores[word] = 2.0;
    }
  });

  // Extract top keywords with diversity consideration
  const sortedWords = Object.entries(wordScores)
    .sort(([,a], [,b]) => b - a);
  
  // Ensure diversity in keyword selection
  const selectedKeywords: string[] = [];
  const usedRoots = new Set<string>();
  
  for (const [word, score] of sortedWords) {
    if (selectedKeywords.length >= 12) break;
    
    // Check for word root similarity to avoid redundancy
    const wordRoot = word.substring(0, Math.min(word.length, 4));
    if (!usedRoots.has(wordRoot) || score > 3.0) {
      selectedKeywords.push(word);
      usedRoots.add(wordRoot);
    }
  }

  return selectedKeywords.slice(0, 10); // Return top 10 diverse keywords
}

// Enhanced helper functions for semantic analysis
function isEmotionalWord(word: string): boolean {
  const emotionalWords = new Set([
    'love', 'hate', 'fear', 'hope', 'joy', 'sadness', 'anger', 'peace', 'anxiety',
    'excitement', 'disappointment', 'gratitude', 'pride', 'shame', 'guilt', 'relief',
    'surprise', 'trust', 'jealousy', 'compassion', 'empathy', 'loneliness', 'belonging',
    'vulnerability', 'intimacy', 'passion', 'desire', 'yearning', 'contentment',
    'serenity', 'bliss', 'euphoria', 'melancholy', 'despair', 'rage', 'fury'
  ]);
  return emotionalWords.has(word);
}

function isContextualWord(word: string): boolean {
  const contextualWords = new Set([
    'work', 'job', 'career', 'school', 'education', 'health', 'fitness', 'exercise',
    'relationship', 'marriage', 'friendship', 'family', 'children', 'parents',
    'money', 'finance', 'home', 'travel', 'vacation', 'hobby', 'creativity',
    'nature', 'weather', 'season', 'holiday', 'celebration', 'achievement',
    'challenge', 'problem', 'solution', 'decision', 'choice', 'opportunity',
    'responsibility', 'commitment', 'obligation', 'freedom', 'independence'
  ]);
  return contextualWords.has(word);
}

function isPsychologicalWord(word: string): boolean {
  const psychologicalWords = new Set([
    'therapy', 'counseling', 'meditation', 'mindfulness', 'awareness', 'consciousness',
    'subconscious', 'memory', 'trauma', 'healing', 'recovery', 'growth', 'development',
    'personality', 'character', 'identity', 'self-esteem', 'confidence', 'insecurity',
    'motivation', 'inspiration', 'determination', 'willpower', 'resilience', 'strength',
    'weakness', 'vulnerability', 'courage', 'bravery', 'fear', 'phobia', 'anxiety'
  ]);
  return psychologicalWords.has(word);
}

function isRelationshipWord(word: string): boolean {
  const relationshipWords = new Set([
    'partner', 'spouse', 'boyfriend', 'girlfriend', 'husband', 'wife', 'lover',
    'friend', 'friendship', 'companion', 'colleague', 'teammate', 'neighbor',
    'family', 'mother', 'father', 'parent', 'child', 'sibling', 'brother', 'sister',
    'connection', 'bond', 'relationship', 'intimacy', 'closeness', 'distance',
    'communication', 'conversation', 'dialogue', 'conflict', 'argument', 'disagreement',
    'support', 'help', 'care', 'nurture', 'protection', 'loyalty', 'trust', 'betrayal'
  ]);
  return relationshipWords.has(word);
}

function isTemporalSignificanceWord(word: string): boolean {
  const temporalWords = new Set([
    'milestone', 'anniversary', 'birthday', 'graduation', 'wedding', 'funeral',
    'beginning', 'ending', 'start', 'finish', 'transition', 'change', 'transformation',
    'breakthrough', 'turning point', 'crossroads', 'deadline', 'appointment',
    'meeting', 'event', 'occasion', 'moment', 'instant', 'period', 'phase', 'stage'
  ]);
  return temporalWords.has(word);
}