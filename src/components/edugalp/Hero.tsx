import React from 'react';
import { Play, BookOpen, Trophy, Zap } from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://d64gsuwffb70l.cloudfront.net/697531914631b7bb6a84d09a_1769288182065_91ad126a.jpg)'
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/95 via-[#FF6B00]/80 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white font-medium">Plataforma Educativa de Energia</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Aprenda sobre
            <span className="block text-[#00B74F]">Energia Sustentável</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-orange-100 mb-8 leading-relaxed">
            Descubra como as energias renováveis, a eficiência energética e a gestão de resíduos 
            podem transformar o nosso futuro. Aprenda com quizzes interativos, simuladores e vídeos educativos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={() => setActiveSection('quizzes')}
              className="flex items-center justify-center space-x-2 bg-[#00B74F] hover:bg-[#009940] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              <span>Começar a Aprender</span>
            </button>
            <button 
              onClick={() => setActiveSection('videos')}
              className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all border border-white/20"
            >
              <Play className="w-5 h-5" />
              <span>Ver Vídeos</span>
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">45+</div>
              <div className="text-sm text-orange-200">Quizzes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">3</div>
              <div className="text-sm text-orange-200">Temas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">6</div>
              <div className="text-sm text-orange-200">Vídeos</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
};

export default Hero;
