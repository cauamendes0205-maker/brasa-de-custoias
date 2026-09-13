import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática: gera a pasta `out/` com ficheiros prontos para
  // qualquer alojamento estático (Cloudflare Pages). Sem servidor Node.
  output: "export",
  // O otimizador de imagens do Next precisa de servidor; em modo estático
  // as imagens são servidas tal como estão. O <Image> continua a funcionar.
  images: { unoptimized: true },
};

export default nextConfig;
