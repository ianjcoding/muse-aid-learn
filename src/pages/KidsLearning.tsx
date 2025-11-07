import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

interface ChildrenCourse {
  id: string;
  title: string;
  subject: string;
  description: string;
  color: string;
  icon: string;
  age_range: string;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  activities: Array<{ type: string; text: string }>;
}

const KidsLearning = () => {
  const [courses, setCourses] = useState<ChildrenCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ChildrenCourse | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("children_courses")
      .select("*")
      .order("subject");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive",
      });
      return;
    }

    setCourses(data || []);
  };

  const fetchLessons = async (courseId: string) => {
    const { data, error } = await supabase
      .from("children_lessons")
      .select("*")
      .eq("course_id", courseId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load lessons",
        variant: "destructive",
      });
      return;
    }

    const typedLessons = (data || []).map(lesson => ({
      ...lesson,
      activities: (lesson.activities || []) as Array<{ type: string; text: string }>
    }));
    
    setLessons(typedLessons);
  };

  const generateLesson = async (course: ChildrenCourse) => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-lesson", {
        body: {
          subject: course.subject,
          ageRange: course.age_range,
          topic: `Introduction to ${course.title}`,
        },
      });

      if (error) throw error;

      // Save the generated lesson
      const { error: insertError } = await supabase
        .from("children_lessons")
        .insert({
          course_id: course.id,
          title: data.title,
          content: data.content,
          activities: data.activities,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "New lesson created!",
      });

      fetchLessons(course.id);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate lesson",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCourseClick = (course: ChildrenCourse) => {
    setSelectedCourse(course);
    fetchLessons(course.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            🌈 Kids Learning Hub
          </h1>
          <p className="text-xl text-muted-foreground">
            Fun and interactive learning for young minds!
          </p>
        </div>

        {!selectedCourse ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2"
                onClick={() => handleCourseClick(course)}
              >
                <CardHeader className={`${course.color} text-white rounded-t-lg`}>
                  <div className="text-6xl mb-4 text-center">{course.icon}</div>
                  <CardTitle className="text-2xl text-center text-white">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-center text-base mb-4">
                    {course.description}
                  </CardDescription>
                  <div className="text-center">
                    <span className="inline-block bg-secondary px-4 py-1 rounded-full text-sm font-medium">
                      {course.age_range}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={() => setSelectedCourse(null)}
              className="mb-6"
            >
              ← Back to Courses
            </Button>

            <Card className="mb-6">
              <CardHeader className={`${selectedCourse.color} text-white rounded-t-lg`}>
                <div className="text-4xl mb-2 text-center">{selectedCourse.icon}</div>
                <CardTitle className="text-3xl text-center text-white">
                  {selectedCourse.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Button
                  onClick={() => generateLesson(selectedCourse)}
                  disabled={isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Magic...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate New Lesson
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {lessons.map((lesson) => (
                <Card key={lesson.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-100">
                    <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none mb-6">
                      <p className="text-lg whitespace-pre-wrap">{lesson.content}</p>
                    </div>

                    <Tabs defaultValue="activities" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="activities">🎯 Activities</TabsTrigger>
                        <TabsTrigger value="questions">❓ Questions</TabsTrigger>
                        <TabsTrigger value="games">🎮 Games</TabsTrigger>
                      </TabsList>
                      <TabsContent value="activities" className="space-y-3 mt-4">
                        {lesson.activities
                          ?.filter((a) => a.type === "exercise")
                          .map((activity, idx) => (
                            <Card key={idx} className="bg-green-50">
                              <CardContent className="pt-6">
                                <p className="text-base">{activity.text}</p>
                              </CardContent>
                            </Card>
                          ))}
                      </TabsContent>
                      <TabsContent value="questions" className="space-y-3 mt-4">
                        {lesson.activities
                          ?.filter((a) => a.type === "question")
                          .map((activity, idx) => (
                            <Card key={idx} className="bg-blue-50">
                              <CardContent className="pt-6">
                                <p className="text-base">{activity.text}</p>
                              </CardContent>
                            </Card>
                          ))}
                      </TabsContent>
                      <TabsContent value="games" className="space-y-3 mt-4">
                        {lesson.activities
                          ?.filter((a) => a.type === "game")
                          .map((activity, idx) => (
                            <Card key={idx} className="bg-purple-50">
                              <CardContent className="pt-6">
                                <p className="text-base">{activity.text}</p>
                              </CardContent>
                            </Card>
                          ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}

              {lessons.length === 0 && !isGenerating && (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-xl text-muted-foreground mb-4">
                      No lessons yet! Click the button above to generate your first lesson.
                    </p>
                    <p className="text-lg">✨ AI will create fun content just for you! ✨</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default KidsLearning;
