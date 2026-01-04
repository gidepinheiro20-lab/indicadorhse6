// Configuração de API para o Sistema HSE
// Edite este arquivo para alterar para qual servidor os dados serão enviados

const API_CONFIG = {
  // Use http://192.168.3.61:3000 para servidor local na mesma rede
  // Use http://localhost:3000 para acesso local
  // Use https://seu-dominio.com:3000 para acesso remoto
  BASE_URL: 'http://192.168.3.61:3000',
  
  // Se usar GitHub Pages remotamente, defina seu servidor online aqui
  // GITHUB_REMOTE_URL: 'https://seu-servidor-remoto.com:3000',
  
  // Ativar/desativar sincronização com servidor
  SYNC_ENABLED: true,
  
  // Timeout em milissegundos
  TIMEOUT: 5000
};

// Injetar configuração no index.html
window.API_BASE_URL = API_CONFIG.BASE_URL;
window.API_SYNC_ENABLED = API_CONFIG.SYNC_ENABLED;
