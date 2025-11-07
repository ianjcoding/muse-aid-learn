-- Create children's courses table
CREATE TABLE public.children_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  age_range TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create children's lessons table
CREATE TABLE public.children_lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.children_courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  activities JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.children_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children_lessons ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (children's educational content should be accessible)
CREATE POLICY "Children courses are viewable by everyone" 
ON public.children_courses 
FOR SELECT 
USING (true);

CREATE POLICY "Children lessons are viewable by everyone" 
ON public.children_lessons 
FOR SELECT 
USING (true);

-- Insert sample children's courses
INSERT INTO public.children_courses (title, subject, description, color, icon, age_range) VALUES
('Fun with Numbers', 'Math', 'Learn counting, addition, and subtraction through games', 'bg-blue-500', '🔢', '5-8 years'),
('Reading Adventures', 'English', 'Explore letters, words, and simple stories', 'bg-green-500', '📚', '5-8 years'),
('Science Explorers', 'Science', 'Discover the world around us with fun experiments', 'bg-purple-500', '🔬', '6-9 years'),
('Creative Arts', 'Art', 'Express yourself through drawing and crafts', 'bg-pink-500', '🎨', '5-10 years'),
('Music Time', 'Music', 'Learn about sounds, rhythms, and songs', 'bg-yellow-500', '🎵', '5-8 years'),
('World Around Us', 'Social Studies', 'Learn about people, places, and cultures', 'bg-orange-500', '🌍', '6-9 years');