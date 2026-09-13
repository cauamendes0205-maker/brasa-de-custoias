/**
 * Dados reais da Brasa de Custóias.
 * Nada aqui é inventado: cada bloco indica a sua fonte.
 */

export const RESTAURANTE = {
  nome: "Brasa de Custóias",
  tipo: "Churrasqueira",
  morada: {
    rua: "R. António Sérgio 776",
    codigoPostal: "4460-707",
    localidade: "Custóias",
    concelho: "Matosinhos",
    distrito: "Porto",
    pais: "PT",
  },
  moradaCompleta: "R. António Sérgio 776, 4460-707 Custóias, Matosinhos",
  telefone: "963 367 103",
  telefoneInternacional: "+351963367103",
  telefoneTel: "tel:+351963367103",
  email: "Brasadecustoias@gmail.com",
  emailHref: "mailto:Brasadecustoias@gmail.com",
  whatsapp: "https://wa.me/351963367103",
  precoMedio: { min: 15, max: 20, texto: "15 € – 20 € por pessoa" },
  permanencia: "entre 15 minutos e 2 horas",
} as const;

/* ------------------------------------------------------------------ *
 *  HORÁRIO
 *
 *  FONTE: ficha do Google Maps do estabelecimento, consultada em
 *  2026-09-09. O horário abaixo é o que o Google publica.
 *
 *  A hora de fecho NÃO foi confirmada pelo restaurante. Está isolada
 *  nestas duas constantes únicas, para poder ser corrigida num só
 *  sítio, e o site mostra sempre o aviso AVISO_HORARIO.
 * ------------------------------------------------------------------ */

/** Hora de fecho do serviço de almoço. Indicativa — confirmar por telefone. */
export const HORA_FECHO_ALMOCO = "15:00";

/** Hora de fecho do serviço de jantar. Indicativa — confirmar por telefone. */
export const HORA_FECHO_JANTAR = "22:00";

export const AVISO_HORARIO =
  "Horário indicado pelo Google. A hora de fecho é indicativa — confirme por telefone.";

export type Turno = { abre: string; fecha: string };
export type DiaHorario = { dia: string; curto: string; turnos: Turno[] };

const ALMOCO: Turno = { abre: "11:30", fecha: HORA_FECHO_ALMOCO };
const JANTAR: Turno = { abre: "18:30", fecha: HORA_FECHO_JANTAR };

/** Índice 0 = domingo … 6 = sábado, igual a Date#getDay(). */
export const HORARIO: DiaHorario[] = [
  { dia: "Domingo", curto: "Dom", turnos: [ALMOCO] },
  { dia: "Segunda-feira", curto: "Seg", turnos: [] },
  { dia: "Terça-feira", curto: "Ter", turnos: [ALMOCO, JANTAR] },
  { dia: "Quarta-feira", curto: "Qua", turnos: [ALMOCO, JANTAR] },
  { dia: "Quinta-feira", curto: "Qui", turnos: [ALMOCO, JANTAR] },
  { dia: "Sexta-feira", curto: "Sex", turnos: [ALMOCO, JANTAR] },
  { dia: "Sábado", curto: "Sáb", turnos: [ALMOCO, JANTAR] },
];

/* ------------------------------------------------------------------ *
 *  AVALIAÇÕES  (fonte: Google Maps e Uber Eats)
 * ------------------------------------------------------------------ */

export const AVALIACOES = {
  google: { nota: 4.4, total: 48 },
  uberEats: { nota: 4.0, total: 12 },
};

export const CRITICAS = [
  {
    autor: "Augusto A. P. Santos",
    fonte: "Google",
    nota: 5,
    texto:
      "Bom restaurante, comida excelente bem confeccionada. Ambiente acolhedor e com música ao vivo ao fim de semana.",
  },
  {
    autor: "Rui Melo",
    fonte: "Google",
    nota: 5,
    texto: "Pessoal simpático e muito atencioso. Comida muito saborosa.",
  },
];

