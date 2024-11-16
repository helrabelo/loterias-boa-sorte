import {CogIcon, NumberIcon, ComposeIcon} from '@sanity/icons'

export const structure = (S) =>
  S.list()
    .title('Website Content')
    .items([
      // Jogos Futuros
      S.listItem()
        .title('Jogos Futuros')
        .icon(ComposeIcon)
        .schemaType('jogoFuturo')
        .child(S.documentTypeList('jogoFuturo')),

      // Resultados da Loteria
      S.listItem()
        .title('Resultados')
        .icon(NumberIcon)
        .schemaType('resultadoLoteria')
        .child(S.documentTypeList('resultadoLoteria')),
      // Outros tipos de documento
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'settings',
            'assist.instruction.context',
            'resultadoLoteria',
            'jogoFuturo',
            'configuracoesJogo',
          ].includes(listItem.getId()),
      ),
      // Configurações dos Jogos
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
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
