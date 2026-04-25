import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Award, Download, CheckCircle, Lock, Loader2, FileText,
  Calendar, Star, Shield, BookOpen, ArrowRight, Trophy, Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface ModuleCompletion {
  moduleId: string;
  moduleName: string;
  moduleIcon: string;
  moduleColor: string;
  levels: {
    nivel: string;
    nivelLabel: string;
    completed: boolean;
    bestScore: number;
    maxScore: number;
    attempts: number;
  }[];
  allCompleted: boolean;
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
}

interface IssuedCertificate {
  id: string;
  module_id: string;
  module_name: string;
  certificate_number: string;
  pontos_obtidos: number;
  pontos_maximo: number;
  percentagem: number;
  quizzes_completos: number;
  issued_at: string;
}

interface CertificateSectionProps {
  onOpenAuth: () => void;
  setActiveSection: (section: string) => void;
}

const MODULES = [
  {
    id: 'renovaveis',
    name: 'Energias Renováveis',
    icon: '☀️',
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    lightBg: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    badgeBg: 'bg-green-100',
  },
  {
    id: 'carvao-gas',
    name: 'Carvão vs Gás Natural',
    icon: '🔥',
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    badgeBg: 'bg-orange-100',
  },
  {
    id: 'residuos',
    name: 'Gestão de Resíduos',
    icon: '♻️',
    color: 'cyan',
    gradient: 'from-cyan-500 to-teal-600',
    lightBg: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700',
    badgeBg: 'bg-cyan-100',
  },
];

const LEVELS = [
  { id: 'iniciante', label: 'Iniciante', pointsPerQuestion: 10 },
  { id: 'intermedio', label: 'Intermédio', pointsPerQuestion: 20 },
  { id: 'avancado', label: 'Avançado', pointsPerQuestion: 30 },
];

