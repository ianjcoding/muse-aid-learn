import webdevImage from "@/assets/course-webdev.jpg";
import datascienceImage from "@/assets/course-datascience.jpg";
import marketingImage from "@/assets/course-marketing.jpg";
import designImage from "@/assets/course-design.jpg";

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  students: number;
  level: string;
  materials: Material[];
}

export interface Material {
  id: string;
  title: string;
  type: "video" | "pdf" | "quiz" | "article";
  duration?: string;
  completed: boolean;
}

export const courses: Course[] = [
  {
    id: "web-dev-101",
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript from scratch. Build responsive websites and master the fundamentals of web development.",
    image: webdevImage,
    duration: "12 weeks",
    students: 15420,
    level: "Beginner",
    materials: [
      { id: "1", title: "Introduction to HTML", type: "video", duration: "45 min", completed: false },
      { id: "2", title: "HTML Elements Guide", type: "pdf", completed: false },
      { id: "3", title: "HTML Quiz", type: "quiz", completed: false },
      { id: "4", title: "CSS Basics", type: "video", duration: "60 min", completed: false },
      { id: "5", title: "CSS Flexbox and Grid", type: "article", completed: false },
      { id: "6", title: "JavaScript Introduction", type: "video", duration: "90 min", completed: false },
    ]
  },
  {
    id: "data-science",
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning with Python. Learn pandas, numpy, and scikit-learn.",
    image: datascienceImage,
    duration: "16 weeks",
    students: 12350,
    level: "Intermediate",
    materials: [
      { id: "1", title: "Python for Data Science", type: "video", duration: "120 min", completed: false },
      { id: "2", title: "Pandas Documentation", type: "pdf", completed: false },
      { id: "3", title: "Data Cleaning Quiz", type: "quiz", completed: false },
      { id: "4", title: "Data Visualization", type: "video", duration: "90 min", completed: false },
      { id: "5", title: "Machine Learning Basics", type: "video", duration: "150 min", completed: false },
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Mastery",
    description: "Learn SEO, social media marketing, content strategy, and analytics to grow your online presence.",
    image: marketingImage,
    duration: "10 weeks",
    students: 18900,
    level: "Beginner",
    materials: [
      { id: "1", title: "Digital Marketing Overview", type: "video", duration: "40 min", completed: false },
      { id: "2", title: "SEO Fundamentals", type: "article", completed: false },
      { id: "3", title: "SEO Quiz", type: "quiz", completed: false },
      { id: "4", title: "Social Media Strategy", type: "video", duration: "75 min", completed: false },
      { id: "5", title: "Content Marketing Guide", type: "pdf", completed: false },
    ]
  },
  {
    id: "graphic-design",
    title: "Graphic Design Essentials",
    description: "Master design principles, typography, color theory, and industry-standard tools like Adobe Creative Suite.",
    image: designImage,
    duration: "14 weeks",
    students: 9800,
    level: "Beginner",
    materials: [
      { id: "1", title: "Design Principles", type: "video", duration: "50 min", completed: false },
      { id: "2", title: "Color Theory Guide", type: "pdf", completed: false },
      { id: "3", title: "Typography Basics", type: "video", duration: "45 min", completed: false },
      { id: "4", title: "Design Tools Overview", type: "video", duration: "80 min", completed: false },
      { id: "5", title: "Design Principles Quiz", type: "quiz", completed: false },
    ]
  },
];
