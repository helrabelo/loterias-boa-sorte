import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      boxShadow: {
        layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        black: '#0d0e12',
        white: '#fff',
        cyan: {
          50: '#e7fefe',
          100: '#c5fcfc',
          200: '#96f8f8',
          300: '#62efef',
          400: '#18e2e2',
          500: '#04b8be',
          600: '#037782',
          700: '#024950',
          800: '#042f34',
          900: '#072227',
          950: '#0d181c',
        },
        gray: {
          50: '#f6f6f8',
          100: '#eeeef1',
          200: '#e3e4e8',
          300: '#bbbdc9',
          400: '#9499ad',
          500: '#727892',
          600: '#515870',
          700: '#383d51',
          800: '#252837',
          900: '#1b1d27',
          950: '#13141b',
        },
        red: {
          50: '#fff6f5',
          100: '#ffe7e5',
          200: '#ffdedc',
          300: '#fdada5',
          400: '#f77769',
          500: '#ef4434',
          600: '#cc2819',
          700: '#8b2018',
          800: '#4d1714',
          900: '#321615',
          950: '#1e1011',
        },
        orange: {
          50: '#fcf1e8',
          100: '#f9e3d2',
          200: '#f4c7a6',
          300: '#efab7a',
          400: '#ea8f4e',
          500: '#e57322',
          600: '#ba5f1e',
          700: '#8f4b1b',
          800: '#653818',
          900: '#3a2415',
          950: '#251a13',
        },
        yellow: {
          50: '#fefae1',
          100: '#fcf3bb',
          200: '#f9e994',
          300: '#f7d455',
          400: '#f9bc15',
          500: '#d28a04',
          600: '#965908',
          700: '#653a0b',
          800: '#3b220c',
          900: '#271a11',
          950: '#181410',
        },
        green: {
          50: '#e7f9ed',
          100: '#d0f4dc',
          200: '#a1eaba',
          300: '#72e097',
          400: '#43d675',
          500: '#3ab564',
          600: '#329454',
          700: '#297343',
          800: '#215233',
          900: '#183122',
          950: '#14211a',
        },
        // Cores dos estados semânticos
        semantic: {
          primary: {
            50: '#e6f0f9',
            100: '#cce1f4',
            200: '#99c3e9',
            300: '#66a4de',
            400: '#3386d3',
            DEFAULT: '#0066b3',
            600: '#005292',
            700: '#003d6e',
            800: '#002947',
            900: '#001423',
            bg: {
              DEFAULT: '#f0f7fe',
              hover: '#e1f0fd',
              active: '#cce1f4',
            },
          },
          secondary: {
            DEFAULT: '#4cc0ad',
            hover: '#3da899',
            light: '#a8e5dc',
            bg: {
              DEFAULT: '#edfaf8',
              hover: '#dff5f2',
            },
          },
          accent: {
            DEFAULT: '#f7941e',
            hover: '#e58412',
            light: '#ffc77d',
            bg: {
              DEFAULT: '#fff5e8',
              hover: '#ffe8cc',
            },
          },
          success: {
            DEFAULT: '#3c763d',
            hover: '#2b542c',
            bg: {
              DEFAULT: '#dff0d8',
              hover: '#c1e2b3',
            },
          },
          info: {
            DEFAULT: '#31708f',
            hover: '#245269',
            bg: {
              DEFAULT: '#d9edf7',
              hover: '#afd9ee',
            },
          },
          warning: {
            DEFAULT: '#8a6d3b',
            hover: '#66512c',
            bg: {
              DEFAULT: '#fcf8e3',
              hover: '#f7ecb5',
            },
          },
          danger: {
            DEFAULT: '#a94442',
            hover: '#843534',
            bg: {
              DEFAULT: '#f2dede',
              hover: '#e4b9b9',
            },
          },
        },
        // Cores dos Jogos da Caixa
        lottery: {
          'mega-sena': '#00a651',
          'mega-virada': '#00ab69',
          'mais-milionaria': '#2a3580',
          lotofacil: '#91278f',
          quina: '#2e3192',
          lotomania: '#e67200',
          timemania: {
            DEFAULT: '#fff200',
            text: '#038141', // Para os textos especiais
          },
          'dupla-sena': '#a62b43',
          loteca: '#eb212c',
          lotogol: '#2bbde7',
          'dia-de-sorte': {
            DEFAULT: '#e3c021',
            text: '#7e6906', // Para os textos especiais
          },
          'super-sete': {
            DEFAULT: '#bed730',
            text: '#038141', // Para os textos especiais
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        caixa: ['CaixaStd', 'system-ui', 'sans-serif'],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;