const CertificateSection: React.FC<CertificateSectionProps> = ({ onOpenAuth, setActiveSection }) => {
  const { user, profile } = useAuth();
  const [moduleCompletions, setModuleCompletions] = useState<ModuleCompletion[]>([]);
  const [issuedCertificates, setIssuedCertificates] = useState<IssuedCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [previewModule, setPreviewModule] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch quiz attempts and certificates
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch quiz attempts
        const { data: attempts, error: attemptsError } = await supabase
          .from('quiz_attempts')
          .select('tema, nivel, pontos, perguntas_corretas, perguntas_total')
          .eq('user_id', user.id);

        if (attemptsError) {
          console.error('Error fetching attempts:', attemptsError);
        }

        // Fetch issued certificates
        const { data: certs, error: certsError } = await supabase
          .from('certificates')
          .select('*')
          .eq('user_id', user.id)
          .order('issued_at', { ascending: false });

        if (certsError) {
          console.error('Error fetching certificates:', certsError);
        }

        setIssuedCertificates(certs || []);

        // Process module completions
        const completions: ModuleCompletion[] = MODULES.map((mod) => {
          const levels = LEVELS.map((level) => {
            const levelAttempts = (attempts || []).filter(
              (a) => a.tema === mod.id && a.nivel === level.id
            );
            const bestAttempt = levelAttempts.reduce(
              (best, curr) => (curr.pontos > (best?.pontos || 0) ? curr : best),
              null as any
            );
            const questionsPerLevel = 10;

            const maxScore = questionsPerLevel * level.pointsPerQuestion;

            return {
              nivel: level.id,
              nivelLabel: level.label,
              completed: levelAttempts.length > 0,
              bestScore: bestAttempt?.pontos || 0,
              maxScore,
              attempts: levelAttempts.length,
            };
          });

          const allCompleted = levels.every((l) => l.completed);
          const totalScore = levels.reduce((sum, l) => sum + l.bestScore, 0);
          const maxPossibleScore = levels.reduce((sum, l) => sum + l.maxScore, 0);
          const percentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

          return {
            moduleId: mod.id,
            moduleName: mod.name,
            moduleIcon: mod.icon,
            moduleColor: mod.color,
            levels,
            allCompleted,
            totalScore,
            maxPossibleScore,
            percentage,
          };
        });

        setModuleCompletions(completions);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Generate certificate number
  const generateCertificateNumber = () => {
    const prefix = 'EDUGALP';
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${year}-${random}`;
  };

  // Draw certificate on canvas
  const drawCertificate = useCallback(
    (
      canvas: HTMLCanvasElement,
      userName: string,
      moduleName: string,
      score: number,
      maxScore: number,
      percentage: number,
      certNumber: string,
      dateStr: string
    ) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const W = 1400;
      const H = 1000;
      canvas.width = W;
      canvas.height = H;

      // Background
      ctx.fillStyle = '#FFFBF5';
      ctx.fillRect(0, 0, W, H);

      // Outer border - double line
      ctx.strokeStyle = '#FF6B00';
      ctx.lineWidth = 6;
      ctx.strokeRect(20, 20, W - 40, H - 40);

      ctx.strokeStyle = '#E5A44D';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, W - 60, H - 60);

      // Inner decorative border
      ctx.strokeStyle = '#FF6B00';
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 4]);
      ctx.strokeRect(40, 40, W - 80, H - 80);
      ctx.setLineDash([]);

      // Corner ornaments
      const cornerSize = 50;
      const corners = [
        { x: 50, y: 50 },
        { x: W - 50, y: 50 },
        { x: 50, y: H - 50 },
        { x: W - 50, y: H - 50 },
      ];

      corners.forEach((corner) => {
        ctx.beginPath();
        ctx.arc(corner.x, corner.y, cornerSize / 2, 0, Math.PI * 2);
        ctx.strokeStyle = '#E5A44D';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(corner.x, corner.y, cornerSize / 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FF6B00';
        ctx.fill();
      });

      // Top decorative line
      const topLineY = 90;
      ctx.beginPath();
      ctx.moveTo(100, topLineY);
      ctx.lineTo(W / 2 - 120, topLineY);
      ctx.strokeStyle = '#E5A44D';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(W / 2 + 120, topLineY);
      ctx.lineTo(W - 100, topLineY);
      ctx.stroke();

      // EduGALP Logo area
      // Logo circle
      const logoX = W / 2;
      const logoY = 115;
      ctx.beginPath();
      ctx.arc(logoX, logoY, 40, 0, Math.PI * 2);
      const logoGrad = ctx.createRadialGradient(logoX, logoY, 0, logoX, logoY, 40);
      logoGrad.addColorStop(0, '#FF8C33');
      logoGrad.addColorStop(1, '#FF6B00');
      ctx.fillStyle = logoGrad;
      ctx.fill();

      // Sun icon in logo
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(logoX, logoY, 14, 0, Math.PI * 2);
      ctx.fill();
      // Sun rays
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const innerR = 18;
        const outerR = 28;
        ctx.beginPath();
        ctx.moveTo(logoX + Math.cos(angle) * innerR, logoY + Math.sin(angle) * innerR);
        ctx.lineTo(logoX + Math.cos(angle) * outerR, logoY + Math.sin(angle) * outerR);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // EduGALP text
      ctx.fillStyle = '#FF6B00';
      ctx.font = 'bold 22px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('EduGALP', logoX, logoY + 60);

      ctx.fillStyle = '#888888';
      ctx.font = '12px Arial, sans-serif';
      ctx.fillText('Educação Energética e Sustentabilidade', logoX, logoY + 78);

      // Certificate title
      ctx.fillStyle = '#2D2D2D';
      ctx.font = 'bold 48px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICADO', W / 2, 260);

      // Subtitle
      ctx.fillStyle = '#666666';
      ctx.font = '18px Georgia, serif';
      ctx.fillText('de Conclusão de Módulo', W / 2, 290);

      // Decorative line under title
      const lineWidth = 300;
      ctx.beginPath();
      ctx.moveTo(W / 2 - lineWidth / 2, 310);
      ctx.lineTo(W / 2 + lineWidth / 2, 310);
      const lineGrad = ctx.createLinearGradient(W / 2 - lineWidth / 2, 0, W / 2 + lineWidth / 2, 0);
      lineGrad.addColorStop(0, 'transparent');
      lineGrad.addColorStop(0.2, '#FF6B00');
      lineGrad.addColorStop(0.5, '#E5A44D');
      lineGrad.addColorStop(0.8, '#FF6B00');
      lineGrad.addColorStop(1, 'transparent');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2;
      ctx.stroke();

      // "Certifica-se que"
      ctx.fillStyle = '#666666';
      ctx.font = '16px Georgia, serif';
      ctx.fillText('Certifica-se que', W / 2, 360);

      // User name
      ctx.fillStyle = '#1A1A1A';
      ctx.font = 'bold 42px Georgia, serif';
      ctx.fillText(userName, W / 2, 415);

      // Line under name
      ctx.beginPath();
      ctx.moveTo(W / 2 - 200, 430);
      ctx.lineTo(W / 2 + 200, 430);
      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Description
      ctx.fillStyle = '#555555';
      ctx.font = '16px Georgia, serif';
      ctx.fillText('completou com sucesso todos os quizzes do módulo', W / 2, 470);

      // Module name
      ctx.fillStyle = '#FF6B00';
      ctx.font = 'bold 32px Georgia, serif';
      ctx.fillText(`"${moduleName}"`, W / 2, 520);

      // Score section
      ctx.fillStyle = '#555555';
      ctx.font = '16px Georgia, serif';
      ctx.fillText('com uma pontuação de', W / 2, 570);

      // Score badge
      const badgeX = W / 2;
      const badgeY = 615;
      const badgeW = 280;
      const badgeH = 50;

      // Badge background
      ctx.beginPath();
      const badgeRadius = 25;
      ctx.moveTo(badgeX - badgeW / 2 + badgeRadius, badgeY - badgeH / 2);
      ctx.lineTo(badgeX + badgeW / 2 - badgeRadius, badgeY - badgeH / 2);
      ctx.quadraticCurveTo(badgeX + badgeW / 2, badgeY - badgeH / 2, badgeX + badgeW / 2, badgeY - badgeH / 2 + badgeRadius);
      ctx.lineTo(badgeX + badgeW / 2, badgeY + badgeH / 2 - badgeRadius);
      ctx.quadraticCurveTo(badgeX + badgeW / 2, badgeY + badgeH / 2, badgeX + badgeW / 2 - badgeRadius, badgeY + badgeH / 2);
      ctx.lineTo(badgeX - badgeW / 2 + badgeRadius, badgeY + badgeH / 2);
      ctx.quadraticCurveTo(badgeX - badgeW / 2, badgeY + badgeH / 2, badgeX - badgeW / 2, badgeY + badgeH / 2 - badgeRadius);
      ctx.lineTo(badgeX - badgeW / 2, badgeY - badgeH / 2 + badgeRadius);
      ctx.quadraticCurveTo(badgeX - badgeW / 2, badgeY - badgeH / 2, badgeX - badgeW / 2 + badgeRadius, badgeY - badgeH / 2);
      ctx.closePath();

      const badgeGrad = ctx.createLinearGradient(badgeX - badgeW / 2, 0, badgeX + badgeW / 2, 0);
      badgeGrad.addColorStop(0, '#FF6B00');
      badgeGrad.addColorStop(1, '#E55A00');
      ctx.fillStyle = badgeGrad;
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px Arial, sans-serif';
      ctx.fillText(`${score} / ${maxScore} pontos (${percentage}%)`, badgeX, badgeY + 8);

      // Bottom section - Date and Certificate Number
      const bottomY = 720;

      // Left: Date
      ctx.textAlign = 'left';
      ctx.fillStyle = '#888888';
      ctx.font = '13px Arial, sans-serif';
      ctx.fillText('Data de Emissão', 120, bottomY);
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 16px Georgia, serif';
      ctx.fillText(dateStr, 120, bottomY + 24);

      // Signature line left
      ctx.beginPath();
      ctx.moveTo(120, bottomY + 50);
      ctx.lineTo(350, bottomY + 50);
      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Center: Seal
      const sealX = W / 2;
      const sealY = bottomY + 25;
      const sealR = 45;

      // Outer seal circle
      ctx.beginPath();
      ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
      const sealGrad = ctx.createRadialGradient(sealX, sealY, 0, sealX, sealY, sealR);
      sealGrad.addColorStop(0, '#FFD700');
      sealGrad.addColorStop(0.7, '#E5A44D');
      sealGrad.addColorStop(1, '#CC8800');
      ctx.fillStyle = sealGrad;
      ctx.fill();

      // Inner seal circle
      ctx.beginPath();
      ctx.arc(sealX, sealY, sealR - 8, 0, Math.PI * 2);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Seal text
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.fillText('CERTIFICADO', sealX, sealY - 6);
      ctx.font = 'bold 14px Arial, sans-serif';
      ctx.fillText('OFICIAL', sealX, sealY + 12);

      // Star in seal
      const starY = sealY - 22;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '14px Arial';
      ctx.fillText('★', sealX, starY + 5);

      // Right: Certificate number
      ctx.textAlign = 'right';
      ctx.fillStyle = '#888888';
      ctx.font = '13px Arial, sans-serif';
      ctx.fillText('Número do Certificado', W - 120, bottomY);
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 16px Georgia, serif';
      ctx.fillText(certNumber, W - 120, bottomY + 24);

      // Signature line right
      ctx.beginPath();
      ctx.moveTo(W - 350, bottomY + 50);
      ctx.lineTo(W - 120, bottomY + 50);
      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Bottom decorative line
      ctx.beginPath();
      ctx.moveTo(100, H - 90);
      ctx.lineTo(W - 100, H - 90);
      const bottomLineGrad = ctx.createLinearGradient(100, 0, W - 100, 0);
      bottomLineGrad.addColorStop(0, 'transparent');
      bottomLineGrad.addColorStop(0.1, '#E5A44D');
      bottomLineGrad.addColorStop(0.5, '#FF6B00');
      bottomLineGrad.addColorStop(0.9, '#E5A44D');
      bottomLineGrad.addColorStop(1, 'transparent');
      ctx.strokeStyle = bottomLineGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Footer text
      ctx.textAlign = 'center';
      ctx.fillStyle = '#999999';
      ctx.font = '11px Arial, sans-serif';
      ctx.fillText(
        'Este certificado foi emitido pela plataforma EduGALP — Educação Energética e Sustentabilidade',
        W / 2,
        H - 65
      );
      ctx.fillText(
        `Verifique a autenticidade em edugalp.pt/certificados/${certNumber}`,
        W / 2,
        H - 48
      );

      // Decorative laurel leaves on sides of seal
      ctx.strokeStyle = '#E5A44D';
      ctx.lineWidth = 1.5;
      // Left laurel
      for (let i = 0; i < 5; i++) {
        const angle = -0.5 + i * 0.25;
        const lx = sealX - sealR - 10;
        const ly = sealY - 20 + i * 10;
        ctx.beginPath();
        ctx.ellipse(lx, ly, 8, 4, angle, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Right laurel
      for (let i = 0; i < 5; i++) {
        const angle = 0.5 - i * 0.25;
        const rx = sealX + sealR + 10;
        const ry = sealY - 20 + i * 10;
        ctx.beginPath();
        ctx.ellipse(rx, ry, 8, 4, angle, 0, Math.PI * 2);
        ctx.stroke();
      }
    },
    []
  );

  // Generate and download certificate
  const handleGenerateCertificate = async (moduleCompletion: ModuleCompletion) => {
    if (!user || !profile || !moduleCompletion.allCompleted) return;

    setGenerating(moduleCompletion.moduleId);

    try {
      // Check if certificate already exists
      const existingCert = issuedCertificates.find(
        (c) => c.module_id === moduleCompletion.moduleId
      );

      let certNumber: string;
      let issuedDate: string;

      if (existingCert) {
        certNumber = existingCert.certificate_number;
        issuedDate = new Date(existingCert.issued_at).toLocaleDateString('pt-PT', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
      } else {
        // Create new certificate in database
        certNumber = generateCertificateNumber();
        const now = new Date();
        issuedDate = now.toLocaleDateString('pt-PT', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });

        const { data: newCert, error } = await supabase
          .from('certificates')
          .insert({
            user_id: user.id,
            module_id: moduleCompletion.moduleId,
            module_name: moduleCompletion.moduleName,
            certificate_number: certNumber,
            pontos_obtidos: moduleCompletion.totalScore,
            pontos_maximo: moduleCompletion.maxPossibleScore,
            percentagem: moduleCompletion.percentage,
            quizzes_completos: moduleCompletion.levels.filter((l) => l.completed).length,
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating certificate:', error);
          // If it's a unique constraint error, the cert already exists
          if (error.code === '23505') {
            const { data: existing } = await supabase
              .from('certificates')
              .select('*')
              .eq('user_id', user.id)
              .eq('module_id', moduleCompletion.moduleId)
              .single();
            if (existing) {
              certNumber = existing.certificate_number;
              issuedDate = new Date(existing.issued_at).toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              });
            }
          }
        } else if (newCert) {
          setIssuedCertificates((prev) => [newCert, ...prev]);
        }
      }

      // Draw certificate on canvas
      const canvas = canvasRef.current;
      if (!canvas) return;

      drawCertificate(
        canvas,
        profile.nome,
        moduleCompletion.moduleName,
        moduleCompletion.totalScore,
        moduleCompletion.maxPossibleScore,
        moduleCompletion.percentage,
        certNumber,
        issuedDate
      );

      // Download as PNG
      const link = document.createElement('a');
      link.download = `EduGALP_Certificado_${moduleCompletion.moduleId}_${profile.nome.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error('Error generating certificate:', err);
    } finally {
      setGenerating(null);
    }
  };

  // Preview certificate
  const handlePreview = (moduleCompletion: ModuleCompletion) => {
    if (!profile || !moduleCompletion.allCompleted) return;

    const existingCert = issuedCertificates.find(
      (c) => c.module_id === moduleCompletion.moduleId
    );

    const certNumber = existingCert?.certificate_number || 'EDUGALP-PREVIEW';
    const dateStr = existingCert
      ? new Date(existingCert.issued_at).toLocaleDateString('pt-PT', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : new Date().toLocaleDateString('pt-PT', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });

    const canvas = canvasRef.current;
    if (!canvas) return;

    drawCertificate(
      canvas,
      profile.nome,
      moduleCompletion.moduleName,
      moduleCompletion.totalScore,
      moduleCompletion.maxPossibleScore,
      moduleCompletion.percentage,
      certNumber,
      dateStr
    );

    setPreviewModule(moduleCompletion.moduleId);
  };

  // Not logged in state
  if (!user) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
              <Award className="w-5 h-5 text-amber-600" />
              <span className="text-amber-700 font-medium">Certificados Digitais</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Obtenha o Seu Certificado
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete todos os quizzes de um módulo e receba um certificado digital profissional que comprova os seus conhecimentos.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Inicie sessão para aceder aos certificados
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Crie uma conta gratuita ou inicie sessão para acompanhar o seu progresso e desbloquear certificados digitais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center justify-center space-x-2 bg-[#FF6B00] hover:bg-[#E55A00] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
              >
                <Shield className="w-5 h-5" />
                <span>Criar Conta Grátis</span>
              </button>
              <button
                onClick={() => setActiveSection('quizzes')}
                className="inline-flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explorar Quizzes</span>
              </button>
            </div>

            {/* How it works */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Como funciona?</h4>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-1">1. Complete os Quizzes</h5>
                  <p className="text-sm text-gray-500">
                    Responda a todos os quizzes (Iniciante, Intermédio e Avançado) de um módulo
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-1">2. Desbloqueie</h5>
                  <p className="text-sm text-gray-500">
                    Ao completar todos os níveis, o certificado fica disponível automaticamente
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Download className="w-6 h-6 text-amber-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-1">3. Descarregue</h5>
                  <p className="text-sm text-gray-500">
                    Descarregue o seu certificado digital com design profissional em formato PNG
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">A carregar certificados...</p>
        </div>
      </section>
    );
  }

  const completedModules = moduleCompletions.filter((m) => m.allCompleted).length;
  const totalModules = moduleCompletions.length;

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
            <Award className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 font-medium">Certificados Digitais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Os Seus Certificados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete todos os quizzes de cada módulo para desbloquear o certificado correspondente
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {profile?.avatar || 'U'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{profile?.nome}</h3>
                <p className="text-gray-500">
                  {completedModules} de {totalModules} módulos concluídos
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{completedModules}</div>
                <div className="text-xs text-gray-500">Certificados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{profile?.pontos_total || 0}</div>
                <div className="text-xs text-gray-500">Pontos Totais</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{profile?.nivel || 'Iniciante'}</div>
                <div className="text-xs text-gray-500">Nível</div>
              </div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progresso geral dos certificados</span>
              <span className="font-semibold text-orange-600">
                {Math.round((completedModules / totalModules) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${(completedModules / totalModules) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {moduleCompletions.map((mod) => {
            const moduleConfig = MODULES.find((m) => m.id === mod.moduleId)!;
            const existingCert = issuedCertificates.find((c) => c.module_id === mod.moduleId);
            const completedLevels = mod.levels.filter((l) => l.completed).length;

            return (
              <div
                key={mod.moduleId}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all ${
                  mod.allCompleted
                    ? `${moduleConfig.borderColor} shadow-xl`
                    : 'border-transparent hover:shadow-xl'
                }`}
              >
                {/* Module Header */}
                <div className={`bg-gradient-to-r ${moduleConfig.gradient} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{mod.moduleIcon}</span>
                    {mod.allCompleted ? (
                      <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Concluído</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{completedLevels}/3</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold">{mod.moduleName}</h3>
                  <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/60 rounded-full transition-all"
                      style={{ width: `${(completedLevels / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Levels */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    {mod.levels.map((level) => (
                      <div
                        key={level.nivel}
                        className={`flex items-center justify-between p-3 rounded-xl ${
                          level.completed ? moduleConfig.lightBg : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {level.completed ? (
                            <CheckCircle className={`w-5 h-5 ${moduleConfig.textColor}`} />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                          <div>
                            <span className="font-medium text-gray-900 text-sm">
                              {level.nivelLabel}
                            </span>
                            {level.completed && (
                              <div className="text-xs text-gray-500">
                                {level.bestScore}/{level.maxScore} pts
                                {level.attempts > 1 && ` (${level.attempts} tentativas)`}
                              </div>
                            )}
                          </div>
                        </div>
                        {level.completed ? (
                          <span className={`text-sm font-bold ${moduleConfig.textColor}`}>
                            {Math.round((level.bestScore / level.maxScore) * 100)}%
                          </span>
                        ) : (
                          <button
                            onClick={() => setActiveSection('quizzes')}
                            className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1"
                          >
                            <span>Fazer Quiz</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Score Summary */}
                  {mod.allCompleted && (
                    <div className={`${moduleConfig.lightBg} rounded-xl p-4 mb-4`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600">Pontuação Total</div>
                          <div className={`text-2xl font-bold ${moduleConfig.textColor}`}>
                            {mod.totalScore}/{mod.maxPossibleScore}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Percentagem</div>
                          <div className={`text-2xl font-bold ${moduleConfig.textColor}`}>
                            {mod.percentage}%
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Certificate Actions */}
                  {mod.allCompleted ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => handleGenerateCertificate(mod)}
                        disabled={generating === mod.moduleId}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#FF6B00] to-[#E55A00] hover:from-[#E55A00] hover:to-[#CC4D00] text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                      >
                        {generating === mod.moduleId ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>A gerar...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5" />
                            <span>
                              {existingCert ? 'Descarregar Certificado' : 'Gerar Certificado'}
                            </span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handlePreview(mod)}
                        className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-medium transition-colors text-sm"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Pré-visualizar</span>
                      </button>
                      {existingCert && (
                        <div className="text-center text-xs text-gray-400 mt-1">
                          Emitido em{' '}
                          {new Date(existingCert.issued_at).toLocaleDateString('pt-PT')} •{' '}
                          {existingCert.certificate_number}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 text-gray-400 mb-3">
                        <Lock className="w-5 h-5" />
                        <span className="font-medium">Certificado Bloqueado</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        Complete todos os 3 níveis de quiz para desbloquear
                      </p>
                      <button
                        onClick={() => setActiveSection('quizzes')}
                        className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium text-sm"
                      >
                        <span>Ir para Quizzes</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Previously Issued Certificates */}
        {issuedCertificates.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Certificados Emitidos</h3>
                <p className="text-sm text-gray-500">
                  Histórico dos seus certificados digitais
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Módulo
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Número
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                      Pontuação
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                      Data
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {issuedCertificates.map((cert) => {
                    const modConfig = MODULES.find((m) => m.id === cert.module_id);
                    const modCompletion = moduleCompletions.find(
                      (m) => m.moduleId === cert.module_id
                    );
                    return (
                      <tr
                        key={cert.id}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{modConfig?.icon || '📄'}</span>
                            <span className="font-medium text-gray-900">
                              {cert.module_name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600">
                            {cert.certificate_number}
                          </code>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="font-semibold text-orange-600">
                            {cert.pontos_obtidos}/{cert.pontos_maximo}
                          </span>
                          <span className="text-gray-400 text-sm ml-1">
                            ({cert.percentagem}%)
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-sm text-gray-600">
                          {new Date(cert.issued_at).toLocaleDateString('pt-PT')}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              if (modCompletion) handleGenerateCertificate(modCompletion);
                            }}
                            disabled={generating === cert.module_id}
                            className="inline-flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-medium text-sm"
                          >
                            {generating === cert.module_id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                            <span>Descarregar</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Certificate Preview Modal */}
        {previewModule && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  <span>Pré-visualização do Certificado</span>
                </h3>
                <button
                  onClick={() => setPreviewModule(null)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto border border-gray-200 rounded-lg shadow-inner"
                  style={{ maxHeight: '70vh' }}
                />
              </div>
              <div className="flex justify-end gap-3 p-4 border-t border-gray-100">
                <button
                  onClick={() => setPreviewModule(null)}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    const mod = moduleCompletions.find((m) => m.moduleId === previewModule);
                    if (mod) {
                      handleGenerateCertificate(mod);
                      setPreviewModule(null);
                    }
                  }}
                  className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#E55A00] text-white rounded-xl font-semibold transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Descarregar</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden canvas for certificate generation (when not previewing) */}
        {!previewModule && (
          <canvas ref={canvasRef} className="hidden" width={1400} height={1000} />
        )}

        {/* How it works section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Como Obter o Seu Certificado
          </h3>
          <div className="grid sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h5 className="font-semibold text-gray-900 mb-1">Escolha um Módulo</h5>
              <p className="text-sm text-gray-500">
                Selecione entre Renováveis, Carvão vs Gás ou Resíduos
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h5 className="font-semibold text-gray-900 mb-1">Complete os 3 Níveis</h5>
              <p className="text-sm text-gray-500">
                Responda aos quizzes Iniciante, Intermédio e Avançado
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h5 className="font-semibold text-gray-900 mb-1">Desbloqueie</h5>
              <p className="text-sm text-gray-500">
                O certificado é desbloqueado automaticamente ao completar tudo
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-amber-600">4</span>
              </div>
              <h5 className="font-semibold text-gray-900 mb-1">Descarregue</h5>
              <p className="text-sm text-gray-500">
                Descarregue o certificado profissional em formato PNG
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
