import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Loader2, Star, Trophy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import confetti from "canvas-confetti";

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

interface LessonProgress {
  id: string;
  lesson_id: string;
  completed: boolean;
  activities_completed: string[];
  stars_earned: number;
  completed_at: string | null;
}

const KidsLearning = () => {
  const [courses, setCourses] = useState<ChildrenCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ChildrenCourse | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

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
    
    if (typedLessons.length > 0 && user) {
      fetchProgress(typedLessons.map(l => l.id));
    }
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

  const fetchProgress = async (lessonIds: string[]) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("children_progress")
      .select("*")
      .in("lesson_id", lessonIds);

    if (error) {
      console.error("Error fetching progress:", error);
      return;
    }

    const progressMap: Record<string, LessonProgress> = {};
    data?.forEach((p) => {
      progressMap[p.lesson_id] = p as LessonProgress;
    });
    setProgress(progressMap);
  };

  const handleCourseClick = (course: ChildrenCourse) => {
    setSelectedCourse(course);
    fetchLessons(course.id);
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1'],
    });
  };

  const completeActivity = async (lessonId: string, activityIndex: number) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to track progress",
        variant: "destructive",
      });
      return;
    }

    const currentProgress = progress[lessonId];
    const activitiesCompleted = currentProgress?.activities_completed || [];
    const activityId = `activity-${activityIndex}`;

    if (activitiesCompleted.includes(activityId)) return;

    const newActivitiesCompleted = [...activitiesCompleted, activityId];
    const lesson = lessons.find(l => l.id === lessonId);
    const totalActivities = lesson?.activities?.length || 0;
    const starsEarned = Math.min(3, newActivitiesCompleted.length);
    const isFullyCompleted = newActivitiesCompleted.length >= totalActivities;

    const { error } = await supabase
      .from("children_progress")
      .upsert({
        user_id: user.id,
        lesson_id: lessonId,
        activities_completed: newActivitiesCompleted,
        stars_earned: starsEarned,
        completed: isFullyCompleted,
        completed_at: isFullyCompleted ? new Date().toISOString() : null,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save progress",
        variant: "destructive",
      });
      return;
    }

    setProgress({
      ...progress,
      [lessonId]: {
        id: currentProgress?.id || '',
        lesson_id: lessonId,
        completed: isFullyCompleted,
        activities_completed: newActivitiesCompleted,
        stars_earned: starsEarned,
        completed_at: isFullyCompleted ? new Date().toISOString() : null,
      },
    });

    triggerCelebration();
    
    toast({
      title: "🎉 Amazing work!",
      description: `You earned ${starsEarned} star${starsEarned > 1 ? 's' : ''}!`,
    });
  };

  const calculateCourseProgress = () => {
    if (lessons.length === 0) return 0;
    const completedLessons = lessons.filter(l => progress[l.id]?.completed).length;
    return (completedLessons / lessons.length) * 100;
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
              <CardContent className="pt-6 space-y-4">
                {lessons.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Course Progress</span>
                      <span className="text-muted-foreground">
                        {Math.round(calculateCourseProgress())}%
                      </span>
                    </div>
                    <Progress value={calculateCourseProgress()} className="h-3" />
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium">
                          {lessons.filter(l => progress[l.id]?.completed).length} / {lessons.length} Lessons
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">
                          {Object.values(progress).reduce((sum, p) => sum + (p.stars_earned || 0), 0)} Stars
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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
              {lessons.map((lesson) => {
                const lessonProgress = progress[lesson.id];
                const starsEarned = lessonProgress?.stars_earned || 0;
                const isCompleted = lessonProgress?.completed || false;
                
                return (
                  <Card key={lesson.id} className={`overflow-hidden ${isCompleted ? 'border-2 border-yellow-400' : ''}`}>
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-100">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl flex items-center gap-2">
                          {lesson.title}
                          {isCompleted && (
                            <Badge className="bg-yellow-500 hover:bg-yellow-600">
                              <Trophy className="h-3 w-3 mr-1" />
                              Complete!
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((star) => (
                            <Star
                              key={star}
                              className={`h-6 w-6 ${
                                star <= starsEarned
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
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
                          .map((activity, originalIdx) => {
                            const activityIndex = lesson.activities?.findIndex(a => a === activity) ?? originalIdx;
                            const activityId = `activity-${activityIndex}`;
                            const isActivityCompleted = lessonProgress?.activities_completed?.includes(activityId);
                            
                            return (
                              <Card 
                                key={activityIndex} 
                                className={`${isActivityCompleted ? 'bg-green-100 border-2 border-green-400' : 'bg-green-50'} cursor-pointer transition-all hover:shadow-md`}
                                onClick={() => !isActivityCompleted && completeActivity(lesson.id, activityIndex)}
                              >
                                <CardContent className="pt-6">
                                  <div className="flex items-start justify-between gap-3">
                                    <p className="text-base flex-1">{activity.text}</p>
                                    {isActivityCompleted ? (
                                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                                    ) : (
                                      <div className="h-6 w-6 border-2 border-gray-300 rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                      </TabsContent>
                      <TabsContent value="questions" className="space-y-3 mt-4">
                        {lesson.activities
                          ?.filter((a) => a.type === "question")
                          .map((activity, originalIdx) => {
                            const activityIndex = lesson.activities?.findIndex(a => a === activity) ?? originalIdx;
                            const activityId = `activity-${activityIndex}`;
                            const isActivityCompleted = lessonProgress?.activities_completed?.includes(activityId);
                            
                            return (
                              <Card 
                                key={activityIndex}
                                className={`${isActivityCompleted ? 'bg-blue-100 border-2 border-blue-400' : 'bg-blue-50'} cursor-pointer transition-all hover:shadow-md`}
                                onClick={() => !isActivityCompleted && completeActivity(lesson.id, activityIndex)}
                              >
                                <CardContent className="pt-6">
                                  <div className="flex items-start justify-between gap-3">
                                    <p className="text-base flex-1">{activity.text}</p>
                                    {isActivityCompleted ? (
                                      <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                                    ) : (
                                      <div className="h-6 w-6 border-2 border-gray-300 rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                      </TabsContent>
                      <TabsContent value="games" className="space-y-3 mt-4">
                        {lesson.activities
                          ?.filter((a) => a.type === "game")
                          .map((activity, originalIdx) => {
                            const activityIndex = lesson.activities?.findIndex(a => a === activity) ?? originalIdx;
                            const activityId = `activity-${activityIndex}`;
                            const isActivityCompleted = lessonProgress?.activities_completed?.includes(activityId);
                            
                            return (
                              <Card 
                                key={activityIndex}
                                className={`${isActivityCompleted ? 'bg-purple-100 border-2 border-purple-400' : 'bg-purple-50'} cursor-pointer transition-all hover:shadow-md`}
                                onClick={() => !isActivityCompleted && completeActivity(lesson.id, activityIndex)}
                              >
                                <CardContent className="pt-6">
                                  <div className="flex items-start justify-between gap-3">
                                    <p className="text-base flex-1">{activity.text}</p>
                                    {isActivityCompleted ? (
                                      <CheckCircle2 className="h-6 w-6 text-purple-600 flex-shrink-0" />
                                    ) : (
                                      <div className="h-6 w-6 border-2 border-gray-300 rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                );
              })}

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
