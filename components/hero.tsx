"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, MapPin, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/logo";
import { DistintivoAbertura } from "@/components/estado-abertura";
import { RESTAURANTE, LIGACOES, DIRECOES } from "@/lib/restaurante";
import { IconeFacebook } from "@/components/icones-marca";

/** Parallax suave: guarda a distancia de scroll numa variavel CSS. */
function useParallax() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const no = ref.current;
    if (!no) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pedido = 0;
    const aoRolar = () => {
      if (pedido) return;
      pedido = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        no.style.setProperty("--rolagem", String(y));
        pedido = 0;
      });
    };

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(pedido);
    };
  }, []);

  return ref;
}

export function Hero() {
  const ref = useParallax();

  return (
    <header ref={ref} className="hero" id="inicio">
      <div className="hero-halo" aria-hidden="true" />
      <div className="hero-grelha" aria-hidden="true" />

      <div className="hero-interior">
        <div className="hero-texto">
          <h1 className="hero-titulo">
            <span className="sr-only">
              Brasa de Custóias — churrasqueira em Custóias, Matosinhos
            </span>
            <Logo className="hero-logo" aria-hidden />
          </h1>

          <p className="hero-lema">
            Churrasqueira de bairro em Custóias. Carvão, travessas para o meio
            da mesa e música ao vivo ao fim de semana.
          </p>

          <div className="hero-estado">
            <DistintivoAbertura />
          </div>

          <div className="hero-accoes">
            <a className="botao botao-brasa" href={RESTAURANTE.telefoneTel}>
              <Phone size={18} aria-hidden="true" />
              Ligar {RESTAURANTE.telefone}
            </a>
            <a
              className="botao botao-vidro"
              href="#ementa"
            >
              <UtensilsCrossed size={18} aria-hidden="true" />
              Ver a ementa
            </a>
            <a
              className="botao botao-vidro"
              href={DIRECOES.google}
              target="_blank"
              rel="noreferrer noopener"
            >
              <MapPin size={18} aria-hidden="true" />
              Como chegar
            </a>
            <a
              className="botao botao-vidro"
              href={LIGACOES.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook da Brasa de Custóias"
            >
              <IconeFacebook />
              Facebook
            </a>
          </div>

          <p className="hero-morada">
            {RESTAURANTE.moradaCompleta} · {RESTAURANTE.precoMedio.texto}
          </p>

          <div className="hero-pedir">
            <a
              className="botao botao-brasa"
              href={LIGACOES.uberEats}
              target="_blank"
              rel="noreferrer noopener"
            >
              <ShoppingBag size={18} aria-hidden="true" />
              Encomendar no Uber Eats
            </a>
            <a
              className="botao botao-glovo"
              href={LIGACOES.glovo}
              target="_blank"
              rel="noreferrer noopener"
            >
              <ShoppingBag size={18} aria-hidden="true" />
              Pedir na Glovo
            </a>
          </div>
        </div>

        <div className="hero-imagens">
          <figure className="hero-carta hero-carta-frente">
            <Image
              src="/fotos/frango-brasa.jpg"
              alt="Vários frangos abertos a assar na grelha da churrasqueira, sobre a brasa de carvão."
              width={900}
              height={600}
              priority
              className="hero-foto"
            />
            <figcaption>Frango na brasa, todos os dias</figcaption>
          </figure>

          <figure className="hero-carta hero-carta-fundo">
            <Image
              src="/fotos/g1.jpg"
              alt="Sala da Brasa de Custóias: mesa posta com toalha preta e a montra com o logótipo da casa."
              width={600}
              height={800}
              priority
              className="hero-foto"
            />
            <figcaption>A sala</figcaption>
          </figure>
        </div>
      </div>

    </header>
  );
}
