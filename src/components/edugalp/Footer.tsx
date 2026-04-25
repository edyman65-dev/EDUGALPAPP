import React from 'react';
import { Sun, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ExternalLink } from 'lucide-react';
interface FooterProps {
  setActiveSection: (section: string) => void;
}
const Footer: React.FC<FooterProps> = ({
  setActiveSection
}) => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    modulos: [{
      label: 'Energias Renováveis',
      section: 'renovaveis'
    }, {
      label: 'Carvão vs Gás Natural',
      section: 'carvao-gas'
    }, {
      label: 'Gestão de Resíduos',
      section: 'residuos'
    }, {
      label: 'Quizzes',
      section: 'quizzes'
    }],
    recursos: [{
      label: 'Certificados',
      section: 'certificados'
    }, {
      label: 'Rankings',
      section: 'rankings'
    }, {
      label: 'Simulador de Energia',
      section: 'carvao-gas'
    }, {
      label: 'Glossário',
      section: 'inicio'
    }],
    empresa: [{
      label: 'Sobre a EduGALP',
      external: true
    }, {
      label: 'Contactos',
      external: true
    }, {
      label: 'Política de Privacidade',
      external: true
    }, {
      label: 'Termos de Utilização',
      external: true
    }]
  };
  return <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-[#FF6B00] to-[#E55A00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Subscreva a Nossa Newsletter</h3>
              <p className="text-orange-200">
                Receba dicas de sustentabilidade e novos conteúdos educativos diretamente no seu email.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="O seu email" className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white/30" />
                <button type="submit" className="px-6 py-3 bg-[#00B74F] hover:bg-[#009940] rounded-xl font-semibold transition-colors">
                  Subscrever
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#FF6B00] rounded-lg flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold">EduGALP</h4>
                <p className="text-xs text-gray-400">Educação Energética</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Plataforma educativa dedicada a ensinar sobre energia sustentável, 
              eficiência energética e gestão de resíduos de forma interativa e envolvente.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#FF6B00] rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#FF6B00] rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#FF6B00] rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#FF6B00] rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Módulos */}
          <div>
            <h5 className="font-semibold text-white mb-4">Módulos</h5>
            <ul className="space-y-3">
              {footerLinks.modulos.map(link => <li key={link.label}>
                  <button onClick={() => setActiveSection(link.section)} className="text-gray-400 hover:text-white transition-colors text-left">
                    {link.label}
                  </button>
                </li>)}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h5 className="font-semibold text-white mb-4">Recursos</h5>
            <ul className="space-y-3">
              {footerLinks.recursos.map(link => <li key={link.label}>
                  <button onClick={() => setActiveSection(link.section)} className="text-gray-400 hover:text-white transition-colors text-left">
                    {link.label}
                  </button>
                </li>)}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h5 className="font-semibold text-white mb-4">Empresa</h5>
            <ul className="space-y-3">
              {footerLinks.empresa.map(link => <li key={link.label}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                    <span>{link.label}</span>
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div className="text-white">info@edugalp.MZ</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Telefone</div>
                <div className="text-white">+25884000000</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Localização</div>
                <div className="text-white">MAPUTO MOÇAMBIQUE</div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm" data-mixed-content="true">
              © {currentYear} EduGALP. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <span className="text-gray-400 text-sm">Feito com</span>
              <span className="text-red-500">Amor</span>
              <span className="text-gray-400 text-sm">para um futuro sustentável</span>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;