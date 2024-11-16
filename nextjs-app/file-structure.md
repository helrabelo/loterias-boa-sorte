app/
├── api/
│   ├── revalidate/
│   │   └── route.ts
│   └── draft-mode/
│       └── route.ts
│
├── (marketing)/
│   ├── page.tsx                    # Landing page
│   ├── sobre/
│   │   └── page.tsx               # Página Sobre
│   └── layout.tsx
│
├── (games)/
│   ├── layout.tsx                 # Layout comum para área de jogos
│   ├── megasena/
│   │   ├── page.tsx              # Página principal Mega-Sena
│   │   ├── [concurso]/
│   │   │   └── page.tsx         # Resultado específico
│   │   └── loading.tsx
│   ├── lotofacil/
│   │   └── [...]                # Mesma estrutura para outros jogos
│   └── [...outros-jogos]/
│
├── components/
│   ├── ui/                       # Componentes base do shadcn
│   │   ├── button.tsx
│   │   └── [...]
│   ├── layout/                   # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   ├── games/                    # Componentes específicos dos jogos
│   │   ├── LotteryNumbers.tsx
│   │   ├── ResultCard.tsx
│   │   ├── WinnersList.tsx
│   │   ├── PrizeTable.tsx
│   │   └── GameStats.tsx
│   └── shared/                   # Componentes compartilhados
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts            # Cliente Sanity
│   │   ├── queries.ts           # Queries GROQ
│   │   └── config.ts           # Configurações
│   └── utils/
│       ├── dates.ts             # Utilitários de data
│       ├── numbers.ts           # Formatação de números
│       └── currency.ts          # Formatação de moeda
│
├── types/
│   ├── games.ts                 # Tipos para jogos
│   ├── results.ts               # Tipos para resultados
│   └── schema.ts                # Tipos gerados do Sanity
│
├── hooks/
│   ├── useGameResults.ts        # Hook para resultados
│   ├── useGameStats.ts          # Hook para estatísticas
│   └── useLotteryNumbers.ts     # Hook para números
│
└── utils/
    ├── constants.ts             # Constantes do app
    ├── formatters.ts            # Funções de formatação
    └── validators.ts            # Funções de validação