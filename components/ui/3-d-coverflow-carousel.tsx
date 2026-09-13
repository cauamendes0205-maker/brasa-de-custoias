"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export interface CarouselItem {
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  /** Texto alternativo real da fotografia. */
  imgAlt?: string;
  /** Preço já formatado, ex.: "37,50 €" ou "preço à mesa". */
  price?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface CoverFlowCarouselProps {
  items: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  onCtaClick?: (item: CarouselItem) => void;
}

/** Respeita a preferência do sistema por menos movimento. */
function usePrefersReducedMotion() {
  const [reduzido, setReduzido] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzido(mq.matches);
    const ouvir = (e: MediaQueryListEvent) => setReduzido(e.matches);
    mq.addEventListener("change", ouvir);
    return () => mq.removeEventListener("change", ouvir);
  }, []);

  return reduzido;
}

export function CoverFlowCarousel({
  items,
  sectionLabel = "DA BRASA",
  autoplay = true,
  autoplayDelay = 5500,
  className = "",
  onCtaClick,
}: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [temFoco, setTemFoco] = useState(false);
  const touchStartX = useRef(0);
  const reduzirMovimento = usePrefersReducedMotion();
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = useCallback(
    (idx: number) => setCurrentIndex(((idx % total) + total) % total),
    [total],
  );

  // Autoplay: pára com o rato em cima, com o foco no carrossel e
  // quando o visitante pediu menos movimento.
  useEffect(() => {
    if (!autoplay || isHovered || temFoco || reduzirMovimento || total <= 1) {
      return;
    }
    const intervalo = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(intervalo);
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    temFoco,
    reduzirMovimento,
    nextSlide,
    total,
  ]);

  // Setas do teclado só quando o carrossel tem o foco, para não roubar
  // as setas ao resto da página.
  const aoPremirTecla = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "Home") {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToSlide(total - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  const transicao = reduzirMovimento
    ? "opacity 200ms linear"
    : "transform 800ms cubic-bezier(0.25, 1, 0.5, 1), opacity 800ms cubic-bezier(0.25, 1, 0.5, 1), filter 800ms ease, box-shadow 800ms ease";

  const atual = items[currentIndex];

  return (
    <section
      aria-roledescription="carrossel"
      aria-label={sectionLabel}
      className={
        "carrossel relative w-full select-none overflow-hidden py-14 " + className
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setTemFoco(true)}
      onBlurCapture={() => setTemFoco(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambiente de fundo: a própria fotografia, desfocada */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          key={atual.img}
          src={atual.img}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="carrossel-fundo object-cover"
        />
        <div className="carrossel-vinheta absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4">
        {sectionLabel ? (
          <div className="mb-8 flex items-center gap-3">
            <span className="filete filete-esq" aria-hidden="true" />
            <h2 className="sobrancelha">{sectionLabel}</h2>
            <span className="filete filete-dir" aria-hidden="true" />
          </div>
        ) : null}

        {/* Palco 3D */}
        <div
          className="palco relative mb-8 flex w-full items-center justify-center"
          style={{ perspective: "1400px" }}
          tabIndex={0}
          role="group"
          aria-label={
            "Pratos da casa, " +
            (currentIndex + 1) +
            " de " +
            total +
            ". Use as setas esquerda e direita."
          }
          onKeyDown={aoPremirTecla}
        >
          {items.map((item, idx) => {
            const offset = (idx - currentIndex + total) % total;

            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(0.4) blur(2px)";
            let isCenter = false;

            if (offset === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (offset === 1) {
              transform =
                "translateX(var(--desvio-1)) scale(0.84) rotateY(-24deg)";
              opacity = 0.68;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === 2) {
              transform =
                "translateX(var(--desvio-2)) scale(0.68) rotateY(-38deg)";
              opacity = 0.4;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            } else if (offset === total - 1) {
              transform =
                "translateX(calc(-1 * var(--desvio-1))) scale(0.84) rotateY(24deg)";
              opacity = 0.68;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === total - 2) {
              transform =
                "translateX(calc(-1 * var(--desvio-2))) scale(0.68) rotateY(38deg)";
              opacity = 0.4;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            }

            if (reduzirMovimento) {
              transform = "none";
              filter = "none";
              opacity = isCenter ? 1 : 0;
              zIndex = isCenter ? 30 : 0;
            }

            return (
              <button
                key={item.titleLine1 + idx}
                type="button"
                onClick={() => (isCenter ? undefined : goToSlide(idx))}
                aria-hidden={!isCenter}
                tabIndex={-1}
                className="carta absolute"
                style={{
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transition: transicao,
                  boxShadow: isCenter
                    ? "0 30px 70px rgba(0,0,0,0.92), 0 0 46px rgba(255,122,26,0.28)"
                    : "0 15px 35px rgba(0,0,0,0.5)",
                  cursor: isCenter ? "default" : "pointer",
                  pointerEvents: opacity === 0 ? "none" : "auto",
                }}
              >
                <Image
                  src={item.img}
                  alt={isCenter ? item.imgAlt || item.titleLine1 : ""}
                  fill
                  sizes="(max-width: 640px) 78vw, 340px"
                  className="object-cover"
                />

                <span className="carta-vinheta" aria-hidden="true" />

                <span
                  className="carta-conteudo"
                  style={{
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? "translateY(0)" : "translateY(16px)",
                    transition: reduzirMovimento
                      ? "opacity 200ms linear"
                      : "opacity 500ms ease, transform 500ms ease",
                  }}
                >
                  <span className="carta-topo">
                    {item.tag ? (
                      <span className="carta-etiqueta">{item.tag}</span>
                    ) : null}
                  </span>

                  <span className="carta-corpo">
                    <span className="carta-titulo">{item.titleLine1}</span>
                    {item.titleLine2 ? (
                      <span className="carta-subtitulo">{item.titleLine2}</span>
                    ) : null}
                    <span className="carta-filete" aria-hidden="true" />
                    {item.desc ? (
                      <span className="carta-descricao">{item.desc}</span>
                    ) : null}
                    {item.price ? (
                      <span className="carta-preco">{item.price}</span>
                    ) : null}
                    {item.ctaText ? (
                      <span
                        className="carta-botao"
                        onClick={(e) => {
                          if (onCtaClick) {
                            e.stopPropagation();
                            onCtaClick(item);
                          }
                        }}
                      >
                        {item.ctaText}
                        <ArrowRight
                          size={13}
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Prato anterior"
            className="seta"
          >
            <ChevronLeft size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>

          <div className="flex items-center justify-center gap-2">
            {items.map((item, idx) => (
              <button
                key={"ponto" + idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={"Ver " + item.titleLine1}
                aria-current={idx === currentIndex}
                className={"ponto" + (idx === currentIndex ? " ponto-ativo" : "")}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Prato seguinte"
            className="seta"
          >
            <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {atual.titleLine1}
          {atual.price ? ", " + atual.price : ""}
        </p>
      </div>
    </section>
  );
}

export const Component = CoverFlowCarousel;
export default CoverFlowCarousel;
