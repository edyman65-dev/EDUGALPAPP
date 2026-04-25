import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, TrendingUp, Users, Globe, Zap, Crown, Loader2 } from 'lucide-react';
import { rankingPaises } from '@/data/eduGalpData';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface LeaderboardUser {
  id: string;
  nome: string;
  avatar: string;
  pontos_total: number;
  quizzes_completos: number;
  nivel: string;
}

const RankingsSection: React.FC = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'paises' | 'meu-progresso'>('users');
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);

  const tabs = [
    { id: 'users', label: 'Top Utilizadores', icon: Users },
    { id: 'paises', label: 'Países', icon: Globe },
    { id: 'meu-progresso', label: 'Meu Progresso', icon: Star, requiresAuth: true }
  ];

  // Fetch leaderboard from database
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('id, nome, avatar, pontos_total, quizzes_completos, nivel')
          .order('pontos_total', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error fetching leaderboard:', error);
        } else {
          setLeaderboard(data || []);
          
          // Find user's rank
          if (user && data) {
            const rank = data.findIndex(u => u.id === user.id);
            setUserRank(rank !== -1 ? rank + 1 : null);
          }
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [user]);

  const getMedalColor = (position: number) => {
    switch (position) {
      case 0: return 'bg-yellow-400 text-yellow-900';
      case 1: return 'bg-gray-300 text-gray-700';
      case 2: return 'bg-orange-400 text-orange-900';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full mb-4">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-700 font-medium">Rankings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tabela de Classificação
          </h2>
          <p className="text-lg text-gray-600">
            Veja quem lidera nos quizzes e descubra os países mais sustentáveis
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm inline-flex flex-wrap justify-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isDisabled = tab.requiresAuth && !user;
              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && setActiveTab(tab.id as any)}
                  disabled={isDisabled}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white shadow-md'
                      : isDisabled
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Users Ranking */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
              </div>
            ) : leaderboard.length > 0 ? (
              <>
                {/* Top 3 Podium */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8">
                  <div className="flex items-end justify-center space-x-4 sm:space-x-8">
                    {/* 2nd Place */}
                    {leaderboard[1] && (
                      <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-700 mx-auto mb-2 border-4 border-white shadow-lg">
                          {leaderboard[1].avatar}
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                          <div className="text-white font-semibold text-sm sm:text-base">{leaderboard[1].nome.split(' ')[0]}</div>
                          <div className="text-white/80 text-xs sm:text-sm">{leaderboard[1].pontos_total} pts</div>
                        </div>
                        <div className="w-12 h-16 sm:w-16 sm:h-20 bg-gray-300 rounded-t-lg mt-2 mx-auto flex items-center justify-center">
                          <span className="text-2xl sm:text-3xl font-bold text-gray-700">2</span>
                        </div>
                      </div>
                    )}

                    {/* 1st Place */}
                    {leaderboard[0] && (
                      <div className="text-center -mt-4">
                        <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-1" />
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-yellow-400 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-yellow-900 mx-auto mb-2 border-4 border-white shadow-lg">
                          {leaderboard[0].avatar}
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                          <div className="text-white font-semibold">{leaderboard[0].nome.split(' ')[0]}</div>
                          <div className="text-white/80 text-sm">{leaderboard[0].pontos_total} pts</div>
                        </div>
                        <div className="w-16 h-24 sm:w-20 sm:h-28 bg-yellow-400 rounded-t-lg mt-2 mx-auto flex items-center justify-center">
                          <span className="text-3xl sm:text-4xl font-bold text-yellow-900">1</span>
                        </div>
                      </div>
                    )}

                    {/* 3rd Place */}
                    {leaderboard[2] && (
                      <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-400 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-orange-900 mx-auto mb-2 border-4 border-white shadow-lg">
                          {leaderboard[2].avatar}
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                          <div className="text-white font-semibold text-sm sm:text-base">{leaderboard[2].nome.split(' ')[0]}</div>
                          <div className="text-white/80 text-xs sm:text-sm">{leaderboard[2].pontos_total} pts</div>
                        </div>
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-400 rounded-t-lg mt-2 mx-auto flex items-center justify-center">
                          <span className="text-2xl sm:text-3xl font-bold text-orange-900">3</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rest of Rankings */}
                <div className="p-6">
                  {leaderboard.slice(3).map((rankUser, idx) => (
                    <div
                      key={rankUser.id}
                      className={`flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors ${
                        user && rankUser.id === user.id ? 'bg-orange-50 border border-orange-200' : ''
                      }`}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                        {idx + 4}
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
                        {rankUser.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {rankUser.nome}
                          {user && rankUser.id === user.id && (
                            <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">Você</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{rankUser.quizzes_completos} quizzes • {rankUser.nivel}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-orange-600">{rankUser.pontos_total}</div>
                        <div className="text-xs text-gray-500">pontos</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* User's Position (if not in top 10) */}
                {user && profile && !leaderboard.find(u => u.id === user.id) && (
                  <div className="border-t border-gray-200 p-6">
                    <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
                        ?
                      </div>
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white">
                        {profile.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {profile.nome}
                          <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">Você</span>
                        </div>
                        <div className="text-sm text-gray-500">{profile.quizzes_completos} quizzes • {profile.nivel}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-orange-600">{profile.pontos_total}</div>
                        <div className="text-xs text-gray-500">pontos</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ainda não há utilizadores</h3>
                <p className="text-gray-600">Seja o primeiro a completar quizzes e aparecer no ranking!</p>
              </div>
            )}
          </div>
        )}

        {/* Countries Ranking */}
        {activeTab === 'paises' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Renewable Energy Ranking */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Energia Renovável</h3>
                  <p className="text-sm text-gray-500">% de eletricidade renovável</p>
                </div>
              </div>
              <div className="space-y-4">
                {rankingPaises.map((pais, idx) => (
                  <div key={pais.pais} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getMedalColor(idx)}`}>
                      {idx + 1}
                    </div>
                    <span className="text-xl">{pais.bandeira}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-900">{pais.pais}</span>
                        <span className="font-bold text-green-600">{pais.percentagemRenovavel}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${pais.percentagemRenovavel}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Waste Management Ranking */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Gestão de Resíduos</h3>
                  <p className="text-sm text-gray-500">Taxa de reciclagem</p>
                </div>
              </div>
              <div className="space-y-4">
                {[...rankingPaises].sort((a, b) => b.gestaoResiduos - a.gestaoResiduos).map((pais, idx) => (
                  <div key={pais.pais} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getMedalColor(idx)}`}>
                      {idx + 1}
                    </div>
                    <span className="text-xl">{pais.bandeira}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-900">{pais.pais}</span>
                        <span className="font-bold text-orange-600">{pais.gestaoResiduos}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${pais.gestaoResiduos}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My Progress */}
        {activeTab === 'meu-progresso' && user && profile && (
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                  {profile.avatar}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{profile.nome}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    {profile.nivel}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-orange-600">{profile.pontos_total}</div>
                  <div className="text-sm text-gray-500">Pontos Totais</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">{profile.quizzes_completos}</div>
                  <div className="text-sm text-gray-500">Quizzes Completos</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600">{userRank || '-'}</div>
                  <div className="text-sm text-gray-500">Posição Ranking</div>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">Progresso de Nível</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Nível Atual</span>
                  <span className="font-semibold text-orange-600">{profile.nivel}</span>
                </div>
                <div className="relative">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all"
                      style={{ 
                        width: `${Math.min((profile.pontos_total / 1000) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Iniciante (0)</span>
                    <span>Intermédio (500)</span>
                    <span>Avançado (1000)</span>
                  </div>
                </div>
                {profile.pontos_total < 500 && (
                  <p className="text-sm text-gray-600">
                    Faltam <strong>{500 - profile.pontos_total}</strong> pontos para o nível Intermédio
                  </p>
                )}
                {profile.pontos_total >= 500 && profile.pontos_total < 1000 && (
                  <p className="text-sm text-gray-600">
                    Faltam <strong>{1000 - profile.pontos_total}</strong> pontos para o nível Avançado
                  </p>
                )}
                {profile.pontos_total >= 1000 && (
                  <p className="text-sm text-green-600 font-medium">
                    Parabéns! Atingiu o nível máximo!
                  </p>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">Conquistas</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className={`p-4 rounded-xl text-center ${profile.quizzes_completos >= 1 ? 'bg-yellow-50' : 'bg-gray-50 opacity-50'}`}>
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-sm font-medium text-gray-900">Primeiro Quiz</div>
                  <div className="text-xs text-gray-500">Complete 1 quiz</div>
                </div>
                <div className={`p-4 rounded-xl text-center ${profile.quizzes_completos >= 5 ? 'bg-green-50' : 'bg-gray-50 opacity-50'}`}>
                  <div className="text-3xl mb-2">📚</div>
                  <div className="text-sm font-medium text-gray-900">Estudante</div>
                  <div className="text-xs text-gray-500">Complete 5 quizzes</div>
                </div>
                <div className={`p-4 rounded-xl text-center ${profile.pontos_total >= 500 ? 'bg-orange-50' : 'bg-gray-50 opacity-50'}`}>
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-sm font-medium text-gray-900">500 Pontos</div>
                  <div className="text-xs text-gray-500">Acumule 500 pontos</div>
                </div>
                <div className={`p-4 rounded-xl text-center ${profile.pontos_total >= 1000 ? 'bg-purple-50' : 'bg-gray-50 opacity-50'}`}>
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-sm font-medium text-gray-900">Especialista</div>
                  <div className="text-xs text-gray-500">Acumule 1000 pontos</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RankingsSection;
