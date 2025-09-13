import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import Navbar from './components/Navbar';
import OfflineIndicator from './components/OfflineIndicator';
import { Lesson as LessonType } from './types';
import { lessons } from './data/lessons';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'lesson'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cachedLessons, setCachedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simple authentication simulation
    if (email && password) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  };

  const handleLessonSelect = (lesson: LessonType) => {
    setSelectedLesson(lesson);
    setCurrentPage('lesson');
    // Cache lesson for offline access
    setCachedLessons(prev => new Set([...prev, lesson.id]));
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedLesson(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
    setSelectedLesson(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <OfflineIndicator 
        isOnline={isOnline} 
        cachedCount={cachedLessons.size}
      />
      
      {isAuthenticated && (
        <Navbar 
          onBackToDashboard={handleBackToDashboard}
          onLogout={handleLogout}
          currentPage={currentPage}
        />
      )}

      <main className="container mx-auto px-4 py-4">
        {currentPage === 'login' && (
          <Login onLogin={handleLogin} />
        )}
        
        {currentPage === 'dashboard' && (
          <Dashboard 
            lessons={lessons}
            onLessonSelect={handleLessonSelect}
            cachedLessons={cachedLessons}
            isOnline={isOnline}
          />
        )}
        
        {currentPage === 'lesson' && selectedLesson && (
          <Lesson 
            lesson={selectedLesson}
            onBack={handleBackToDashboard}
            isOnline={isOnline}
            isCached={cachedLessons.has(selectedLesson.id)}
          />
        )}
      </main>
    </div>
  );
}

export default App;