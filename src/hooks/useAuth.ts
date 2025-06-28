import { useState, useCallback } from 'react';
import { User } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useAuth() {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('stillpoint_user', null);
  const [users, setUsers] = useLocalStorage<User[]>('stillpoint_users', []);

  const login = useCallback((email: string, password: string): boolean => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  }, [users, setCurrentUser]);

  const signup = useCallback((email: string, password: string, name: string): boolean => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString(),
      streak: 0,
      preferences: {
        theme: 'light',
        notifications: true,
        fontFamily: 'inter',
        inkColor: 'sage',
        fontSize: 'medium'
      }
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  }, [users, setUsers, setCurrentUser]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('stillpoint_user');
  }, [setCurrentUser]);

  const deleteProfile = useCallback(() => {
    if (!currentUser) return;

    setUsers(prev => prev.filter(u => u.id !== currentUser.id));
    
    const existingEntries = JSON.parse(localStorage.getItem('stillpoint_entries') || '[]');
    const filteredEntries = existingEntries.filter((entry: any) => entry.userId !== currentUser.id);
    localStorage.setItem('stillpoint_entries', JSON.stringify(filteredEntries));
    
    setCurrentUser(null);
    localStorage.removeItem('stillpoint_user');
  }, [currentUser, setUsers, setCurrentUser]);

  const updateUser = useCallback((updates: Partial<User>) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
  }, [currentUser, setCurrentUser, setUsers]);

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    signup,
    logout,
    deleteProfile,
    updateUser
  };
}