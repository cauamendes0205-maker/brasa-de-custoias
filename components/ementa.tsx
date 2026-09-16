"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { EMENTA, AVISO_PRECOS, type Prato } from "@/lib/restaurante";

const euros = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

function LinhaPrato({ prato }: { prato: Prato }) {
  return (
    <li className={"prato" + (prato.destaque ? " prato-destaque" : "")}>
      <span className="prato-corpo">
        <span className="prato-cabeca">
          <span className="prato-nome">
            {prato.nome}
            {prato.destaque ? <span className="prato-promo">Promoção</span> : null}
          </span>
          <span className="prato-pontilhado" aria-hidden="true" />
          <span className="prato-precos">
            {prato.precos.map((pr, i) => (
              <span key={i} className="prato-preco">
                {euros.format(pr.valor)}
                {pr.rotulo ? (
                  <span className="prato-preco-rotulo"> {pr.rotulo}</span>
                ) : null}
              </span>
            ))}
          </span>
        </span>
        {prato.descricao ? <span className="prato-descricao">{prato.descricao}</span> : null}
        {prato.nota ? <span className="prato-nota">{prato.nota}</span> : null}
      </span>
    </li>
  );
}

export function Ementa() {
  const [ativa, setAtiva] = useState(EMENTA[0].id);
  const categoria = EMENTA.find((c) => c.id === ativa) ?? EMENTA[0];

  const aoPremirTecla = (e: React.KeyboardEvent, indice: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const passo = e.key === "ArrowRight" ? 1 : -1;
    const seguinte = (indice + passo + EMENTA.length) % EMENTA.length;
    setAtiva(EMENTA[seguinte].id);
    document.getElementById("sep-" + EMENTA[seguinte].id)?.focus();
  };

  return (
    <section id="ementa" className="seccao">
      <div className="seccao-interior">
        <h2 className="titulo-seccao">A ementa</h2>
        <p className="subtitulo-seccao">
          Cardápio da casa, com IVA incluído.
        </p>

        <div className="separadores" role="tablist" aria-label="Categorias da ementa">
          {EMENTA.map((c, indice) => (
            <button
              key={c.id}
              id={"sep-" + c.id}
              role="tab"
              type="button"
              aria-selected={c.id === ativa}
              aria-controls={"painel-" + c.id}
              tabIndex={c.id === ativa ? 0 : -1}
              onClick={() => setAtiva(c.id)}
              onKeyDown={(e) => aoPremirTecla(e, indice)}
              className={"separador" + (c.id === ativa ? " separador-ativo" : "")}
            >
              {c.nome}
            </button>
          ))}
        </div>

        <div
          id={"painel-" + categoria.id}
          role="tabpanel"
          aria-labelledby={"sep-" + categoria.id}
          tabIndex={0}
          className="cartao cartao-ementa"
        >
          <p className="ementa-legenda">{categoria.legenda}</p>
          <ul className="pratos pratos-so-texto">
            {categoria.pratos.map((p) => (
              <LinhaPrato key={p.nome} prato={p} />
            ))}
          </ul>
        </div>

        <p className="aviso aviso-largo">
          <Info size={16} aria-hidden="true" />
          <span>{AVISO_PRECOS}</span>
        </p>
      </div>
    </section>
  );
}
