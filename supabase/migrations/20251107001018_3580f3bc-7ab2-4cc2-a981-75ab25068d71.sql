-- Create children's progress tracking table
CREATE TABLE public.children_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.children_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  activities_completed JSONB DEFAULT '[]'::jsonb,
  stars_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS
ALTER TABLE public.children_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user's own progress
CREATE POLICY "Users can view their own progress" 
ON public.children_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
ON public.children_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.children_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_children_progress_user_lesson ON public.children_progress(user_id, lesson_id);