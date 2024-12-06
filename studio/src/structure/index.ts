import { description } from './../../../nextjs/lib/sanity/demo';
import {CogIcon, NumberIcon, ComposeIcon} from '@sanity/icons'

export const structure = (S) =>
  S.list()
    .title('Website Content')
    .items([
      // Jogos e Bolões
      S.listItem()
        .title('Jogos e Bolões')
        .icon(ComposeIcon)
        .schemaType('jogoFuturo')
        .child(S.documentTypeList('jogoFuturo')),

      // Configurações dos Jogos
      S.listItem()
        .title('Configurações dos Jogos')
        .icon(CogIcon)
        .schemaType('configuracoesJogo')
        .child(
          S.documentTypeList('configuracoesJogo')
            .title('Configurações dos Jogos')
            // Opcional: ordenar por tipo de jogo
            .defaultOrdering([{field: 'tipoJogo', direction: 'asc'}]),
        ),
      // Configurações do site
      S.listItem()
        .title('Configurações do Site')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
