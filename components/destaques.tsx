"use client";

import { CoverFlowCarousel, type CarouselItem } from "@/components/ui/3-d-coverflow-carousel";

/**
 * Cada carta usa uma fotografia real da casa e diz exatamente o que
 * esta na fotografia. So leva preco quando o prato tem preco publico.
 */
const PRATOS: CarouselItem[] = [
  {
    tag: "#mistos",
    titleLine1: "GRELHADO MISTO",
    titleLine2: "PARA PARTILHAR",
    desc: "Frango, costelinhas, entremeada, alcatra e toscana, com batata e arroz.",
    price: "26,50 € · 38,50 €",
    img: "/fotos/g3.jpg",
    imgAlt:
      "Travessa oval de grelhado misto com costeletas, chouriço e carnes fatiadas, servida com batata frita, arroz e pão.",
    ctaText: "Ver na ementa",
  },
  {
    tag: "#snacks",
    titleLine1: "FRANCESINHA",
    titleLine2: "ESPECIAL",
    desc: "Com carnes e queijo, coberta com molho e ovo a cavalo.",
    price: "12,00 €",
    img: "/fotos/francesinha.jpg",
    imgAlt:
      "Francesinha especial em travessa de barro, coberta de queijo derretido, molho alaranjado e ovo estrelado por cima.",
    ctaText: "Ver na ementa",
  },
  {
    tag: "#mistos",
    titleLine1: "CHURRASCO",
    titleLine2: "À BRASA",
    desc: "Frango, costelinhas, picanha, lulas, camarão e toscana, com batata à rodela e salada.",
    price: "38,50 € · 51,50 €",
    img: "/fotos/g4.jpg",
    imgAlt:
      "Travessa de grelhados com entrecosto, costeletas, gambas, lulas e chouriço.",
    ctaText: "Ver na ementa",
  },
  {
    tag: "#grelhados",
    titleLine1: "FRANGO",
    titleLine2: "NO CHURRASCO",
    desc: "Aberto na grelha, sobre a brasa de carvão.",
    price: "10,00 €",
    img: "/fotos/frango-brasa.jpg",
    imgAlt:
      "Frangos abertos a assar na grelha, sobre a brasa de carvão.",
    ctaText: "Ver na ementa",
  },
  {
    tag: "#snacks",
    titleLine1: "PREGO",
    titleLine2: "NO PRATO",
    desc: "Bife com ovo a cavalo, batata frita e arroz.",
    price: "12,50 €",
    img: "/fotos/g2.jpg",
    imgAlt:
      "Prego no prato: bife com ovo a cavalo, batata frita e arroz numa travessa branca.",
    ctaText: "Ver na ementa",
  },
];

export function Destaques() {
  const irParaEmenta = () => {
    const alvo = document.getElementById("ementa");
    if (!alvo) return;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    alvo.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "start" });
  };

  return (
    <section id="pratos" className="seccao seccao-escura">
      <CoverFlowCarousel
        items={PRATOS}
        sectionLabel="O QUE SAI DA BRASA"
        onCtaClick={irParaEmenta}
      />
    </section>
  );
}
