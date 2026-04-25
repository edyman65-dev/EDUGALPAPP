import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  nome: string;
  avatar: string;
  pontos_total: number;
  quizzes_completos: number;
  nivel: string;
}

interface ModuleProgress {
  module_id: string;
  progress_percent: number;
  completed: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  moduleProgress: ModuleProgress[];
  loading: boolean;
  signUp: (email: string, password: string, nome: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  addQuizAttempt: (tema: string, nivel: string, pontos: number, corretas: number, total: number) => Promise<void>;
  updateModuleProgress: (moduleId: string, progress: number) => Promise<void>;
  refreshProfile: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('Error in fetchProfile:', err);
      return null;
    }
  };

  // Fetch module progress
  const fetchModuleProgress = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('module_progress')
        .select('module_id, progress_percent, completed')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching module progress:', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('Error in fetchModuleProgress:', err);
      return [];
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession?.user) {
          setSession(currentSession);
          setUser(currentSession.user);
          
          const userProfile = await fetchProfile(currentSession.user.id);
          if (userProfile) {
            setProfile(userProfile);
          }
          
          const progress = await fetchModuleProgress(currentSession.user.id);
          setModuleProgress(progress);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        const userProfile = await fetchProfile(newSession.user.id);
        if (userProfile) {
          setProfile(userProfile);
        }
        const progress = await fetchModuleProgress(newSession.user.id);
        setModuleProgress(progress);
      } else {
        setProfile(null);
        setModuleProgress([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign up
  const signUp = async (email: string, password: string, nome: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        // Create user profile
        const initials = nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            nome,
            avatar: initials,
            pontos_total: 0,
            quizzes_completos: 0,
            nivel: 'Iniciante'
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }

        // Initialize module progress
        const modules = ['renovaveis', 'carvao-gas', 'residuos'];
        for (const moduleId of modules) {
          await supabase
            .from('module_progress')
            .insert({
              user_id: data.user.id,
              module_id: moduleId,
              progress_percent: 0,
              completed: false
            });
        }
      }

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    } catch (err) {
      return { error: err as Error };
    }
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setModuleProgress([]);
  };

  // Update profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    if (!error && profile) {
      setProfile({ ...profile, ...updates });
    }
  };

  // Add quiz attempt and update points
  const addQuizAttempt = async (tema: string, nivel: string, pontos: number, corretas: number, total: number) => {
    if (!user || !profile) return;

    // Insert quiz attempt
    await supabase
      .from('quiz_attempts')
      .insert({
        user_id: user.id,
        tema,
        nivel,
        pontos,
        perguntas_corretas: corretas,
        perguntas_total: total
      });

    // Update user profile with new points
    const newPontosTotal = profile.pontos_total + pontos;
    const newQuizzesCompletos = profile.quizzes_completos + 1;
    
    // Determine new level based on points
    let newNivel = 'Iniciante';
    if (newPontosTotal >= 1000) newNivel = 'Avançado';
    else if (newPontosTotal >= 500) newNivel = 'Intermédio';

    await updateProfile({
      pontos_total: newPontosTotal,
      quizzes_completos: newQuizzesCompletos,
      nivel: newNivel
    });

    // Update module progress
    const moduleId = tema;
    const currentProgress = moduleProgress.find(m => m.module_id === moduleId);
    const newProgress = Math.min((currentProgress?.progress_percent || 0) + 20, 100);
    await updateModuleProgress(moduleId, newProgress);
  };

  // Update module progress
  const updateModuleProgress = async (moduleId: string, progress: number) => {
    if (!user) return;

    const { error } = await supabase
      .from('module_progress')
      .upsert({
        user_id: user.id,
        module_id: moduleId,
        progress_percent: progress,
        completed: progress >= 100,
        last_accessed: new Date().toISOString()
      }, {
        onConflict: 'user_id,module_id'
      });

    if (!error) {
      setModuleProgress(prev => {
        const existing = prev.find(m => m.module_id === moduleId);
        if (existing) {
          return prev.map(m => 
            m.module_id === moduleId 
              ? { ...m, progress_percent: progress, completed: progress >= 100 }
              : m
          );
        }
        return [...prev, { module_id: moduleId, progress_percent: progress, completed: progress >= 100 }];
      });
    }
  };

  // Refresh profile data
  const refreshProfile = async () => {
    if (!user) return;
    
    const userProfile = await fetchProfile(user.id);
    if (userProfile) {
      setProfile(userProfile);
    }
    
    const progress = await fetchModuleProgress(user.id);
    setModuleProgress(progress);
  };

  const value = {
    user,
    session,
    profile,
    moduleProgress,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    addQuizAttempt,
    updateModuleProgress,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
