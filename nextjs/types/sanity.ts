/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type CallToAction = {
  _type: "callToAction";
  heading?: string;
  text?: string;
  buttonText?: string;
  link?: Link;
};

export type Link = {
  _type: "link";
  linkType?: "href" | "page" | "post";
  href?: string;
  page?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "page";
  };
  post?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "post";
  };
  openInNewTab?: boolean;
};

export type InfoSection = {
  _type: "infoSection";
  heading?: string;
  subheading?: string;
  content?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      linkType?: "href" | "page" | "post";
      href?: string;
      page?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "page";
      };
      post?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "post";
      };
      openInNewTab?: boolean;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
};

export type BlockContent = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
  listItem?: "bullet" | "number";
  markDefs?: Array<{
    linkType?: "href" | "page" | "post";
    href?: string;
    page?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "page";
    };
    post?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "post";
    };
    openInNewTab?: boolean;
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
}>;

export type CidadeGanhador = {
  _type: "cidadeGanhador";
  cidade?: string;
  estado?: string;
  quantidade?: number;
};

export type Premiacao = {
  _type: "premiacao";
  categoria?: string;
  acertos?: number;
  ganhadores?: number;
  premio?: number;
  cidadesGanhadores?: Array<{
    _key: string;
  } & CidadeGanhador>;
};

export type Page = {
  _id: string;
  _type: "page";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  slug: Slug;
  heading: string;
  subheading?: string;
  pageBuilder?: Array<{
    _key: string;
  } & CallToAction | {
    _key: string;
  } & InfoSection>;
};

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  slug: Slug;
  content?: BlockContent;
  excerpt?: string;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  date?: string;
  author?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "person";
  };
};

export type Person = {
  _id: string;
  _type: "person";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  firstName: string;
  lastName: string;
  picture: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
};

export type Slug = {
  _type: "slug";
  current: string;
  source?: string;
};

export type JogoFuturo = {
  _id: string;
  _type: "jogoFuturo";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  concurso: number;
  dataSorteio: string;
  tipoJogo: "megavirada" | "maismilionaria" | "megasena" | "lotofacil" | "quina" | "lotomania" | "timemania" | "duplasena" | "loteca" | "diadesorte" | "supersete";
  estimativaPremio: number;
};

export type ResultadoLoteria = {
  _id: string;
  _type: "resultadoLoteria";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  concurso: number;
  dataSorteio: string;
  tipoJogo: "megavirada" | "maismilionaria" | "megasena" | "lotofacil" | "quina" | "lotomania" | "timemania" | "duplasena" | "loteca" | "diadesorte" | "supersete";
  numerosSort?: Array<number>;
  numerosTrevoSort?: Array<number>;
  segundoSorteio?: Array<number>;
  timeCoracao?: string;
  mesSorte?: "Janeiro" | "Fevereiro" | "Mar\xE7o" | "Abril" | "Maio" | "Junho" | "Julho" | "Agosto" | "Setembro" | "Outubro" | "Novembro" | "Dezembro";
  jogosFutebol?: Array<{
    time1?: string;
    time2?: string;
    resultado?: "Coluna 1" | "Coluna do Meio" | "Coluna 2";
    _key: string;
  }>;
  superseteNumeros?: Array<{
    coluna?: number;
    numero?: number;
    _key: string;
  }>;
  premiacoes?: Array<{
    _key: string;
  } & Premiacao>;
  acumulado?: number;
  proxEstimativa?: number;
};

export type Settings = {
  _id: string;
  _type: "settings";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  ogImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    metadataBase?: string;
    _type: "image";
  };
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type ConfiguracoesJogo = {
  _id: string;
  _type: "configuracoesJogo";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  tipoJogo: "megavirada" | "maismilionaria" | "megasena" | "lotofacil" | "quina" | "lotomania" | "timemania" | "duplasena" | "loteca" | "diadesorte" | "supersete";
  numeroMinimo: number;
  numeroMaximo: number;
  quantidadeNumeros: number;
  quantidadeMaximaDeNumerosPorJogo: number;
  numeroMinimoTrevo?: number;
  numeroMaximoTrevo?: number;
  times?: Array<string>;
  quantidadeColunas?: number;
  numerosColuna?: number;
};

