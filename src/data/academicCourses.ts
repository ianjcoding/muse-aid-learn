// Comprehensive academic courses for all education levels
// Organized by primary, high school, and advanced (career-specialized) levels

export interface AcademicCourse {
  id: string;
  title: string;
  description: string;
  education_level: 'primary' | 'highschool' | 'advanced';
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  subject: string;
  career_path?: string; // For advanced level courses
  duration: string;
  order_index: number;
}

export const academicCourses: AcademicCourse[] = [
  // PRIMARY LEVEL - Essential Subjects
  {
    id: 'primary-math-basics',
    title: 'Mathematics Fundamentals',
    description: 'Learn basic arithmetic, numbers, addition, subtraction, multiplication, and division.',
    education_level: 'primary',
    difficulty_level: 'beginner',
    subject: 'Mathematics',
    duration: '8 weeks',
    order_index: 1,
  },
  {
    id: 'primary-english-basics',
    title: 'English Language Basics',
    description: 'Master reading, writing, grammar, and vocabulary for effective communication.',
    education_level: 'primary',
    difficulty_level: 'beginner',
    subject: 'English',
    duration: '8 weeks',
    order_index: 2,
  },
  {
    id: 'primary-kiswahili-basics',
    title: 'Kiswahili Language Fundamentals',
    description: 'Learn to read, write, and speak Kiswahili with proper grammar and vocabulary.',
    education_level: 'primary',
    difficulty_level: 'beginner',
    subject: 'Kiswahili',
    duration: '8 weeks',
    order_index: 3,
  },
  {
    id: 'primary-science-basics',
    title: 'Science Exploration',
    description: 'Discover the wonders of nature, living things, matter, and basic scientific principles.',
    education_level: 'primary',
    difficulty_level: 'beginner',
    subject: 'Science',
    duration: '8 weeks',
    order_index: 4,
  },
  {
    id: 'primary-social-studies',
    title: 'Social Studies Foundations',
    description: 'Learn about your community, country, culture, history, and citizenship.',
    education_level: 'primary',
    difficulty_level: 'beginner',
    subject: 'Social Studies',
    duration: '8 weeks',
    order_index: 5,
  },
  {
    id: 'primary-religious-education',
    title: 'Religious Education',
    description: 'Explore moral values, ethics, and religious teachings to build character.',
    education_level: 'primary',
    difficulty_level: 'beginner',
    subject: 'Religious Education',
    duration: '6 weeks',
    order_index: 6,
  },
  {
    id: 'primary-arts-crafts',
    title: 'Arts and Crafts',
    description: 'Express creativity through drawing, painting, and hands-on craft projects.',
    education_level: 'primary',
    difficulty_level: 'beginner',
    subject: 'Arts',
    duration: '6 weeks',
    order_index: 7,
  },
  {
    id: 'primary-physical-education',
    title: 'Physical Education and Sports',
    description: 'Learn about fitness, health, and develop sports skills through play.',
    education_level: 'primary',
    difficulty_level: 'beginner',
    subject: 'Physical Education',
    duration: '6 weeks',
    order_index: 8,
  },

  // HIGH SCHOOL LEVEL - Advanced Subjects
  {
    id: 'highschool-advanced-math',
    title: 'Advanced Mathematics',
    description: 'Master algebra, geometry, trigonometry, and calculus fundamentals.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    subject: 'Mathematics',
    duration: '16 weeks',
    order_index: 10,
  },
  {
    id: 'highschool-english-literature',
    title: 'English Language and Literature',
    description: 'Develop advanced writing skills, literary analysis, and critical thinking.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    subject: 'English',
    duration: '16 weeks',
    order_index: 11,
  },
  {
    id: 'highschool-kiswahili-advanced',
    title: 'Advanced Kiswahili and Literature',
    description: 'Study Kiswahili literature, poetry, and advanced composition.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    subject: 'Kiswahili',
    duration: '16 weeks',
    order_index: 12,
  },
  {
    id: 'highschool-biology',
    title: 'Biology',
    description: 'Explore life sciences, cells, genetics, ecology, and human anatomy.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    subject: 'Biology',
    duration: '16 weeks',
    order_index: 13,
  },
  {
    id: 'highschool-chemistry',
    title: 'Chemistry',
    description: 'Study matter, chemical reactions, organic chemistry, and laboratory techniques.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    subject: 'Chemistry',
    duration: '16 weeks',
    order_index: 14,
  },
  {
    id: 'highschool-physics',
    title: 'Physics',
    description: 'Understand mechanics, electricity, magnetism, waves, and modern physics.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    subject: 'Physics',
    duration: '16 weeks',
    order_index: 15,
  },
  {
    id: 'highschool-history',
    title: 'History and Government',
    description: 'Learn world history, national history, and political systems.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    subject: 'History',
    duration: '14 weeks',
    order_index: 16,
  },
  {
    id: 'highschool-geography',
    title: 'Geography',
    description: 'Study physical geography, human geography, and environmental studies.',
    education_level: 'highschool',
    difficulty_level: 'intermediate',
    subject: 'Geography',
    duration: '14 weeks',
    order_index: 17,
  },

  // ADVANCED LEVEL - Medicine Career Path
  {
    id: 'medicine-anatomy',
    title: 'Human Anatomy and Physiology',
    description: 'Comprehensive study of human body systems and their functions.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Medicine',
    career_path: 'Medicine',
    duration: '20 weeks',
    order_index: 20,
  },
  {
    id: 'medicine-pharmacology',
    title: 'Pharmacology Fundamentals',
    description: 'Study drugs, their mechanisms, interactions, and therapeutic applications.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Medicine',
    career_path: 'Medicine',
    duration: '18 weeks',
    order_index: 21,
  },

  // ADVANCED LEVEL - Accounting Career Path
  {
    id: 'accounting-principles',
    title: 'Accounting Principles',
    description: 'Master financial accounting, bookkeeping, and financial statements.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Accounting',
    career_path: 'Accounting',
    duration: '18 weeks',
    order_index: 30,
  },
  {
    id: 'accounting-taxation',
    title: 'Taxation and Tax Law',
    description: 'Learn tax regulations, corporate taxation, and tax planning strategies.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Accounting',
    career_path: 'Accounting',
    duration: '16 weeks',
    order_index: 31,
  },

  // ADVANCED LEVEL - Education Career Path
  {
    id: 'education-pedagogy',
    title: 'Teaching Methods and Pedagogy',
    description: 'Learn effective teaching strategies, curriculum design, and classroom management.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Education',
    career_path: 'Education',
    duration: '16 weeks',
    order_index: 40,
  },
  {
    id: 'education-psychology',
    title: 'Educational Psychology',
    description: 'Understand learning theories, child development, and student behavior.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Education',
    career_path: 'Education',
    duration: '14 weeks',
    order_index: 41,
  },

  // ADVANCED LEVEL - Engineering Career Path
  {
    id: 'engineering-mechanics',
    title: 'Engineering Mechanics',
    description: 'Study statics, dynamics, and strength of materials for engineering applications.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Engineering',
    career_path: 'Engineering',
    duration: '20 weeks',
    order_index: 50,
  },
  {
    id: 'engineering-electrical',
    title: 'Electrical Engineering Fundamentals',
    description: 'Learn circuit theory, electronics, and electrical systems design.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Engineering',
    career_path: 'Engineering',
    duration: '20 weeks',
    order_index: 51,
  },

  // ADVANCED LEVEL - Business Administration Career Path
  {
    id: 'business-management',
    title: 'Business Management Essentials',
    description: 'Master organizational behavior, strategic planning, and leadership skills.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Business',
    career_path: 'Business Administration',
    duration: '16 weeks',
    order_index: 60,
  },
  {
    id: 'business-marketing',
    title: 'Marketing and Sales Strategy',
    description: 'Learn market analysis, consumer behavior, and digital marketing techniques.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Business',
    career_path: 'Business Administration',
    duration: '14 weeks',
    order_index: 61,
  },

  // ADVANCED LEVEL - Law Career Path
  {
    id: 'law-constitutional',
    title: 'Constitutional Law',
    description: 'Study constitutional principles, rights, and governmental powers.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Law',
    career_path: 'Law',
    duration: '18 weeks',
    order_index: 70,
  },
  {
    id: 'law-criminal',
    title: 'Criminal Law and Procedure',
    description: 'Learn criminal justice system, offenses, and legal procedures.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Law',
    career_path: 'Law',
    duration: '18 weeks',
    order_index: 71,
  },

  // ADVANCED LEVEL - Information Technology Career Path
  {
    id: 'it-programming',
    title: 'Software Development',
    description: 'Master programming, algorithms, and software engineering principles.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Information Technology',
    career_path: 'Information Technology',
    duration: '20 weeks',
    order_index: 80,
  },
  {
    id: 'it-networks',
    title: 'Network Administration and Security',
    description: 'Learn network architecture, cybersecurity, and system administration.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Information Technology',
    career_path: 'Information Technology',
    duration: '18 weeks',
    order_index: 81,
  },

  // ADVANCED LEVEL - Nursing Career Path
  {
    id: 'nursing-fundamentals',
    title: 'Nursing Fundamentals',
    description: 'Learn patient care, medical procedures, and nursing ethics.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Nursing',
    career_path: 'Nursing',
    duration: '20 weeks',
    order_index: 90,
  },
  {
    id: 'nursing-clinical',
    title: 'Clinical Nursing Practice',
    description: 'Develop clinical skills, diagnosis, and patient management techniques.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Nursing',
    career_path: 'Nursing',
    duration: '20 weeks',
    order_index: 91,
  },

  // ADVANCED LEVEL - Agriculture Career Path
  {
    id: 'agriculture-crop',
    title: 'Crop Production and Management',
    description: 'Study crop science, soil management, and sustainable farming practices.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Agriculture',
    career_path: 'Agriculture',
    duration: '18 weeks',
    order_index: 100,
  },
  {
    id: 'agriculture-animal',
    title: 'Animal Husbandry and Veterinary Science',
    description: 'Learn livestock management, animal health, and veterinary care.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Agriculture',
    career_path: 'Agriculture',
    duration: '18 weeks',
    order_index: 101,
  },

  // ADVANCED LEVEL - Architecture Career Path
  {
    id: 'architecture-design',
    title: 'Architectural Design Principles',
    description: 'Master building design, spatial planning, and architectural theory.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Architecture',
    career_path: 'Architecture',
    duration: '20 weeks',
    order_index: 110,
  },
  {
    id: 'architecture-construction',
    title: 'Construction Technology',
    description: 'Learn construction methods, materials, and project management.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Architecture',
    career_path: 'Architecture',
    duration: '18 weeks',
    order_index: 111,
  },

  // ADVANCED LEVEL - Psychology Career Path
  {
    id: 'psychology-clinical',
    title: 'Clinical Psychology',
    description: 'Study mental health disorders, diagnosis, and therapeutic interventions.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Psychology',
    career_path: 'Psychology',
    duration: '18 weeks',
    order_index: 120,
  },
  {
    id: 'psychology-counseling',
    title: 'Counseling and Therapy Techniques',
    description: 'Learn counseling methods, communication skills, and client management.',
    education_level: 'advanced',
    difficulty_level: 'advanced',
    subject: 'Psychology',
    career_path: 'Psychology',
    duration: '16 weeks',
    order_index: 121,
  },
];

// Helper functions
export const getCoursesByLevel = (level: 'primary' | 'highschool' | 'advanced') => {
  return academicCourses.filter(course => course.education_level === level);
};

export const getCoursesByCareerPath = (careerPath: string) => {
  return academicCourses.filter(course => course.career_path === careerPath);
};

export const getCareerPaths = () => {
  const paths = new Set(academicCourses
    .filter(course => course.career_path)
    .map(course => course.career_path as string)
  );
  return Array.from(paths).sort();
};
