import React, { useState, useEffect } from 'react';
import apiClient from '../services/api'; // Importe sua instância configurada do Axios

interface AuthenticatedVideoPlayerProps {
  videoId: string;
}

const AuthenticatedVideoPlayer: React.FC<AuthenticatedVideoPlayerProps> = ({ videoId }) => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) return;

    let objectUrl: string; // Variável para guardar a URL do blob para limpeza

    const fetchVideo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 1. Faz a requisição com o Axios, que já envia o token.
        //    'blob' é crucial para receber os dados como um arquivo.
        const response = await apiClient.get(`/video/${videoId}`, {
          responseType: 'blob',
        });

        // 2. Cria uma URL local para os dados do vídeo recebidos.
        objectUrl = URL.createObjectURL(response.data);
        setVideoSrc(objectUrl);

      } catch (err) {
        console.error("Erro ao carregar o vídeo:", err);
        setError('Não foi possível carregar o vídeo.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();

    // 3. Função de limpeza: revoga a URL do blob para liberar memória quando o componente for desmontado.
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [videoId]); // Roda o efeito sempre que o videoId mudar

  if (isLoading) return <p>Carregando vídeo...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {videoSrc && (
        <video controls width="100%">
          <source src={videoSrc} type="video/mp4" />
          Seu navegador não suporta vídeo HTML5.
        </video>
      )}
    </div>
  );
};

export default AuthenticatedVideoPlayer;