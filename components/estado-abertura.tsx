"use client";

import { useEffect, useState } from "react";
import { Clock, Info } from "lucide-react";
import { calcularEstado, type EstadoAbertura } from "@/lib/horario";
import { HORARIO, AVISO_HORARIO } from "@/lib/restaurante";

/**
 * Indicador aberto/fechado ao vivo. O calculo corre sempre no fuso
 * Europe/Lisbon, por isso o resultado e o mesmo esteja o visitante
 * onde estiver. Comeca a null para o servidor e o cliente renderizarem
 * o mesmo HTML.
 */
export function useEstadoAbertura() {
  const [estado, setEstado] = useState<EstadoAbertura | null>(null);

  useEffect(() => {
    const atualizar = () => setEstado(calcularEstado());
    atualizar();
    const relogio = setInterval(atualizar, 30_000);
    return () => clearInterval(relogio);
  }, []);

  return estado;
}

export function DistintivoAbertura({ compacto = false }: { compacto?: boolean }) {
  const estado = useEstadoAbertura();

  if (!estado) {
    return (
      <span className="distintivo distintivo-neutro" aria-hidden="true">
        <span className="pisca" />A verificar horário…
      </span>
    );
  }

  const classe = estado.aberto
    ? estado.aFechar
      ? "distintivo-aviso"
      : "distintivo-aberto"
    : "distintivo-fechado";

  return (
    <span className={"distintivo " + classe} role="status">
      <span className="pisca" aria-hidden="true" />
      <strong>{estado.resumo}</strong>
      {!compacto && estado.detalhe ? (
        <span className="distintivo-detalhe">· {estado.detalhe}</span>
      ) : null}
    </span>
  );
}

export function TabelaHorario() {
  const estado = useEstadoAbertura();

  return (
    <div className="cartao cartao-horario">
      <h3 className="cartao-titulo">
        <Clock size={18} aria-hidden="true" />
        Horário
      </h3>

      <ul className="horario-lista">
        {HORARIO.map((dia, indice) => {
          const eHoje = estado?.hoje === indice;
          return (
            <li
              key={dia.dia}
              className={"horario-linha" + (eHoje ? " horario-hoje" : "")}
            >
              <span className="horario-dia">
                {dia.dia}
                {eHoje ? <span className="horario-marca">hoje</span> : null}
              </span>
              <span className="horario-turnos">
                {dia.turnos.length === 0 ? (
                  <span className="horario-fechado">Fechado</span>
                ) : (
                  dia.turnos.map((t) => (
                    <span key={t.abre} className="horario-turno">
                      {t.abre}–{t.fecha}
                    </span>
                  ))
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="aviso">
        <Info size={15} aria-hidden="true" />
        <span>{AVISO_HORARIO}</span>
      </p>
    </div>
  );
}
