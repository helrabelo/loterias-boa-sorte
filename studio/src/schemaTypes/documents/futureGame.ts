import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const futureGame = defineType({
  name: 'jogoFuturo',
  title: 'Jogos Futuros',
  icon: TagIcon,
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
      name: 'estimativaPremio',
      title: 'Estimativa de Prêmio',
      type: 'number',
      validation: (rule) => rule.required(),
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
        title: `${jogos[selection.title as keyof typeof jogos]} - Concurso Futuro ${selection.concurso}`,
        subtitle: new Date(selection.data).toLocaleDateString('pt-BR'),
      }
    },
  },
})
