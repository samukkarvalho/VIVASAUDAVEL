// PWA Install Script
let deferredPrompt;
let installButton;

window.addEventListener('load', () => {
  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado:', registration);
      })
      .catch((error) => {
        console.log('Erro ao registrar Service Worker:', error);
      });
  }

  // Criar botão de instalação
  createInstallButton();
});

// Capturar evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Mostrar botão de instalação
  if (installButton) {
    installButton.style.display = 'flex';
  }
});

// Criar botão de instalação
function createInstallButton() {
  // Verificar se já está instalado
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('App já instalado');
    return;
  }

  // Criar botão
  installButton = document.createElement('button');
  installButton.id = 'install-button';
  installButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
    <span>Instalar App</span>
  `;
  
  // Estilos do botão
  installButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    z-index: 9999;
    display: none;
    align-items: center;
    gap: 10px;
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s;
  `;

  // Hover effect
  installButton.addEventListener('mouseenter', () => {
    installButton.style.transform = 'translateY(-3px)';
    installButton.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
  });

  installButton.addEventListener('mouseleave', () => {
    installButton.style.transform = 'translateY(0)';
    installButton.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
  });

  // Click para instalar
  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) {
      return;
    }

    // Mostrar prompt de instalação
    deferredPrompt.prompt();

    // Aguardar escolha do usuário
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`Usuário escolheu: ${outcome}`);

    if (outcome === 'accepted') {
      console.log('App instalado com sucesso!');
      installButton.style.display = 'none';
    }

    deferredPrompt = null;
  });

  // Adicionar ao body
  document.body.appendChild(installButton);
}

// Detectar quando app é instalado
window.addEventListener('appinstalled', () => {
  console.log('App instalado!');
  if (installButton) {
    installButton.style.display = 'none';
  }
  deferredPrompt = null;

  // Opcional: Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install', {
      event_category: 'engagement',
      event_label: 'PWA Installed'
    });
  }
});

// Detectar se está rodando como PWA
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('Rodando como PWA instalado');
  document.body.classList.add('pwa-installed');
}

// Solicitar permissão para notificações (opcional)
function requestNotificationPermission() {
  if ('Notification' in window && navigator.serviceWorker) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Permissão de notificação concedida');
      }
    });
  }
}

// Adicionar meta tags dinamicamente se não existirem
function addPWAMetaTags() {
  const metaTags = [
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'VidaSaudável' },
    { name: 'mobile-web-app-capable', content: 'yes' }
  ];

  metaTags.forEach(tag => {
    if (!document.querySelector(`meta[name="${tag.name}"]`)) {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    }
  });
}

// Executar ao carregar
addPWAMetaTags();