/* ------------------------------------------------------------------ *
 *  LIGAÇÕES OFICIAIS
 * ------------------------------------------------------------------ */

export const LIGACOES = {
  facebook: "https://www.facebook.com/p/Brasa-de-Cust%C3%B3ias-61575367206045/",
  instagram:
    "https://www.instagram.com/explore/locations/554996867706833/brasa-de-custoias/",
  uberEats:
    "https://www.ubereats.com/pt/store/brasa-de-custoias-custoias/xtI2MVgdXkO4oAyBS5cRAw",
  glovo:
    "https://glovoapp.com/pt/pt/porto/stores/churrasqueira-de-custoias-opo",
};

const MORADA_URL = encodeURIComponent(
  "R. António Sérgio 776, 4460-707 Custóias, Matosinhos",
);

export const DIRECOES = {
  google: "https://www.google.com/maps/dir/?api=1&destination=" + MORADA_URL,
  waze: "https://waze.com/ul?q=" + MORADA_URL + "&navigate=yes",
  apple: "https://maps.apple.com/?daddr=" + MORADA_URL + "&dirflg=d",
};

/* ------------------------------------------------------------------ *
 *  EMENTA
 *
 *  FONTE: carta de encomendas online da casa. Nomes e preços são
 *  transcritos tal como lá aparecem; as categorias abaixo agrupam
 *  esses pratos para leitura no site.
 *
 *  `preco` é a dose ou o preço único; `precoMeia` a meia dose.
 * ------------------------------------------------------------------ */

export const AVISO_PRECOS =
  "Preços dos quadros da casa (sala e take-away). Podem ser atualizados — confirme no restaurante.";

export type Prato = {
  nome: string;
  descricao?: string;
  /** Preço da dose, ou preço único. */
  preco: number;
  /** Preço da meia dose, quando a casa a serve. */
  precoMeia?: number;
  nota?: string;
  foto?: string;
  fotoAlt?: string;
};

export type Categoria = {
  id: string;
  nome: string;
  legenda: string;
  pratos: Prato[];
};

