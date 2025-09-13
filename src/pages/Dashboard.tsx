import React from 'react';
import { Search, Filter, TrendingUp, Users, Award } from 'lucide-react';
import LessonCard from '../components/LessonCard';
import { Lesson } from '../types';

interface DashboardProps {
  lessons: Lesson[];
  onLessonSelect: (lesson: Lesson) => void;
  cachedLessons: Set<string>;
  isOnline: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  lessons, 
  onLessonSelect, 
  cachedLessons, 
  isOnline 
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', ...Array.from(new Set(lessons.map(lesson => lesson.category)))];
  
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCachedSize = cachedLessons.size * 2.5; // Approximate MB per lesson
  const dataSaved = totalCachedSize * 0.6; // Assume 60% data savings offline

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          Continue your learning journey with our curated lessons.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available Lessons</p>
              <p className="text-2xl font-bold text-gray-900">{lessons.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cached Offline</p>
              <p className="text-2xl font-bold text-gray-900">{cachedLessons.size}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-amber-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Data Saved</p>
              <p className="text-2xl font-bold text-gray-900">{dataSaved.toFixed(1)}MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search lessons..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map(lesson => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onClick={onLessonSelect}
            isCached={cachedLessons.has(lesson.id)}
            isOnline={isOnline}
          />
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No lessons found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;