export type SanityAssistInstructionTask = {
  _type: "sanity.assist.instructionTask";
  path?: string;
  instructionKey?: string;
  started?: string;
  updated?: string;
  info?: string;
};

export type SanityAssistTaskStatus = {
  _type: "sanity.assist.task.status";
  tasks?: Array<{
    _key: string;
  } & SanityAssistInstructionTask>;
};

export type SanityAssistSchemaTypeAnnotations = {
  _type: "sanity.assist.schemaType.annotations";
  title?: string;
  fields?: Array<{
    _key: string;
  } & SanityAssistSchemaTypeField>;
};

export type SanityAssistOutputType = {
  _type: "sanity.assist.output.type";
  type?: string;
};

export type SanityAssistOutputField = {
  _type: "sanity.assist.output.field";
  path?: string;
};

export type SanityAssistInstructionContext = {
  _type: "sanity.assist.instruction.context";
  reference: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "assist.instruction.context";
  };
};

export type AssistInstructionContext = {
  _id: string;
  _type: "assist.instruction.context";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  context?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  }>;
};

export type SanityAssistInstructionUserInput = {
  _type: "sanity.assist.instruction.userInput";
  message: string;
  description?: string;
};

export type SanityAssistInstructionPrompt = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  } | {
    _key: string;
  } & SanityAssistInstructionFieldRef | {
    _key: string;
  } & SanityAssistInstructionContext | {
    _key: string;
  } & SanityAssistInstructionUserInput>;
  style?: "normal";
  listItem?: never;
  markDefs?: null;
  level?: number;
  _type: "block";
  _key: string;
}>;

export type SanityAssistInstructionFieldRef = {
  _type: "sanity.assist.instruction.fieldRef";
  path?: string;
};

export type SanityAssistInstruction = {
  _type: "sanity.assist.instruction";
  prompt?: SanityAssistInstructionPrompt;
  icon?: string;
  title?: string;
  userId?: string;
  createdById?: string;
  output?: Array<{
    _key: string;
  } & SanityAssistOutputField | {
    _key: string;
  } & SanityAssistOutputType>;
};

export type SanityAssistSchemaTypeField = {
  _type: "sanity.assist.schemaType.field";
  path?: string;
  instructions?: Array<{
    _key: string;
  } & SanityAssistInstruction>;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | CallToAction | Link | InfoSection | BlockContent | CidadeGanhador | Premiacao | Page | Post | Person | Slug | JogoFuturo | ResultadoLoteria | Settings | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | ConfiguracoesJogo | SanityAssistInstructionTask | SanityAssistTaskStatus | SanityAssistSchemaTypeAnnotations | SanityAssistOutputType | SanityAssistOutputField | SanityAssistInstructionContext | AssistInstructionContext | SanityAssistInstructionUserInput | SanityAssistInstructionPrompt | SanityAssistInstructionFieldRef | SanityAssistInstruction | SanityAssistSchemaTypeField;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./lib/sanity/queries.ts
// Variable: gameConfigQuery
// Query: *[_type == "configuracoesJogo" && tipoJogo == $tipoJogo][0]{    _id,    tipoJogo,    numeroMinimo,    numeroMaximo,    quantidadeNumeros,    valorAposta,    numeroMinimoTrevo,    numeroMaximoTrevo,    times,    quantidadeColunas,    numerosColuna  }
export type GameConfigQueryResult = {
  _id: string;
  tipoJogo: "diadesorte" | "duplasena" | "loteca" | "lotofacil" | "lotomania" | "maismilionaria" | "megasena" | "megavirada" | "quina" | "supersete" | "timemania";
  numeroMinimo: number;
  numeroMaximo: number;
  quantidadeNumeros: number;
  valorAposta: null;
  numeroMinimoTrevo: number | null;
  numeroMaximoTrevo: number | null;
  times: Array<string> | null;
  quantidadeColunas: number | null;
  numerosColuna: number | null;
} | null;
// Variable: allGameConfigsQuery
// Query: *[_type == "configuracoesJogo"] | order(tipoJogo asc) {    _id,    tipoJogo,    numeroMinimo,    numeroMaximo,    quantidadeNumeros,    valorAposta  }
export type AllGameConfigsQueryResult = Array<{
  _id: string;
  tipoJogo: "diadesorte" | "duplasena" | "loteca" | "lotofacil" | "lotomania" | "maismilionaria" | "megasena" | "megavirada" | "quina" | "supersete" | "timemania";
  numeroMinimo: number;
  numeroMaximo: number;
  quantidadeNumeros: number;
  valorAposta: null;
}>;
// Variable: lastResultQuery
// Query: *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo] | order(concurso desc) [0] {      _id,  concurso,  dataSorteio,  tipoJogo,  numerosSort,  numerosTrevoSort,  segundoSorteio,  timeCoracao,  mesSorte,  jogosFutebol,  superseteNumeros,  premiacoes[]{    categoria,    acertos,    ganhadores,    premio,    cidadesGanhadores[]{      cidade,      estado,      quantidade    }  },  acumulado,  proxEstimativa  }
export type LastResultQueryResult = {
  _id: string;
  concurso: number;
  dataSorteio: string;
  tipoJogo: "diadesorte" | "duplasena" | "loteca" | "lotofacil" | "lotomania" | "maismilionaria" | "megasena" | "megavirada" | "quina" | "supersete" | "timemania";
  numerosSort: Array<number> | null;
  numerosTrevoSort: Array<number> | null;
  segundoSorteio: Array<number> | null;
  timeCoracao: string | null;
  mesSorte: "Abril" | "Agosto" | "Dezembro" | "Fevereiro" | "Janeiro" | "Julho" | "Junho" | "Maio" | "Mar\xE7o" | "Novembro" | "Outubro" | "Setembro" | null;
  jogosFutebol: Array<{
    time1?: string;
    time2?: string;
    resultado?: "Coluna 1" | "Coluna 2" | "Coluna do Meio";
    _key: string;
  }> | null;
  superseteNumeros: Array<{
    coluna?: number;
    numero?: number;
    _key: string;
  }> | null;
  premiacoes: Array<{
    categoria: string | null;
    acertos: number | null;
    ganhadores: number | null;
    premio: number | null;
    cidadesGanhadores: Array<{
      cidade: string | null;
      estado: string | null;
      quantidade: number | null;
    }> | null;
  }> | null;
  acumulado: number | null;
  proxEstimativa: number | null;
} | null;
// Variable: lastResultsQuery
// Query: *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo] | order(concurso desc) [0...$limit] {      _id,  concurso,  dataSorteio,  tipoJogo,  numerosSort,  numerosTrevoSort,  segundoSorteio,  timeCoracao,  mesSorte,  jogosFutebol,  superseteNumeros,  premiacoes[]{    categoria,    acertos,    ganhadores,    premio,    cidadesGanhadores[]{      cidade,      estado,      quantidade    }  },  acumulado,  proxEstimativa  }
export type LastResultsQueryResult = Array<{
  _id: string;
  concurso: number;
  dataSorteio: string;
  tipoJogo: "diadesorte" | "duplasena" | "loteca" | "lotofacil" | "lotomania" | "maismilionaria" | "megasena" | "megavirada" | "quina" | "supersete" | "timemania";
  numerosSort: Array<number> | null;
  numerosTrevoSort: Array<number> | null;
  segundoSorteio: Array<number> | null;
  timeCoracao: string | null;
  mesSorte: "Abril" | "Agosto" | "Dezembro" | "Fevereiro" | "Janeiro" | "Julho" | "Junho" | "Maio" | "Mar\xE7o" | "Novembro" | "Outubro" | "Setembro" | null;
  jogosFutebol: Array<{
    time1?: string;
    time2?: string;
    resultado?: "Coluna 1" | "Coluna 2" | "Coluna do Meio";
    _key: string;
  }> | null;
  superseteNumeros: Array<{
    coluna?: number;
    numero?: number;
    _key: string;
  }> | null;
  premiacoes: Array<{
    categoria: string | null;
    acertos: number | null;
    ganhadores: number | null;
    premio: number | null;
    cidadesGanhadores: Array<{
      cidade: string | null;
      estado: string | null;
      quantidade: number | null;
    }> | null;
  }> | null;
  acumulado: number | null;
  proxEstimativa: number | null;
}>;
// Variable: resultByDrawQuery
// Query: *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo && concurso == $concurso][0] {      _id,  concurso,  dataSorteio,  tipoJogo,  numerosSort,  numerosTrevoSort,  segundoSorteio,  timeCoracao,  mesSorte,  jogosFutebol,  superseteNumeros,  premiacoes[]{    categoria,    acertos,    ganhadores,    premio,    cidadesGanhadores[]{      cidade,      estado,      quantidade    }  },  acumulado,  proxEstimativa  }
export type ResultByDrawQueryResult = {
  _id: string;
  concurso: number;
  dataSorteio: string;
  tipoJogo: "diadesorte" | "duplasena" | "loteca" | "lotofacil" | "lotomania" | "maismilionaria" | "megasena" | "megavirada" | "quina" | "supersete" | "timemania";
  numerosSort: Array<number> | null;
  numerosTrevoSort: Array<number> | null;
  segundoSorteio: Array<number> | null;
  timeCoracao: string | null;
  mesSorte: "Abril" | "Agosto" | "Dezembro" | "Fevereiro" | "Janeiro" | "Julho" | "Junho" | "Maio" | "Mar\xE7o" | "Novembro" | "Outubro" | "Setembro" | null;
  jogosFutebol: Array<{
    time1?: string;
    time2?: string;
    resultado?: "Coluna 1" | "Coluna 2" | "Coluna do Meio";
    _key: string;
  }> | null;
  superseteNumeros: Array<{
    coluna?: number;
    numero?: number;
    _key: string;
  }> | null;
  premiacoes: Array<{
    categoria: string | null;
    acertos: number | null;
    ganhadores: number | null;
    premio: number | null;
    cidadesGanhadores: Array<{
      cidade: string | null;
      estado: string | null;
      quantidade: number | null;
    }> | null;
  }> | null;
  acumulado: number | null;
  proxEstimativa: number | null;
} | null;
// Variable: allResultsQuery
// Query: *[_type == "resultadoLoteria"] | order(dataSorteio desc) {      _id,  concurso,  dataSorteio,  tipoJogo,  numerosSort,  numerosTrevoSort,  segundoSorteio,  timeCoracao,  mesSorte,  jogosFutebol,  superseteNumeros,  premiacoes[]{    categoria,    acertos,    ganhadores,    premio,    cidadesGanhadores[]{      cidade,      estado,      quantidade    }  },  acumulado,  proxEstimativa  }
export type AllResultsQueryResult = Array<{
  _id: string;
  concurso: number;
  dataSorteio: string;
  tipoJogo: "diadesorte" | "duplasena" | "loteca" | "lotofacil" | "lotomania" | "maismilionaria" | "megasena" | "megavirada" | "quina" | "supersete" | "timemania";
  numerosSort: Array<number> | null;
  numerosTrevoSort: Array<number> | null;
  segundoSorteio: Array<number> | null;
  timeCoracao: string | null;
  mesSorte: "Abril" | "Agosto" | "Dezembro" | "Fevereiro" | "Janeiro" | "Julho" | "Junho" | "Maio" | "Mar\xE7o" | "Novembro" | "Outubro" | "Setembro" | null;
  jogosFutebol: Array<{
    time1?: string;
    time2?: string;
    resultado?: "Coluna 1" | "Coluna 2" | "Coluna do Meio";
    _key: string;
  }> | null;
  superseteNumeros: Array<{
    coluna?: number;
    numero?: number;
    _key: string;
  }> | null;
  premiacoes: Array<{
    categoria: string | null;
    acertos: number | null;
    ganhadores: number | null;
    premio: number | null;
    cidadesGanhadores: Array<{
      cidade: string | null;
      estado: string | null;
      quantidade: number | null;
    }> | null;
  }> | null;
  acumulado: number | null;
  proxEstimativa: number | null;
}>;
// Variable: futureGamesByTypeQuery
// Query: *[_type == "jogoFuturo" && tipoJogo == $tipoJogo && dataSorteio > now()] | order(dataSorteio asc) {      _id,  concurso,  dataSorteio,  tipoJogo,  estimativaPremio  }
export type FutureGamesByTypeQueryResult = Array<{
  _id: string;
  concurso: number;
  dataSorteio: string;
  tipoJogo: "diadesorte" | "duplasena" | "loteca" | "lotofacil" | "lotomania" | "maismilionaria" | "megasena" | "megavirada" | "quina" | "supersete" | "timemania";
  estimativaPremio: number;
}>;
// Variable: allFutureGamesQuery
// Query: *[_type == "jogoFuturo" && dataSorteio > now()] | order(dataSorteio asc) {      _id,  concurso,  dataSorteio,  tipoJogo,  estimativaPremio  }
export type AllFutureGamesQueryResult = Array<{
  _id: string;
  concurso: number;
  dataSorteio: string;
  tipoJogo: "diadesorte" | "duplasena" | "loteca" | "lotofacil" | "lotomania" | "maismilionaria" | "megasena" | "megavirada" | "quina" | "supersete" | "timemania";
  estimativaPremio: number;
}>;
// Variable: gameStatsQuery
// Query: {    "ultimoConcurso": *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo] | order(concurso desc) [0].concurso,    "totalAcumulado": *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo && defined(acumulado) && acumulado > 0] | order(concurso desc) [0].acumulado,    "maiorPremio": *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo].premiacoes[].premio | order(@ desc) [0],    "ultimoSorteio": *[_type == "resultadoLoteria" && tipoJogo == $tipoJogo] | order(concurso desc) [0].dataSorteio,    "proximoSorteio": *[_type == "jogoFuturo" && tipoJogo == $tipoJogo && dataSorteio > now()] | order(dataSorteio asc) [0].dataSorteio,  }
export type GameStatsQueryResult = {
  ultimoConcurso: number | null;
  totalAcumulado: number | null;
  maiorPremio: number | null;
  ultimoSorteio: string | null;
  proximoSorteio: string | null;
};
// Variable: settingsQuery
// Query: *[_type == "settings"][0] {      _id,  title,  description,  // Mensagens  messages {    footer,    copyright,    whatsappDefault  },  // Contato  contactInfo {    phone,    whatsapp,    email  },  // Localização  location {    street,    number,    complement,    neighborhood,    city,    state,    zipCode,    googleMapsUrl  },  // Redes Sociais  socialMedia {    instagram {      url,      handle    },    facebook {      url,      name    },    youtube {      url,      handle    },    twitter {      url,      handle    }  },  // Horários  businessHours[] {    days,    hours,    closed  },  // SEO  seo {    metadataBase,    ogImage {      asset->,      alt    },    favicon {      asset->    }  }  }
export type SettingsQueryResult = {
  _id: string;
  title: string;
  description: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  messages: null;
  contactInfo: null;
  location: null;
  socialMedia: null;
  businessHours: null;
  seo: null;
} | null;
// Variable: seoSettingsQuery
// Query: *[_type == "settings"][0] {    title,    description,    seo {      metadataBase,      ogImage {        asset-> {          url,          metadata {            dimensions {              width,              height            }          }        },        alt      },      favicon {        asset-> {          url        }      }    }  }
export type SeoSettingsQueryResult = {
  title: string;
  description: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  seo: null;
} | null;
// Variable: contactSettingsQuery
// Query: *[_type == "settings"][0] {    title,    contactInfo {      phone,      whatsapp,      email    },    location {      street,      number,      complement,      neighborhood,      city,      state,      zipCode,      googleMapsUrl    },    businessHours[] {      days,      hours,      closed    }  }
export type ContactSettingsQueryResult = {
  title: string;
  contactInfo: null;
  location: null;
  businessHours: null;
} | null;
// Variable: socialSettingsQuery
// Query: *[_type == "settings"][0] {    socialMedia {      instagram,      facebook,      youtube,      twitter    }  }
export type SocialSettingsQueryResult = {
  socialMedia: null;
} | null;
// Variable: basicSettingsQuery
// Query: *[_type == "settings"][0] {    title,    description,    messages {      footer,      copyright,      whatsappDefault    }  }
export type BasicSettingsQueryResult = {
  title: string;
  description: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  messages: null;
} | null;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "\n  *[_type == \"configuracoesJogo\" && tipoJogo == $tipoJogo][0]{\n    _id,\n    tipoJogo,\n    numeroMinimo,\n    numeroMaximo,\n    quantidadeNumeros,\n    valorAposta,\n    numeroMinimoTrevo,\n    numeroMaximoTrevo,\n    times,\n    quantidadeColunas,\n    numerosColuna\n  }\n": GameConfigQueryResult;
    "\n  *[_type == \"configuracoesJogo\"] | order(tipoJogo asc) {\n    _id,\n    tipoJogo,\n    numeroMinimo,\n    numeroMaximo,\n    quantidadeNumeros,\n    valorAposta\n  }\n": AllGameConfigsQueryResult;
    "\n  *[_type == \"resultadoLoteria\" && tipoJogo == $tipoJogo] | order(concurso desc) [0] {\n    \n  _id,\n  concurso,\n  dataSorteio,\n  tipoJogo,\n  numerosSort,\n  numerosTrevoSort,\n  segundoSorteio,\n  timeCoracao,\n  mesSorte,\n  jogosFutebol,\n  superseteNumeros,\n  premiacoes[]{\n    categoria,\n    acertos,\n    ganhadores,\n    premio,\n    cidadesGanhadores[]{\n      cidade,\n      estado,\n      quantidade\n    }\n  },\n  acumulado,\n  proxEstimativa\n\n  }\n": LastResultQueryResult;
    "\n  *[_type == \"resultadoLoteria\" && tipoJogo == $tipoJogo] | order(concurso desc) [0...$limit] {\n    \n  _id,\n  concurso,\n  dataSorteio,\n  tipoJogo,\n  numerosSort,\n  numerosTrevoSort,\n  segundoSorteio,\n  timeCoracao,\n  mesSorte,\n  jogosFutebol,\n  superseteNumeros,\n  premiacoes[]{\n    categoria,\n    acertos,\n    ganhadores,\n    premio,\n    cidadesGanhadores[]{\n      cidade,\n      estado,\n      quantidade\n    }\n  },\n  acumulado,\n  proxEstimativa\n\n  }\n": LastResultsQueryResult;
    "\n  *[_type == \"resultadoLoteria\" && tipoJogo == $tipoJogo && concurso == $concurso][0] {\n    \n  _id,\n  concurso,\n  dataSorteio,\n  tipoJogo,\n  numerosSort,\n  numerosTrevoSort,\n  segundoSorteio,\n  timeCoracao,\n  mesSorte,\n  jogosFutebol,\n  superseteNumeros,\n  premiacoes[]{\n    categoria,\n    acertos,\n    ganhadores,\n    premio,\n    cidadesGanhadores[]{\n      cidade,\n      estado,\n      quantidade\n    }\n  },\n  acumulado,\n  proxEstimativa\n\n  }\n": ResultByDrawQueryResult;
    "\n  *[_type == \"resultadoLoteria\"] | order(dataSorteio desc) {\n    \n  _id,\n  concurso,\n  dataSorteio,\n  tipoJogo,\n  numerosSort,\n  numerosTrevoSort,\n  segundoSorteio,\n  timeCoracao,\n  mesSorte,\n  jogosFutebol,\n  superseteNumeros,\n  premiacoes[]{\n    categoria,\n    acertos,\n    ganhadores,\n    premio,\n    cidadesGanhadores[]{\n      cidade,\n      estado,\n      quantidade\n    }\n  },\n  acumulado,\n  proxEstimativa\n\n  }\n": AllResultsQueryResult;
    "\n  *[_type == \"jogoFuturo\" && tipoJogo == $tipoJogo && dataSorteio > now()] | order(dataSorteio asc) {\n    \n  _id,\n  concurso,\n  dataSorteio,\n  tipoJogo,\n  estimativaPremio\n\n  }\n": FutureGamesByTypeQueryResult;
    "\n  *[_type == \"jogoFuturo\" && dataSorteio > now()] | order(dataSorteio asc) {\n    \n  _id,\n  concurso,\n  dataSorteio,\n  tipoJogo,\n  estimativaPremio\n\n  }\n": AllFutureGamesQueryResult;
    "\n  {\n    \"ultimoConcurso\": *[_type == \"resultadoLoteria\" && tipoJogo == $tipoJogo] | order(concurso desc) [0].concurso,\n    \"totalAcumulado\": *[_type == \"resultadoLoteria\" && tipoJogo == $tipoJogo && defined(acumulado) && acumulado > 0] | order(concurso desc) [0].acumulado,\n    \"maiorPremio\": *[_type == \"resultadoLoteria\" && tipoJogo == $tipoJogo].premiacoes[].premio | order(@ desc) [0],\n    \"ultimoSorteio\": *[_type == \"resultadoLoteria\" && tipoJogo == $tipoJogo] | order(concurso desc) [0].dataSorteio,\n    \"proximoSorteio\": *[_type == \"jogoFuturo\" && tipoJogo == $tipoJogo && dataSorteio > now()] | order(dataSorteio asc) [0].dataSorteio,\n  }\n": GameStatsQueryResult;
    "\n  *[_type == \"settings\"][0] {\n    \n  _id,\n  title,\n  description,\n  // Mensagens\n  messages {\n    footer,\n    copyright,\n    whatsappDefault\n  },\n  // Contato\n  contactInfo {\n    phone,\n    whatsapp,\n    email\n  },\n  // Localiza\xE7\xE3o\n  location {\n    street,\n    number,\n    complement,\n    neighborhood,\n    city,\n    state,\n    zipCode,\n    googleMapsUrl\n  },\n  // Redes Sociais\n  socialMedia {\n    instagram {\n      url,\n      handle\n    },\n    facebook {\n      url,\n      name\n    },\n    youtube {\n      url,\n      handle\n    },\n    twitter {\n      url,\n      handle\n    }\n  },\n  // Hor\xE1rios\n  businessHours[] {\n    days,\n    hours,\n    closed\n  },\n  // SEO\n  seo {\n    metadataBase,\n    ogImage {\n      asset->,\n      alt\n    },\n    favicon {\n      asset->\n    }\n  }\n\n  }\n": SettingsQueryResult;
    "\n  *[_type == \"settings\"][0] {\n    title,\n    description,\n    seo {\n      metadataBase,\n      ogImage {\n        asset-> {\n          url,\n          metadata {\n            dimensions {\n              width,\n              height\n            }\n          }\n        },\n        alt\n      },\n      favicon {\n        asset-> {\n          url\n        }\n      }\n    }\n  }\n": SeoSettingsQueryResult;
    "\n  *[_type == \"settings\"][0] {\n    title,\n    contactInfo {\n      phone,\n      whatsapp,\n      email\n    },\n    location {\n      street,\n      number,\n      complement,\n      neighborhood,\n      city,\n      state,\n      zipCode,\n      googleMapsUrl\n    },\n    businessHours[] {\n      days,\n      hours,\n      closed\n    }\n  }\n": ContactSettingsQueryResult;
    "\n  *[_type == \"settings\"][0] {\n    socialMedia {\n      instagram,\n      facebook,\n      youtube,\n      twitter\n    }\n  }\n": SocialSettingsQueryResult;
    "\n  *[_type == \"settings\"][0] {\n    title,\n    description,\n    messages {\n      footer,\n      copyright,\n      whatsappDefault\n    }\n  }\n": BasicSettingsQueryResult;
  }
}
