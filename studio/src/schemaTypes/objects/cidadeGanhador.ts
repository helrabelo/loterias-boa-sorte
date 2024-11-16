import {defineField, defineType} from 'sanity'

export const cidadeGanhador = defineType({
  name: 'cidadeGanhador',
  title: 'Cidade Ganhador',
  type: 'object',
  fields: [
    defineField({
      name: 'cidade',
      type: 'string',
      title: 'Cidade',
    }),
    defineField({
      name: 'estado',
      type: 'string',
      title: 'Estado',
    }),
    defineField({
      name: 'quantidade',
      type: 'number',
      title: 'Quantidade de Ganhadores',
    }),
  ],
})