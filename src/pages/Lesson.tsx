import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle, Download, Wifi, WifiOff } from 'lucide-react';
import { Lesson as LessonType } from '../types';

interface LessonProps {
  lesson: LessonType;
  onBack: () => void;
  isOnline: boolean;
  isCached: boolean;
}

const Lesson: React.FC<LessonProps> = ({ lesson, onBack, isOnline, isCached }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'quiz'>('content');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleQuizSubmit = () => {
    let correct = 0;
    lesson.content.quiz.questions.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    setQuizScore(correct);
    setQuizSubmitted(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Dashboard
        </button>
        
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-gray-500" />
          )}
          {isCached && (
            <div className="flex items-center text-green-600 text-sm">
              <Download className="h-4 w-4 mr-1" />
              Available Offline
            </div>
          )}
        </div>
      </div>

      {/* Lesson Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={lesson.thumbnail}
            alt={lesson.title}
            className="w-full md:w-48 h-32 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
            <p className="text-gray-600 mb-4">{lesson.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                {lesson.difficulty}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {lesson.category}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {lesson.duration} minutes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'content'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Lesson Content
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'quiz'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quiz ({lesson.content.quiz.questions.length} questions)
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Video Section */}
              {lesson.content.videoUrl && (isOnline || isCached) && (
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <div className="aspect-video">
                    {isOnline ? (
                      <iframe
                        src={lesson.content.videoUrl}
                        title={lesson.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-200">
                        <div className="text-center">
                          <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Video available when online</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Text Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.content.text }}
              />
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-6">
              {!quizSubmitted ? (
                <>
                  {lesson.content.quiz.questions.map((question, questionIndex) => (
                    <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {questionIndex + 1}. {question.question}
                      </h3>
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={optionIndex}
                              checked={quizAnswers[question.id] === optionIndex}
                              onChange={() => handleQuizAnswer(question.id, optionIndex)}
                              className="mr-3 text-blue-600 focus:ring-blue-500"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < lesson.content.quiz.questions.length}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Quiz
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
                  <p className="text-gray-600 mb-4">
                    You scored {quizScore} out of {lesson.content.quiz.questions.length} questions correctly.
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(quizScore / lesson.content.quiz.questions.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round((quizScore / lesson.content.quiz.questions.length) * 100)}%
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesson;