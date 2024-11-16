import { defineQuery } from 'next-sanity';

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const linkFields = /* groq */ `
  link {
      ...,
      _type == "link" => {
        "page": page->slug.current,
        "post": post->slug.current
        }
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        ${linkFields},
      }
    },
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkFields}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

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
    "maiorPremio": *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo].premiacoes[].premio | max(),
    "ultimoSorteio": *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo] | order(concurso desc) [0].dataSorteio,
    "proximoSorteio": *[_type == "jogoFuturo" && tipoJogo == $tipoJogo && dataSorteio > now()] | order(dataSorteio asc) [0].dataSorteio,
  }
`);
