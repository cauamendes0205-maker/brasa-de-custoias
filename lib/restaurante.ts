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
  // WhatsApp com mensagem pré-preenchida (reserva e take-away).
  whatsappReserva:
    "https://wa.me/351963367103?text=" +
    encodeURIComponent(
      "Olá! Gostaria de fazer uma reserva no Brasa de Custóias. Data: ___  Hora: ___  Número de pessoas: ___",
    ),
  whatsappTakeaway:
    "https://wa.me/351963367103?text=" +
    encodeURIComponent(
      "Olá! Gostaria de fazer um pedido de take-away no Brasa de Custóias.",
    ),
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
  // BOLT FOOD: link oficial da loja na Bolt Food (idioma pt).
  bolt: "https://food.bolt.eu/pt-PT/437-porto/p/165076-brasa-de-custoias/",
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
  "Preços do cardápio oficial da casa, com IVA incluído. Podem ser atualizados — confirme no restaurante.";

/** Um preço da linha, com rótulo opcional (dose, família, ±pax, ½, ¼). */
export type Preco = { valor: number; rotulo?: string };

export type Prato = {
  nome: string;
  descricao?: string;
  precos: Preco[];
  nota?: string;
  /** Realce discreto (usado nas promoções). */
  destaque?: boolean;
};

export type Categoria = {
  id: string;
  nome: string;
  legenda: string;
  pratos: Prato[];
};

