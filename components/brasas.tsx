"use client";

import { useEffect, useRef } from "react";

type Fagulha = {
  x: number;
  y: number;
  raio: number;
  velocidade: number;
  deriva: number;
  vida: number;
  vidaMax: number;
};

/**
 * Fagulhas a subir, como as que saltam do carvao. Desenhadas em canvas
 * para nao pesar no DOM. Nao arranca se o visitante pediu menos
 * movimento nem se a janela estiver escondida.
 */
export function Brasas() {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = refCanvas.current;
    if (!canvas) return;

    const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (menosMovimento.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let largura = 0;
    let altura = 0;
    let animacao = 0;
    const fagulhas: Fagulha[] = [];

    const redimensionar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = canvas.clientWidth;
      altura = canvas.clientHeight;
      canvas.width = Math.floor(largura * dpr);
      canvas.height = Math.floor(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const nascer = (inicial = false): Fagulha => {
      const vidaMax = 260 + Math.random() * 340;
      return {
        x: Math.random() * largura,
        y: inicial ? Math.random() * altura : altura + 12,
        raio: 0.6 + Math.random() * 1.9,
        velocidade: 0.16 + Math.random() * 0.5,
        deriva: (Math.random() - 0.5) * 0.22,
        vida: inicial ? Math.random() * vidaMax : 0,
        vidaMax,
      };
    };

    redimensionar();
    const quantidade = Math.min(90, Math.round(largura / 14));
    for (let i = 0; i < quantidade; i++) fagulhas.push(nascer(true));

    const desenhar = () => {
      ctx.clearRect(0, 0, largura, altura);

      for (let i = 0; i < fagulhas.length; i++) {
        const f = fagulhas[i];
        f.y -= f.velocidade;
        f.x += f.deriva + Math.sin(f.vida / 42) * 0.16;
        f.vida += 1;

        if (f.vida > f.vidaMax || f.y < -12) {
          fagulhas[i] = nascer();
          continue;
        }

        const progresso = f.vida / f.vidaMax;
        const opacidade = Math.sin(progresso * Math.PI) * 0.85;
        const brilho = 210 - progresso * 90;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.raio, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, " + Math.round(brilho) + ", 70, " + opacidade.toFixed(3) + ")";
        ctx.shadowColor = "rgba(255, 130, 40, " + (opacidade * 0.8).toFixed(3) + ")";
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      animacao = requestAnimationFrame(desenhar);
    };

    animacao = requestAnimationFrame(desenhar);
    window.addEventListener("resize", redimensionar);

    return () => {
      cancelAnimationFrame(animacao);
      window.removeEventListener("resize", redimensionar);
    };
  }, []);

  return (
    <canvas
      ref={refCanvas}
      className="brasas-canvas pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
