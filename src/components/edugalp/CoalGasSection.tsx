import React, { useState } from 'react';
import { Flame, Zap, Wind, Heart, Clock, DollarSign, TrendingDown, AlertTriangle } from 'lucide-react';
import { comparacaoCarvaoGas } from '@/data/eduGalpData';

interface CoalGasSectionProps {
  setActiveSection: (section: string) => void;
}

const CoalGasSection: React.FC<CoalGasSectionProps> = ({ setActiveSection }) => {
  const [consumoKwh, setConsumoKwh] = useState(1000);
  
  const { carvao, gasNatural } = comparacaoCarvaoGas;
  
  // Simulator calculations
  const custoCarvao = consumoKwh * carvao.custoKwh;
  const custoGas = consumoKwh * gasNatural.custoKwh;
  const emissoesCarvao = (consumoKwh * carvao.emissoesCO2) / 1000; // kg to tons
  const emissoesGas = (consumoKwh * gasNatural.emissoesCO2) / 1000;
  const poupanca = custoCarvao - custoGas;
  const reducaoEmissoes = ((emissoesCarvao - emissoesGas) / emissoesCarvao * 100).toFixed(0);

  const comparisons = [
    {
      label: 'Custo por kWh',
      carvao: `${carvao.custoKwh}€`,
      gas: `${gasNatural.custoKwh}€`,
      icon: DollarSign,
      gasWins: true
    },
    {
      label: 'Emissões CO₂ (g/kWh)',
      carvao: `${carvao.emissoesCO2}g`,
      gas: `${gasNatural.emissoesCO2}g`,
      icon: Wind,
      gasWins: true
    },
    {
      label: 'Eficiência',
      carvao: `${carvao.eficiencia}%`,
      gas: `${gasNatural.eficiencia}%`,
      icon: Zap,
      gasWins: true
    },
    {
      label: 'Impacto na Saúde',
      carvao: carvao.impactoSaude,
      gas: gasNatural.impactoSaude,
      icon: Heart,
      gasWins: true
    },
    {
      label: 'Tempo de Arranque',
      carvao: carvao.tempoArraque,
      gas: gasNatural.tempoArraque,
      icon: Clock,
      gasWins: true
    },
    {
      label: 'Partículas Finas',
      carvao: carvao.particulasFinas,
      gas: gasNatural.particulasFinas,
      icon: AlertTriangle,
      gasWins: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
            <Flame className="w-5 h-5 text-orange-600" />
            <span className="text-orange-700 font-medium">Módulo 2</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Carvão vs Gás Natural
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare os dois combustíveis fósseis mais utilizados na produção de eletricidade. 
            Descubra porque o gás natural é mais eficiente, económico e menos poluente.
          </p>
        </div>

        {/* Hero Comparison Image */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/697531914631b7bb6a84d09a_1769288269270_cffd7506.jpg"
            alt="Carvão vs Gás Natural"
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-orange-900/80" />
          <div className="absolute inset-0 flex items-center justify-between px-8 sm:px-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">⚫</span>
              </div>
              <h3 className="text-xl font-bold text-white">Carvão</h3>
              <p className="text-gray-300 text-sm">Mais poluente</p>
            </div>
            <div className="text-4xl font-bold text-white">VS</div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Gás Natural</h3>
              <p className="text-orange-200 text-sm">Mais eficiente</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comparação Direta</h3>
          <div className="grid gap-4">
            {comparisons.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="grid grid-cols-3 items-center gap-4">
                    {/* Carvão */}
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-bold text-gray-700">{item.carvao}</div>
                      <div className="text-xs text-gray-500">Carvão</div>
                    </div>
                    
                    {/* Label */}
                    <div className="text-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-700">{item.label}</div>
                    </div>
                    
                    {/* Gás */}
                    <div className="text-center">
                      <div className={`text-lg sm:text-xl font-bold ${item.gasWins ? 'text-green-600' : 'text-gray-700'}`}>
                        {item.gas}
                      </div>
                      <div className="text-xs text-gray-500">Gás Natural</div>
                      {item.gasWins && (
                        <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Melhor
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Simulator */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 sm:p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Simulador Interativo</h3>
            <p className="text-gray-600">Quanto custa produzir energia com carvão vs gás?</p>
          </div>

          {/* Slider */}
          <div className="max-w-xl mx-auto mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumo de Energia: <span className="text-orange-600 font-bold">{consumoKwh.toLocaleString()} kWh</span>
            </label>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={consumoKwh}
              onChange={(e) => setConsumoKwh(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>100 kWh</span>
              <span>10.000 kWh</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Carvão Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-xl">⚫</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Carvão</h4>
                  <p className="text-sm text-gray-500">Combustível fóssil tradicional</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Custo Total</span>
                  <span className="text-xl font-bold text-gray-900">{custoCarvao.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Emissões CO₂</span>
                  <span className="text-lg font-semibold text-red-600">{emissoesCarvao.toFixed(2)} ton</span>
                </div>
              </div>
            </div>

            {/* Gás Natural Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-green-400">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Gás Natural</h4>
                  <p className="text-sm text-gray-500">Combustível de transição</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Custo Total</span>
                  <span className="text-xl font-bold text-green-600">{custoGas.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Emissões CO₂</span>
                  <span className="text-lg font-semibold text-green-600">{emissoesGas.toFixed(2)} ton</span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Summary */}
          <div className="bg-green-500 rounded-xl p-6 text-white text-center">
            <h4 className="text-lg font-semibold mb-4">Com Gás Natural, você poupa:</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold">{poupanca.toFixed(2)}€</div>
                <div className="text-green-100 text-sm">em custos</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{reducaoEmissoes}%</div>
                <div className="text-green-100 text-sm">menos emissões</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Conclusions */}
        <div className="bg-gray-900 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Conclusões Baseadas em Dados</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">Mais Económico</h4>
              <p className="text-gray-400 text-sm">O gás natural custa 37% menos por kWh produzido</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">Mais Eficiente</h4>
              <p className="text-gray-400 text-sm">Eficiência de 60% vs 35% do carvão</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wind className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">Menos Poluente</h4>
              <p className="text-gray-400 text-sm">50% menos emissões de CO₂ por kWh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoalGasSection;