export const EMENTA: Categoria[] = [
  {
    id: "promocoes",
    nome: "Promoções",
    legenda: "Combinações com guarnição já incluída.",
    pratos: [
      {
        nome: "Frango",
        descricao: "1 frango, ½ batata, ¼ de arroz e 1 toscana.",
        precos: [{ valor: 13.6 }],
        destaque: true,
      },
      {
        nome: "Costelinhas",
        descricao: "1 dose de costelinhas, 1 batata, 1 arroz e 1 toscana.",
        precos: [{ valor: 26.5 }],
        destaque: true,
      },
      {
        nome: "Meia dose de costelinhas",
        descricao: "½ costelinhas, ½ batata, ½ arroz e 1 toscana.",
        precos: [{ valor: 16.9 }],
        destaque: true,
      },
    ],
  },
  {
    id: "entradas",
    nome: "Entradas",
    legenda: "Para começar.",
    pratos: [
      { nome: "Cesto de pão", precos: [{ valor: 1.4 }] },
      { nome: "Manteiga, queijo Querú e paté", precos: [{ valor: 1.0 }] },
      { nome: "Azeitonas", precos: [{ valor: 1.5 }] },
      { nome: "Alheira na brasa", precos: [{ valor: 3.8 }] },
      { nome: "Prato de salgadinhos", precos: [{ valor: 4.5 }] },
      { nome: "Toscana", precos: [{ valor: 1.6 }] },
      { nome: "Prato de presunto", precos: [{ valor: 5.0 }] },
      { nome: "Tábua de presunto e salpicão", precos: [{ valor: 7.0 }] },
      {
        nome: "Tábua de presunto, salpicão e queijo da Serra",
        precos: [{ valor: 9.5 }],
      },
    ],
  },
  {
    id: "na-brasa",
    nome: "Pratos na brasa",
    legenda: "Direto do carvão.",
    pratos: [
      {
        nome: "Robalo na brasa",
        descricao: "±300 g, com batata a murro e legumes.",
        precos: [{ valor: 12.0 }],
      },
      {
        nome: "Dourada na brasa",
        descricao: "±300 g, com batata a murro e legumes.",
        precos: [{ valor: 12.0 }],
      },
      { nome: "Bifinhos de vitela com cogumelos", precos: [{ valor: 11.0 }] },
      {
        nome: "Costeletas de cachaço",
        descricao: "Com batata a murro e legumes.",
        precos: [{ valor: 10.0 }],
      },
      { nome: "Espetadas de vitela", precos: [{ valor: 11.0 }] },
      { nome: "Entremeada na brasa", precos: [{ valor: 10.0 }] },
      { nome: "Frango no churrasco", precos: [{ valor: 10.0 }] },
      { nome: "Costelinhas de porco na brasa", precos: [{ valor: 10.0 }] },
      { nome: "Alheira com ovo", precos: [{ valor: 10.0 }] },
    ],
  },
  {
    id: "especialidades",
    nome: "Especialidades da casa",
    legenda: "Travessas para partilhar. Preços por dose e por dose maior.",
    pratos: [
      {
        nome: "Ovos rotos à brasa",
        descricao: "Batata frita, 3 ovos, presunto e alho-francês frito.",
        precos: [{ valor: 12.5 }],
      },
      {
        nome: "Churrasco à Brasa",
        descricao:
          "Frango, costelinha, picanha, toscana, lulas e gambas, com batata frita, rodela e salada.",
        precos: [
          { valor: 38.5, rotulo: "±2 pax" },
          { valor: 51.5, rotulo: "±4 pax" },
        ],
      },
      {
        nome: "Misto familiar",
        descricao:
          "Frango, costelinha, picanha, bifinhos de alcatra, alheira, entrecosto e toscana, com batata frita e arroz.",
        precos: [
          { valor: 41.0, rotulo: "±3 pax" },
          { valor: 62.5, rotulo: "±5 pax" },
        ],
      },
      {
        nome: "Grelhado misto",
        descricao:
          "Frango, costelinha, entrecosto, bifinhos de alcatra e toscana, com batata frita e arroz.",
        precos: [
          { valor: 26.5, rotulo: "±2 pax" },
          { valor: 38.5, rotulo: "±4 pax" },
        ],
      },
      {
        nome: "Lulas grelhadas",
        descricao: "Com batata a murro e legumes.",
        precos: [{ valor: 13.0 }, { valor: 26.0 }],
      },
      {
        nome: "Naco de carne laminado",
        descricao: "Com batata palha e salada.",
        precos: [{ valor: 14.5 }, { valor: 29.0 }],
      },
    ],
  },
  {
    id: "executivo",
    nome: "Prato executivo",
    legenda:
      "Ao almoço, de terça a sábado. Inclui pão, sopa, ½ caneca de vinho (ou outra bebida) e café. Uma dose por pessoa, não partilhável. Não disponível a feriados e domingos.",
    pratos: [
      {
        nome: "Lulas na brasa",
        descricao: "Com batata a murro e legumes.",
        precos: [{ valor: 14.0 }],
      },
      {
        nome: "Postinha de vitela à chefe",
        descricao: "Com batata a murro e legumes.",
        precos: [{ valor: 14.0 }],
      },
      { nome: "Bife à patrão", precos: [{ valor: 14.0 }] },
      { nome: "Picanha à brasileira", precos: [{ valor: 14.0 }] },
      {
        nome: "Polvo à lagareiro",
        descricao: "Com batata a murro e legumes.",
        precos: [{ valor: 19.5 }],
      },
    ],
  },
  {
    id: "carnes",
    nome: "Carnes",
    legenda: "Dose individual e dose família.",
    pratos: [
      {
        nome: "Posta de vitela na brasa",
        descricao: "Com batata a murro e legumes.",
        precos: [{ valor: 19.5 }, { valor: 32.5 }],
      },
      {
        nome: "Picanha Angus (Argentina)",
        descricao: "Com batata frita, arroz e feijão preto.",
        precos: [{ valor: 22.0 }, { valor: 38.5 }],
      },
      { nome: "Bife à Brasa", precos: [{ valor: 16.0 }, { valor: 28.5 }] },
      {
        nome: "Espetada à transmontana",
        descricao: "Com batata frita, rodela e salada.",
        precos: [{ valor: 24.5 }, { valor: 34.5 }],
      },
      {
        nome: "Espetada terra e mar",
        descricao: "Nacos de alcatra com camarão.",
        precos: [{ valor: 24.5 }, { valor: 36.5 }],
      },
      {
        nome: "Frango churrasco simples",
        precos: [{ valor: 6.8 }, { valor: 13.5 }],
      },
      { nome: "Costelinhas simples", precos: [{ valor: 11.0 }, { valor: 21.0 }] },
    ],
  },
  {
    id: "peixe",
    nome: "Peixe",
    legenda: "Dose individual e dose família.",
    pratos: [
      {
        nome: "Bacalhau à lagareiro",
        precos: [{ valor: 26.0 }, { valor: 52.0 }],
      },
      { nome: "Bacalhau à Braga", precos: [{ valor: 26.0 }, { valor: 52.0 }] },
      {
        nome: "Espetada mista",
        descricao: "Lulas e gambas.",
        precos: [{ valor: 23.5 }, { valor: 38.5 }],
      },
      {
        nome: "Espetada de gambas na brasa",
        precos: [{ valor: 19.0 }, { valor: 38.0 }],
      },
    ],
  },
  {
    id: "snacks",
    nome: "Snacks",
    legenda: "Para uma refeição rápida.",
    pratos: [
      { nome: "Ovos rotos à brasa", precos: [{ valor: 9.5 }] },
      { nome: "Prego no prato", precos: [{ valor: 12.5 }] },
      {
        nome: "Francesinha especial",
        descricao: "Com ovo e batata.",
        precos: [{ valor: 12.0 }],
      },
      { nome: "Francesinha normal", precos: [{ valor: 10.0 }] },
    ],
  },
  {
    id: "guarnicoes",
    nome: "Guarnições e extras",
    legenda: "Doses, meias e quartos.",
    pratos: [
      {
        nome: "Arroz",
        precos: [
          { valor: 4.95, rotulo: "dose" },
          { valor: 3.9, rotulo: "½" },
          { valor: 2.6, rotulo: "¼" },
        ],
      },
      {
        nome: "Batata frita palito",
        precos: [
          { valor: 4.95, rotulo: "dose" },
          { valor: 3.9, rotulo: "½" },
          { valor: 2.6, rotulo: "¼" },
        ],
      },
      {
        nome: "Batata à rodela",
        precos: [
          { valor: 4.95, rotulo: "dose" },
          { valor: 3.9, rotulo: "½" },
          { valor: 2.6, rotulo: "¼" },
        ],
      },
      {
        nome: "Batata a murro",
        precos: [
          { valor: 4.95, rotulo: "dose" },
          { valor: 4.3, rotulo: "½" },
          { valor: 3.1, rotulo: "¼" },
        ],
      },
      {
        nome: "Legumes salteados",
        precos: [
          { valor: 5.5, rotulo: "dose" },
          { valor: 4.5, rotulo: "½" },
          { valor: 3.2, rotulo: "¼" },
        ],
      },
      {
        nome: "Feijão preto",
        precos: [
          { valor: 4.8, rotulo: "dose" },
          { valor: 3.8, rotulo: "½" },
        ],
      },
      {
        nome: "Salada mista",
        precos: [
          { valor: 4.5, rotulo: "dose" },
          { valor: 3.5, rotulo: "½" },
        ],
      },
      {
        nome: "Salada com pimento",
        precos: [
          { valor: 4.9, rotulo: "dose" },
          { valor: 3.8, rotulo: "½" },
        ],
      },
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
