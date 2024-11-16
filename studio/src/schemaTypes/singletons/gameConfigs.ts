import {defineField, defineType} from 'sanity'

export const gameConfigs = defineType({
  name: 'configuracoesJogo',
  title: 'Configurações dos Jogos',
  type: 'document',
  fields: [
    // Tipo de Jogo
    defineField({
      name: 'tipoJogo',
      title: 'Tipo de Jogo',
      description:
        'Selecione o tipo de jogo. Por favor crie apenas UM documento para cada tipo de jogo.',
      type: 'string',
      options: {
        list: [
          {title: 'Mega da Virada', value: 'megavirada'},
          {title: '+Milionária', value: 'maismilionaria'},
          {title: 'Mega-Sena', value: 'megasena'},
          {title: 'Lotofácil', value: 'lotofacil'},
          {title: 'Quina', value: 'quina'},
          {title: 'Lotomania', value: 'lotomania'},
          {title: 'Timemania', value: 'timemania'},
          {title: 'Dupla Sena', value: 'duplasena'},
          {title: 'Loteca', value: 'loteca'},
          {title: 'Dia de Sorte', value: 'diadesorte'},
          {title: 'Super Sete', value: 'supersete'},
        ],
      },

      validation: (rule) =>
        rule
          .required()
          .error(
            '⚠️ IMPORTANTE: Verifique se já não existe uma configuração para este jogo antes de prosseguir.',
          )
          .custom(async (value, context) => {
            const {document, getClient} = context

            if (!value) return true

            const client = getClient({apiVersion: '2024-01-01'})

            const query = `*[
        _type == "configuracoesJogo" && 
        tipoJogo == $tipoJogo && 
        !(_id in [$draftId, $publishedId])
      ][0]`

            const params = {
              tipoJogo: value,
              draftId: `drafts.${document._id}`,
              publishedId: document._id,
            }

            const existingDocs = await client.fetch(query, params)

            if (existingDocs) {
              return `❌ ERRO: Já existe uma configuração ativa para esse jogo! 
                \nPor favor, edite a configuração existente em vez de criar uma nova.
                \nCada tipo de jogo deve ter apenas UMA configuração.`
            }

            return true
          }),
    }),
    // Número Mínimo
    defineField({
      name: 'numeroMinimo',
      title: 'Número Mínimo',
      description: 'Número mínimo que pode ser escolhido no jogo. Normalmente será 1.',
      type: 'number',
      initialValue: 1,
      validation: (rule) => rule.required(),
    }),
    // Número Máximo
    defineField({
      name: 'numeroMaximo',
      title: 'Número Máximo',
      description:
        'Número máximo que pode ser escolhido no jogo. Como exemplo, 60 para a Mega-Sena.',
      type: 'number',
      initialValue: 60,
      validation: (rule) => rule.required(),
    }),
    // Quantidade de Números no Jogo
    defineField({
      name: 'quantidadeNumeros',
      title: 'Quantidade de Números no Jogo',
      description:
        'Quantidade mínima de números que o jogador deve escolher para participar do jogo. Como exemplo, 6 para a Mega-Sena.',
      type: 'number',
      initialValue: 6,
      validation: (rule) => rule.required(),
    }),
    // Quantidade Máxima de Números Por Jogo
    defineField({
      name: 'quantidadeMaximaDeNumerosPorJogo',
      title: 'Quantidade Máxima de Números Por Jogo',
      description:
        'Quantidade máxima de números que o jogador pode escolher para participar do jogo. Como exemplo, 20 para a Mega-Sena.',
      type: 'number',
      initialValue: 20,
      validation: (rule) => rule.required(),
    }),
    // Campos específicos para +Milionária
    defineField({
      name: 'numeroMinimoTrevo',
      title: 'Número Mínimo do Trevo',
      type: 'number',
      initialValue: 1,
      hidden: ({document}) => document?.tipoJogo !== 'maismilionaria',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.tipoJogo === 'maismilionaria') {
            //  O número mínimo do trevo deve ser menor que o numeroMaximoTrevo e maior que 1
            if ((value as number) < 1) {
              return 'O número mínimo do trevo deve ser maior que 1'
            }

            if ((value as number) >= context.document?.numeroMaximoTrevo) {
              return 'O número mínimo do trevo deve ser menor que o número máximo do trevo'
            }

            return true
          }
          return true
        }),
    }),
    defineField({
      name: 'numeroMaximoTrevo',
      title: 'Número Máximo do Trevo',
      type: 'number',
      initialValue: 6,
      hidden: ({document}) => document?.tipoJogo !== 'maismilionaria',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.tipoJogo === 'maismilionaria') {
            //  O número máximo do trevo deve ser maior que o numeroMinimoTrevo e menor que 7
            if ((value as number) >= 7) {
              return 'O número máximo do trevo deve ser menor que 7'
            }

            if ((value as number) <= context.document?.numeroMinimoTrevo) {
              return 'O número máximo do trevo deve ser maior que o número mínimo do trevo'
            }

            return true
          }
          return true
        }),
    }),
    // Campo específico para Timemania
    defineField({
      name: 'times',
      title: 'Lista de Times',
      type: 'array',
      of: [{type: 'string'}],
      hidden: ({document}) => document?.tipoJogo !== 'timemania',
    }),
    // Campos específicos para Super Sete
    defineField({
      name: 'quantidadeColunas',
      title: 'Quantidade de Colunas',
      type: 'number',
      hidden: ({document}) => document?.tipoJogo !== 'supersete',
    }),
    defineField({
      name: 'numerosColuna',
      title: 'Números por Coluna',
      type: 'number',
      hidden: ({document}) => document?.tipoJogo !== 'supersete',
    }),
  ],
  preview: {
    select: {
      tipoJogo: 'tipoJogo',
    },
    prepare(selection) {
      const jogos = {
        megavirada: 'Mega da Virada',
        maismilionaria: '+Milionária',
        megasena: 'Mega-Sena',
        lotofacil: 'Lotofácil',
        quina: 'Quina',
        lotomania: 'Lotomania',
        timemania: 'Timemania',
        duplasena: 'Dupla Sena',
        loteca: 'Loteca',
        diadesorte: 'Dia de Sorte',
        supersete: 'Super Sete',
      }

      return {
        title: jogos[selection.tipoJogo as keyof typeof jogos] || selection.tipoJogo,
      }
    },
  },
})
