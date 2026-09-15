import {
  Phone,
  MessageCircle,
  MapPin,
  Navigation,
  ShoppingBag,
  Wallet,
  Timer,
  CalendarDays,
  Zap,
} from "lucide-react";
import { RESTAURANTE, LIGACOES, DIRECOES } from "@/lib/restaurante";
import { TabelaHorario } from "@/components/estado-abertura";
import { IconeFacebook, IconeInstagram } from "@/components/icones-marca";

export function Contactos() {
  return (
    <section id="contactos" className="seccao seccao-escura">
      <div className="seccao-interior">
        <h2 className="titulo-seccao">Onde estamos</h2>

        <div className="contactos">
          <div className="cartao cartao-contacto">
            <h3 className="cartao-titulo">
              <MapPin size={18} aria-hidden="true" />
              Morada
            </h3>
            <address>
              {RESTAURANTE.morada.rua}
              <br />
              {RESTAURANTE.morada.codigoPostal} {RESTAURANTE.morada.localidade}
              <br />
              {RESTAURANTE.morada.concelho}, {RESTAURANTE.morada.distrito}
            </address>

            <h3 className="cartao-titulo cartao-titulo-espaco">
              <Navigation size={18} aria-hidden="true" />
              Como chegar
            </h3>
            <div className="direcoes">
              <a className="botao botao-vidro" href={DIRECOES.google} target="_blank" rel="noreferrer noopener">
                Google Maps
              </a>
              <a className="botao botao-vidro" href={DIRECOES.waze} target="_blank" rel="noreferrer noopener">
                Waze
              </a>
              <a className="botao botao-vidro" href={DIRECOES.apple} target="_blank" rel="noreferrer noopener">
                Apple Maps
              </a>
            </div>

            <ul className="factos">
              <li>
                <Wallet size={16} aria-hidden="true" />
                {RESTAURANTE.precoMedio.texto}
              </li>
              <li>
                <Timer size={16} aria-hidden="true" />
                Permanência média {RESTAURANTE.permanencia}
              </li>
            </ul>
          </div>

          <TabelaHorario />

          <div className="cartao cartao-contacto">
            <h3 className="cartao-titulo">
              <Phone size={18} aria-hidden="true" />
              Falar connosco
            </h3>
            <a className="telefone" href={RESTAURANTE.telefoneTel}>
              {RESTAURANTE.telefone}
            </a>
            <a className="email" href={RESTAURANTE.emailHref}>
              {RESTAURANTE.email}
            </a>

            <div className="ligacoes">
              <a className="botao botao-brasa" href={RESTAURANTE.telefoneTel}>
                <Phone size={18} aria-hidden="true" />
                Ligar
              </a>
              <a className="botao botao-vidro" href={RESTAURANTE.whatsapp} target="_blank" rel="noreferrer noopener">
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp
              </a>
              <a className="botao botao-vidro" href={RESTAURANTE.whatsappReserva} target="_blank" rel="noreferrer noopener">
                <CalendarDays size={18} aria-hidden="true" />
                Reservar
              </a>
              <a className="botao botao-vidro" href={RESTAURANTE.whatsappTakeaway} target="_blank" rel="noreferrer noopener">
                <ShoppingBag size={18} aria-hidden="true" />
                Take-away
              </a>
              <a className="botao botao-vidro" href={LIGACOES.uberEats} target="_blank" rel="noreferrer noopener">
                <ShoppingBag size={18} aria-hidden="true" />
                Uber Eats
              </a>
              <a className="botao botao-vidro" href={LIGACOES.glovo} target="_blank" rel="noreferrer noopener">
                <ShoppingBag size={18} aria-hidden="true" />
                Glovo
              </a>
              {LIGACOES.bolt ? (
                <a className="botao botao-vidro" href={LIGACOES.bolt} target="_blank" rel="noreferrer noopener">
                  <Zap size={18} aria-hidden="true" />
                  Pedir pela Bolt
                </a>
              ) : null}
              <a className="botao botao-vidro" href={LIGACOES.facebook} target="_blank" rel="noreferrer noopener">
                <IconeFacebook />
                Facebook
              </a>
              <a className="botao botao-vidro" href={LIGACOES.instagram} target="_blank" rel="noreferrer noopener">
                <IconeInstagram />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
