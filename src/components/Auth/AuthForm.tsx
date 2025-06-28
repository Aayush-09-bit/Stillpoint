import React, { useState } from 'react';
import { Eye, EyeOff, Heart } from 'lucide-react';

interface AuthFormProps {
  onLogin: (email: string, password: string) => boolean;
  onSignup: (email: string, password: string, name: string) => boolean;
}

export function AuthForm({ onLogin, onSignup }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let success = false;
      
      if (isLogin) {
        success = onLogin(formData.email, formData.password);
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        if (formData.name.trim().length < 2) {
          setError('Name must be at least 2 characters');
          return;
        }
        success = onSignup(formData.email, formData.password, formData.name);
        if (!success) {
          setError('An account with this email already exists');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-sage-200/20 to-sage-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-cream-200/20 to-cream-300/20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-sage-300/20 to-sage-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          {/* Simplified Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-full flex items-center justify-center shadow-xl animate-breathe">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-sage-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Simplified Text */}
          <h1 className="text-4xl font-serif font-bold text-sage-800 mb-3">
            StillPoint
          </h1>
          <p className="text-sage-600 text-lg font-medium">
            Life. Captured.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-sage-200/50 animate-slide-up">
          <div className="flex mb-8 bg-sage-50 rounded-2xl p-1.5">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-sage-800 shadow-md'
                  : 'text-sage-600 hover:text-sage-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-sage-800 shadow-md'
                  : 'text-sage-600 hover:text-sage-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="animate-slide-up">
                <label htmlFor="name" className="block text-sm font-semibold text-sage-800 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-sage-200 rounded-xl focus:ring-3 focus:ring-sage-300/50 focus:border-sage-400 transition-all bg-white text-sage-900 placeholder-sage-400 font-medium"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-sage-800 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-sage-200 rounded-xl focus:ring-3 focus:ring-sage-300/50 focus:border-sage-400 transition-all bg-white text-sage-900 placeholder-sage-400 font-medium"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-sage-800 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border-2 border-sage-200 rounded-xl focus:ring-3 focus:ring-sage-300/50 focus:border-sage-400 transition-all bg-white text-sage-900 placeholder-sage-400 font-medium"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-500 hover:text-sage-700 transition-colors p-1 rounded-lg hover:bg-sage-100"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 animate-shake">
                <p className="text-red-700 text-sm font-medium">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sage-500 to-sage-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-sage-600 hover:to-sage-700 focus:ring-3 focus:ring-sage-300/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {!isLogin && (
            <div className="mt-6 text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Heart className="w-4 h-4 text-sage-500" />
              </div>
              <p className="text-xs text-sage-600 leading-relaxed">
                Join StillPoint for mindful journaling and self-discovery
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}