import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React including components, props, and state management.',
    duration: 45,
    difficulty: 'Beginner',
    category: 'Frontend Development',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: {
      text: `
        <h2>Welcome to React!</h2>
        <p>React is a popular JavaScript library for building user interfaces, especially web applications. It was created by Facebook and is now maintained by Meta and the open-source community.</p>
        
        <h3>Key Concepts:</h3>
        <ul>
          <li><strong>Components:</strong> React apps are built using components, which are reusable pieces of UI.</li>
          <li><strong>JSX:</strong> A syntax extension that allows you to write HTML-like code in JavaScript.</li>
          <li><strong>Props:</strong> Short for properties, these are how you pass data to components.</li>
          <li><strong>State:</strong> Data that can change over time in your component.</li>
        </ul>
        
        <h3>Your First Component:</h3>
        <pre><code>function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}</code></pre>
        
        <p>This simple component takes a name prop and displays a greeting. Components like this are the building blocks of React applications.</p>
      `,
      videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
      quiz: {
        questions: [
          {
            id: '1',
            question: 'What is JSX?',
            options: [
              'A JavaScript framework',
              'A syntax extension for JavaScript',
              'A CSS preprocessor',
              'A database query language'
            ],
            correctAnswer: 1
          },
          {
            id: '2',
            question: 'How do you pass data to a React component?',
            options: ['Using state', 'Using props', 'Using hooks', 'Using context'],
            correctAnswer: 1
          }
        ]
      }
    }
  },
  {
    id: '2',
    title: 'CSS Grid Layout',
    description: 'Master CSS Grid to create complex, responsive layouts with ease.',
    duration: 60,
    difficulty: 'Intermediate',
    category: 'CSS & Styling',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: {
      text: `
        <h2>CSS Grid Layout</h2>
        <p>CSS Grid is a powerful layout system that allows you to create complex, responsive designs with ease. Unlike Flexbox, which is one-dimensional, Grid is two-dimensional.</p>
        
        <h3>Grid Container Properties:</h3>
        <ul>
          <li><code>display: grid</code> - Creates a grid container</li>
          <li><code>grid-template-columns</code> - Defines column sizes</li>
          <li><code>grid-template-rows</code> - Defines row sizes</li>
          <li><code>gap</code> - Sets spacing between grid items</li>
        </ul>
        
        <h3>Example:</h3>
        <pre><code>.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}</code></pre>
        
        <p>This creates a 3-column grid with equal column widths and 20px gaps between items.</p>
      `,
      quiz: {
        questions: [
          {
            id: '1',
            question: 'What does "fr" mean in CSS Grid?',
            options: [
              'Fixed ratio',
              'Fractional unit',
              'Flexible responsive',
              'Full range'
            ],
            correctAnswer: 1
          }
        ]
      }
    }
  },
  {
    id: '3',
    title: 'JavaScript ES6+ Features',
    description: 'Explore modern JavaScript features that make your code cleaner and more efficient.',
    duration: 75,
    difficulty: 'Intermediate',
    category: 'JavaScript',
    thumbnail: 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: {
      text: `
        <h2>Modern JavaScript (ES6+)</h2>
        <p>ES6 and later versions introduced many features that make JavaScript more powerful and easier to work with.</p>
        
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Arrow Functions:</strong> Shorter syntax for functions</li>
          <li><strong>Destructuring:</strong> Extract values from arrays and objects</li>
          <li><strong>Template Literals:</strong> Better string interpolation</li>
          <li><strong>Promises:</strong> Handle asynchronous operations</li>
          <li><strong>Modules:</strong> Import and export functionality</li>
        </ul>
        
        <h3>Arrow Functions Example:</h3>
        <pre><code>// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;</code></pre>
        
        <h3>Destructuring Example:</h3>
        <pre><code>const person = { name: 'John', age: 30 };
const { name, age } = person;</code></pre>
      `,
      videoUrl: 'https://www.youtube.com/embed/2LeqilIw-28',
      quiz: {
        questions: [
          {
            id: '1',
            question: 'What is the syntax for an arrow function with one parameter?',
            options: [
              '(x) => x * 2',
              'x => x * 2',
              'Both are correct',
              'Neither is correct'
            ],
            correctAnswer: 2
          }
        ]
      }
    }
  },
  {
    id: '4',
    title: 'Responsive Web Design',
    description: 'Create websites that work perfectly on all devices using modern CSS techniques.',
    duration: 90,
    difficulty: 'Beginner',
    category: 'Web Design',
    thumbnail: 'https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: {
      text: `
        <h2>Responsive Web Design</h2>
        <p>Responsive design ensures your website looks and works great on all devices - from mobile phones to large desktop screens.</p>
        
        <h3>Core Principles:</h3>
        <ul>
          <li><strong>Flexible Grid Systems:</strong> Use relative units like percentages</li>
          <li><strong>Media Queries:</strong> Apply different styles for different screen sizes</li>
          <li><strong>Flexible Images:</strong> Images that scale with their container</li>
          <li><strong>Mobile-First Approach:</strong> Start with mobile design, then enhance for larger screens</li>
        </ul>
        
        <h3>Media Query Example:</h3>
        <pre><code>/* Mobile styles (default) */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    width: 1000px;
    padding: 20px;
  }
}</code></pre>
      `,
      quiz: {
        questions: [
          {
            id: '1',
            question: 'What is the mobile-first approach?',
            options: [
              'Designing for mobile devices only',
              'Starting with mobile design and enhancing for larger screens',
              'Testing on mobile devices first',
              'Using mobile-specific frameworks'
            ],
            correctAnswer: 1
          }
        ]
      }
    }
  }
];