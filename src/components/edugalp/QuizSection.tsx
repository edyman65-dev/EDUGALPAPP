import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, Trophy, ArrowRight, RotateCcw, Zap, Target, Star, LogIn } from 'lucide-react';
import { quizQuestions, QuizQuestion } from '@/data/eduGalpData';
import { useAuth } from '@/contexts/AuthContext';

interface QuizSectionProps {
  onScoreUpdate: (points: number) => void;
  onOpenAuth: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onScoreUpdate, onOpenAuth }) => {
  const { user, profile, addQuizAttempt } = useAuth();
  
  const [selectedTema, setSelectedTema] = useState<string | null>(null);
  const [selectedNivel, setSelectedNivel] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestion[]>([]);
  const [lives, setLives] = useState(3);

  const temas = [
    { id: 'renovaveis', nome: 'Energias Renováveis', cor: 'bg-green-500', icon: '☀️' },
    { id: 'carvao-gas', nome: 'Carvão vs Gás', cor: 'bg-orange-500', icon: '🔥' },
    { id: 'residuos', nome: 'Gestão de Resíduos', cor: 'bg-cyan-500', icon: '♻️' }
  ];

  const niveis = [
    { id: 'iniciante', nome: 'Iniciante', pontos: 10, cor: 'bg-green-100 text-green-700' },
    { id: 'intermedio', nome: 'Intermédio', pontos: 20, cor: 'bg-yellow-100 text-yellow-700' },
    { id: 'avancado', nome: 'Avançado', pontos: 30, cor: 'bg-red-100 text-red-700' }
  ];

  const startQuiz = () => {
    if (selectedTema && selectedNivel) {
      const questions = quizQuestions.filter(
        q => q.tema === selectedTema && q.nivel === selectedNivel
      );
      setFilteredQuestions(questions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setCorrectAnswers(0);
      setLives(3);
      setQuizCompleted(false);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.respostaCorreta;
    
    if (isCorrect) {
      const pontosNivel = niveis.find(n => n.id === selectedNivel)?.pontos || 10;
      setScore(prev => prev + pontosNivel);
      setCorrectAnswers(prev => prev + 1);
    } else {
      setLives(prev => prev - 1);
    }
  };

  const nextQuestion = async () => {
    if (lives <= 0 || currentQuestionIndex >= filteredQuestions.length - 1) {
      setQuizCompleted(true);
      
      // Save to database if user is logged in
      if (user && selectedTema && selectedNivel) {
        await addQuizAttempt(
          selectedTema,
          selectedNivel,
          score,
          correctAnswers,
          filteredQuestions.length
        );
      }
      
      // Update local score
      onScoreUpdate(score);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setSelectedTema(null);
    setSelectedNivel(null);
    setFilteredQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setLives(3);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  // Quiz Selection Screen
  if (!selectedTema || !selectedNivel || filteredQuestions.length === 0) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-medium">Quizzes Educativos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Teste os Seus Conhecimentos
            </h2>
            <p className="text-lg text-gray-600">
              Escolha um tema e nível de dificuldade para começar
            </p>
          </div>

          {/* Login Prompt */}
          {!user && (
            <div className="mb-8 bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <LogIn className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Guarde o seu progresso</p>
                  <p className="text-sm text-gray-600">Entre ou crie conta para guardar pontos e subir no ranking</p>
                </div>
              </div>
              <button
                onClick={onOpenAuth}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Entrar
              </button>
            </div>
          )}

          {/* User Stats */}
          {user && profile && (
            <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {profile.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{profile.nome}</p>
                    <p className="text-sm text-gray-600">Nível: {profile.nivel}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{profile.pontos_total}</div>
                  <div className="text-sm text-gray-500">pontos totais</div>
                </div>
              </div>
            </div>
          )}

          {/* Theme Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Escolha o Tema</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {temas.map((tema) => (
                <button
                  key={tema.id}
                  onClick={() => setSelectedTema(tema.id)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedTema === tema.id
                      ? 'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
                  }`}
                >
                  <div className="text-4xl mb-3">{tema.icon}</div>
                  <h4 className="font-semibold text-gray-900">{tema.nome}</h4>
                  <p className="text-sm text-gray-500 mt-1">10 perguntas por nível</p>

                </button>
              ))}
            </div>
          </div>

          {/* Level Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Escolha o Nível</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {niveis.map((nivel) => (
                <button
                  key={nivel.id}
                  onClick={() => setSelectedNivel(nivel.id)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedNivel === nivel.id
                      ? 'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
                  }`}
                >
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${nivel.cor} mb-3`}>
                    {nivel.nome}
                  </span>
                  <div className="flex items-center justify-center space-x-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-gray-900">{nivel.pontos} pts</span>
                    <span className="text-gray-500 text-sm">por resposta</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={startQuiz}
              disabled={!selectedTema || !selectedNivel}
              className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                selectedTema && selectedNivel
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Target className="w-5 h-5" />
              <span>Começar Quiz</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Quiz Completed Screen
  if (quizCompleted) {
    const maxScore = filteredQuestions.length * (niveis.find(n => n.id === selectedNivel)?.pontos || 10);
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
              percentage >= 80 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              {percentage >= 80 ? (
                <Trophy className="w-12 h-12 text-green-500" />
              ) : percentage >= 50 ? (
                <Star className="w-12 h-12 text-yellow-500" />
              ) : (
                <RotateCcw className="w-12 h-12 text-red-500" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {percentage >= 80 ? 'Excelente!' : percentage >= 50 ? 'Bom trabalho!' : 'Continue a praticar!'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {lives <= 0 ? 'Ficou sem vidas!' : 'Quiz concluído!'}
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">{score}</div>
              <div className="text-gray-500">pontos ganhos</div>
              <div className="mt-4 flex justify-center space-x-4 text-sm">
                <div>
                  <span className="font-semibold text-green-600">{correctAnswers}</span>
                  <span className="text-gray-500"> corretas</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">{filteredQuestions.length}</span>
                  <span className="text-gray-500"> total</span>
                </div>
              </div>
            </div>

            {/* Save Progress Prompt */}
            {!user && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-700 mb-3">
                  Crie uma conta para guardar os seus {score} pontos!
                </p>
                <button
                  onClick={onOpenAuth}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Criar Conta Grátis
                </button>
              </div>
            )}

            {user && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Progresso guardado automaticamente!</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetQuiz}
                className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Novo Quiz</span>
              </button>
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setCorrectAnswers(0);
                  setLives(3);
                  setQuizCompleted(false);
                  setSelectedAnswer(null);
                  setShowResult(false);
                }}
                className="flex-1 flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                <span>Repetir</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Quiz Question Screen
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={resetQuiz}
            className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Sair</span>
          </button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    i < lives ? 'bg-red-500' : 'bg-gray-200'
                  }`}
                >
                  {i < lives && <span className="text-white text-xs">❤</span>}
                </div>
              ))}
            </div>
            <div className="bg-orange-100 px-3 py-1 rounded-full">
              <span className="text-orange-700 font-semibold">{score} pts</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Pergunta {currentQuestionIndex + 1} de {filteredQuestions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / filteredQuestions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              niveis.find(n => n.id === selectedNivel)?.cor
            } mb-4`}>
              {niveis.find(n => n.id === selectedNivel)?.nome}
            </span>
            <h3 className="text-xl font-bold text-gray-900">{currentQuestion.pergunta}</h3>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.opcoes.map((opcao, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQuestion.respostaCorreta;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showWrong
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className={`font-medium ${
                    showCorrect ? 'text-green-700' : showWrong ? 'text-red-700' : 'text-gray-700'
                  }`}>
                    {opcao}
                  </span>
                  {showCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {showWrong && <XCircle className="w-5 h-5 text-red-500" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`p-4 rounded-xl mb-6 ${
              selectedAnswer === currentQuestion.respostaCorreta
                ? 'bg-green-50 border border-green-200'
                : 'bg-orange-50 border border-orange-200'
            }`}>
              <h4 className="font-semibold text-gray-900 mb-1">Explicação:</h4>
              <p className="text-gray-700 text-sm">{currentQuestion.explicacao}</p>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={nextQuestion}
              className="w-full flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors"
            >
              <span>{currentQuestionIndex < filteredQuestions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
