import {defineField, defineType} from 'sanity'


export const premiacao = defineType({
  name: 'premiacao',
  title: 'Premiação',
  type: 'object',
  fields: [
    defineField({
      name: 'categoria',
      type: 'string',
      title: 'Categoria',
    }),
    defineField({
      name: 'acertos',
      type: 'number',
      title: 'Quantidade de Acertos',
    }),
    defineField({
      name: 'ganhadores',
      type: 'number',
      title: 'Número de Ganhadores',
    }),
    defineField({
      name: 'premio',
      type: 'number',
      title: 'Valor do Prêmio',
    }),
    defineField({
      name: 'cidadesGanhadores',
      type: 'array',
      title: 'Cidades dos Ganhadores',
      of: [{type: 'cidadeGanhador'}],
    }),
  ],
})