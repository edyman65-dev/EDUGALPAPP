// EduGALP Data - Quiz Questions, Rankings, and Educational Content

export interface QuizQuestion {
  id: number;
  tema: 'renovaveis' | 'carvao-gas' | 'residuos' | 'agua';
  nivel: 'iniciante' | 'intermedio' | 'avancado';
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
}

export interface RankingUser {
  id: number;
  nome: string;
  avatar: string;
  pontos: number;
  quizzesCompletos: number;
  nivel: string;
}

export interface RankingPais {
  pais: string;
  bandeira: string;
  percentagemRenovavel: number;
  emissoesCO2: number;
  gestaoResiduos: number;
}

export const quizQuestions: QuizQuestion[] = [
  // =====================================================
  // ENERGIAS RENOVÁVEIS - Iniciante (10 perguntas)
  // =====================================================
  {
    id: 1,
    tema: 'renovaveis',
    nivel: 'iniciante',
    pergunta: 'Qual destas é uma fonte de energia renovável?',
    opcoes: ['Carvão', 'Petróleo', 'Energia Solar', 'Gás Natural'],
    respostaCorreta: 2,
    explicacao: 'A energia solar é renovável porque provém do sol, uma fonte inesgotável à escala humana.'
  },
  {
    id: 2,
    tema: 'renovaveis',
    nivel: 'iniciante',
    pergunta: 'O que são painéis solares?',
    opcoes: ['Dispositivos que produzem calor', 'Dispositivos que convertem luz solar em eletricidade', 'Espelhos decorativos', 'Aquecedores de água'],
    respostaCorreta: 1,
    explicacao: 'Os painéis solares fotovoltaicos convertem a luz do sol diretamente em eletricidade através do efeito fotovoltaico.'
  },
  {
    id: 3,
    tema: 'renovaveis',
    nivel: 'iniciante',
    pergunta: 'A energia eólica é produzida através de:',
    opcoes: ['Água', 'Vento', 'Sol', 'Calor da Terra'],
    respostaCorreta: 1,
    explicacao: 'A energia eólica utiliza a força do vento para fazer girar turbinas que geram eletricidade.'
  },
  {
    id: 4,
    tema: 'renovaveis',
    nivel: 'iniciante',
    pergunta: 'Qual país africano tem maior potencial de energia solar?',
    opcoes: ['África do Sul', 'Moçambique', 'Egipto', 'Nigéria'],
    respostaCorreta: 1,
    explicacao: 'Moçambique tem um dos maiores potenciais solares de África, com mais de 3.000 horas de sol por ano, tornando-o ideal para energia fotovoltaica.'
  },
  {
    id: 5,
    tema: 'renovaveis',
    nivel: 'iniciante',
    pergunta: 'A energia hidroelétrica utiliza:',
    opcoes: ['O calor do sol', 'A força da água', 'O vento', 'Combustíveis fósseis'],
    respostaCorreta: 1,
    explicacao: 'A energia hidroelétrica aproveita o movimento da água em barragens para gerar eletricidade.'
  },
  {
    id: 46,
    tema: 'renovaveis',
    nivel: 'iniciante',
    pergunta: 'Qual é a principal vantagem das energias renováveis em relação às fósseis?',
    opcoes: ['São mais baratas de instalar', 'Não emitem gases de efeito estufa na produção', 'Funcionam apenas de dia', 'Precisam de menos espaço'],
    respostaCorreta: 1,
    explicacao: 'As energias renováveis não emitem CO₂ durante a produção de eletricidade, ao contrário dos combustíveis fósseis.'
  },
  {
    id: 47,
    tema: 'renovaveis',
    nivel: 'iniciante',
    pergunta: 'O que é energia geotérmica?',
    opcoes: ['Energia do vento', 'Energia do calor interno da Terra', 'Energia das marés', 'Energia do sol'],
    respostaCorreta: 1,
    explicacao: 'A energia geotérmica aproveita o calor natural do interior da Terra para produzir eletricidade ou aquecimento.'
  },
  {
    id: 48,
    tema: 'renovaveis',
    nivel: 'iniciante',
    pergunta: 'As turbinas eólicas transformam energia do vento em:',
    opcoes: ['Calor', 'Eletricidade', 'Água quente', 'Combustível'],
    respostaCorreta: 1,
    explicacao: 'As turbinas eólicas convertem a energia cinética do vento em energia elétrica através de um gerador.'
  },
  {
    id: 49,
    tema: 'renovaveis',
    nivel: 'iniciante',
    pergunta: 'Qual destas NÃO é uma energia renovável?',
    opcoes: ['Solar', 'Eólica', 'Nuclear', 'Hidroelétrica'],
    respostaCorreta: 2,
    explicacao: 'A energia nuclear utiliza urânio, um recurso finito, e por isso não é considerada renovável, apesar de ter baixas emissões de CO₂.'
  },
  {
    id: 50,
    tema: 'renovaveis',
    nivel: 'iniciante',
    pergunta: 'Em Portugal, qual é a principal fonte de energia renovável?',
    opcoes: ['Solar', 'Eólica', 'Hidroelétrica', 'Biomassa'],
    respostaCorreta: 2,
    explicacao: 'A energia hidroelétrica é historicamente a principal fonte renovável em Portugal, graças às muitas barragens do país.'
  },

  // =====================================================
  // ENERGIAS RENOVÁVEIS - Intermédio (10 perguntas)
  // =====================================================
  {
    id: 6,
    tema: 'renovaveis',
    nivel: 'intermedio',
    pergunta: 'Qual a eficiência média dos painéis solares modernos?',
    opcoes: ['5-10%', '15-22%', '50-60%', '80-90%'],
    respostaCorreta: 1,
    explicacao: 'Os painéis solares comerciais modernos têm eficiência entre 15% e 22%, com alguns modelos premium chegando a 25%.'
  },
  {
    id: 7,
    tema: 'renovaveis',
    nivel: 'intermedio',
    pergunta: 'O que é biomassa?',
    opcoes: ['Energia do vento', 'Matéria orgânica usada como combustível', 'Energia nuclear', 'Gás natural'],
    respostaCorreta: 1,
    explicacao: 'A biomassa inclui materiais orgânicos como madeira, resíduos agrícolas e biogás, usados para produzir energia.'
  },
  {
    id: 8,
    tema: 'renovaveis',
    nivel: 'intermedio',
    pergunta: 'Qual a principal vantagem da energia geotérmica?',
    opcoes: ['É barata de instalar', 'Funciona 24/7 independente do clima', 'Não precisa de manutenção', 'Pode ser instalada em qualquer lugar'],
    respostaCorreta: 1,
    explicacao: 'A energia geotérmica funciona continuamente, pois utiliza o calor constante do interior da Terra.'
  },
  {
    id: 9,
    tema: 'renovaveis',
    nivel: 'intermedio',
    pergunta: 'Portugal tem como meta para 2030 que percentagem de energia renovável?',
    opcoes: ['50%', '65%', '80%', '100%'],
    respostaCorreta: 2,
    explicacao: 'Portugal tem como meta atingir 80% de eletricidade de fontes renováveis até 2030.'
  },
  {
    id: 10,
    tema: 'renovaveis',
    nivel: 'intermedio',
    pergunta: 'O que é um parque eólico offshore?',
    opcoes: ['Parque eólico em montanhas', 'Parque eólico no mar', 'Parque eólico em desertos', 'Parque eólico urbano'],
    respostaCorreta: 1,
    explicacao: 'Parques eólicos offshore são instalados no mar, onde os ventos são mais fortes e constantes.'
  },
  {
    id: 51,
    tema: 'renovaveis',
    nivel: 'intermedio',
    pergunta: 'O que é o efeito fotovoltaico?',
    opcoes: ['Aquecimento da água pelo sol', 'Conversão direta de luz em eletricidade', 'Reflexão da luz solar', 'Produção de calor por painéis'],
    respostaCorreta: 1,
    explicacao: 'O efeito fotovoltaico é o fenómeno físico pelo qual certos materiais semicondutores geram corrente elétrica quando expostos à luz.'
  },
  {
    id: 52,
    tema: 'renovaveis',
    nivel: 'intermedio',
    pergunta: 'Qual a principal desvantagem da energia solar?',
    opcoes: ['Emite muitos poluentes', 'É intermitente (depende do sol)', 'Ocupa pouco espaço', 'É muito cara de manter'],
    respostaCorreta: 1,
    explicacao: 'A intermitência é o maior desafio da energia solar, pois a produção depende das condições meteorológicas e da hora do dia.'
  },
  {
    id: 53,
    tema: 'renovaveis',
    nivel: 'intermedio',
    pergunta: 'O que é uma comunidade de energia renovável?',
    opcoes: ['Uma cidade sem eletricidade', 'Um grupo de cidadãos que produzem e partilham energia renovável', 'Uma fábrica de painéis solares', 'Um parque natural'],
    respostaCorreta: 1,
    explicacao: 'As comunidades de energia renovável permitem que cidadãos, empresas e autarquias produzam, consumam e partilhem energia localmente.'
  },
  {
    id: 54,
    tema: 'renovaveis',
    nivel: 'intermedio',
    pergunta: 'Qual a vida útil média de um painel solar?',
    opcoes: ['5-10 anos', '15-20 anos', '25-30 anos', '50-60 anos'],
    respostaCorreta: 2,
    explicacao: 'Os painéis solares modernos têm uma vida útil de 25 a 30 anos, mantendo cerca de 80% da eficiência original.'
  },
  {
    id: 55,
    tema: 'renovaveis',
    nivel: 'intermedio',
    pergunta: 'O que é uma barragem reversível (bombagem)?',
    opcoes: ['Uma barragem que se move', 'Uma barragem que bombeia água para cima para armazenar energia', 'Uma barragem sem turbinas', 'Uma barragem para irrigação'],
    respostaCorreta: 1,
    explicacao: 'As barragens reversíveis bombeiam água para montante quando há excesso de energia, funcionando como uma enorme bateria hídrica.'
  },

  // =====================================================
  // ENERGIAS RENOVÁVEIS - Avançado (10 perguntas)
  // =====================================================
  {
    id: 11,
    tema: 'renovaveis',
    nivel: 'avancado',
    pergunta: 'Qual o LCOE (custo nivelado de energia) médio da energia solar em 2024?',
    opcoes: ['$150-200/MWh', '$80-120/MWh', '$30-50/MWh', '$10-20/MWh'],
    respostaCorreta: 2,
    explicacao: 'O LCOE da energia solar caiu drasticamente e está atualmente entre $30-50/MWh, tornando-a competitiva com combustíveis fósseis.'
  },
  {
    id: 12,
    tema: 'renovaveis',
    nivel: 'avancado',
    pergunta: 'O que é o "duck curve" na gestão de redes elétricas?',
    opcoes: ['Padrão de consumo noturno', 'Curva de demanda vs produção solar', 'Eficiência de turbinas', 'Custo de armazenamento'],
    respostaCorreta: 1,
    explicacao: 'O "duck curve" mostra como a produção solar durante o dia cria um padrão de demanda residual em forma de pato.'
  },
  {
    id: 13,
    tema: 'renovaveis',
    nivel: 'avancado',
    pergunta: 'Qual tecnologia de armazenamento é mais usada com renováveis?',
    opcoes: ['Hidrogénio', 'Baterias de lítio', 'Ar comprimido', 'Volantes de inércia'],
    respostaCorreta: 1,
    explicacao: 'As baterias de iões de lítio são atualmente a tecnologia dominante para armazenamento de energia renovável.'
  },
  {
    id: 14,
    tema: 'renovaveis',
    nivel: 'avancado',
    pergunta: 'Qual a capacidade da maior central solar do mundo (2024)?',
    opcoes: ['500 MW', '1 GW', '2.2 GW', '5 GW'],
    respostaCorreta: 2,
    explicacao: 'A central solar de Bhadla na Índia tem capacidade de 2.245 MW (2.2 GW), sendo a maior do mundo.'
  },
  {
    id: 15,
    tema: 'renovaveis',
    nivel: 'avancado',
    pergunta: 'O que é Power Purchase Agreement (PPA)?',
    opcoes: ['Imposto sobre energia', 'Contrato de compra de energia a longo prazo', 'Subsídio governamental', 'Licença de produção'],
    respostaCorreta: 1,
    explicacao: 'PPA é um contrato de longo prazo entre produtor e consumidor de energia, comum em projetos renováveis.'
  },
  {
    id: 56,
    tema: 'renovaveis',
    nivel: 'avancado',
    pergunta: 'O que é o hidrogénio verde?',
    opcoes: ['Hidrogénio produzido a partir de gás natural', 'Hidrogénio produzido por eletrólise com energia renovável', 'Hidrogénio extraído da água do mar', 'Hidrogénio nuclear'],
    respostaCorreta: 1,
    explicacao: 'O hidrogénio verde é produzido por eletrólise da água usando eletricidade de fontes renováveis, sem emissões de CO₂.'
  },
  {
    id: 57,
    tema: 'renovaveis',
    nivel: 'avancado',
    pergunta: 'Qual o fator de capacidade médio de um parque eólico offshore?',
    opcoes: ['15-20%', '25-30%', '40-55%', '70-80%'],
    respostaCorreta: 2,
    explicacao: 'Parques eólicos offshore têm fatores de capacidade entre 40-55%, muito superiores aos onshore (25-35%), devido a ventos mais fortes e constantes.'
  },
  {
    id: 58,
    tema: 'renovaveis',
    nivel: 'avancado',
    pergunta: 'O que é a degradação de painéis solares (LID)?',
    opcoes: ['Destruição por tempestades', 'Perda gradual de eficiência ao longo do tempo', 'Corrosão por chuva ácida', 'Sobreaquecimento dos módulos'],
    respostaCorreta: 1,
    explicacao: 'LID (Light Induced Degradation) é a perda gradual de eficiência dos painéis solares, tipicamente 0.5-0.8% por ano.'
  },
  {
    id: 59,
    tema: 'renovaveis',
    nivel: 'avancado',
    pergunta: 'O que são células solares de perovskita?',
    opcoes: ['Células feitas de silício puro', 'Nova geração de células com materiais cristalinos híbridos', 'Células solares orgânicas', 'Células de filme fino tradicionais'],
    respostaCorreta: 1,
    explicacao: 'As células de perovskita são uma tecnologia emergente que promete eficiências superiores a 30% e custos de produção mais baixos que o silício.'
  },
  {
    id: 60,
    tema: 'renovaveis',
    nivel: 'avancado',
    pergunta: 'Qual o papel dos mercados de certificados de energia renovável (GOs)?',
    opcoes: ['Regular o preço da eletricidade', 'Comprovar a origem renovável da energia consumida', 'Financiar a construção de barragens', 'Taxar as emissões de carbono'],
    respostaCorreta: 1,
    explicacao: 'As Garantias de Origem (GOs) são certificados que comprovam que a eletricidade foi produzida a partir de fontes renováveis, permitindo rastreabilidade.'
  },

  // =====================================================
  // CARVÃO VS GÁS - Iniciante (10 perguntas)
  // =====================================================
  {
    id: 16,
    tema: 'carvao-gas',
    nivel: 'iniciante',
    pergunta: 'Qual combustível emite mais CO2 por kWh produzido?',
    opcoes: ['Gás Natural', 'Carvão', 'São iguais', 'Depende da central'],
    respostaCorreta: 1,
    explicacao: 'O carvão emite cerca de 900-1000g CO2/kWh, enquanto o gás natural emite apenas 400-500g CO2/kWh.'
  },
  {
    id: 17,
    tema: 'carvao-gas',
    nivel: 'iniciante',
    pergunta: 'O gás natural é composto principalmente por:',
    opcoes: ['Dióxido de carbono', 'Metano', 'Oxigénio', 'Nitrogénio'],
    respostaCorreta: 1,
    explicacao: 'O gás natural é composto por 70-90% de metano (CH4), um hidrocarboneto mais limpo que o carvão.'
  },
  {
    id: 18,
    tema: 'carvao-gas',
    nivel: 'iniciante',
    pergunta: 'Qual é mais eficiente na produção de eletricidade?',
    opcoes: ['Carvão', 'Gás Natural', 'São iguais', 'Nenhum dos dois'],
    respostaCorreta: 1,
    explicacao: 'Centrais a gás natural de ciclo combinado atingem 60% de eficiência, contra 33-40% do carvão.'
  },
  {
    id: 19,
    tema: 'carvao-gas',
    nivel: 'iniciante',
    pergunta: 'O carvão é um combustível:',
    opcoes: ['Renovável', 'Fóssil', 'Nuclear', 'Sintético'],
    respostaCorreta: 1,
    explicacao: 'O carvão é um combustível fóssil formado há milhões de anos a partir de matéria orgânica.'
  },
  {
    id: 20,
    tema: 'carvao-gas',
    nivel: 'iniciante',
    pergunta: 'Qual poluente é mais associado à queima de carvão?',
    opcoes: ['Ozono', 'Partículas finas (PM2.5)', 'Vapor de água', 'Hélio'],
    respostaCorreta: 1,
    explicacao: 'A queima de carvão liberta grandes quantidades de partículas finas PM2.5, muito prejudiciais à saúde.'
  },
  {
    id: 61,
    tema: 'carvao-gas',
    nivel: 'iniciante',
    pergunta: 'O que acontece quando se queima carvão?',
    opcoes: ['Produz-se oxigénio', 'Liberta-se CO₂ e outros poluentes', 'Gera-se água limpa', 'Não há emissões'],
    respostaCorreta: 1,
    explicacao: 'A combustão do carvão liberta dióxido de carbono (CO₂), dióxido de enxofre (SO₂), óxidos de azoto e partículas finas.'
  },
  {
    id: 62,
    tema: 'carvao-gas',
    nivel: 'iniciante',
    pergunta: 'O gás natural é transportado principalmente por:',
    opcoes: ['Camiões', 'Gasodutos e navios (GNL)', 'Aviões', 'Comboios'],
    respostaCorreta: 1,
    explicacao: 'O gás natural é transportado por gasodutos ou em forma líquida (GNL) em navios especializados.'
  },
  {
    id: 63,
    tema: 'carvao-gas',
    nivel: 'iniciante',
    pergunta: 'Qual destes problemas está associado à mineração de carvão?',
    opcoes: ['Melhoria da qualidade do ar', 'Destruição de habitats e poluição da água', 'Aumento da biodiversidade', 'Redução do aquecimento global'],
    respostaCorreta: 1,
    explicacao: 'A mineração de carvão causa destruição de habitats, poluição de rios e lençóis freáticos, e riscos para a saúde dos mineiros.'
  },
  {
    id: 64,
    tema: 'carvao-gas',
    nivel: 'iniciante',
    pergunta: 'O que significa GNL?',
    opcoes: ['Gás Natural Leve', 'Gás Natural Liquefeito', 'Gás Não Limpo', 'Gerador Natural de Luz'],
    respostaCorreta: 1,
    explicacao: 'GNL significa Gás Natural Liquefeito, que é o gás natural arrefecido a -162°C para transporte em estado líquido.'
  },
  {
    id: 65,
    tema: 'carvao-gas',
    nivel: 'iniciante',
    pergunta: 'Portugal ainda tem centrais a carvão em funcionamento?',
    opcoes: ['Sim, muitas', 'Não, fechou as últimas em 2021', 'Sim, mas poucas', 'Nunca teve centrais a carvão'],
    respostaCorreta: 1,
    explicacao: 'Portugal encerrou as suas últimas centrais a carvão (Sines e Pego) em 2021, tornando-se um dos primeiros países europeus a fazê-lo.'
  },

  // =====================================================
  // CARVÃO VS GÁS - Intermédio (10 perguntas)
  // =====================================================
  {
    id: 21,
    tema: 'carvao-gas',
    nivel: 'intermedio',
    pergunta: 'Qual a eficiência de uma central de ciclo combinado a gás?',
    opcoes: ['30-35%', '40-45%', '55-62%', '75-80%'],
    respostaCorreta: 2,
    explicacao: 'Centrais de ciclo combinado a gás natural atingem eficiências de 55-62%, as mais altas entre térmicas.'
  },
  {
    id: 22,
    tema: 'carvao-gas',
    nivel: 'intermedio',
    pergunta: 'Quantas mortes prematuras por ano são atribuídas à poluição do carvão globalmente?',
    opcoes: ['10.000', '100.000', '800.000+', '50.000'],
    respostaCorreta: 2,
    explicacao: 'Estudos estimam mais de 800.000 mortes prematuras anuais devido à poluição de centrais a carvão.'
  },
  {
    id: 23,
    tema: 'carvao-gas',
    nivel: 'intermedio',
    pergunta: 'O que é captura e armazenamento de carbono (CCS)?',
    opcoes: ['Plantar árvores', 'Capturar CO2 e armazená-lo no subsolo', 'Filtrar o ar', 'Reciclar carbono'],
    respostaCorreta: 1,
    explicacao: 'CCS é uma tecnologia que captura CO2 das emissões industriais e o armazena em formações geológicas.'
  },
  {
    id: 24,
    tema: 'carvao-gas',
    nivel: 'intermedio',
    pergunta: 'Qual país ainda depende mais de carvão para eletricidade?',
    opcoes: ['Alemanha', 'China', 'EUA', 'Índia'],
    respostaCorreta: 1,
    explicacao: 'A China produz mais de 60% da sua eletricidade a partir de carvão, sendo o maior consumidor mundial.'
  },
  {
    id: 25,
    tema: 'carvao-gas',
    nivel: 'intermedio',
    pergunta: 'O gás natural é considerado um combustível de transição porque:',
    opcoes: ['É renovável', 'Emite menos CO2 que carvão', 'É gratuito', 'Não polui'],
    respostaCorreta: 1,
    explicacao: 'O gás natural é visto como transição pois emite 50% menos CO2 que carvão, facilitando a mudança para renováveis.'
  },
  {
    id: 66,
    tema: 'carvao-gas',
    nivel: 'intermedio',
    pergunta: 'O que é uma central de ciclo combinado?',
    opcoes: ['Uma central que usa carvão e gás juntos', 'Uma central que usa turbina a gás e turbina a vapor em conjunto', 'Uma central com dois geradores iguais', 'Uma central que combina energia solar e gás'],
    respostaCorreta: 1,
    explicacao: 'Uma central de ciclo combinado usa primeiro uma turbina a gás e depois aproveita o calor residual numa turbina a vapor, aumentando a eficiência.'
  },
  {
    id: 67,
    tema: 'carvao-gas',
    nivel: 'intermedio',
    pergunta: 'Qual o impacto do dióxido de enxofre (SO₂) emitido pelo carvão?',
    opcoes: ['Melhora a qualidade do ar', 'Causa chuva ácida e problemas respiratórios', 'Não tem impacto ambiental', 'Protege a camada de ozono'],
    respostaCorreta: 1,
    explicacao: 'O SO₂ do carvão causa chuva ácida que danifica florestas, lagos e edifícios, além de provocar doenças respiratórias.'
  },
  {
    id: 68,
    tema: 'carvao-gas',
    nivel: 'intermedio',
    pergunta: 'Qual a diferença entre gás natural convencional e gás de xisto (shale gas)?',
    opcoes: ['Não há diferença', 'O gás de xisto é extraído por fracking de rochas sedimentares', 'O gás de xisto é renovável', 'O gás convencional é mais poluente'],
    respostaCorreta: 1,
    explicacao: 'O gás de xisto é extraído de rochas sedimentares por fraturação hidráulica (fracking), um processo controverso pelos seus impactos ambientais.'
  },
  {
    id: 69,
    tema: 'carvao-gas',
    nivel: 'intermedio',
    pergunta: 'Qual o principal gás de efeito estufa emitido na cadeia do gás natural?',
    opcoes: ['CO₂', 'Metano (CH₄)', 'Óxido nitroso', 'Ozono'],
    respostaCorreta: 1,
    explicacao: 'O metano (CH₄) é o principal problema, pois escapa durante a extração e transporte. É 80x mais potente que o CO₂ a curto prazo.'
  },
  {
    id: 70,
    tema: 'carvao-gas',
    nivel: 'intermedio',
    pergunta: 'O que são cinzas volantes do carvão?',
    opcoes: ['Cinzas que voam no ar', 'Resíduos finos da combustão do carvão capturados por filtros', 'Poeira natural das minas', 'Partículas de fumo inofensivas'],
    respostaCorreta: 1,
    explicacao: 'As cinzas volantes são partículas finas resultantes da combustão do carvão, capturadas por filtros. Contêm metais pesados e podem ser tóxicas.'
  },

  // =====================================================
  // CARVÃO VS GÁS - Avançado (10 perguntas)
  // =====================================================
  {
    id: 26,
    tema: 'carvao-gas',
    nivel: 'avancado',
    pergunta: 'Qual o custo médio de produção de eletricidade a carvão vs gás (€/MWh)?',
    opcoes: ['Carvão: 40€, Gás: 80€', 'Carvão: 80€, Gás: 50€', 'Carvão: 60€, Gás: 60€', 'Carvão: 100€, Gás: 40€'],
    respostaCorreta: 1,
    explicacao: 'Com taxas de carbono, o carvão custa ~80€/MWh enquanto o gás natural custa ~50€/MWh na Europa.'
  },
  {
    id: 27,
    tema: 'carvao-gas',
    nivel: 'avancado',
    pergunta: 'Qual a taxa de carbono atual na UE (€/tonelada CO2)?',
    opcoes: ['10-20€', '30-50€', '70-100€', '150-200€'],
    respostaCorreta: 2,
    explicacao: 'A taxa de carbono na UE (ETS) está entre 70-100€ por tonelada de CO2, penalizando fortemente o carvão.'
  },
  {
    id: 28,
    tema: 'carvao-gas',
    nivel: 'avancado',
    pergunta: 'O que é "stranded assets" no contexto energético?',
    opcoes: ['Ativos sem valor devido à transição energética', 'Centrais isoladas', 'Reservas de petróleo', 'Equipamentos antigos'],
    respostaCorreta: 0,
    explicacao: 'Stranded assets são investimentos em combustíveis fósseis que perdem valor devido à transição para renováveis.'
  },
  {
    id: 29,
    tema: 'carvao-gas',
    nivel: 'avancado',
    pergunta: 'Qual a pegada de metano do gás natural na cadeia de valor?',
    opcoes: ['0-1%', '2-4%', '10-15%', '20-25%'],
    respostaCorreta: 1,
    explicacao: 'Cerca de 2-4% do gás natural escapa como metano na extração e transporte, um problema ambiental significativo.'
  },
  {
    id: 30,
    tema: 'carvao-gas',
    nivel: 'avancado',
    pergunta: 'Quando a UE planeia eliminar completamente o carvão?',
    opcoes: ['2025', '2030', '2035-2040', '2050'],
    respostaCorreta: 2,
    explicacao: 'A maioria dos países da UE planeia eliminar o carvão entre 2035-2040, com alguns já em 2030.'
  },
  {
    id: 71,
    tema: 'carvao-gas',
    nivel: 'avancado',
    pergunta: 'O que é o CBAM (Carbon Border Adjustment Mechanism) da UE?',
    opcoes: ['Um subsídio para energias renováveis', 'Uma taxa sobre importações com base na sua pegada de carbono', 'Um programa de reflorestação', 'Um acordo comercial bilateral'],
    respostaCorreta: 1,
    explicacao: 'O CBAM é um mecanismo que aplica uma taxa de carbono a produtos importados para a UE, evitando a fuga de carbono para países com regulação menos exigente.'
  },
  {
    id: 72,
    tema: 'carvao-gas',
    nivel: 'avancado',
    pergunta: 'Qual a eficiência de captura de CO₂ das melhores tecnologias CCS atuais?',
    opcoes: ['30-40%', '50-60%', '85-95%', '100%'],
    respostaCorreta: 2,
    explicacao: 'As melhores tecnologias CCS atuais conseguem capturar 85-95% do CO₂ emitido, mas o custo ainda é elevado (60-120€/tonelada).'
  },
  {
    id: 73,
    tema: 'carvao-gas',
    nivel: 'avancado',
    pergunta: 'O que é "coal-to-gas switching" e qual o seu impacto?',
    opcoes: ['Misturar carvão com gás', 'Substituir centrais a carvão por centrais a gás, reduzindo emissões em ~50%', 'Converter carvão em gás sintético', 'Usar gás para aquecer carvão'],
    respostaCorreta: 1,
    explicacao: 'Coal-to-gas switching é a substituição de centrais a carvão por gás natural, reduzindo emissões de CO₂ em cerca de 50% por kWh produzido.'
  },
  {
    id: 74,
    tema: 'carvao-gas',
    nivel: 'avancado',
    pergunta: 'Qual o conceito de "just transition" no encerramento de minas de carvão?',
    opcoes: ['Fechar minas rapidamente', 'Garantir apoio social e económico às comunidades afetadas pela transição', 'Manter minas abertas indefinidamente', 'Exportar carvão em vez de o queimar'],
    respostaCorreta: 1,
    explicacao: 'A "just transition" garante que trabalhadores e comunidades dependentes do carvão recebam formação, apoio financeiro e novas oportunidades económicas.'
  },
  {
    id: 75,
    tema: 'carvao-gas',
    nivel: 'avancado',
    pergunta: 'Qual o potencial do biometano como substituto do gás natural fóssil?',
    opcoes: ['Nenhum, são incompatíveis', 'Pode substituir até 20% do gás fóssil na Europa até 2030', 'Já substituiu todo o gás fóssil', 'Apenas serve para aquecimento'],
    respostaCorreta: 1,
    explicacao: 'O biometano, produzido a partir de resíduos orgânicos, pode substituir até 20% do gás natural fóssil na Europa até 2030, usando a infraestrutura existente.'
  },

  // =====================================================
  // GESTÃO DE RESÍDUOS - Iniciante (10 perguntas)
  // =====================================================
  {
    id: 31,
    tema: 'residuos',
    nivel: 'iniciante',
    pergunta: 'O que significam os 3Rs?',
    opcoes: ['Reciclar, Renovar, Reparar', 'Reduzir, Reutilizar, Reciclar', 'Recolher, Reciclar, Revender', 'Reduzir, Reciclar, Recuperar'],
    respostaCorreta: 1,
    explicacao: 'Os 3Rs - Reduzir, Reutilizar, Reciclar - são os princípios fundamentais da gestão sustentável de resíduos.'
  },
  {
    id: 32,
    tema: 'residuos',
    nivel: 'iniciante',
    pergunta: 'Qual contentor é para papel e cartão?',
    opcoes: ['Verde', 'Amarelo', 'Azul', 'Preto'],
    respostaCorreta: 2,
    explicacao: 'O contentor azul é destinado a papel e cartão em Portugal.'
  },
  {
    id: 33,
    tema: 'residuos',
    nivel: 'iniciante',
    pergunta: 'Quanto tempo demora uma garrafa de plástico a decompor-se?',
    opcoes: ['10 anos', '50 anos', '450 anos', '1000 anos'],
    respostaCorreta: 2,
    explicacao: 'Uma garrafa de plástico pode demorar até 450 anos a decompor-se na natureza.'
  },
  {
    id: 34,
    tema: 'residuos',
    nivel: 'iniciante',
    pergunta: 'O que são resíduos orgânicos?',
    opcoes: ['Plásticos', 'Restos de comida e plantas', 'Metais', 'Vidro'],
    respostaCorreta: 1,
    explicacao: 'Resíduos orgânicos incluem restos de comida, cascas, folhas e outros materiais biodegradáveis.'
  },
  {
    id: 35,
    tema: 'residuos',
    nivel: 'iniciante',
    pergunta: 'Qual material é 100% reciclável infinitamente?',
    opcoes: ['Plástico', 'Papel', 'Vidro', 'Alumínio'],
    respostaCorreta: 2,
    explicacao: 'O vidro pode ser reciclado infinitamente sem perder qualidade, sendo 100% reciclável.'
  },
  {
    id: 76,
    tema: 'residuos',
    nivel: 'iniciante',
    pergunta: 'Qual é o contentor correto para embalagens de plástico e metal?',
    opcoes: ['Azul', 'Verde', 'Amarelo', 'Castanho'],
    respostaCorreta: 2,
    explicacao: 'O contentor amarelo (ecoponto amarelo) é destinado a embalagens de plástico, metal e embalagens de cartão para líquidos (Tetra Pak).'
  },
  {
    id: 77,
    tema: 'residuos',
    nivel: 'iniciante',
    pergunta: 'O que devemos fazer com pilhas usadas?',
    opcoes: ['Colocar no lixo comum', 'Depositar em pilhões próprios', 'Enterrar no jardim', 'Queimar'],
    respostaCorreta: 1,
    explicacao: 'As pilhas contêm metais pesados tóxicos e devem ser depositadas em pilhões (contentores específicos) disponíveis em lojas e supermercados.'
  },
  {
    id: 78,
    tema: 'residuos',
    nivel: 'iniciante',
    pergunta: 'Qual destes resíduos NÃO deve ir para o ecoponto?',
    opcoes: ['Garrafas de vidro', 'Jornais velhos', 'Fraldas usadas', 'Latas de conserva'],
    respostaCorreta: 2,
    explicacao: 'As fraldas usadas são resíduos indiferenciados e devem ir para o contentor do lixo comum, não para os ecopontos.'
  },
  {
    id: 79,
    tema: 'residuos',
    nivel: 'iniciante',
    pergunta: 'O que é um aterro sanitário?',
    opcoes: ['Um hospital', 'Um local controlado para deposição de resíduos', 'Uma fábrica de reciclagem', 'Um jardim público'],
    respostaCorreta: 1,
    explicacao: 'Um aterro sanitário é um local preparado e controlado para a deposição de resíduos que não podem ser reciclados, com proteção do solo e águas.'
  },
  {
    id: 80,
    tema: 'residuos',
    nivel: 'iniciante',
    pergunta: 'Reciclar uma lata de alumínio poupa que percentagem de energia comparado com produzir uma nova?',
    opcoes: ['10%', '25%', '50%', '95%'],
    respostaCorreta: 3,
    explicacao: 'Reciclar alumínio poupa até 95% da energia necessária para produzir alumínio novo a partir de minério (bauxite).'
  },

  // =====================================================
  // GESTÃO DE RESÍDUOS - Intermédio (10 perguntas)
  // =====================================================
  {
    id: 36,
    tema: 'residuos',
    nivel: 'intermedio',
    pergunta: 'O que é economia circular?',
    opcoes: ['Economia baseada em círculos', 'Sistema onde resíduos se tornam recursos', 'Comércio internacional', 'Economia digital'],
    respostaCorreta: 1,
    explicacao: 'A economia circular é um modelo onde os resíduos são minimizados e os materiais são continuamente reutilizados.'
  },
  {
    id: 37,
    tema: 'residuos',
    nivel: 'intermedio',
    pergunta: 'Qual país lidera a reciclagem na Europa?',
    opcoes: ['Portugal', 'Alemanha', 'França', 'Espanha'],
    respostaCorreta: 1,
    explicacao: 'A Alemanha lidera a reciclagem na Europa com taxas superiores a 65% de resíduos municipais reciclados.'
  },
  {
    id: 38,
    tema: 'residuos',
    nivel: 'intermedio',
    pergunta: 'O que é compostagem?',
    opcoes: ['Queimar resíduos', 'Decomposição controlada de matéria orgânica', 'Separar plásticos', 'Triturar vidro'],
    respostaCorreta: 1,
    explicacao: 'A compostagem é o processo de decomposição controlada de resíduos orgânicos para criar adubo natural.'
  },
  {
    id: 39,
    tema: 'residuos',
    nivel: 'intermedio',
    pergunta: 'Quantas toneladas de plástico chegam aos oceanos anualmente?',
    opcoes: ['100 mil', '1 milhão', '8 milhões', '50 milhões'],
    respostaCorreta: 2,
    explicacao: 'Cerca de 8 milhões de toneladas de plástico chegam aos oceanos todos os anos.'
  },
  {
    id: 40,
    tema: 'residuos',
    nivel: 'intermedio',
    pergunta: 'O que são resíduos perigosos?',
    opcoes: ['Resíduos grandes', 'Resíduos tóxicos, inflamáveis ou corrosivos', 'Resíduos orgânicos', 'Resíduos de construção'],
    respostaCorreta: 1,
    explicacao: 'Resíduos perigosos incluem materiais tóxicos, inflamáveis, corrosivos ou radioativos que requerem tratamento especial.'
  },
  {
    id: 81,
    tema: 'residuos',
    nivel: 'intermedio',
    pergunta: 'O que são microplásticos?',
    opcoes: ['Plásticos muito pequenos usados em embalagens', 'Fragmentos de plástico com menos de 5mm que poluem o ambiente', 'Plásticos biodegradáveis', 'Plásticos reciclados'],
    respostaCorreta: 1,
    explicacao: 'Microplásticos são fragmentos de plástico com menos de 5mm, encontrados nos oceanos, solo, água potável e até no sangue humano.'
  },
  {
    id: 82,
    tema: 'residuos',
    nivel: 'intermedio',
    pergunta: 'Qual a taxa de reciclagem de resíduos urbanos em Portugal (2024)?',
    opcoes: ['15-20%', '30-40%', '50-60%', '70-80%'],
    respostaCorreta: 1,
    explicacao: 'Portugal tem uma taxa de reciclagem de resíduos urbanos de cerca de 30-40%, abaixo da meta europeia de 55% para 2025.'
  },
  {
    id: 83,
    tema: 'residuos',
    nivel: 'intermedio',
    pergunta: 'O que é o sistema de depósito e reembolso (deposit-return)?',
    opcoes: ['Pagar para depositar lixo', 'Pagar um depósito na compra que é devolvido ao reciclar a embalagem', 'Vender resíduos a fábricas', 'Trocar lixo por produtos'],
    respostaCorreta: 1,
    explicacao: 'O sistema deposit-return cobra um depósito na compra de bebidas que é devolvido quando o consumidor devolve a embalagem vazia para reciclagem.'
  },
  {
    id: 84,
    tema: 'residuos',
    nivel: 'intermedio',
    pergunta: 'O que é obsolescência programada?',
    opcoes: ['Produtos que melhoram com o tempo', 'Design intencional de produtos para terem vida útil limitada', 'Reciclagem automática de produtos', 'Programas de recolha de resíduos'],
    respostaCorreta: 1,
    explicacao: 'A obsolescência programada é a prática de projetar produtos para falharem ou ficarem desatualizados após um período, gerando mais resíduos.'
  },
  {
    id: 85,
    tema: 'residuos',
    nivel: 'intermedio',
    pergunta: 'Qual a diferença entre reciclagem e upcycling?',
    opcoes: ['São a mesma coisa', 'Upcycling transforma resíduos em produtos de maior valor', 'Reciclagem é mais criativa', 'Upcycling é industrial e reciclagem é artesanal'],
    respostaCorreta: 1,
    explicacao: 'O upcycling transforma materiais descartados em produtos de maior valor ou qualidade, enquanto a reciclagem converte materiais na mesma matéria-prima.'
  },

  // =====================================================
  // GESTÃO DE RESÍDUOS - Avançado (10 perguntas)
  // =====================================================
  {
    id: 41,
    tema: 'residuos',
    nivel: 'avancado',
    pergunta: 'Qual a meta da UE para reciclagem de resíduos municipais em 2035?',
    opcoes: ['50%', '55%', '65%', '75%'],
    respostaCorreta: 2,
    explicacao: 'A UE estabeleceu uma meta de 65% de reciclagem de resíduos municipais até 2035.'
  },
  {
    id: 42,
    tema: 'residuos',
    nivel: 'avancado',
    pergunta: 'O que é "waste-to-energy"?',
    opcoes: ['Reciclar energia', 'Converter resíduos em eletricidade/calor', 'Poupar energia', 'Energia dos aterros'],
    respostaCorreta: 1,
    explicacao: 'Waste-to-energy é a conversão de resíduos não recicláveis em eletricidade ou calor através de incineração controlada.'
  },
  {
    id: 43,
    tema: 'residuos',
    nivel: 'avancado',
    pergunta: 'Qual a percentagem de resíduos eletrónicos reciclados globalmente?',
    opcoes: ['5%', '17%', '40%', '60%'],
    respostaCorreta: 1,
    explicacao: 'Apenas cerca de 17% dos resíduos eletrónicos (e-waste) são formalmente reciclados a nível global.'
  },
  {
    id: 44,
    tema: 'residuos',
    nivel: 'avancado',
    pergunta: 'O que é Extended Producer Responsibility (EPR)?',
    opcoes: ['Garantia de produtos', 'Responsabilidade do produtor pelo ciclo de vida do produto', 'Certificação ambiental', 'Imposto verde'],
    respostaCorreta: 1,
    explicacao: 'EPR obriga os produtores a serem responsáveis pela gestão dos seus produtos no fim de vida, incluindo reciclagem.'
  },
  {
    id: 45,
    tema: 'residuos',
    nivel: 'avancado',
    pergunta: 'Qual cidade é referência mundial em "zero waste"?',
    opcoes: ['Nova Iorque', 'São Francisco', 'Kamikatsu (Japão)', 'Londres'],
    respostaCorreta: 2,
    explicacao: 'Kamikatsu no Japão é referência mundial com 80%+ de reciclagem e meta de zero resíduos para aterro.'
  },
  {
    id: 86,
    tema: 'residuos',
    nivel: 'avancado',
    pergunta: 'O que é a reciclagem química de plásticos?',
    opcoes: ['Lavar plásticos com químicos', 'Decompor plásticos nos seus monómeros originais para criar plástico virgem', 'Misturar plásticos com produtos químicos', 'Pintar plásticos reciclados'],
    respostaCorreta: 1,
    explicacao: 'A reciclagem química decompõe polímeros plásticos nos seus monómeros originais, permitindo criar plástico de qualidade virgem, ao contrário da reciclagem mecânica.'
  },
  {
    id: 87,
    tema: 'residuos',
    nivel: 'avancado',
    pergunta: 'Qual o conceito de "design for disassembly" (DfD)?',
    opcoes: ['Projetar edifícios bonitos', 'Projetar produtos para serem facilmente desmontados e reciclados', 'Criar manuais de montagem', 'Destruir produtos no fim de vida'],
    respostaCorreta: 1,
    explicacao: 'DfD é uma abordagem de design que facilita a desmontagem de produtos no fim de vida, permitindo a recuperação e reciclagem eficiente dos materiais.'
  },
  {
    id: 88,
    tema: 'residuos',
    nivel: 'avancado',
    pergunta: 'O que é a Diretiva SUP (Single-Use Plastics) da UE?',
    opcoes: ['Incentivo ao uso de plásticos', 'Legislação que proíbe certos plásticos descartáveis e exige metas de recolha', 'Norma de qualidade de plásticos', 'Programa de exportação de resíduos'],
    respostaCorreta: 1,
    explicacao: 'A Diretiva SUP proíbe certos plásticos descartáveis (palhinhas, talheres, pratos) e estabelece metas de recolha de garrafas PET de 90% até 2029.'
  },
  {
    id: 89,
    tema: 'residuos',
    nivel: 'avancado',
    pergunta: 'O que é o "passaporte digital de produto" proposto pela UE?',
    opcoes: ['Um documento de viagem para mercadorias', 'Um registo digital com informações sobre materiais, reparabilidade e reciclabilidade', 'Uma etiqueta de preço eletrónica', 'Um código de barras melhorado'],
    respostaCorreta: 1,
    explicacao: 'O passaporte digital de produto registará informações sobre composição, origem, reparabilidade e instruções de reciclagem, promovendo a economia circular.'
  },
  {
    id: 90,
    tema: 'residuos',
    nivel: 'avancado',
    pergunta: 'Qual o impacto ambiental da exportação de resíduos de países desenvolvidos para países em desenvolvimento?',
    opcoes: ['É positivo pois cria emprego', 'Transfere poluição, causa problemas de saúde e contaminação ambiental nos países recetores', 'Não tem impacto significativo', 'Melhora a reciclagem global'],
    respostaCorreta: 1,
    explicacao: 'A exportação de resíduos transfere o problema ambiental para países com menos capacidade de tratamento, causando poluição, problemas de saúde e contaminação de solos e águas.'
  },
  // =====================================================
  // CONSUMO RESPONSÁVEL DE ÁGUA
  // =====================================================
  // INICIANTE
  {
    id: 91,
    tema: 'agua',
    nivel: 'iniciante',
    pergunta: 'Qual percentagem da água na Terra é doce e acessível para consumo humano?',
    opcoes: ['50%', '25%', 'Menos de 1%', '10%'],
    respostaCorreta: 2,
    explicacao: 'Apenas cerca de 0,3% da água doce do planeta está disponível para consumo humano. A maioria está nos glaciares ou em aquíferos profundos.'
  },
  {
    id: 92,
    tema: 'agua',
    nivel: 'iniciante',
    pergunta: 'Em Moçambique, qual é o principal desafio relacionado com a água?',
    opcoes: ['Excesso de chuva', 'Falta de acesso a água potável segura', 'Água demasiado fria', 'Custo zero da água'],
    respostaCorreta: 1,
    explicacao: 'Moçambique enfrenta sérios desafios de acesso a água potável, especialmente em zonas rurais, onde muitas comunidades dependem de fontes não tratadas.'
  },
  {
    id: 93,
    tema: 'agua',
    nivel: 'iniciante',
    pergunta: 'Qual atividade consome mais água a nível global?',
    opcoes: ['Uso doméstico', 'Indústria', 'Agricultura', 'Turismo'],
    respostaCorreta: 2,
    explicacao: 'A agricultura é responsável por cerca de 70% do consumo mundial de água doce, principalmente através da irrigação de culturas.'
  },
  {
    id: 94,
    tema: 'agua',
    nivel: 'iniciante',
    pergunta: 'Quantos litros de água são necessários para produzir 1 kg de arroz?',
    opcoes: ['100 litros', '500 litros', '1.500 litros', '50 litros'],
    respostaCorreta: 2,
    explicacao: 'Produzir 1 kg de arroz requer aproximadamente 1.500 litros de água. Por isso, os nossos hábitos alimentares têm grande impacto no consumo de água.'
  },
  {
    id: 95,
    tema: 'agua',
    nivel: 'iniciante',
    pergunta: 'O que significa "água virtual"?',
    opcoes: ['Água em computadores', 'Água usada para produzir um produto', 'Água mineral cara', 'Água purificada digitalmente'],
    respostaCorreta: 1,
    explicacao: 'Água virtual é a quantidade de água utilizada na produção de um bem ou serviço. Por exemplo, uma t-shirt de algodão requer cerca de 2.700 litros de água virtual.'
  },
  {
    id: 96,
    tema: 'agua',
    nivel: 'iniciante',
    pergunta: 'Qual rio é fundamental para o abastecimento de água em Moçambique?',
    opcoes: ['Rio Nilo', 'Rio Zambeze', 'Rio Congo', 'Rio Limpopo'],
    respostaCorreta: 1,
    explicacao: 'O Rio Zambeze é um dos mais importantes de Moçambique, alimentando a Barragem de Cahora Bassa e abastecendo comunidades ao longo do seu curso.'
  },
  {
    id: 97,
    tema: 'agua',
    nivel: 'iniciante',
    pergunta: 'Qual destes hábitos poupa mais água em casa?',
    opcoes: ['Deixar a torneira aberta ao escovar os dentes', 'Tomar banho de banheira', 'Reparar fugas de água', 'Lavar roupa com pouca roupa na máquina'],
    respostaCorreta: 2,
    explicacao: 'Uma torneira a pingar pode desperdiçar até 30 litros por dia. Reparar fugas é uma das formas mais eficazes de poupar água.'
  },
  {
    id: 98,
    tema: 'agua',
    nivel: 'iniciante',
    pergunta: 'O que é a "pegada hídrica"?',
    opcoes: ['A marca que a água deixa no chão', 'O total de água usado para produzir o que consumimos', 'A qualidade da água de um país', 'A velocidade da água num rio'],
    respostaCorreta: 1,
    explicacao: 'A pegada hídrica mede toda a água utilizada direta e indiretamente por uma pessoa, empresa ou país, incluindo a água virtual dos produtos consumidos.'
  },
  {
    id: 99,
    tema: 'agua',
    nivel: 'iniciante',
    pergunta: 'Em Moçambique, qual percentagem da população urbana tem acesso a saneamento melhorado?',
    opcoes: ['Menos de 30%', '75%', '90%', '100%'],
    respostaCorreta: 0,
    explicacao: 'Menos de 30% da população urbana moçambicana tem acesso a saneamento melhorado, tornando a gestão da água e saneamento um desafio prioritário.'
  },
  {
    id: 100,
    tema: 'agua',
    nivel: 'iniciante',
    pergunta: 'Quantos litros de água por pessoa por dia são considerados o mínimo para necessidades básicas, segundo a ONU?',
    opcoes: ['5 litros', '50 litros', '200 litros', '500 litros'],
    respostaCorreta: 1,
    explicacao: 'A ONU considera que 50 litros por pessoa por dia são o mínimo para necessidades básicas como beber, cozinhar e higiene.'
  },
  // INTERMÉDIO
  {
    id: 101,
    tema: 'agua',
    nivel: 'intermedio',
    pergunta: 'O que é a dessalinização da água?',
    opcoes: ['Processo de adicionar sal à água', 'Processo de remover o sal da água do mar para torná-la potável', 'Processo de filtrar água com sal', 'Processo de congelar água salgada'],
    respostaCorreta: 1,
    explicacao: 'A dessalinização remove o sal da água do mar, tornando-a potável. É usada em países com escassez de água doce, mas requer muita energia.'
  },
  {
    id: 102,
    tema: 'agua',
    nivel: 'intermedio',
    pergunta: 'O que é a recarga de aquíferos?',
    opcoes: ['Bombear água para o subsolo artificialmente', 'O processo natural pelo qual a chuva reabastece as águas subterrâneas', 'Adicionar produtos químicos à água', 'Construir barragens subterrâneas'],
    respostaCorreta: 1,
    explicacao: 'A recarga de aquíferos é o processo pelo qual a água da chuva infiltra o solo e reabastece as reservas de água subterrânea. O desflorestamento reduz drasticamente este processo.'
  },
  {
    id: 103,
    tema: 'agua',
    nivel: 'intermedio',
    pergunta: 'Qual é o impacto das alterações climáticas no ciclo da água em Moçambique?',
    opcoes: ['Aumento da precipitação regular', 'Mais ciclones, secas prolongadas e padrões irregulares de chuva', 'Sem impacto significativo', 'Redução das temperaturas'],
    respostaCorreta: 1,
    explicacao: 'Moçambique é um dos países mais vulneráveis às alterações climáticas. Enfrenta ciclones cada vez mais intensos, secas prolongadas no sul e padrões de chuva imprevisíveis que afetam o acesso à água.'
  },
  {
    id: 104,
    tema: 'agua',
    nivel: 'intermedio',
    pergunta: 'O que é a irrigação por gotejamento?',
    opcoes: ['Irrigação por inundação dos campos', 'Sistema que leva água diretamente às raízes das plantas, poupando até 70% de água', 'Irrigação por aspersores aéreos', 'Irrigação manual com regadores'],
    respostaCorreta: 1,
    explicacao: 'A irrigação por gotejamento entrega água diretamente às raízes das plantas em pequenas quantidades, reduzindo a evaporação e podendo poupar até 70% de água comparado à irrigação tradicional.'
  },
  {
    id: 105,
    tema: 'agua',
    nivel: 'intermedio',
    pergunta: 'Qual é a principal causa da contaminação dos recursos hídricos em Moçambique?',
    opcoes: ['Chuva ácida industrial', 'Falta de saneamento, lixo e práticas agrícolas inadequadas', 'Excesso de minerais naturais', 'Poluição marítima internacional'],
    respostaCorreta: 1,
    explicacao: 'Em Moçambique, a contaminação da água é principalmente causada pela falta de infraestruturas de saneamento, deposição de lixo em rios e uso excessivo de pesticidas na agricultura.'
  },
  {
    id: 106,
    tema: 'agua',
    nivel: 'intermedio',
    pergunta: 'O que é a "colheita de água da chuva"?',
    opcoes: ['Dança tradicional durante chuvas', 'Sistema de captação e armazenamento de água da chuva para uso posterior', 'Medição da quantidade de chuva', 'Processo de purificação da chuva'],
    respostaCorreta: 1,
    explicacao: 'A colheita de água da chuva capta e armazena a água das chuvas nos telhados ou superfícies impermeáveis. É uma solução de baixo custo muito utilizada em zonas rurais de Moçambique.'
  },
  {
    id: 107,
    tema: 'agua',
    nivel: 'intermedio',
    pergunta: 'Qual é o Objetivo de Desenvolvimento Sustentável (ODS) relacionado com água e saneamento?',
    opcoes: ['ODS 4 - Educação', 'ODS 6 - Água e Saneamento', 'ODS 13 - Ação Climática', 'ODS 2 - Fome Zero'],
    respostaCorreta: 1,
    explicacao: 'O ODS 6 visa garantir a disponibilidade e gestão sustentável de água e saneamento para todos até 2030. Moçambique enfrenta grandes desafios para atingir esta meta.'
  },
  {
    id: 108,
    tema: 'agua',
    nivel: 'intermedio',
    pergunta: 'Quantos litros de água são desperdiçados por uma sanita com fuga por dia?',
    opcoes: ['1-2 litros', '5-10 litros', 'Até 200 litros', '1.000 litros'],
    respostaCorreta: 2,
    explicacao: 'Uma sanita com fuga pode desperdiçar até 200 litros de água por dia — o equivalente à necessidade diária mínima de 4 pessoas segundo a ONU.'
  },
  {
    id: 109,
    tema: 'agua',
    nivel: 'intermedio',
    pergunta: 'O que é o tratamento de águas residuais?',
    opcoes: ['Processo de criar água artificial', 'Processo de limpar e reutilizar águas usadas antes de as devolver à natureza', 'Processo de armazenar água da chuva', 'Processo de dessalinização'],
    respostaCorreta: 1,
    explicacao: 'O tratamento de águas residuais remove contaminantes da água usada em casas e indústrias antes de a devolver ao ambiente, protegendo rios, lagos e oceanos.'
  },
  {
    id: 110,
    tema: 'agua',
    nivel: 'intermedio',
    pergunta: 'Qual é o impacto da desflorestação no ciclo da água em Moçambique?',
    opcoes: ['Aumenta as reservas de água subterrânea', 'Reduz a infiltração de água, aumenta erosão e diminui caudais dos rios', 'Sem impacto no ciclo da água', 'Melhora a qualidade da água'],
    respostaCorreta: 1,
    explicacao: 'A desflorestação em Moçambique reduz drasticamente a capacidade do solo de absorver água, causando erosão, inundações repentinas e redução dos caudais dos rios na época seca.'
  },
  // AVANÇADO
  {
    id: 111,
    tema: 'agua',
    nivel: 'avancado',
    pergunta: 'O que é a "diplomacia da água" e qual a sua importância para Moçambique?',
    opcoes: ['Exportação de água para outros países', 'Gestão negociada de bacias hidrográficas partilhadas entre países', 'Construção de aquedutos diplomáticos', 'Tratados sobre chuva artificial'],
    respostaCorreta: 1,
    explicacao: 'Moçambique partilha bacias hidrográficas com vários países (Zâmbia, Zimbabwe, Malawi). A diplomacia da água é essencial para gerir conflitos e garantir uso equitativo de rios como o Zambeze e Limpopo.'
  },
  {
    id: 112,
    tema: 'agua',
    nivel: 'avancado',
    pergunta: 'O que é a "economia circular da água"?',
    opcoes: ['Vender água em círculos comerciais', 'Sistema onde a água é continuamente reutilizada, reciclada e regenerada minimizando desperdício', 'Ciclo natural da água sem intervenção humana', 'Sistema de pagamento circular para água'],
    respostaCorreta: 1,
    explicacao: 'A economia circular da água propõe que a água seja tratada como recurso valioso, com reutilização de águas residuais tratadas para irrigação, indústria ou recarga de aquíferos, reduzindo a extração de fontes naturais.'
  },
  {
    id: 113,
    tema: 'agua',
    nivel: 'avancado',
    pergunta: 'Qual é o impacto das minas de carvão em Tete sobre os recursos hídricos de Moçambique?',
    opcoes: ['Melhora a qualidade da água subterrânea', 'Pode causar contaminação de aquíferos, alteração do curso de rios e conflitos com comunidades locais', 'Não tem qualquer impacto nos recursos hídricos', 'Cria novos reservatórios de água doce'],
    respostaCorreta: 1,
    explicacao: 'A exploração mineira em Tete levanta sérias preocupações: drenagem ácida de minas pode contaminar aquíferos, o reassentamento de comunidades afeta o acesso à água e as operações de lavagem do carvão consomem grandes volumes de água.'
  },
  {
    id: 114,
    tema: 'agua',
    nivel: 'avancado',
    pergunta: 'O que são "soluções baseadas na natureza" para gestão da água?',
    opcoes: ['Construção de mais barragens', 'Uso de ecossistemas naturais como zonas húmidas e florestas para regular o ciclo da água', 'Uso exclusivo de tecnologia avançada', 'Privatização da água'],
    respostaCorreta: 1,
    explicacao: 'Soluções baseadas na natureza usam ecossistemas saudáveis (florestas de mangal, zonas húmidas, recarga de aquíferos) para purificar, armazenar e regular a água — mais baratas e resilientes que infraestruturas artificiais.'
  },
  {
    id: 115,
    tema: 'agua',
    nivel: 'avancado',
    pergunta: 'Como a gestão da Barragem de Cahora Bassa afeta as comunidades a jusante do Zambeze?',
    opcoes: ['Não tem qualquer efeito nas comunidades', 'As variações no caudal afetam a pesca, agricultura de aluvião e ecossistemas do delta', 'Aumenta sempre o acesso à água das comunidades', 'Apenas afeta a produção de eletricidade'],
    respostaCorreta: 1,
    explicacao: 'As descargas da barragem de Cahora Bassa afetam diretamente as cheias naturais do Zambeze, que fertilizavam as planícies aluviais. A gestão da barragem precisa equilibrar produção de energia com as necessidades das comunidades e ecossistemas a jusante.'
  },
  {
    id: 116,
    tema: 'agua',
    nivel: 'avancado',
    pergunta: 'O que é o "stress hídrico" e como se mede?',
    opcoes: ['A pressão da água numa conduta', 'Relação entre a procura de água e a disponibilidade local; considera-se stress quando a procura supera 40% da disponibilidade', 'O impacto psicológico da falta de água', 'A temperatura da água num rio'],
    respostaCorreta: 1,
    explicacao: 'O stress hídrico ocorre quando a procura de água supera a disponibilidade. Mede-se pela razão entre extração e disponibilidade renovável. O sul de Moçambique, partilhando o Limpopo com outros países, enfrenta crescente stress hídrico.'
  },
  {
    id: 117,
    tema: 'agua',
    nivel: 'avancado',
    pergunta: 'Qual é a relação entre segurança alimentar e gestão da água em Moçambique?',
    opcoes: ['Não existe relação entre os dois', 'A escassez de água compromete diretamente a irrigação, reduz colheitas e aumenta insegurança alimentar', 'Mais água significa sempre mais alimentos', 'A segurança alimentar depende apenas do clima'],
    respostaCorreta: 1,
    explicacao: 'Em Moçambique, onde a maioria da população depende da agricultura de subsistência, a falta de água para irrigação pode devastar colheitas. As secas recorrentes no sul e centro já causaram crises alimentares severas.'
  },
  {
    id: 118,
    tema: 'agua',
    nivel: 'avancado',
    pergunta: 'O que é a tarifação progressiva da água e qual o seu objetivo?',
    opcoes: ['Cobrar mais pela água de pior qualidade', 'Sistema onde quem consome mais paga proporcionalmente mais, incentivando a poupança', 'Sistema onde os preços sobem progressivamente todos os anos', 'Sistema de pagamento em prestações'],
    respostaCorreta: 1,
    explicacao: 'A tarifação progressiva cobra tarifas mais elevadas para consumos acima de um limiar básico. Garante acesso acessível para necessidades básicas enquanto desincentiva o desperdício e subsidia os consumidores de baixo rendimento.'
  },
  {
    id: 119,
    tema: 'agua',
    nivel: 'avancado',
    pergunta: 'Como os ciclones que afetam Moçambique impactam os recursos hídricos a longo prazo?',
    opcoes: ['Apenas causam inundações temporárias sem impacto duradouro', 'Destroem infraestruturas de água, contaminam fontes, causam erosão e afetam aquíferos costeiros com intrusão salina', 'Aumentam as reservas de água doce de forma permanente', 'Sem impacto nos recursos hídricos subterrâneos'],
    respostaCorreta: 1,
    explicacao: 'Ciclones como o Idai (2019) e Kenneth destruíram sistemas de abastecimento de água, contaminaram fontes com resíduos e carcaças, causaram erosão severa e a intrusão de água salgada nos aquíferos costeiros, com impactos que duram anos.'
  },
  {
    id: 120,
    tema: 'agua',
    nivel: 'avancado',
    pergunta: 'O que é a "pegada hídrica cinzenta" e qual a sua relevância para Moçambique?',
    opcoes: ['A cor da água contaminada', 'O volume de água doce necessário para diluir poluentes até níveis aceitáveis', 'A água usada em atividades industriais', 'A água evaporada durante a produção'],
    respostaCorreta: 1,
    explicacao: 'A pegada hídrica cinzenta mede a poluição: é a água necessária para diluir poluentes até padrões aceitáveis. Em Moçambique, o uso de agroquímicos e a mineração aumentam significativamente esta pegada, comprometendo corpos de água.'
  }
];

