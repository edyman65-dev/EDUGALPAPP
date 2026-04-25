import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

// Import EduGALP components
import Header from './edugalp/Header';
import Hero from './edugalp/Hero';
import DashboardCards from './edugalp/DashboardCards';
import RenewableSection from './edugalp/RenewableSection';
import CoalGasSection from './edugalp/CoalGasSection';
import WasteSection from './edugalp/WasteSection';
import QuizSection from './edugalp/QuizSection';
import RankingsSection from './edugalp/RankingsSection';
import CertificateSection from './edugalp/CertificateSection';
import Footer from './edugalp/Footer';
import AuthModal from './edugalp/AuthModal';


const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const { user, profile, moduleProgress } = useAuth();

  // State management
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [localPoints, setLocalPoints] = useState(0);

  // Calculate progress from database or use defaults
  const progress = {
    renovaveis: moduleProgress.find(m => m.module_id === 'renovaveis')?.progress_percent || 0,
    carvaoGas: moduleProgress.find(m => m.module_id === 'carvao-gas')?.progress_percent || 0,
    residuos: moduleProgress.find(m => m.module_id === 'residuos')?.progress_percent || 0
  };

  // Handle score updates from quizzes (for non-logged users)
  const handleScoreUpdate = (points: number) => {
    if (!user) {
      setLocalPoints(prev => prev + points);
    }
  };

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  // Open auth modal handler
  const handleOpenAuth = () => {
    setAuthModalOpen(true);
  };

  // Render the appropriate section based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case 'inicio':
        return (
          <>
            <Hero setActiveSection={setActiveSection} />
            <DashboardCards setActiveSection={setActiveSection} progress={progress} />
            
            {/* Quick Stats Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Porquê Aprender Sobre Energia?</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    A transição energética é um dos maiores desafios do nosso tempo. Compreender as opções disponíveis é essencial para tomar decisões informadas.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">61%</div>
                    <div className="text-gray-600">Eletricidade renovável em Portugal (2024)</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
                    <div className="text-gray-600">Menos CO₂ com gás vs carvão</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">8M</div>
                    <div className="text-gray-600">Toneladas de plástico nos oceanos/ano</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">2050</div>
                    <div className="text-gray-600">Meta UE para neutralidade carbónica</div>
                  </div>
                </div>
              </div>
            </section>

            {/* User Welcome / CTA Section */}
            {!user && (
              <section className="py-12 bg-gradient-to-r from-[#FF6B00] to-[#E55A00]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Crie uma conta gratuita e guarde o seu progresso
                  </h2>
                  <p className="text-orange-200 mb-6">
                    Acumule pontos, suba no ranking e acompanhe a sua evolução em cada módulo.
                  </p>
                  <button
                    onClick={handleOpenAuth}
                    className="bg-[#00B74F] hover:bg-[#009940] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                  >
                    Criar Conta Grátis
                  </button>
                </div>
              </section>
            )}

            {/* Logged User Welcome */}
            {user && profile && (
              <section className="py-12 bg-gradient-to-r from-green-500 to-emerald-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-green-600">
                        {profile.avatar}
                      </div>
                      <div className="text-white">
                        <h3 className="text-xl font-bold">Olá, {profile.nome.split(' ')[0]}!</h3>
                        <p className="text-green-100">Nível: {profile.nivel} • {profile.pontos_total} pontos</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveSection('quizzes')}
                      className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
                    >
                      Continuar Aprendizagem
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Featured Content */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Featured Quiz */}
                  <div 
                    className="bg-gradient-to-br from-[#FF6B00] to-[#E55A00] rounded-2xl p-8 text-white cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setActiveSection('quizzes')}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4l3 3" />
                      </svg>
                      <h3 className="text-xl font-bold">Quiz em Destaque</h3>
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Energias Renováveis - Nível Iniciante</h4>
                    <p className="text-orange-200 mb-6">
                      Teste os seus conhecimentos básicos sobre energia solar, eólica e hidroelétrica.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">10 perguntas</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">10 pts cada</span>
                      </div>
                      <button className="bg-white text-[#FF6B00] px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                        Começar
                      </button>
                    </div>
                  </div>

                  {/* Featured Certificates */}
                  <div 
                    className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl p-8 text-white cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setActiveSection('certificados')}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 15l-2 5l2-1l2 1l-2-5z" />
                        <circle cx="12" cy="9" r="6" />
                        <path d="M9 9h.01M15 9h.01M10 13a3 3 0 005 0" />
                      </svg>
                      <h3 className="text-xl font-bold">Certificados Digitais</h3>
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Comprove os Seus Conhecimentos</h4>
                    <p className="text-amber-100 mb-6">
                      Complete todos os quizzes de um módulo e obtenha um certificado digital profissional.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">3 módulos</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">3 níveis cada</span>
                      </div>
                      <button className="bg-white text-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                        Ver Mais
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials / Impact */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Impacto da Educação Energética</h2>
                  <p className="text-lg text-gray-600">
                    Juntos, podemos fazer a diferença na transição para um futuro sustentável
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c1.66 0 3.22-.45 4.56-1.24" />
                        <path d="M17 8l2 2l4-4" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Consciência Ambiental</h4>
                    <p className="text-gray-600 text-sm">
                      Utilizadores informados tomam decisões mais sustentáveis no dia-a-dia, reduzindo a sua pegada ecológica.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Poupança Energética</h4>
                    <p className="text-gray-600 text-sm">
                      Conhecimento sobre eficiência energética permite reduzir consumos e custos nas famílias e empresas.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Cidadania Ativa</h4>
                    <p className="text-gray-600 text-sm">
                      Cidadãos informados participam ativamente nas políticas energéticas e ambientais da comunidade.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      
      case 'renovaveis':
        return <RenewableSection setActiveSection={setActiveSection} />;
      
      case 'carvao-gas':
        return <CoalGasSection setActiveSection={setActiveSection} />;
      
      case 'residuos':
        return <WasteSection setActiveSection={setActiveSection} />;
      
      case 'quizzes':
        return <QuizSection onScoreUpdate={handleScoreUpdate} onOpenAuth={handleOpenAuth} />;
      
      case 'rankings':
        return <RankingsSection />;
      
      case 'certificados':
        return <CertificateSection onOpenAuth={handleOpenAuth} setActiveSection={setActiveSection} />;
      
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content */}
      <main>
        {renderSection()}
      </main>

      {/* Footer */}
      <Footer setActiveSection={setActiveSection} />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </div>
  );
};

export default AppLayout;
