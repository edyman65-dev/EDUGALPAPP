import React from 'react';
import { Sun, Menu, X, User, Trophy, BookOpen, LogOut, Settings, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenAuth: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenAuth
}) => {
  const { user, profile, signOut, loading } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const navItems = [
    { id: 'inicio', label: 'Início', icon: BookOpen },
    { id: 'renovaveis', label: 'Renováveis', icon: Sun },
    { id: 'carvao-gas', label: 'Carvão vs Gás', icon: Sun },
    { id: 'residuos', label: 'Resíduos', icon: Sun },
    { id: 'agua', label: 'Água', icon: Sun },
    { id: 'quizzes', label: 'Quizzes', icon: BookOpen },
    { id: 'rankings', label: 'Rankings', icon: Trophy },
    { id: 'certificados', label: 'Certificados', icon: Award },
  ];



  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const userPoints = profile?.pontos_total || 0;

  return (
    <header className="bg-gradient-to-r from-[#FF6B00] to-[#E55A00] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveSection('inicio')}>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Sun className="w-6 h-6 text-[#FF6B00]" />
            </div>
            <div>
              <h1 className="text-xl font-bold">EduGALP</h1>
              <p className="text-xs text-orange-200">Educação Energética</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-orange-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Points & Menu */}
          <div className="flex items-center space-x-4">
            {/* Points Display */}
            {user && (
              <div className="hidden sm:flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold">{userPoints} pts</span>
              </div>
            )}

            {/* User Menu / Auth Button */}
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-[#00B74F] rounded-full flex items-center justify-center text-sm font-bold">
                        {profile?.avatar || 'U'}
                      </div>
                      <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">
                        {profile?.nome?.split(' ')[0] || 'Utilizador'}
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">{profile?.nome}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                              {profile?.nivel || 'Iniciante'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {profile?.quizzes_completos || 0} quizzes
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setActiveSection('rankings');
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Trophy className="w-4 h-4" />
                          <span className="text-sm">Meu Progresso</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveSection('certificados');
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Award className="w-4 h-4" />
                          <span className="text-sm">Meus Certificados</span>
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm">Terminar Sessão</span>
                        </button>
                      </div>
                    )}

                  </div>
                ) : (

                  <button 
                    onClick={onOpenAuth}
                    className="hidden sm:flex items-center space-x-2 bg-[#00B74F] hover:bg-[#009940] px-4 py-2 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Entrar</span>
                  </button>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-orange-100 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile User Section */}
              {user ? (
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="w-10 h-10 bg-[#00B74F] rounded-full flex items-center justify-center font-bold">
                      {profile?.avatar || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold">{profile?.nome}</p>
                      <p className="text-sm text-orange-200">{userPoints} pontos</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-red-300 hover:bg-white/10 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Terminar Sessão</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="mx-4 mt-4 flex items-center justify-center space-x-2 bg-[#00B74F] hover:bg-[#009940] px-4 py-3 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Entrar / Criar Conta</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
