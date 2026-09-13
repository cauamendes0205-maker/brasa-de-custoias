import { Star, Quote } from "lucide-react";
import { AVALIACOES, CRITICAS, LIGACOES } from "@/lib/restaurante";

function Estrelas({ nota, rotulo }: { nota: number; rotulo: string }) {
  return (
    <span className="estrelas" role="img" aria-label={rotulo}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={16}
          aria-hidden="true"
          className={i < Math.round(nota) ? "estrela-cheia" : "estrela-vazia"}
        />
      ))}
    </span>
  );
}

export function Avaliacoes() {
  return (
    <section id="avaliacoes" className="seccao seccao-escura">
      <div className="seccao-interior">
        <h2 className="titulo-seccao">O que dizem os clientes</h2>

        <div className="notas">
          <div className="cartao cartao-nota">
            <span className="nota-valor">{AVALIACOES.google.nota.toFixed(1).replace(".", ",")}</span>
            <Estrelas
              nota={AVALIACOES.google.nota}
              rotulo={AVALIACOES.google.nota + " em 5 no Google"}
            />
            <span className="nota-fonte">Google · {AVALIACOES.google.total} críticas</span>
          </div>

          <div className="cartao cartao-nota">
            <span className="nota-valor">{AVALIACOES.uberEats.nota.toFixed(1).replace(".", ",")}</span>
            <Estrelas
              nota={AVALIACOES.uberEats.nota}
              rotulo={AVALIACOES.uberEats.nota + " em 5 no Uber Eats"}
            />
            <span className="nota-fonte">
              <a href={LIGACOES.uberEats} target="_blank" rel="noreferrer noopener">
                Uber Eats
              </a>{" "}
              · {AVALIACOES.uberEats.total} críticas
            </span>
          </div>
        </div>

        <ul className="criticas">
          {CRITICAS.map((c) => (
            <li key={c.autor} className="cartao cartao-critica">
              <Quote size={22} className="critica-aspas" aria-hidden="true" />
              <blockquote>
                <p>{c.texto}</p>
              </blockquote>
              <footer className="critica-autor">
                <Estrelas nota={c.nota} rotulo={c.nota + " em 5"} />
                <cite>
                  {c.autor} <span>· {c.fonte}</span>
                </cite>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