export const rankingUsers: RankingUser[] = [
  { id: 1, nome: 'Maria Silva', avatar: 'MS', pontos: 2850, quizzesCompletos: 45, nivel: 'Especialista' },
  { id: 2, nome: 'João Santos', avatar: 'JS', pontos: 2720, quizzesCompletos: 42, nivel: 'Especialista' },
  { id: 3, nome: 'Ana Costa', avatar: 'AC', pontos: 2580, quizzesCompletos: 40, nivel: 'Avançado' },
  { id: 4, nome: 'Pedro Oliveira', avatar: 'PO', pontos: 2340, quizzesCompletos: 38, nivel: 'Avançado' },
  { id: 5, nome: 'Sofia Ferreira', avatar: 'SF', pontos: 2180, quizzesCompletos: 35, nivel: 'Avançado' },
  { id: 6, nome: 'Miguel Rodrigues', avatar: 'MR', pontos: 1950, quizzesCompletos: 32, nivel: 'Intermédio' },
  { id: 7, nome: 'Beatriz Almeida', avatar: 'BA', pontos: 1820, quizzesCompletos: 30, nivel: 'Intermédio' },
  { id: 8, nome: 'Tiago Martins', avatar: 'TM', pontos: 1680, quizzesCompletos: 28, nivel: 'Intermédio' },
  { id: 9, nome: 'Carolina Pereira', avatar: 'CP', pontos: 1520, quizzesCompletos: 25, nivel: 'Iniciante' },
  { id: 10, nome: 'Diogo Sousa', avatar: 'DS', pontos: 1380, quizzesCompletos: 22, nivel: 'Iniciante' },
];

