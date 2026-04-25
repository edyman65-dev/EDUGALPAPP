import React, { useState } from 'react';
import { Recycle, Trash2, Leaf, Package, AlertTriangle, ArrowRight, CheckCircle, Globe } from 'lucide-react';
import { tiposResiduos, rankingPaises } from '@/data/eduGalpData';

interface WasteSectionProps {
  setActiveSection: (section: string) => void;
}

const WasteSection: React.FC<WasteSectionProps> = ({ setActiveSection }) => {
  const [selectedWaste, setSelectedWaste] = useState<string | null>(null);

  const threeRs = [
    {
      title: 'Reduzir',
      description: 'Diminuir a quantidade de resíduos que produzimos, evitando consumo desnecessário.',
      icon: '1️⃣',
      color: 'bg-red-500',
      examples: ['Evitar embalagens descartáveis', 'Comprar apenas o necessário', 'Escolher produtos duráveis']
    },
    {
      title: 'Reutilizar',
      description: 'Dar nova vida a objetos antes de os descartar, prolongando o seu ciclo de vida.',
      icon: '2️⃣',
      color: 'bg-yellow-500',
      examples: ['Usar sacos reutilizáveis', 'Doar roupa usada', 'Reparar em vez de substituir']
    },
    {
      title: 'Reciclar',
      description: 'Transformar resíduos em novos produtos, poupando recursos naturais.',
      icon: '3️⃣',
      color: 'bg-green-500',
      examples: ['Separar o lixo corretamente', 'Levar pilhas ao ecoponto', 'Reciclar eletrónicos']
    }
  ];

  const selectedWasteData = tiposResiduos.find(r => r.tipo === selectedWaste);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-cyan-100 px-4 py-2 rounded-full mb-4">
            <Recycle className="w-5 h-5 text-cyan-600" />
            <span className="text-cyan-700 font-medium">Módulo 3</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Gestão de Resíduos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Aprenda a gerir resíduos de forma sustentável. Descubra os princípios dos 3Rs, 
            a economia circular e como cada tipo de resíduo deve ser tratado.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <img 
            src="/residuos.jpg"
            alt="Gestão de Resíduos"
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="text-2xl font-bold text-white mb-2">Economia Circular</h3>
            <p className="text-gray-200">Um modelo onde os resíduos de hoje são os recursos de amanhã</p>
          </div>
        </div>

        {/* 3Rs Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Os 3Rs da Sustentabilidade</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {threeRs.map((r, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${r.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4`}>
                  {r.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{r.title}</h4>
                <p className="text-gray-600 mb-4">{r.description}</p>
                <div className="space-y-2">
                  {r.examples.map((ex, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waste Types */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tipos de Resíduos</h3>
          <p className="text-gray-600 text-center mb-8">Clique num tipo para saber mais</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {tiposResiduos.map((residuo) => (
              <button
                key={residuo.tipo}
                onClick={() => setSelectedWaste(selectedWaste === residuo.tipo ? null : residuo.tipo)}
                className={`p-4 rounded-xl transition-all ${
                  selectedWaste === residuo.tipo 
                    ? 'ring-2 ring-offset-2 shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                style={{ 
                  backgroundColor: `${residuo.cor}20`,
                  borderColor: residuo.cor,
                  ringColor: residuo.cor
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: residuo.cor }}
                >
                  <Trash2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-gray-900">{residuo.tipo}</div>
              </button>
            ))}
          </div>

          {/* Selected Waste Details */}
          {selectedWasteData && (
            <div 
              className="bg-white rounded-xl p-6 shadow-sm animate-fadeIn"
              style={{ borderLeft: `4px solid ${selectedWasteData.cor}` }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedWasteData.tipo}</h4>
                  <p className="text-gray-600 mb-4">{selectedWasteData.descricao}</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Package className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Contentor: <strong>{selectedWasteData.contentor}</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Decomposição: <strong>{selectedWasteData.decomposicao}</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div 
                    className="px-6 py-3 rounded-xl text-white font-semibold"
                    style={{ backgroundColor: selectedWasteData.cor }}
                  >
                    Solução: {selectedWasteData.solucao}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Circular Economy */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Economia Circular</h3>
              <p className="text-gray-600 mb-6">
                A economia circular é um modelo económico que visa eliminar resíduos e a utilização 
                contínua de recursos. Baseia-se em três princípios fundamentais:
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Eliminar resíduos e poluição</h4>
                    <p className="text-sm text-gray-600">Design de produtos sem desperdício</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Circular produtos e materiais</h4>
                    <p className="text-sm text-gray-600">Manter recursos em uso pelo máximo tempo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Regenerar a natureza</h4>
                    <p className="text-sm text-gray-600">Devolver nutrientes aos sistemas naturais</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-64 h-64 mx-auto relative">
                <div className="absolute inset-0 border-8 border-green-500 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-8 border-4 border-orange-500 rounded-full animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                <div className="absolute inset-16 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Recycle className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Waste Management Rankings */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Ranking de Gestão de Resíduos</h3>
              <p className="text-gray-600">Países com melhor gestão de resíduos na Europa</p>
            </div>
            <Globe className="w-8 h-8 text-orange-500" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rankingPaises.slice(0, 6).map((pais, idx) => (
              <div 
                key={pais.pais}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center space-x-4"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  idx === 0 ? 'bg-yellow-500' :
                  idx === 1 ? 'bg-gray-400' :
                  idx === 2 ? 'bg-orange-500' :
                  'bg-gray-300'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{pais.bandeira}</span>
                    <span className="font-semibold text-gray-900">{pais.pais}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${pais.gestaoResiduos}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-green-600">{pais.gestaoResiduos}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => setActiveSection('quizzes')}
            className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <span>Testar Conhecimentos sobre Resíduos</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WasteSection;
