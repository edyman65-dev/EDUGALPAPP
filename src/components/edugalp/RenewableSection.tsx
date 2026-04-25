import React, { useState } from 'react';
import { Sun, Wind, Droplets, Leaf, CheckCircle, TrendingUp, Globe, ArrowRight } from 'lucide-react';
import { energiasRenovaveis, rankingPaises } from '@/data/eduGalpData';

interface RenewableSectionProps {
  setActiveSection: (section: string) => void;
}

const RenewableSection: React.FC<RenewableSectionProps> = ({ setActiveSection }) => {
  const [selectedEnergy, setSelectedEnergy] = useState<string | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'solar': return Sun;
      case 'eolica': return Wind;
      case 'hidroeletrica': return Droplets;
      case 'biomassa': return Leaf;
      default: return Sun;
    }
  };

  const selectedData = energiasRenovaveis.find(e => e.id === selectedEnergy);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mb-4">
            <Sun className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Módulo 1</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Energias Renováveis
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra as principais fontes de energia limpa e renovável que estão a transformar 
            o setor energético mundial. Aprenda sobre benefícios, eficiência e casos de sucesso.
          </p>
        </div>

        {/* Energy Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {energiasRenovaveis.map((energia) => {
            const Icon = getIcon(energia.id);
            const isSelected = selectedEnergy === energia.id;
            return (
              <div
                key={energia.id}
                onClick={() => setSelectedEnergy(isSelected ? null : energia.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isSelected ? 'ring-4 ring-green-500 shadow-xl' : 'hover:shadow-lg'
                }`}
              >
                <img 
                  src={energia.imagem} 
                  alt={energia.nome}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{energia.nome}</h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-white/80">
                    <span>Eficiência: {energia.eficiencia}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Energy Details */}
        {selectedData && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-16 animate-fadeIn">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedData.nome}</h3>
                <p className="text-gray-600 mb-6">{selectedData.descricao}</p>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Benefícios:</h4>
                  {selectedData.beneficios.map((beneficio, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{beneficio}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-sm text-gray-500">Eficiência</div>
                    <div className="text-xl font-bold text-green-600">{selectedData.eficiencia}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-sm text-gray-500">Custo/kWh</div>
                    <div className="text-xl font-bold text-green-600">{selectedData.custoKwh}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Casos Reais de Sucesso:</h4>
                <div className="space-y-3">
                  {selectedData.casosReais.map((caso, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 shadow-sm flex items-start space-x-3">
                      <Globe className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{caso}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Country Rankings */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Ranking de Países</h3>
              <p className="text-gray-600">Países líderes em energia renovável</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Posição</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">País</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">% Renovável</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden sm:table-cell">CO₂ (ton/capita)</th>
                </tr>
              </thead>
              <tbody>
                {rankingPaises.slice(0, 6).map((pais, idx) => (
                  <tr key={pais.pais} className="border-b border-gray-100 hover:bg-white transition-colors">
                    <td className="py-4 px-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                        idx === 1 ? 'bg-gray-100 text-gray-700' :
                        idx === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{pais.bandeira}</span>
                        <span className="font-medium text-gray-900">{pais.pais}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${pais.percentagemRenovavel}%` }}
                          />
                        </div>
                        <span className="font-semibold text-green-600">{pais.percentagemRenovavel}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span className="text-gray-600">{pais.emissoesCO2}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => setActiveSection('quizzes')}
            className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <span>Testar Conhecimentos</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RenewableSection;
