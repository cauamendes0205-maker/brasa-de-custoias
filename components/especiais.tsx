import { CalendarDays, Music4, ShoppingBag } from "lucide-react";
import { ESPECIAIS } from "@/lib/restaurante";

const ICONES = {
  quarta: CalendarDays,
  musica: Music4,
  takeaway: ShoppingBag,
} as const;

export function Especiais() {
  return (
    <section id="casa" className="seccao">
      <div className="seccao-interior">
        <h2 className="titulo-seccao">O que a casa tem</h2>
        <ul className="especiais">
          {ESPECIAIS.map((e) => {
            const Icone = ICONES[e.id as keyof typeof ICONES];
            return (
              <li key={e.id} className="cartao cartao-especial">
                <span className="especial-icone" aria-hidden="true">
                  <Icone size={26} strokeWidth={1.8} />
                </span>
                <h3 className="especial-titulo">{e.titulo}</h3>
                <p className="especial-texto">{e.texto}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