export const EMENTA: Categoria[] = [
  {
    id: "pratos-dia",
    nome: "Pratos do dia",
    legenda: "Incluem sopa, pão, bebida e café. Não é permitido partilhar.",
    pratos: [
      { nome: "Bacalhau à Braga", preco: 12.0 },
      { nome: "Açorda de marisco", preco: 10.0 },
      {
        nome: "Costela mendinha de vitela estufada",
        preco: 10.0,
      },
      { nome: "Carne de porco à alentejana", preco: 10.0 },
    ],
  },
  {
    id: "grelhados",
    nome: "Grelhados",
    legenda: "Individuais. Acompanham com batata e salada.",
    pratos: [
      { nome: "Dourada grelhada", descricao: "Mais de 300 g.", preco: 12.0 },
      { nome: "Robalo na brasa", descricao: "Mais de 300 g.", preco: 12.0 },
      { nome: "Espetada de vitela na brasa", preco: 11.0 },
      { nome: "Bifinhos de vitela com cogumelos", preco: 11.0 },
      { nome: "Costelinhas na brasa", preco: 10.0 },
      { nome: "Entremeada na brasa", preco: 10.0 },
      { nome: "Alheira na brasa com ovo", preco: 10.0 },
      {
        nome: "Frango no churrasco",
        preco: 10.0,
        foto: "/fotos/frango-brasa.jpg",
        fotoAlt:
          "Frangos abertos a assar na grelha, sobre a brasa de carvão.",
      },
    ],
  },
  {
    id: "executivos",
    nome: "Pratos executivos",
    legenda: "Acompanham com batata e salada.",
    pratos: [
      {
        nome: "Postinha do chefe",
        descricao: "Com batata a murro e legumes.",
        preco: 14.0,
      },
      { nome: "Bife à patrão", preco: 14.0 },
      {
        nome: "Picanha à brasileira",
        descricao: "Com batata, arroz e feijão preto.",
        preco: 14.0,
      },
      { nome: "Lulas executivo", preco: 14.0 },
    ],
  },
  {
    id: "snacks",
    nome: "Snacks",
    legenda: "Para uma refeição rápida.",
    pratos: [
      {
        nome: "Prego no prato",
        preco: 12.5,
        foto: "/fotos/g2.jpg",
        fotoAlt:
          "Prego no prato: bife com ovo a cavalo, batata frita e arroz numa travessa branca.",
      },
      {
        nome: "Francesinha especial",
        preco: 12.0,
        foto: "/fotos/francesinha.jpg",
        fotoAlt:
          "Francesinha especial em travessa de barro, coberta de queijo derretido, molho alaranjado e ovo estrelado por cima.",
      },
      { nome: "Francesinha normal", preco: 10.0 },
      { nome: "Codornizes à minha maneira", preco: 3.0 },
    ],
  },
  {
    id: "saladas",
    nome: "Saladas",
    legenda: "Frescas, para acompanhar ou como refeição leve.",
    pratos: [
      { nome: "Salada César", preco: 10.5 },
      { nome: "Salada de atum", preco: 10.5 },
      { nome: "Ovos rotos", preco: 10.5 },
      { nome: "Salada mista", preco: 5.0 },
    ],
  },
  {
    id: "mistos",
    nome: "Mistos para partilhar",
    legenda: "Travessas para o meio da mesa. Dose e meia dose.",
    pratos: [
      {
        nome: "Misto familiar",
        descricao:
          "Frango, costelinhas, entremeada, alcatra, alheira e toscana, com batata e arroz.",
        preco: 59.5,
        precoMeia: 39.0,
      },
      {
        nome: "Churrasco à brasa",
        descricao:
          "Frango, costelinhas, picanha, lulas, camarão e toscana, com batata à rodela e salada.",
        preco: 49.5,
        precoMeia: 36.5,
        foto: "/fotos/g4.jpg",
        fotoAlt:
          "Travessa de grelhados com entrecosto, costeletas, gambas, lulas e chouriço.",
      },
      {
        nome: "Grelhado misto",
        descricao:
          "Frango, costelinhas, entremeada, alcatra e toscana, com batata e arroz.",
        preco: 37.5,
        precoMeia: 24.5,
        foto: "/fotos/g3.jpg",
        fotoAlt:
          "Travessa oval de grelhado misto com costeletas, chouriço e carnes fatiadas, servida com batata frita, arroz e pão.",
      },
    ],
  },
  {
    id: "carnes",
    nome: "Carnes na brasa",
    legenda: "Espetadas, postas e picanha. Dose e meia dose.",
    pratos: [
      {
        nome: "Picanha Angus (Uruguai)",
        descricao: "Com batata frita, arroz e feijão preto.",
        preco: 38.5,
        precoMeia: 22.0,
      },
      {
        nome: "Espetada terra e mar",
        descricao: "Nacos de alcatra e camarão, com batata à rodela e salada.",
        preco: 36.5,
        precoMeia: 24.5,
      },
      {
        nome: "Espetada à transmontana",
        descricao: "Com batata à rodela e salada.",
        preco: 34.5,
        precoMeia: 24.5,
      },
      {
        nome: "Posta de vitela na brasa",
        descricao: "Com batata a murro e legumes.",
        preco: 32.5,
        precoMeia: 19.5,
      },
    ],
  },
  {
    id: "peixe-forno",
    nome: "Peixe e forno",
    legenda: "Da frigideira e do tacho. Dose e meia dose.",
    pratos: [
      {
        nome: "Bacalhau à Braga",
        preco: 52.0,
        precoMeia: 26.0,
      },
      {
        nome: "Cabritinho assado no forno",
        descricao: "Assado no forno, em pedaços.",
        preco: 28.0,
        precoMeia: 18.0,
      },
      {
        nome: "Filetes de pescada",
        descricao: "Com salada russa.",
        preco: 23.0,
        precoMeia: 16.0,
      },
      {
        nome: "Vitela assada no forno",
        descricao: "Fatiada e regada com o molho do assado.",
        preco: 22.0,
        precoMeia: 14.0,
      },
      {
        nome: "Panados de frango",
        preco: 21.0,
        precoMeia: 14.0,
        foto: "/fotos/g9.jpg",
        fotoAlt:
          "Panados de frango dourados, com rodela de limão e salsa picada.",
      },
      {
        nome: "Tripas à moda do Porto",
        descricao:
          "Estufado tradicional de tripas com feijão branco, carnes e legumes, em molho apurado.",
        preco: 19.0,
        precoMeia: 13.0,
        foto: "/fotos/tripas.jpg",
        fotoAlt:
          "Tripas à moda do Porto: estufado de tripas com feijão branco, cenoura e carnes, em molho apurado.",
      },
    ],
  },
  {
    id: "sopas",
    nome: "Sopas",
    legenda: "Feitas na casa.",
    pratos: [
      { nome: "Canja de galinha", preco: 2.8 },
    ],
  },
];