export const rankingPaises: RankingPais[] = [
  { pais: 'Islândia', bandeira: '🇮🇸', percentagemRenovavel: 100, emissoesCO2: 2.8, gestaoResiduos: 92 },
  { pais: 'Noruega', bandeira: '🇳🇴', percentagemRenovavel: 98, emissoesCO2: 7.5, gestaoResiduos: 95 },
  { pais: 'Suécia', bandeira: '🇸🇪', percentagemRenovavel: 75, emissoesCO2: 3.5, gestaoResiduos: 99 },
  { pais: 'Dinamarca', bandeira: '🇩🇰', percentagemRenovavel: 80, emissoesCO2: 4.8, gestaoResiduos: 96 },
  { pais: 'Portugal', bandeira: '🇵🇹', percentagemRenovavel: 61, emissoesCO2: 4.3, gestaoResiduos: 78 },
  { pais: 'Alemanha', bandeira: '🇩🇪', percentagemRenovavel: 52, emissoesCO2: 8.1, gestaoResiduos: 94 },
  { pais: 'Espanha', bandeira: '🇪🇸', percentagemRenovavel: 47, emissoesCO2: 5.2, gestaoResiduos: 75 },
  { pais: 'França', bandeira: '🇫🇷', percentagemRenovavel: 44, emissoesCO2: 4.5, gestaoResiduos: 85 },
  { pais: 'Reino Unido', bandeira: '🇬🇧', percentagemRenovavel: 43, emissoesCO2: 5.1, gestaoResiduos: 82 },
  { pais: 'Itália', bandeira: '🇮🇹', percentagemRenovavel: 41, emissoesCO2: 5.4, gestaoResiduos: 79 },
];

