import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const loteryResult = defineType({
  name: 'resultadoLoteria',
  title: 'Resultados da Loteria',
  icon: CalendarIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'concurso',
      title: 'Número do Concurso',
      type: 'number',
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: 'dataSorteio',
      title: 'Data do Sorteio',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tipoJogo',
      title: 'Tipo de Jogo',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'numerosSort',
      title: 'Números Sorteados',
      type: 'array',
      of: [{type: 'number'}],
      validation: (rule) =>
        rule.custom((numbers, context) => {
          const type = context.document?.tipoJogo
          switch (type) {
            case 'megasena':
            case 'megavirada':
              return numbers?.length === 6 ? true : 'Mega-Sena requer 6 números'
            case 'maismilionaria':
              return numbers?.length === 6 ? true : '+Milionária requer 6 números'
            case 'lotofacil':
              return numbers?.length === 15 ? true : 'Lotofácil requer 15 números'
            case 'quina':
              return numbers?.length === 5 ? true : 'Quina requer 5 números'
            case 'lotomania':
              return numbers?.length === 20 ? true : 'Lotomania requer 20 números'
            case 'timemania':
              return numbers?.length === 7 ? true : 'Timemania requer 7 números'
            case 'duplasena':
              return numbers?.length === 6 ? true : 'Dupla Sena requer 6 números por sorteio'
            case 'diadesorte':
              return numbers?.length === 7 ? true : 'Dia de Sorte requer 7 números'
            case 'supersete':
              return numbers?.length === 7 ? true : 'Super Sete requer 7 números'
            default:
              return true
          }
        }),
    }),
    defineField({
      name: 'numerosTrevoSort',
      title: 'Números do Trevo Sorteados',
      type: 'array',
      of: [{type: 'number'}],
      hidden: ({document}) => document?.tipoJogo !== 'maismilionaria',
      validation: (rule) =>
        rule.custom((numbers, context) => {
          if (context.document?.tipoJogo === 'maismilionaria') {
            return numbers?.length === 2 ? true : '+Milionária requer 2 números do trevo'
          }
          return true
        }),
    }),
    defineField({
      name: 'segundoSorteio',
      title: 'Segundo Sorteio',
      type: 'array',
      of: [{type: 'number'}],
      hidden: ({document}) => document?.tipoJogo !== 'duplasena',
      validation: (rule) =>
        rule.custom((numbers, context) => {
          if (context.document?.tipoJogo === 'duplasena') {
            return numbers?.length === 6 ? true : 'Dupla Sena requer 6 números no segundo sorteio'
          }
          return true
        }),
    }),
    defineField({
      name: 'timeCoracao',
      title: 'Time do Coração',
      type: 'string',
      hidden: ({document}) => document?.tipoJogo !== 'timemania',
    }),
    defineField({
      name: 'mesSorte',
      title: 'Mês da Sorte',
      type: 'string',
      options: {
        list: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
      },
      hidden: ({document}) => document?.tipoJogo !== 'diadesorte',
    }),
    defineField({
      name: 'jogosFutebol',
      title: 'Jogos de Futebol',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'time1', type: 'string', title: 'Time 1'},
            {name: 'time2', type: 'string', title: 'Time 2'},
            {
              name: 'resultado',
              type: 'string',
              title: 'Resultado',
              options: {list: ['Coluna 1', 'Coluna do Meio', 'Coluna 2']},
            },
          ],
        },
      ],
      hidden: ({document}) => document?.tipoJogo !== 'loteca',
      validation: (rule) =>
        rule.custom((jogos, context) => {
          if (context.document?.tipoJogo === 'loteca') {
            return jogos?.length === 14 ? true : 'Loteca requer 14 jogos'
          }
          return true
        }),
    }),
    defineField({
      name: 'superseteNumeros',
      title: 'Números por Coluna',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'coluna', type: 'number', title: 'Coluna'},
            {name: 'numero', type: 'number', title: 'Número'},
          ],
        },
      ],
      hidden: ({document}) => document?.tipoJogo !== 'supersete',
      validation: (rule) =>
        rule.custom((colunas, context) => {
          if (context.document?.tipoJogo === 'supersete') {
            return colunas?.length === 7 ? true : 'Super Sete requer 7 colunas'
          }
          return true
        }),
    }),
    defineField({
      name: 'premiacoes',
      title: 'Premiações',
      type: 'array',
      of: [{type: 'premiacao'}],
    }),
    defineField({
      name: 'acumulado',
      title: 'Valor Acumulado',
      type: 'number',
    }),
    defineField({
      name: 'proxEstimativa',
      title: 'Estimativa Próximo Concurso',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'tipoJogo',
      concurso: 'concurso',
      data: 'dataSorteio',
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
        title: `${jogos[selection.title as keyof typeof jogos]} - Concurso ${selection.concurso}`,
        subtitle: new Date(selection.data).toLocaleDateString('pt-BR'),
      }
    },
  },
})
