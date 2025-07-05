import React from 'react';
import { Calendar, BarChart3, Home, LogOut, Settings } from 'lucide-react';
import { User as UserType, ViewType } from '../../types';

interface HeaderProps {
  user: UserType;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
}

export function Header({ user, currentView, onViewChange, onLogout }: HeaderProps) {
  const navItems = [
    { id: 'home' as ViewType, label: 'Home', icon: Home },
    { id: 'calendar' as ViewType, label: 'Calendar', icon: Calendar },
    { id: 'analytics' as ViewType, label: 'Insights', icon: BarChart3 },
    { id: 'settings' as ViewType, label: 'Settings', icon: Settings },
  ];

  return (
    <header className={`backdrop-blur-xl border-b-2 sticky top-0 z-50 shadow-lg transition-all duration-500 ${
      user.preferences.theme === 'dark' 
        ? 'bg-stone-900/95 border-stone-700 shadow-amber-500/10' 
        : 'bg-white/95 border-sage-200 shadow-sage-500/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Simplified Logo */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg animate-breathe ${
                user.preferences.theme === 'dark' 
                  ? 'bg-gradient-to-br from-amber-600 to-amber-700' 
                  : 'bg-gradient-to-br from-sage-500 to-sage-600'
              }`}>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full flex items-center justify-center">
                  <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    user.preferences.theme === 'dark' ? 'bg-amber-600' : 'bg-sage-500'
                  }`}></div>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-xl sm:text-2xl font-serif font-bold ${
                  user.preferences.theme === 'dark' 
                    ? 'text-amber-200' 
                    : 'text-sage-800'
                }`}>
                  StillPoint
                </h1>
                <p className={`text-xs -mt-1 font-medium ${
                  user.preferences.theme === 'dark' ? 'text-stone-400' : 'text-sage-600'
                }`}>
                  Life. Captured.
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`px-4 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                      currentView === item.id
                        ? user.preferences.theme === 'dark'
                          ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/30'
                          : 'bg-gradient-to-r from-sage-500 to-sage-600 text-white shadow-lg shadow-sage-500/30'
                        : user.preferences.theme === 'dark'
                          ? 'text-stone-300 hover:text-amber-50 hover:bg-stone-800/50'
                          : 'text-sage-600 hover:text-sage-800 hover:bg-sage-50/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mobile Navigation */}
          <nav className="lg:hidden flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                    currentView === item.id
                      ? user.preferences.theme === 'dark'
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-sage-500 to-sage-600 text-white shadow-lg'
                      : user.preferences.theme === 'dark'
                        ? 'text-stone-300 hover:text-amber-50 hover:bg-stone-800/50'
                        : 'text-sage-600 hover:text-sage-800 hover:bg-sage-50/50'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:block text-right">
              <p className={`text-sm font-bold ${
                user.preferences.theme === 'dark' ? 'text-amber-50' : 'text-sage-800'
              }`}>
                Hello, {user.name}
              </p>
            </div>
            
           
            <button
              onClick={onLogout}
              className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                user.preferences.theme === 'dark'
                  ? 'text-stone-300 hover:text-amber-50 hover:bg-stone-800/50'
                  : 'text-sage-600 hover:text-sage-800 hover:bg-sage-50/50'
              }`}
              title="Sign out"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}