export const energiasRenovaveis = [
  {
    id: 'solar',
    nome: 'Energia Solar',
    descricao: 'Energia obtida através da conversão da luz solar em eletricidade usando painéis fotovoltaicos.',
    imagem: '/solar.png',
    beneficios: ['Fonte inesgotável', 'Zero emissões na operação', 'Baixa manutenção', 'Descentralizada'],
    eficiencia: '15-22%',
    custoKwh: '0.03-0.05€',
    casosReais: ['Portugal: Central Solar de Alcoutim (219 MW)', 'China: Parque Solar de Tengger (1.5 GW)']
  },
  {
    id: 'eolica',
    nome: 'Energia Eólica',
    descricao: 'Energia gerada pela força do vento que faz girar as pás de turbinas eólicas.',
    imagem: '/eolica.jpg',
    beneficios: ['Alta eficiência', 'Baixo impacto visual (offshore)', 'Custo competitivo', 'Tecnologia madura'],
    eficiencia: '35-45%',
    custoKwh: '0.02-0.04€',
    casosReais: ['Moçambique: Projeto Eólico de Nacala', 'Dinamarca: Horns Rev 3 (407 MW offshore)']
  },
  {
    id: 'hidroeletrica',
    nome: 'Energia Hidroelétrica',
    descricao: 'Energia produzida pelo movimento da água em barragens e centrais hidroelétricas.',
    imagem: '/hidroeletrica.jpg',
    beneficios: ['Armazenamento de energia', 'Produção estável', 'Longa vida útil', 'Flexibilidade operacional'],
    eficiencia: '85-95%',
    custoKwh: '0.02-0.03€',
    casosReais: ['Moçambique: Barragem de Cahora Bassa (2.075 MW)', 'Brasil: Itaipu (14 GW)']
  },
  {
    id: 'biomassa',
    nome: 'Biomassa',
    descricao: 'Energia obtida a partir de matéria orgânica como madeira, resíduos agrícolas e biogás.',
    imagem: '/biomassa.jpg',
    beneficios: ['Gestão de resíduos', 'Produção contínua', 'Carbono neutro', 'Desenvolvimento rural'],
    eficiencia: '20-35%',
    custoKwh: '0.05-0.08€',
    casosReais: ['Moçambique: Projeto de Biogás de Maputo', 'Suécia: Sistema de aquecimento urbano']
  }
];

