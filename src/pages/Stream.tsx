import React, { useState, useMemo } from 'react';
import { API_URL } from '../services/api';
import Header from '../components/Header';
import themes from '../themes/admin.module.scss'

const Stream: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Pega o token do localStorage
  const token = localStorage.getItem('authToken');

  // Cria a URL do stream com o token como parâmetro.
  // useMemo garante que a URL só seja recalculada se o token mudar.
  const streamUrl = useMemo(() => {
    if (!token) return '';
    return `${API_URL}/stream?token=${token}`;
  }, [token]);

  const handleLoad = (): void => {
    console.log('Stream de vídeo carregado.');
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (): void => {
    console.error('Erro ao carregar o stream de vídeo.');
    setIsLoading(false);
    setHasError(true);
  };

  if (!token) {
    return <div>Você precisa estar logado para ver o stream.</div>;
  }

  return (
    <div className={themes.stream}>
      <Header titulo='Stream' color='#1E0BFF'  home = "/admin"/>
      {isLoading && <div className="loading-overlay" style={{color:"white"}}>Carregando Câmera...</div>}
      {hasError && <div className="error-overlay" style={{color:"white"}}>Falha ao conectar com a câmera.</div>}
      <div>
        <img
            src={streamUrl}
            alt="Stream de vídeo ao vivo"
            onLoad={handleLoad}
            onError={handleError}
            style={{ display: isLoading || hasError ? 'none' : 'block' }}
            className="video-stream"
        />
      </div>
      
    </div>
  );
};

export default Stream;