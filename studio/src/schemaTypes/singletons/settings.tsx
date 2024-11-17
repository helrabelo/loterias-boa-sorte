import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Configurações do Site',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'general',
      title: 'Geral',
      default: true,
    },
    {
      name: 'contact',
      title: 'Contato e Localização',
    },
    {
      name: 'social',
      title: 'Redes Sociais',
    },
    {
      name: 'business',
      title: 'Funcionamento',
    },
    {
      name: 'seo',
      title: 'SEO e Metadados',
    },
  ],
  fieldsets: [
    {
      name: 'metadata',
      title: 'Informações Básicas',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'messages',
      title: 'Mensagens do Site',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'contact',
      title: 'Informações de Contato',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'address',
      title: 'Endereço',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'social',
      title: 'Links das Redes Sociais',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'hours',
      title: 'Horário de Funcionamento',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'seoImages',
      title: 'Imagens e SEO',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // Seção: Informações Básicas
    defineField({
      name: 'title',
      title: 'Nome do Site',
      type: 'string',
      group: 'general',
      fieldset: 'metadata',
      validation: (rule) => rule.required().min(2).max(60),
      description: 'Nome principal do seu site/negócio',
    }),
    defineField({
      name: 'description',
      title: 'Descrição do Site',
      type: 'text',
      group: 'general',
      fieldset: 'metadata',
      validation: (rule) => rule.required().min(20).max(160),
      description: 'Uma breve descrição do seu negócio (importante para SEO)',
    }),

    // Seção: Mensagens
    defineField({
      name: 'messages',
      title: 'Mensagens do Site',
      type: 'object',
      group: 'general',
      fieldset: 'messages',
      fields: [
        defineField({
          name: 'footer',
          title: 'Mensagem do Rodapé',
          type: 'text',
          rows: 2,
          description: 'Texto que aparece no rodapé do site',
        }),
        defineField({
          name: 'copyright',
          title: 'Texto de Copyright',
          type: 'string',
          description: 'Ex: © 2024 Sua Empresa. Todos os direitos reservados.',
        }),
        defineField({
          name: 'whatsappDefault',
          title: 'Mensagem Padrão WhatsApp',
          type: 'text',
          rows: 3,
          description: 'Mensagem padrão quando alguém clica para enviar WhatsApp',
        }),
      ],
    }),

    // Seção: Contato
    defineField({
      name: 'contactInfo',
      title: 'Informações de Contato',
      type: 'object',
      group: 'contact',
      fieldset: 'contact',
      fields: [
        defineField({
          name: 'phone',
          title: 'Telefone Principal',
          type: 'string',
          description: 'Formato: (99) 99999-9999',
          validation: (rule) => 
            rule.regex(/^\(\d{2}\) \d{5}-\d{4}$/)
                .error('Formato inválido. Use: (99) 99999-9999'),
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string',
          description: 'Formato: 5599999999999 (com código do país)',
          validation: (rule) => 
            rule.regex(/^55\d{11}$/)
                .error('Formato inválido. Use: 5599999999999'),
        }),
        defineField({
          name: 'email',
          title: 'E-mail',
          type: 'string',
          validation: (rule) => rule.email().error('E-mail inválido'),
        }),
      ],
    }),

    // Seção: Endereço
    defineField({
      name: 'location',
      title: 'Localização',
      type: 'object',
      group: 'contact',
      fieldset: 'address',
      fields: [
        defineField({
          name: 'street',
          title: 'Rua',
          type: 'string',
        }),
        defineField({
          name: 'number',
          title: 'Número',
          type: 'string',
        }),
        defineField({
          name: 'complement',
          title: 'Complemento',
          type: 'string',
        }),
        defineField({
          name: 'neighborhood',
          title: 'Bairro',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'Cidade',
          type: 'string',
        }),
        defineField({
          name: 'state',
          title: 'Estado',
          type: 'string',
          options: {
            list: [
              'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
              'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
              'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
            ],
          },
        }),
        defineField({
          name: 'zipCode',
          title: 'CEP',
          type: 'string',
          validation: (rule) => 
            rule.regex(/^\d{5}-\d{3}$/)
                .error('Formato inválido. Use: 99999-999'),
        }),
        defineField({
          name: 'googleMapsUrl',
          title: 'Link do Google Maps',
          type: 'url',
          description: 'URL completa da localização no Google Maps',
        }),
      ],
    }),

    // Seção: Redes Sociais
    defineField({
      name: 'socialMedia',
      title: 'Redes Sociais',
      type: 'object',
      group: 'social',
      fieldset: 'social',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'object',
          fields: [
            {name: 'url', type: 'url', title: 'URL do Perfil'},
            {name: 'handle', type: 'string', title: '@usuário'},
          ],
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'object',
          fields: [
            {name: 'url', type: 'url', title: 'URL da Página'},
            {name: 'name', type: 'string', title: 'Nome da Página'},
          ],
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'object',
          fields: [
            {name: 'url', type: 'url', title: 'URL do Canal'},
            {name: 'handle', type: 'string', title: '@canal'},
          ],
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'object',
          fields: [
            {name: 'url', type: 'url', title: 'URL do Perfil'},
            {name: 'handle', type: 'string', title: '@usuário'},
          ],
        }),
      ],
    }),

    // Seção: Horário de Funcionamento
    defineField({
      name: 'businessHours',
      title: 'Horário de Funcionamento',
      type: 'array',
      group: 'business',
      fieldset: 'hours',
      of: [{
        type: 'object',
        preview: {
          select: {
            days: 'days',
            hours: 'hours',
            closed: 'closed',
          },
          prepare({days, hours, closed}) {
            const daysMap = {
              weekdays: 'Segunda a Sexta',
              saturday: 'Sábados',
              sunday: 'Domingos',
              holidays: 'Feriados',
            }
            return {
              title: daysMap[days] || days,
              subtitle: closed ? 'Fechado' : hours,
            }
          },
        },
        fields: [
          defineField({
            name: 'days',
            title: 'Dias',
            type: 'string',
            options: {
              list: [
                {title: 'Segunda a Sexta', value: 'weekdays'},
                {title: 'Sábados', value: 'saturday'},
                {title: 'Domingos', value: 'sunday'},
                {title: 'Feriados', value: 'holidays'},
              ],
            },
          }),
          defineField({
            name: 'hours',
            title: 'Horário',
            type: 'string',
            description: 'Ex: 08:00 às 18:00',
            hidden: ({parent}) => parent?.closed,
          }),
          defineField({
            name: 'closed',
            title: 'Fechado',
            type: 'boolean',
            initialValue: false,
          }),
        ],
      }],
    }),

    // Seção: SEO e Metadados
    defineField({
      name: 'seo',
      title: 'SEO e Metadados',
      type: 'object',
      group: 'seo',
      fieldset: 'seoImages',
      fields: [
        defineField({
          name: 'metadataBase',
          type: 'url',
          title: 'URL Base do Site',
          description: 'URL principal do seu site (ex: https://seusite.com.br)',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'ogImage',
          title: 'Imagem para Redes Sociais',
          type: 'image',
          description: 'Dimensões recomendadas: 1200x630px',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'favicon',
          title: 'Favicon',
          type: 'file',
          description: 'Ícone do site (recomendado: 32x32px)',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
})