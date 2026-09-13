import { Logo } from "@/components/logo";
import { RESTAURANTE } from "@/lib/restaurante";

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape-interior">
        <Logo className="rodape-logo" />
        <p className="rodape-morada">
          {RESTAURANTE.moradaCompleta} · {RESTAURANTE.telefone}
        </p>
      </div>
    </footer>
  );
}
