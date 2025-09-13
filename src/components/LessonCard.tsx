import React from 'react';
import { Clock, Signal, Download, WifiOff } from 'lucide-react';
import { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  onClick: (lesson: Lesson) => void;
  isCached: boolean;
  isOnline: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onClick, isCached, isOnline }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const canAccess = isOnline || isCached;

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
        !canAccess ? 'opacity-75' : ''
      }`}
      onClick={() => canAccess && onClick(lesson)}
    >
      <div className="relative">
        <img
          src={lesson.thumbnail}
          alt={lesson.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          {isCached && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <Download className="h-3 w-3 mr-1" />
              Cached
            </div>
          )}
          {!isOnline && !isCached && (
            <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline
            </div>
          )}
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{lesson.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{lesson.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {lesson.duration} min
          </div>
          <div className="flex items-center">
            <Signal className="h-4 w-4 mr-1" />
            {lesson.category}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className={`text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            canAccess 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}>
            {canAccess ? 'Start Learning' : 'Requires Internet'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;