export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  content: {
    text: string;
    videoUrl?: string;
    quiz: Quiz;
  };
  thumbnail: string;
}

export interface Quiz {
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface User {
  email: string;
  name: string;
}