export const ESPECIAIS = [
  {
    id: "quarta",
    titulo: "Menu do dia",
    texto: "De terça a domingo há pratos do dia da casa.",
  },
  {
    id: "musica",
    titulo: "Música ao vivo",
    texto: "Ao fim de semana há música ao vivo na sala.",
  },
  {
    id: "takeaway",
    titulo: "Take away e entrega",
    texto: "Leve para casa ou peça entrega ao domicílio.",
  },
];

/* ------------------------------------------------------------------ *
 *  FOTOGRAFIAS
 *
 *  Todas as imagens em /public/fotos são fotografias reais publicadas
 *  na ficha do estabelecimento no Google. Não há nenhuma imagem
 *  gerada nem nenhuma fotografia de banco de imagens.
 * ------------------------------------------------------------------ */

export type Foto = { src: string; alt: string; legenda: string };

export const GALERIA: Foto[] = [
  {
    src: "/fotos/frango-brasa.jpg",
    alt: "Vários frangos abertos a assar na grelha da churrasqueira, sobre a brasa de carvão em brasa viva.",
    legenda: "Frango na brasa, todos os dias",
  },
  {
    src: "/fotos/g3.jpg",
    alt: "Travessa oval de grelhado misto com costeletas, chouriço e carnes fatiadas, servida com batata frita, arroz e pão.",
    legenda: "Grelhado misto na mesa",
  },
  {
    src: "/fotos/francesinha.jpg",
    alt: "Francesinha em travessa de barro, coberta de queijo derretido e molho alaranjado, com ovo por cima.",
    legenda: "Francesinha especial",
  },
  {
    src: "/fotos/mar-brasa.jpg",
    alt: "Travessa de lulas e gambas grelhadas na brasa, com batata frita e salada mista ao lado.",
    legenda: "Do mar, na brasa",
  },
  {
    src: "/fotos/g1.jpg",
    alt: "Sala da Brasa de Custóias: mesa posta com toalha preta, copos de vinho e a montra com o logótipo da casa.",
    legenda: "A sala, com a montra e o logótipo da casa",
  },
  {
    src: "/fotos/tripas.jpg",
    alt: "Tigela de tripas à moda do Porto, com feijão branco, cenoura e carnes em molho apurado.",
    legenda: "Tripas à moda do Porto",
  },
  {
    src: "/fotos/g5.jpg",
    alt: "Tabuleiro de alumínio de take away cheio de carnes assadas e entrecosto.",
    legenda: "Tabuleiro pronto para take away",
  },
  {
    src: "/fotos/peixe.jpg",
    alt: "Peixe grelhado servido com batata a murro e salada de couve com cenoura.",
    legenda: "Peixe na brasa",
  },
];
