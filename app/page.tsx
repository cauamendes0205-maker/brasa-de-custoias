import { Brasas } from "@/components/brasas";
import { Revelacoes } from "@/components/revelacoes";
import { Hero } from "@/components/hero";
import { Destaques } from "@/components/destaques";
import { Ementa } from "@/components/ementa";
import { Especiais } from "@/components/especiais";
import { Avaliacoes } from "@/components/avaliacoes";
import { Galeria } from "@/components/galeria";
import { Contactos } from "@/components/contactos";
import { Rodape } from "@/components/rodape";
import { BarraMobile } from "@/components/barra-mobile";

export default function Pagina() {
  return (
    <>
      <Brasas />
      <Revelacoes />
      <Hero />
      <main>
        <Destaques />
        <Ementa />
        <Especiais />
        <Avaliacoes />
        <Galeria />
        <Contactos />
      </main>
      <Rodape />
      <BarraMobile />
    </>
  );
}
