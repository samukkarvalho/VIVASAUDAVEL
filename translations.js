// Sistema de Tradução PT/EN - VidaSaudável
const translations = {
    pt: {
        // Navbar
        'logo': 'VidaSaudável',
        'btn-premium': '⭐ Assine Premium',
        'btn-login': 'Entrar',
        'btn-logout': 'Sair',
        
        // Hero
        'hero-title': 'Transforme Seu Corpo e',
        'hero-title-gradient': 'Conquiste Seus Objetivos',
        'hero-subtitle': 'Seu coach de saúde pessoal. Treinos personalizados, nutrição inteligente e acompanhamento profissional.',
        'btn-start': 'Começar Agora',
        
        // Cards Home
        'card-treino': 'Meu Treino',
        'card-treino-desc': 'Fichas de treino personalizadas adaptadas ao seu biotipo',
        'card-dieta': 'Minha Dieta',
        'card-dieta-desc': 'Planos alimentares completos e balanceados',
        'card-acomp': 'Acompanhamento',
        'card-acomp-desc': 'Monitore sua evolução com gráficos detalhados',
        'card-exerc': 'Aprenda a Treinar',
        'card-exerc-desc': '58 exercícios com técnicas corretas',
        
        // Treino
        'treino-title': 'GERADOR DE TREINO',
        'treino-subtitle': 'Monte sua ficha profissional completa',
        'treino-dados': '📋 Seus Dados',
        'treino-nome': 'Nome',
        'treino-idade': 'Idade',
        'treino-peso': 'Peso (kg)',
        'treino-altura': 'Altura (cm)',
        'treino-biotipo-title': '🧬 Seu Biotipo',
        'treino-ectomorfo': 'Ectomorfo',
        'treino-ectomorfo-desc': 'Magro, dificuldade ganhar peso',
        'treino-mesomorfo': 'Mesomorfo',
        'treino-mesomorfo-desc': 'Atlético, ganha músculo facilmente',
        'treino-endomorfo': 'Endomorfo',
        'treino-endomorfo-desc': 'Facilidade ganhar peso',
        'treino-objetivo-title': '🎯 Seu Objetivo',
        'treino-emagrecimento': 'Emagrecimento',
        'treino-definicao': 'Definição',
        'treino-hipertrofia': 'Ganho de Massa',
        'treino-nivel-title': '📊 Seu Nível',
        'treino-iniciante': 'Iniciante',
        'treino-iniciante-desc': '0-6 meses',
        'treino-intermediario': 'Intermediário',
        'treino-intermediario-desc': '6-18 meses',
        'treino-avancado': 'Avançado',
        'treino-avancado-desc': '+18 meses',
        'treino-btn-gerar': 'Gerar Meu Treino',
        'treino-btn-outro': '🔄 Gerar Outro Treino',
        'treino-voltar': 'Voltar para Início',
        
        // Dieta
        'dieta-title': 'GERADOR DE DIETA',
        'dieta-subtitle': 'Seu plano alimentar personalizado',
        'dieta-orcamento-title': '💰 Perfil Alimentar',
        'dieta-economico': 'Econômico',
        'dieta-economico-desc': 'Alimentos básicos e acessíveis',
        'dieta-medio': 'Médio',
        'dieta-medio-desc': 'Variedade e qualidade equilibrada',
        'dieta-premium': 'Premium',
        'dieta-premium-desc': 'Alimentos premium e suplementação',
        'dieta-btn-gerar': 'Gerar Minha Dieta',
        'dieta-btn-outro': '🔄 Gerar Outra Dieta',
        
        // Popup Upgrade
        'popup-title': 'Limite Atingido!',
        'popup-treino-msg': 'Você já gerou seu <strong>treino grátis</strong> deste mês.',
        'popup-dieta-msg': 'Você já gerou sua <strong>dieta grátis</strong> deste mês.',
        'popup-subtitle': 'Assine Premium para acesso ilimitado!',
        'popup-btn': 'Assinar por €20 (Vitalício)',
        'popup-voltar': 'Voltar',
        
        // Modal Login
        'modal-title': 'Bem-vindo',
        'modal-subtitle': 'Faça login para acessar',
        'modal-btn': 'Entrar com Google',
        
        // Footer
        'footer-links': 'Links',
        'footer-contact': 'Contato',
        'footer-social': 'Redes Sociais',
        'footer-rights': '© 2026 VidaSaudável. Todos os direitos reservados.'
    },
    
    en: {
        // Navbar
        'logo': 'HealthyLife',
        'btn-premium': '⭐ Subscribe Premium',
        'btn-login': 'Sign In',
        'btn-logout': 'Sign Out',
        
        // Hero
        'hero-title': 'Transform Your Body and',
        'hero-title-gradient': 'Achieve Your Goals',
        'hero-subtitle': 'Your personal health coach. Customized workouts, smart nutrition and professional monitoring.',
        'btn-start': 'Get Started',
        
        // Cards Home
        'card-treino': 'My Workout',
        'card-treino-desc': 'Personalized workout plans adapted to your body type',
        'card-dieta': 'My Diet',
        'card-dieta-desc': 'Complete and balanced meal plans',
        'card-acomp': 'Tracking',
        'card-acomp-desc': 'Monitor your progress with detailed charts',
        'card-exerc': 'Learn to Train',
        'card-exerc-desc': '58 exercises with correct techniques',
        
        // Treino
        'treino-title': 'WORKOUT GENERATOR',
        'treino-subtitle': 'Build your complete professional plan',
        'treino-dados': '📋 Your Data',
        'treino-nome': 'Name',
        'treino-idade': 'Age',
        'treino-peso': 'Weight (kg)',
        'treino-altura': 'Height (cm)',
        'treino-biotipo-title': '🧬 Your Body Type',
        'treino-ectomorfo': 'Ectomorph',
        'treino-ectomorfo-desc': 'Lean, hard to gain weight',
        'treino-mesomorfo': 'Mesomorph',
        'treino-mesomorfo-desc': 'Athletic, gains muscle easily',
        'treino-endomorfo': 'Endomorph',
        'treino-endomorfo-desc': 'Easy to gain weight',
        'treino-objetivo-title': '🎯 Your Goal',
        'treino-emagrecimento': 'Weight Loss',
        'treino-definicao': 'Definition',
        'treino-hipertrofia': 'Muscle Gain',
        'treino-nivel-title': '📊 Your Level',
        'treino-iniciante': 'Beginner',
        'treino-iniciante-desc': '0-6 months',
        'treino-intermediario': 'Intermediate',
        'treino-intermediario-desc': '6-18 months',
        'treino-avancado': 'Advanced',
        'treino-avancado-desc': '+18 months',
        'treino-btn-gerar': 'Generate My Workout',
        'treino-btn-outro': '🔄 Generate Another Workout',
        'treino-voltar': 'Back to Home',
        
        // Dieta
        'dieta-title': 'DIET GENERATOR',
        'dieta-subtitle': 'Your personalized meal plan',
        'dieta-orcamento-title': '💰 Food Profile',
        'dieta-economico': 'Budget',
        'dieta-economico-desc': 'Basic and affordable foods',
        'dieta-medio': 'Standard',
        'dieta-medio-desc': 'Balanced variety and quality',
        'dieta-premium': 'Premium',
        'dieta-premium-desc': 'Premium foods and supplements',
        'dieta-btn-gerar': 'Generate My Diet',
        'dieta-btn-outro': '🔄 Generate Another Diet',
        
        // Popup Upgrade
        'popup-title': 'Limit Reached!',
        'popup-treino-msg': 'You already generated your <strong>free workout</strong> this month.',
        'popup-dieta-msg': 'You already generated your <strong>free diet</strong> this month.',
        'popup-subtitle': 'Subscribe Premium for unlimited access!',
        'popup-btn': 'Subscribe for €20 (Lifetime)',
        'popup-voltar': 'Go Back',
        
        // Modal Login
        'modal-title': 'Welcome',
        'modal-subtitle': 'Sign in to access',
        'modal-btn': 'Sign in with Google',
        
        // Footer
        'footer-links': 'Links',
        'footer-contact': 'Contact',
        'footer-social': 'Social Media',
        'footer-rights': '© 2026 HealthyLife. All rights reserved.'
    }
};

// Função de tradução
function translatePage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // Salvar preferência
    localStorage.setItem('preferredLanguage', lang);
    
    // Atualizar botão ativo
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
}

// Carregar idioma salvo ao iniciar
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'pt';
    translatePage(savedLang);
});
