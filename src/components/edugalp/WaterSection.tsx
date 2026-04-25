import React, { useState } from 'react';
import { Droplets, ArrowRight, AlertTriangle, CheckCircle, Globe, Waves } from 'lucide-react';

interface WaterSectionProps {
  setActiveSection: (section: string) => void;
}

const WaterSection: React.FC<WaterSectionProps> = ({ setActiveSection }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { valor: '< 1%', label: 'Água doce acessível no planeta', cor: 'text-blue-600', bg: 'bg-blue-50' },
    { valor: '17%', label: 'População com acesso a electricidade em Moçambique', cor: 'text-orange-600', bg: 'bg-orange-50' },
    { valor: '70%', label: 'Da água mundial usada na agricultura', cor: 'text-green-600', bg: 'bg-green-50' },
    { valor: '50L', label: 'Mínimo diário por pessoa (ONU)', cor: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const dicasPoupanca = [
    { titulo: 'Fechar a torneira ao escovar os dentes', poupanca: 'Poupa até 12L por vez', icon: '🪥' },
    { titulo: 'Duche curto (5 min) em vez de banho de banheira', poupanca: 'Poupa até 100L por banho', icon: '🚿' },
    { titulo: 'Reparar fugas imediatamente', poupanca: 'Poupa até 200L por dia', icon: '🔧' },
    { titulo: 'Reutilizar água de cozer alimentos para regar', poupanca: 'Poupa até 5L por dia', icon: '🌱' },
    { titulo: 'Colher água da chuva para jardim e limpeza', poupanca: 'Poupa até 50L por semana', icon: '🌧️' },
    { titulo: 'Máquina de lavar sempre com carga completa', poupanca: 'Poupa até 40L por lavagem', icon: '👕' },
  ];

  const desafiosMocambique = [
    {
      titulo: 'Acesso a Água Potável',
      descricao: 'Apenas 56% da população tem acesso a fontes de água potável melhoradas. Nas zonas rurais, a situação é ainda mais crítica.',
      icon: '💧',
      cor: 'border-blue-400 bg-blue-50',
    },
    {
      titulo: 'Saneamento',
      descricao: 'Menos de 30% da população urbana tem saneamento melhorado, expondo comunidades a doenças de veiculação hídrica como cólera.',
      icon: '🏗️',
      cor: 'border-orange-400 bg-orange-50',
    },
    {
      titulo: 'Ciclones e Cheias',
      descricao: 'Ciclones como o Idai e Kenneth destroem infraestruturas de água, contaminam fontes e afetam aquíferos costeiros.',
      icon: '🌀',
      cor: 'border-red-400 bg-red-50',
    },
    {
      titulo: 'Secas no Sul',
      descricao: 'O sul de Moçambique enfrenta secas prolongadas e stress hídrico crescente, afetando a agricultura e o abastecimento.',
      icon: '☀️',
      cor: 'border-yellow-400 bg-yellow-50',
    },
    {
      titulo: 'Desflorestação',
      descricao: 'A perda de cobertura florestal reduz a infiltração de água no solo, aumenta a erosão e diminui os caudais dos rios na época seca.',
      icon: '🌳',
      cor: 'border-green-400 bg-green-50',
    },
    {
      titulo: 'Impacto Mineiro',
      descricao: 'A exploração de carvão em Tete pode contaminar aquíferos por drenagem ácida e consome grandes volumes de água nas operações.',
      icon: '⛏️',
      cor: 'border-gray-400 bg-gray-50',
    },
  ];

  const recursosPrincipais = [
    { nome: 'Rio Zambeze', descricao: 'Um dos maiores rios de África. Alimenta a Barragem de Cahora Bassa (2.075 MW) e sustenta comunidades ao longo do seu curso.', icon: '🏞️' },
    { nome: 'Rio Limpopo', descricao: 'Partilhado com África do Sul, Zimbabwe e Botswana. Sujeito a stress hídrico crescente e negociações diplomáticas.', icon: '🌊' },
    { nome: 'Barragem de Cahora Bassa', descricao: 'Uma das maiores barragens de África. A sua gestão equilibra produção de energia com necessidades ecológicas a jusante.', icon: '⚡' },
    { nome: 'Aquíferos Costeiros', descricao: 'Fontes de água subterrânea em risco de intrusão salina devido ao aumento do nível do mar e ciclones.', icon: '🌍' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <Droplets className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">Módulo 4</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Consumo Responsável de Água
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A água é um recurso essencial e escasso. Em Moçambique, a gestão sustentável da água é um desafio prioritário para o desenvolvimento do país.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.bg} rounded-2xl p-5 text-center`}>
              <div className={`text-3xl font-bold ${stat.cor} mb-1`}>{stat.valor}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-2">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'mocambique', label: 'Moçambique' },
            { id: 'dicas', label: 'Dicas de Poupança' },
            { id: 'recursos', label: 'Recursos Hídricos' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Visão Geral */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Waves className="w-6 h-6 text-blue-500" /> O Ciclo da Água
                </h3>
                <p className="text-gray-600 mb-4">
                  A água na Terra circula continuamente através da evaporação, condensação, precipitação e escoamento. Este ciclo é fundamental para a vida mas é afetado pelas alterações climáticas e pelas actividades humanas.
                </p>
                <ul className="space-y-2">
                  {['Evaporação dos oceanos e superfícies', 'Condensação em nuvens', 'Precipitação (chuva, neve)', 'Infiltração e recarga de aquíferos', 'Escoamento para rios e mar'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-orange-500" /> Ameaças à Água Doce
                </h3>
                <p className="text-gray-600 mb-4">
                  A pressão sobre os recursos hídricos está a aumentar globalmente devido ao crescimento populacional, alterações climáticas e poluição.
                </p>
                <ul className="space-y-2">
                  {['Poluição industrial e agrícola', 'Sobreexploração de aquíferos', 'Desflorestação e erosão', 'Alterações climáticas e secas', 'Falta de infraestruturas de saneamento'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">A Água e o ODS 6</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                O Objetivo de Desenvolvimento Sustentável 6 visa garantir água limpa e saneamento para todos até 2030. Moçambique enfrenta grandes desafios para atingir esta meta.
              </p>
              <button
                onClick={() => setActiveSection('quizzes')}
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                <span>Testar Conhecimentos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab: Moçambique */}
        {activeTab === 'mocambique' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {desafiosMocambique.map((desafio, idx) => (
              <div key={idx} className={`border-2 ${desafio.cor} rounded-2xl p-6`}>
                <div className="text-3xl mb-3">{desafio.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{desafio.titulo}</h4>
                <p className="text-sm text-gray-600">{desafio.descricao}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Dicas de Poupança */}
        {activeTab === 'dicas' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
              <p className="text-blue-800 font-medium text-center">
                💡 Em Moçambique, onde o acesso à água é limitado, cada gota conta. Aqui estão dicas práticas para poupar água no dia a dia.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {dicasPoupanca.map((dica, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="text-3xl">{dica.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{dica.titulo}</h4>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                      {dica.poupanca}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pegada Hídrica */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mt-8">
              <h3 className="text-xl font-bold mb-4">💧 A sua Pegada Hídrica</h3>
              <p className="text-blue-100 mb-4">
                A pegada hídrica mede toda a água que usamos direta e indiretamente — incluindo a água "virtual" nos produtos que consumimos.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-2xl font-bold">1.500L</div>
                  <div className="text-sm text-blue-200">1 kg de arroz</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-2xl font-bold">2.700L</div>
                  <div className="text-sm text-blue-200">1 t-shirt de algodão</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-2xl font-bold">15.000L</div>
                  <div className="text-sm text-blue-200">1 kg de carne de vaca</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Recursos Hídricos */}
        {activeTab === 'recursos' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {recursosPrincipais.map((recurso, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6">
                  <div className="text-3xl mb-3">{recurso.icon}</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{recurso.nome}</h4>
                  <p className="text-gray-600 text-sm">{recurso.descricao}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-500" /> Diplomacia da Água
              </h3>
              <p className="text-gray-600 mb-4">
                Moçambique partilha bacias hidrográficas com vários países vizinhos. A gestão transfronteiriça da água é essencial para evitar conflitos e garantir o uso equitativo dos recursos.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Zâmbia', 'Zimbabwe', 'Malawi', 'África do Sul', 'Suazilândia', 'Tanzania', 'Botswana'].map((pais, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-center text-sm font-medium text-gray-700">
                    {pais}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setActiveSection('quizzes')}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            <span>Fazer Quiz de Água</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default WaterSection;
