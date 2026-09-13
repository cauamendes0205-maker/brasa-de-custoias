import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { RESTAURANTE, AVALIACOES, LIGACOES } from "@/lib/restaurante";
import { horarioSchemaOrg } from "@/lib/horario";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--fonte-titulo",
  display: "swap",
});

const corpo = Inter({
  subsets: ["latin"],
  variable: "--fonte-corpo",
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const DESCRICAO =
  "Churrasqueira em Custóias, Matosinhos. Frango no churrasco, grelhado misto para partilhar, francesinha e pratos de forno. Take away e entrega. 15 a 20 euros por pessoa.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Brasa de Custóias — churrasqueira em Custóias, Matosinhos",
    template: "%s · Brasa de Custóias",
  },
  description: DESCRICAO,
  keywords: [
    "churrasqueira Custóias",
    "restaurante Matosinhos",
    "frango no churrasco",
    "grelhado misto",
    "francesinha Porto",
    "take away Custóias",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: RESTAURANTE.nome,
    title: "Brasa de Custóias — churrasqueira em Custóias, Matosinhos",
    description: DESCRICAO,
    url: "/",
    images: [
      {
        url: "/fotos/g3.jpg",
        width: 1600,
        height: 739,
        alt: "Travessa de grelhado misto na mesa da Brasa de Custóias, com batata frita, arroz e pão.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brasa de Custóias — churrasqueira em Custóias",
    description: DESCRICAO,
    images: ["/fotos/g3.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0908",
  colorScheme: "dark",
};

function DadosEstruturados() {
  const dados = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANTE.nome,
    description: DESCRICAO,
    url: SITE,
    image: [SITE + "/fotos/g3.jpg", SITE + "/fotos/g1.jpg", SITE + "/fotos/g7.jpg"],
    telephone: RESTAURANTE.telefoneInternacional,
    servesCuisine: ["Portuguesa", "Churrasco"],
    priceRange: "15 € - 20 €",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: RESTAURANTE.morada.rua,
      postalCode: RESTAURANTE.morada.codigoPostal,
      addressLocality: RESTAURANTE.morada.localidade,
      addressRegion: RESTAURANTE.morada.distrito,
      addressCountry: RESTAURANTE.morada.pais,
    },
    openingHoursSpecification: horarioSchemaOrg(),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: AVALIACOES.google.nota,
      reviewCount: AVALIACOES.google.total,
      bestRating: 5,
      worstRating: 1,
    },
    hasMenu: LIGACOES.uberEats,
    sameAs: [LIGACOES.facebook, LIGACOES.instagram, LIGACOES.uberEats],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-PT" className={display.variable + " " + corpo.variable}>
      <body>
        <a className="saltar" href="#ementa">
          Saltar para a ementa
        </a>
        {children}
        <DadosEstruturados />
      </body>
    </html>
  );
}
