import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import AIAssistant from "@/components/AIAssistant";
import { academicCourses, getCoursesByLevel, getCareerPaths } from "@/data/academicCourses";
import heroImage from "@/assets/hero-learning.jpg";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const primaryCourses = getCoursesByLevel('primary');
  const highschoolCourses = getCoursesByLevel('highschool');
  const advancedCourses = getCoursesByLevel('advanced');
  const careerPaths = getCareerPaths();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Transform Your Future with
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Online Learning
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Master new skills with expert-led courses. Learn at your own pace with our comprehensive e-learning platform.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="E-learning hero"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Explore Our Courses</h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive education from primary to advanced career-focused programs
          </p>
        </div>
        
        <Tabs defaultValue="primary" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="primary">Primary Level</TabsTrigger>
            <TabsTrigger value="highschool">High School</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="primary" className="space-y-6">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold mb-2">Primary Education</h3>
              <p className="text-muted-foreground">Essential foundational subjects for young learners</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {primaryCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  image="/placeholder.svg"
                  duration={course.duration}
                  students={0}
                  level={course.difficulty_level}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="highschool" className="space-y-6">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold mb-2">High School Education</h3>
              <p className="text-muted-foreground">Advanced subjects preparing students for higher education</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {highschoolCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  image="/placeholder.svg"
                  duration={course.duration}
                  students={0}
                  level={course.difficulty_level}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Advanced Career Programs</h3>
              <p className="text-muted-foreground mb-4">Specialized courses for professional development</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge 
                  variant={selectedCareer === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCareer(null)}
                >
                  All Careers
                </Badge>
                {careerPaths.map((career) => (
                  <Badge 
                    key={career}
                    variant={selectedCareer === career ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCareer(career)}
                  >
                    {career}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {advancedCourses
                .filter(course => selectedCareer === null || course.career_path === selectedCareer)
                .map((course) => (
                  <CourseCard 
                    key={course.id} 
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    image="/placeholder.svg"
                    duration={course.duration}
                    students={0}
                    level={course.difficulty_level}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <AIAssistant />
    </div>
  );
};

export default Home;
