// Programming courses focused on JavaScript, Python, HTML, and CSS
// Organized by education level: primary, highschool, advanced

export interface ProgrammingCourse {
  id: string;
  title: string;
  description: string;
  education_level: 'primary' | 'highschool' | 'advanced';
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  language: 'javascript' | 'python' | 'html' | 'css';
  duration: string;
  order_index: number;
}

export const programmingCourses: ProgrammingCourse[] = [
  // PRIMARY LEVEL
  {
    id: 'primary-html-basics',
    title: 'My First Website - HTML Basics',
    description: 'Learn to create your first webpage! Discover how to add headings, paragraphs, images, and links.',
    education_level: 'primary',
    difficulty_level: 'beginner',
    language: 'html',
    duration: '4 weeks',
    order_index: 1,
  },
  {
    id: 'primary-css-colors',
    title: 'Making Websites Colorful with CSS',
    description: 'Learn to add colors, fonts, and make your websites beautiful!',
    education_level: 'primary',
    difficulty_level: 'beginner',
    language: 'css',
    duration: '4 weeks',
    order_index: 2,
  },
  {
    id: 'primary-python-intro',
    title: 'Python for Kids - Getting Started',
    description: 'Start your coding journey with Python! Learn to print messages and do simple math.',
    education_level: 'primary',
    difficulty_level: 'beginner',
    language: 'python',
    duration: '6 weeks',
    order_index: 3,
  },

  // HIGH SCHOOL LEVEL
  {
    id: 'highschool-html-advanced',
    title: 'HTML5 - Building Modern Websites',
    description: 'Master semantic HTML, forms, tables, and multimedia elements for professional websites.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    language: 'html',
    duration: '8 weeks',
    order_index: 10,
  },
  {
    id: 'highschool-css-responsive',
    title: 'Responsive Web Design with CSS',
    description: 'Learn CSS Grid, Flexbox, and responsive design to create websites that work on all devices.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    language: 'css',
    duration: '10 weeks',
    order_index: 11,
  },
  {
    id: 'highschool-javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    description: 'Learn programming basics with JavaScript: variables, functions, loops, and DOM manipulation.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    language: 'javascript',
    duration: '12 weeks',
    order_index: 12,
  },
  {
    id: 'highschool-python-programming',
    title: 'Python Programming Essentials',
    description: 'Master Python fundamentals: data structures, functions, file handling, and object-oriented programming.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    language: 'python',
    duration: '12 weeks',
    order_index: 13,
  },

  // ADVANCED LEVEL
  {
    id: 'advanced-javascript-frameworks',
    title: 'Modern JavaScript & React',
    description: 'Build professional web applications with modern JavaScript, ES6+, and React framework.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    language: 'javascript',
    duration: '16 weeks',
    order_index: 20,
  },
  {
    id: 'advanced-python-data-science',
    title: 'Python for Data Science & AI',
    description: 'Advanced Python with pandas, NumPy, machine learning, and data visualization.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    language: 'python',
    duration: '20 weeks',
    order_index: 21,
  },
  {
    id: 'advanced-python-backend',
    title: 'Backend Development with Python',
    description: 'Build scalable web applications with Django, Flask, databases, and APIs.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    language: 'python',
    duration: '18 weeks',
    order_index: 22,
  },
  {
    id: 'advanced-fullstack-web',
    title: 'Full Stack Web Development',
    description: 'Master HTML, CSS, JavaScript, and Python to become a full-stack developer.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    language: 'javascript',
    duration: '24 weeks',
    order_index: 23,
  },
];
