import React, { useState } from 'react';
import { Palette, Type, Moon, Sun, Droplet, Settings as SettingsIcon, Trash2, AlertTriangle } from 'lucide-react';
import { User } from '../../types';

interface SettingsProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onDeleteProfile?: () => void;
}

export function Settings({ user, onUpdateUser, onDeleteProfile }: SettingsProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  const fontOptions = [
    { id: 'inter', name: 'Inter', description: 'Clean and modern', preview: 'The quick brown fox jumps over the lazy dog' },
    { id: 'playfair', name: 'Playfair Display', description: 'Elegant serif', preview: 'The quick brown fox jumps over the lazy dog' },
    { id: 'crimson', name: 'Crimson Text', description: 'Classic reading', preview: 'The quick brown fox jumps over the lazy dog' },
    { id: 'lora', name: 'Lora', description: 'Warm and friendly', preview: 'The quick brown fox jumps over the lazy dog' },
    { id: 'merriweather', name: 'Merriweather', description: 'Comfortable reading', preview: 'The quick brown fox jumps over the lazy dog' }
  ];

  const inkColors = [
    { id: 'sage', name: 'Sage Green', color: '#5c7a5c', description: 'Calming and natural' },
    { id: 'lavender', name: 'Lavender', color: '#8b5cf6', description: 'Peaceful and dreamy' },
    { id: 'warm', name: 'Warm Brown', color: '#92400e', description: 'Cozy and grounding' },
    { id: 'ocean', name: 'Ocean Blue', color: '#0369a1', description: 'Deep and thoughtful' },
    { id: 'sunset', name: 'Sunset Orange', color: '#ea580c', description: 'Energetic and warm' },
    { id: 'forest', name: 'Forest Green', color: '#166534', description: 'Rich and earthy' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Small', size: '14px' },
    { id: 'medium', name: 'Medium', size: '16px' },
    { id: 'large', name: 'Large', size: '18px' }
  ];

  const updatePreference = (key: string, value: any) => {
    onUpdateUser({
      preferences: {
        ...user.preferences,
        [key]: value
      }
    });
  };

  const getFontClass = (fontId: string) => {
    const fontMap = {
      inter: 'font-sans',
      playfair: 'font-display',
      crimson: 'font-serif',
      lora: 'font-serif',
      merriweather: 'font-serif'
    };
    return fontMap[fontId as keyof typeof fontMap] || 'font-sans';
  };

  const handleDeleteProfile = () => {
    if (deleteConfirmationText.toLowerCase() === 'delete my profile' && onDeleteProfile) {
      onDeleteProfile();
    }
  };

  const isDeleteConfirmationValid = deleteConfirmationText.toLowerCase() === 'delete my profile';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      user.preferences.theme === 'dark' 
        ? 'bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900' 
        : 'bg-gradient-to-br from-sage-50 via-cream-50 to-lavender-50'
    }`}>
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg ${
              user.preferences.theme === 'dark' 
                ? 'bg-gradient-to-br from-amber-700 to-amber-800' 
                : 'bg-gradient-to-br from-sage-400 to-sage-600'
            }`}>
              <SettingsIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-display font-semibold mb-2 sm:mb-3 ${
            user.preferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
          }`}>
            Personalize Your Space
          </h1>
          <p className={`text-base sm:text-lg ${
            user.preferences.theme === 'dark' ? 'text-stone-300' : 'text-sage-600'
          }`}>
            Make your journal feel like home
          </p>
        </div>

        {/* Ambiance Toggle */}
        <div className={`rounded-2xl sm:rounded-3xl shadow-lg border p-4 sm:p-6 lg:p-8 animate-slide-up ${
          user.preferences.theme === 'dark' 
            ? 'bg-stone-800/80 backdrop-blur-sm border-stone-700/50' 
            : 'bg-white/80 backdrop-blur-sm border-white/50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 ${
                user.preferences.theme === 'dark' 
                  ? 'bg-gradient-to-br from-amber-600 to-orange-700 shadow-lg' 
                  : 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg'
              }`}>
                {user.preferences.theme === 'dark' ? (
                  <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                )}
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-semibold ${
                  user.preferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
                }`}>
                  Ambiance
                </h2>
                <p className={`text-xs sm:text-sm ${
                  user.preferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-600'
                }`}>
                  {user.preferences.theme === 'dark' ? 'Cozy evening glow' : 'Bright morning light'}
                </p>
              </div>
            </div>
            
            <div className="relative flex-shrink-0">
              <button
                onClick={() => updatePreference('theme', user.preferences.theme === 'light' ? 'dark' : 'light')}
                className={`relative w-14 h-7 sm:w-16 sm:h-8 rounded-full transition-all duration-500 transform hover:scale-105 ${
                  user.preferences.theme === 'dark' 
                    ? 'bg-gradient-to-r from-stone-700 to-stone-800 shadow-inner' 
                    : 'bg-gradient-to-r from-sky-200 to-blue-300 shadow-inner'
                }`}
              >
                {user.preferences.theme === 'dark' && (
                  <>
                    <div className="absolute top-1 left-1.5 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-yellow-300 rounded-full animate-pulse"></div>
                    <div className="absolute top-1.5 left-3 w-0.5 h-0.5 bg-yellow-200 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-0.5 left-4 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </>
                )}
                
                {user.preferences.theme === 'light' && (
                  <>
                    <div className="absolute top-1 left-1.5 w-1.5 h-0.5 sm:w-2 sm:h-1 bg-white rounded-full opacity-80"></div>
                    <div className="absolute top-1.5 left-2.5 w-1 h-0.5 sm:w-1.5 sm:h-0.5 bg-white rounded-full opacity-60"></div>
                    <div className="absolute top-0.5 left-3.5 w-0.5 h-0.5 sm:w-1 sm:h-0.5 bg-white rounded-full opacity-70"></div>
                  </>
                )}
                
                <div className={`absolute top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all duration-500 flex items-center justify-center shadow-lg ${
                  user.preferences.theme === 'dark' 
                    ? 'translate-x-7 sm:translate-x-8 bg-gradient-to-br from-amber-400 to-orange-500' 
                    : 'translate-x-0.5 bg-gradient-to-br from-yellow-300 to-yellow-400'
                }`}>
                  {user.preferences.theme === 'dark' ? (
                    <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-amber-900" />
                  ) : (
                    <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Font Selection */}
        <div className={`rounded-2xl sm:rounded-3xl shadow-lg border p-4 sm:p-6 lg:p-8 animate-slide-up ${
          user.preferences.theme === 'dark' 
            ? 'bg-stone-800/80 backdrop-blur-sm border-stone-700/50' 
            : 'bg-white/80 backdrop-blur-sm border-white/50'
        }`} style={{animationDelay: '0.1s'}}>
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <Type className={`w-5 h-5 sm:w-6 sm:h-6 ${user.preferences.theme === 'dark' ? 'text-purple-400' : 'text-sage-600'}`} />
            <div>
              <h2 className={`text-lg sm:text-xl font-semibold ${
                user.preferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
              }`}>
                Typography
              </h2>
              <p className={`text-xs sm:text-sm ${
                user.preferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-600'
              }`}>
                Choose fonts that speak to you
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {fontOptions.map((font) => (
              <button
                key={font.id}
                onClick={() => updatePreference('fontFamily', font.id)}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all text-left ${
                  user.preferences.fontFamily === font.id
                    ? user.preferences.theme === 'dark'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-sage-400 bg-sage-50'
                    : user.preferences.theme === 'dark'
                      ? 'border-stone-600 hover:border-stone-500 bg-stone-700/50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-2 sm:space-y-0">
                  <div>
                    <h3 className={`font-medium text-sm sm:text-base ${
                      user.preferences.theme === 'dark' ? 'text-amber-50' : 'text-gray-800'
                    }`}>
                      {font.name}
                    </h3>
                    <p className={`text-xs sm:text-sm ${
                      user.preferences.theme === 'dark' ? 'text-stone-400' : 'text-gray-600'
                    }`}>
                      {font.description}
                    </p>
                  </div>
                </div>
                <p className={`${getFontClass(font.id)} text-sm sm:text-base lg:text-lg ${
                  user.preferences.theme === 'dark' ? 'text-stone-300' : 'text-gray-700'
                }`}>
                  {font.preview}
                </p>
              </button>
            ))}
          </div>

          <div className={`border-t pt-4 sm:pt-6 ${
            user.preferences.theme === 'dark' ? 'border-stone-700' : 'border-gray-200'
          }`}>
            <h3 className={`font-medium mb-3 sm:mb-4 text-sm sm:text-base ${
              user.preferences.theme === 'dark' ? 'text-amber-50' : 'text-gray-800'
            }`}>
              Font Size
            </h3>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              {fontSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => updatePreference('fontSize', size.id)}
                  className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base ${
                    user.preferences.fontSize === size.id
                      ? user.preferences.theme === 'dark'
                        ? 'bg-purple-600 text-white'
                        : 'bg-sage-600 text-white'
                      : user.preferences.theme === 'dark'
                        ? 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ fontSize: size.size }}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ink Color Selection */}
        <div className={`rounded-2xl sm:rounded-3xl shadow-lg border p-4 sm:p-6 lg:p-8 animate-slide-up ${
          user.preferences.theme === 'dark' 
            ? 'bg-stone-800/80 backdrop-blur-sm border-stone-700/50' 
            : 'bg-white/80 backdrop-blur-sm border-white/50'
        }`} style={{animationDelay: '0.2s'}}>
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <Droplet className={`w-5 h-5 sm:w-6 sm:h-6 ${user.preferences.theme === 'dark' ? 'text-pink-400' : 'text-sage-600'}`} />
            <div>
              <h2 className={`text-lg sm:text-xl font-semibold ${
                user.preferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
              }`}>
                Ink Color
              </h2>
              <p className={`text-xs sm:text-sm ${
                user.preferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-600'
              }`}>
                Express yourself with color
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {inkColors.map((ink) => (
              <button
                key={ink.id}
                onClick={() => updatePreference('inkColor', ink.id)}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all text-left ${
                  user.preferences.inkColor === ink.id
                    ? 'border-current bg-current bg-opacity-10'
                    : user.preferences.theme === 'dark'
                      ? 'border-stone-600 hover:border-stone-500 bg-stone-700/50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                style={{ 
                  borderColor: user.preferences.inkColor === ink.id ? ink.color : undefined,
                  backgroundColor: user.preferences.inkColor === ink.id ? `${ink.color}15` : undefined
                }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div 
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-sm"
                    style={{ backgroundColor: ink.color }}
                  />
                  <div>
                    <h3 className={`font-medium text-sm sm:text-base ${
                      user.preferences.theme === 'dark' ? 'text-amber-50' : 'text-gray-800'
                    }`}>
                      {ink.name}
                    </h3>
                    <p className={`text-xs sm:text-sm ${
                      user.preferences.theme === 'dark' ? 'text-stone-400' : 'text-gray-600'
                    }`}>
                      {ink.description}
                    </p>
                  </div>
                </div>
                <p style={{ color: ink.color }} className="font-medium text-xs sm:text-sm">
                  "Today I feel grateful for the small moments that bring me peace..."
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className={`rounded-2xl sm:rounded-3xl shadow-lg border p-4 sm:p-6 lg:p-8 animate-slide-up ${
          user.preferences.theme === 'dark' 
            ? 'bg-stone-800/80 backdrop-blur-sm border-stone-700/50' 
            : 'bg-white/80 backdrop-blur-sm border-white/50'
        }`} style={{animationDelay: '0.3s'}}>
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <Palette className={`w-5 h-5 sm:w-6 sm:h-6 ${user.preferences.theme === 'dark' ? 'text-green-400' : 'text-sage-600'}`} />
            <div>
              <h2 className={`text-lg sm:text-xl font-semibold ${
                user.preferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
              }`}>
                Preview
              </h2>
              <p className={`text-xs sm:text-sm ${
                user.preferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-600'
              }`}>
                See how your journal will look
              </p>
            </div>
          </div>

          <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-dashed ${
            user.preferences.theme === 'dark' ? 'border-stone-600 bg-stone-900/50' : 'border-gray-300 bg-gray-50'
          }`}>
            <div className={`${getFontClass(user.preferences.fontFamily)} leading-relaxed text-sm sm:text-base`}
                 style={{ 
                   color: inkColors.find(c => c.id === user.preferences.inkColor)?.color,
                   fontSize: fontSizes.find(s => s.id === user.preferences.fontSize)?.size
                 }}>
              <p className="mb-3 sm:mb-4">
                <strong>Dear Journal,</strong>
              </p>
              <p className="mb-3 sm:mb-4">
                Today was a beautiful day filled with small moments of joy. I noticed how the morning light 
                filtered through my window, creating dancing shadows on the wall. It reminded me to pause 
                and appreciate the simple beauty that surrounds us every day.
              </p>
              <p className="mb-3 sm:mb-4">
                I'm grateful for this quiet moment to reflect and connect with my thoughts. This space feels 
                like a warm embrace, a place where I can be completely myself without judgment.
              </p>
              <p>
                With love and mindfulness,<br />
                <em>{user.name}</em>
              </p>
            </div>
          </div>
        </div>

        {/* Delete Profile Section */}
        {onDeleteProfile && (
          <div className={`rounded-2xl sm:rounded-3xl shadow-lg border p-4 sm:p-6 lg:p-8 animate-slide-up ${
            user.preferences.theme === 'dark' 
              ? 'bg-red-900/20 backdrop-blur-sm border-red-800/50' 
              : 'bg-red-50/80 backdrop-blur-sm border-red-200/50'
          }`} style={{animationDelay: '0.4s'}}>
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center ${
                user.preferences.theme === 'dark' 
                  ? 'bg-red-800/50' 
                  : 'bg-red-100'
              }`}>
                <Trash2 className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  user.preferences.theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`} />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-semibold ${
                  user.preferences.theme === 'dark' ? 'text-red-300' : 'text-red-800'
                }`}>
                  Delete Profile
                </h2>
                <p className={`text-xs sm:text-sm ${
                  user.preferences.theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`}>
                  Permanently remove your account and all journal entries
                </p>
              </div>
            </div>

            {!showDeleteConfirmation ? (
              <div>
                <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 ${
                  user.preferences.theme === 'dark' 
                    ? 'bg-red-900/30 border border-red-800/50' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${
                      user.preferences.theme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }`} />
                    <div>
                      <h3 className={`font-semibold mb-2 text-sm sm:text-base ${
                        user.preferences.theme === 'dark' ? 'text-red-300' : 'text-red-800'
                      }`}>
                        This action cannot be undone
                      </h3>
                      <ul className={`text-xs sm:text-sm space-y-1 ${
                        user.preferences.theme === 'dark' ? 'text-red-400' : 'text-red-600'
                      }`}>
                        <li>• All your journal entries will be permanently deleted</li>
                        <li>• Your account settings and preferences will be lost</li>
                        <li>• Your streak progress will be reset</li>
                        <li>• This data cannot be recovered</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowDeleteConfirmation(true)}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                    user.preferences.theme === 'dark'
                      ? 'bg-red-800/50 text-red-300 hover:bg-red-800/70 border border-red-700'
                      : 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300'
                  }`}
                >
                  Delete My Profile
                </button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className={`block text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${
                    user.preferences.theme === 'dark' ? 'text-red-300' : 'text-red-800'
                  }`}>
                    To confirm deletion, type "delete my profile" below:
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmationText}
                    onChange={(e) => setDeleteConfirmationText(e.target.value)}
                    placeholder="delete my profile"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-all text-sm sm:text-base ${
                      user.preferences.theme === 'dark'
                        ? 'bg-stone-800 border-red-700 text-red-300 placeholder-red-500 focus:border-red-500'
                        : 'bg-white border-red-300 text-red-800 placeholder-red-400 focus:border-red-500'
                    } focus:ring-2 focus:ring-red-500/20`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => {
                      setShowDeleteConfirmation(false);
                      setDeleteConfirmationText('');
                    }}
                    className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all text-sm sm:text-base ${
                      user.preferences.theme === 'dark'
                        ? 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleDeleteProfile}
                    disabled={!isDeleteConfirmationValid}
                    className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base ${
                      user.preferences.theme === 'dark'
                        ? 'bg-red-700 text-white hover:bg-red-600 disabled:hover:bg-red-700'
                        : 'bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600'
                    }`}
                  >
                    Permanently Delete Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}