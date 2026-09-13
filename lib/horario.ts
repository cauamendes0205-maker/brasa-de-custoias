import { HORARIO, type Turno } from "@/lib/restaurante";

const FUSO = "Europe/Lisbon";

/**
 * Momento atual no fuso do restaurante, independentemente do fuso do
 * visitante. Devolve o dia da semana (0 = domingo) e os minutos desde
 * a meia-noite.
 */
export function agoraEmLisboa(base: Date = new Date()) {
  const partes = new Intl.DateTimeFormat("en-GB", {
    timeZone: FUSO,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(base);

  const valor = (tipo: Intl.DateTimeFormatPartTypes) =>
    partes.find((p) => p.type === tipo)?.value ?? "";

  const dias = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const diaSemana = dias.indexOf(valor("weekday"));
  // A meia-noite pode ser formatada como "24"; normalizamos para 0.
  const horas = Number(valor("hour")) % 24;
  const minutos = Number(valor("minute"));

  return { diaSemana, minutosDoDia: horas * 60 + minutos };
}

function paraMinutos(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export type EstadoAbertura = {
  aberto: boolean;
  /** Frase curta para o distintivo, ex.: "Aberto até às 15:00". */
  resumo: string;
  /** Frase de apoio, ex.: "Reabre às 18:30". */
  detalhe: string;
  /** true quando falta uma hora ou menos para fechar. */
  aFechar: boolean;
  /** Índice do dia de hoje (0 = domingo), para marcar a tabela. */
  hoje: number;
  turnoAtual: Turno | null;
};

/** Procura a próxima abertura nos sete dias seguintes. */
function proximaAbertura(diaSemana: number, minutosDoDia: number) {
  for (let salto = 0; salto < 8; salto++) {
    const dia = (diaSemana + salto) % 7;
    for (const turno of HORARIO[dia].turnos) {
      const abre = paraMinutos(turno.abre);
      if (salto === 0 && abre <= minutosDoDia) continue;

      const texto =
        salto === 0
          ? "Abre às " + turno.abre
          : salto === 1
            ? "Abre amanhã às " + turno.abre
            : "Abre " + HORARIO[dia].dia.toLowerCase() + " às " + turno.abre;

      return { dia, turno, texto, salto };
    }
  }
  return null;
}

export function calcularEstado(base: Date = new Date()): EstadoAbertura {
  const { diaSemana, minutosDoDia } = agoraEmLisboa(base);

  for (const turno of HORARIO[diaSemana].turnos) {
    const abre = paraMinutos(turno.abre);
    const fecha = paraMinutos(turno.fecha);

    if (minutosDoDia >= abre && minutosDoDia < fecha) {
      const faltam = fecha - minutosDoDia;
      const proximo = proximaAbertura(diaSemana, minutosDoDia);
      return {
        aberto: true,
        resumo: "Aberto até às " + turno.fecha,
        detalhe:
          faltam <= 60
            ? "Fecha daqui a " + faltam + " min"
            : proximo && proximo.salto === 0
              ? "Depois reabre às " + proximo.turno.abre
              : "",
        aFechar: faltam <= 60,
        hoje: diaSemana,
        turnoAtual: turno,
      };
    }
  }

  const proximo = proximaAbertura(diaSemana, minutosDoDia);
  return {
    aberto: false,
    resumo: "Fechado agora",
    detalhe: proximo ? proximo.texto : "",
    aFechar: false,
    hoje: diaSemana,
    turnoAtual: null,
  };
}

/** Horário no formato do schema.org, para os dados estruturados. */
export function horarioSchemaOrg() {
  const codigos = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return HORARIO.flatMap((dia, indice) =>
    dia.turnos.map((turno) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: "https://schema.org/" + codigos[indice],
      opens: turno.abre,
      closes: turno.fecha,
    })),
  );
}