export const comparacaoCarvaoGas = {
  carvao: {
    nome: 'Carvão',
    cor: '#4a4a4a',
    custoKwh: 0.08,
    emissoesCO2: 900,
    eficiencia: 35,
    impactoSaude: 'Alto',
    particulasFinas: 'Muito Alto',
    tempoArraque: '6-8 horas',
    vidaUtil: '40 anos'
  },
  gasNatural: {
    nome: 'Gás Natural',
    cor: '#3b82f6',
    custoKwh: 0.05,
    emissoesCO2: 450,
    eficiencia: 60,
    impactoSaude: 'Baixo',
    particulasFinas: 'Baixo',
    tempoArraque: '30 minutos',
    vidaUtil: '30 anos'
  }
};

export const tiposResiduos = [
  {
    tipo: 'Orgânicos',
    cor: '#84cc16',
    descricao: 'Restos de comida, cascas, folhas, resíduos de jardim',
    contentor: 'Castanho/Verde',
    decomposicao: '2-6 semanas',
    solucao: 'Compostagem'
  },
  {
    tipo: 'Plásticos',
    cor: '#eab308',
    descricao: 'Embalagens, garrafas, sacos, filmes plásticos',
    contentor: 'Amarelo',
    decomposicao: '450+ anos',
    solucao: 'Reciclagem/Reutilização'
  },
  {
    tipo: 'Papel/Cartão',
    cor: '#3b82f6',
    descricao: 'Jornais, revistas, caixas, embalagens de cartão',
    contentor: 'Azul',
    decomposicao: '2-6 semanas',
    solucao: 'Reciclagem'
  },
  {
    tipo: 'Vidro',
    cor: '#22c55e',
    descricao: 'Garrafas, frascos, embalagens de vidro',
    contentor: 'Verde',
    decomposicao: '1 milhão+ anos',
    solucao: 'Reciclagem infinita'
  },
  {
    tipo: 'Metais',
    cor: '#6b7280',
    descricao: 'Latas, tampas, embalagens metálicas',
    contentor: 'Amarelo',
    decomposicao: '100-500 anos',
    solucao: 'Reciclagem'
  },
  {
    tipo: 'Perigosos',
    cor: '#ef4444',
    descricao: 'Pilhas, medicamentos, óleos, químicos',
    contentor: 'Ecopontos específicos',
    decomposicao: 'Variável/Tóxico',
    solucao: 'Tratamento especial'
  }
];

// =====================================================
// CONSUMO RESPONSÁVEL DE ÁGUA - Quiz Questions
// =====================================================
