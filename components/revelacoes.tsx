"use client";

import { useEffect } from "react";

/**
 * Faz os cartoes subirem quando entram no ecra. So mexe no transform:
 * a opacidade nunca e animada, para que nada fique invisivel se o
 * observador nao correr. Montado uma vez na pagina.
 */
export function Revelacoes() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const alvos = document.querySelectorAll<HTMLElement>(".cartao, .galeria-item figure");
    if (!alvos.length) return;

    if (!("IntersectionObserver" in window)) {
      alvos.forEach((el) => el.setAttribute("data-visivel", ""));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.setAttribute("data-visivel", "");
            observador.unobserve(entrada.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    alvos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);

  return null;
}
