// Configuração de API para o Sistema HSE
// Edite este arquivo para alterar para qual servidor os dados serão enviados

const API_CONFIG = {
  // Servidor online no Render (acesso de qualquer lugar)
  // IMPORTANTE: NÃO adicionar porta (:3000) - Render usa porta padrão HTTPS
  BASE_URL: 'https://indicadorhse6.onrender.com',
  
  // Alternativos:
  // Use http://192.168.3.61:3000 para servidor local na mesma rede
  // Use http://localhost:3000 para acesso local
  
  // Ativar/desativar sincronização com servidor
  SYNC_ENABLED: true,
  
  // Timeout em milissegundos
  TIMEOUT: 10000
};

// Injetar configuração no index.html
window.API_BASE_URL = API_CONFIG.BASE_URL;
window.API_SYNC_ENABLED = API_CONFIG.SYNC_ENABLED;
