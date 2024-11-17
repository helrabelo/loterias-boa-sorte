import { defineQuery } from 'next-sanity';

// Queries para Loterias

// 1. CAMPOS COMUNS
// 1.1 Campos comuns para resultados
const resultadoFields = /* groq */ `
  _id,
  concurso,
  dataSorteio,
  tipoJogo,
  numerosSort,
  numerosTrevoSort,
  segundoSorteio,
  timeCoracao,
  mesSorte,
  jogosFutebol,
  superseteNumeros,
  premiacoes[]{
    categoria,
    acertos,
    ganhadores,
    premio,
    cidadesGanhadores[]{
      cidade,
      estado,
      quantidade
    }
  },
  acumulado,
  proxEstimativa
`;

// 1.2 Campos para jogos futuros
const jogoFuturoFields = /* groq */ `
  _id,
  concurso,
  dataSorteio,
  tipoJogo,
  estimativaPremio
`;

// 1.3 Campos comuns para settings
const settingsFields = /* groq */ `
  _id,
  title,
  description,
  // Mensagens
  messages {
    footer,
    copyright,
    whatsappDefault
  },
  // Contato
  contactInfo {
    phone,
    whatsapp,
    email
  },
  // Localização
  location {
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipCode,
    googleMapsUrl
  },
  // Redes Sociais
  socialMedia {
    instagram {
      url,
      handle
    },
    facebook {
      url,
      name
    },
    youtube {
      url,
      handle
    },
    twitter {
      url,
      handle
    }
  },
  // Horários
  businessHours[] {
    days,
    hours,
    closed
  },
  // SEO
  seo {
    metadataBase,
    ogImage {
      asset->,
      alt
    },
    favicon {
      asset->
    }
  }
`;

// 2. QUERIES
// 2.2 Query para buscar configurações de um jogo específico
export const gameConfigQuery = defineQuery(`
  *[_type == "configuracoesJogo" && tipoJogo == $tipoJogo][0]{
    _id,
    tipoJogo,
    numeroMinimo,
    numeroMaximo,
    quantidadeNumeros,
    valorAposta,
    numeroMinimoTrevo,
    numeroMaximoTrevo,
    times,
    quantidadeColunas,
    numerosColuna
  }
`);

// 2.2 Query para buscar todas as configurações de jogos
export const allGameConfigsQuery = defineQuery(`
  *[_type == "configuracoesJogo"] | order(tipoJogo asc) {
    _id,
    tipoJogo,
    numeroMinimo,
    numeroMaximo,
    quantidadeNumeros,
    valorAposta
  }
`);

// 2.2 Query para buscar o último resultado de um jogo específico
export const lastResultQuery = defineQuery(`
  *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo] | order(concurso desc) [0] {
    ${resultadoFields}
  }
`);

// 2.3 Query para buscar os últimos resultados de um jogo específico
export const lastResultsQuery = defineQuery(`
  *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo] | order(concurso desc) [0...$limit] {
    ${resultadoFields}
  }
`);

// 2.4 Query para buscar um resultado específico por concurso
export const resultByDrawQuery = defineQuery(`
  *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo && concurso == $concurso][0] {
    ${resultadoFields}
  }
`);

// 2.5 Query para buscar todos os resultados
export const allResultsQuery = defineQuery(`
  *[_type == "resultadoLoteria"] | order(dataSorteio desc) {
    ${resultadoFields}
  }
`);

// 2.6 Query para buscar jogos futuros de um tipo específico
export const futureGamesByTypeQuery = defineQuery(`
  *[_type == "jogoFuturo" && tipoJogo == $tipoJogo && dataSorteio > now()] | order(dataSorteio asc) {
    ${jogoFuturoFields}
  }
`);

// 2.7 Query para buscar todos os jogos futuros
export const allFutureGamesQuery = defineQuery(`
  *[_type == "jogoFuturo" && dataSorteio > now()] | order(dataSorteio asc) {
    ${jogoFuturoFields}
  }
`);

// 2.8 Query para estatísticas básicas de um jogo
export const gameStatsQuery = defineQuery(`
  {
    "ultimoConcurso": *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo] | order(concurso desc) [0].concurso,
    "totalAcumulado": *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo && defined(acumulado) && acumulado > 0] | order(concurso desc) [0].acumulado,
    "maiorPremio": *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo].premiacoes[].premio | order(@ desc) [0],
    "ultimoSorteio": *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo] | order(concurso desc) [0].dataSorteio,
    "proximoSorteio": *[_type == "jogoFuturo" && tipoJogo == $tipoJogo && dataSorteio > now()] | order(dataSorteio asc) [0].dataSorteio,
  }
`);

// 2.9 Query principal para settings
export const settingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    ${settingsFields}
  }
`);

// 2.10 Query para metadata (SEO)
export const seoSettingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    title,
    description,
    seo {
      metadataBase,
      ogImage {
        asset-> {
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      },
      favicon {
        asset-> {
          url
        }
      }
    }
  }
`);

// 2.11 Query para informações de contato
export const contactSettingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    title,
    contactInfo {
      phone,
      whatsapp,
      email
    },
    location {
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      googleMapsUrl
    },
    businessHours[] {
      days,
      hours,
      closed
    }
  }
`);

// 2.12 Query para redes sociais
export const socialSettingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    socialMedia {
      instagram,
      facebook,
      youtube,
      twitter
    }
  }
`);

// 2.13 Query para configurações básicas
export const basicSettingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    title,
    description,
    messages {
      footer,
      copyright,
      whatsappDefault
    }
  }
`);
