import React from 'react';
import { Sun, Flame, Recycle, Droplets, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';

interface DashboardCardsProps {
  setActiveSection: (section: string) => void;
  progress: { renovaveis: number; carvaoGas: number; residuos: number; agua: number };
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ setActiveSection, progress }) => {
  const modules = [
    {
      id: 'renovaveis',
      title: 'Energias Renováveis',
      description: 'Explore energia solar, eólica, hidroelétrica e biomassa. Descubra os benefícios e casos reais de sucesso.',
      icon: Sun,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      progress: progress.renovaveis,
      topics: ['Solar', 'Eólica', 'Hidroelétrica', 'Biomassa'],
      image: '/solar.png'
    },
    {
      id: 'carvao-gas',
      title: 'Carvão vs Gás Natural',
      description: 'Compare custos, emissões e eficiência. Use o simulador interativo para entender as diferenças.',
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      progress: progress.carvaoGas,
      topics: ['Custos', 'Emissões CO₂', 'Eficiência', 'Simulador'],
      image: '/carvao-gas.jpg'
    },
    {
      id: 'residuos',
      title: 'Gestão de Resíduos',
      description: 'Aprenda sobre os 3Rs, economia circular e como gerir diferentes tipos de resíduos de forma sustentável.',
      icon: Recycle,
      color: 'from-cyan-500 to-teal-500',
      bgColor: 'bg-cyan-50',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      progress: progress.residuos,
      topics: ['3Rs', 'Orgânicos', 'Plásticos', 'Economia Circular'],
      image: '/residuos.jpg'
    },
    {
      id: 'agua',
      title: 'Consumo Responsável de Água',
      description: 'Descubra como gerir a água de forma sustentável em Moçambique. Pegada hídrica, recursos hídricos e soluções práticas.',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      progress: progress.agua,
      topics: ['Pegada Hídrica', 'Poupança', 'Moçambique', 'Soluções'],
      image: '/hero.jpg'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explore os Nossos Módulos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quatro áreas temáticas com conteúdo educativo, quizzes e recursos interativos sobre Moçambique
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                onClick={() => setActiveSection(module.id)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={module.image} 
                    alt={module.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${module.color} opacity-60`} />
                  <div className="absolute top-4 left-4">
                    <div className={`w-12 h-12 ${module.iconBg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${module.iconColor}`} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {module.topics.map((topic, idx) => (
                      <span 
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${module.bgColor} ${module.iconColor} font-medium`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Progresso</span>
                      <span className="font-semibold text-gray-700">{module.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${module.color} transition-all duration-500`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <button className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r ${module.color} text-white font-semibold hover:opacity-90 transition-opacity`}>
                    <span>Explorar Módulo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        {/* Conteúdos Interativos Button */}
        <div className="mt-10 text-center">
          <a
            href="https://edyman65-dev.github.io/CONTEUDOS-/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Explorar Conteúdos Interativos</span>
          </a>
          <p className="text-sm text-gray-500 mt-2">Atividades e simuladores HTML desenvolvidos pela equipa EduGALP</p>
        </div>
    </section>
  );
};

export default DashboardCards;
