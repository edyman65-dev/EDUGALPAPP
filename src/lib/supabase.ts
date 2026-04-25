import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uqgtdaipbigwqgcvhllr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZ3RkYWlwYmlnd3FnY3ZobGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjgzNjYsImV4cCI6MjA5MjcwNDM2Nn0.v-IcHeNLIneuJDQFFA-6I1BwY56vQlFn8hJQdL88WXU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
