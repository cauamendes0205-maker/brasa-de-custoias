"use client";

import { Phone, MessageCircle, Navigation } from "lucide-react";
import { RESTAURANTE, DIRECOES } from "@/lib/restaurante";
import { DistintivoAbertura } from "@/components/estado-abertura";

/** Barra fixa no fundo, so em telemovel. */
export function BarraMobile() {
  return (
    <div className="barra-mobile" role="navigation" aria-label="Contacto rápido">
      <div className="barra-mobile-estado">
        <DistintivoAbertura compacto />
      </div>
      <div className="barra-mobile-accoes">
        <a href={RESTAURANTE.telefoneTel} className="barra-botao barra-botao-brasa">
          <Phone size={18} aria-hidden="true" />
          Ligar
        </a>
        <a
          href={RESTAURANTE.whatsapp}
          target="_blank"
          rel="noreferrer noopener"
          className="barra-botao"
        >
          <MessageCircle size={18} aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={DIRECOES.google}
          target="_blank"
          rel="noreferrer noopener"
          className="barra-botao"
        >
          <Navigation size={18} aria-hidden="true" />
          Direções
        </a>
      </div>
    </div>
  );
}
