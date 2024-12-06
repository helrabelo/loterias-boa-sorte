'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Settings } from '@/sanity.types';

export default function Footer({ settings }: { settings?: Settings }) {
  const currentYear = new Date().getFullYear();

  const copyOnClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(settings?.contactInfo?.email || '');
  };

  return (
    <footer className="bg-semantic-primary-50 border-t border-semantic-primary-100">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo e Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-caixa.png"
                alt="Loterias Caixa"
                width={120}
                height={120}
                className="h-12 w-auto"
              />
            </Link>

            {settings?.messages?.footer && (
              <p className="text-sm text-gray-600">
                {settings?.messages?.footer}
              </p>
            )}
            <p className="text-sm text-gray-600">
              Todas as informações são extraídas diretamente do site oficial da
              Caixa Econômica Federal.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-caixa text-lg font-bold mb-4 text-semantic-primary">
              Jogos
            </h3>
            <ul className="space-y-2">
              {[
                'Mega-Sena',
                'Lotofácil',
                'Quina',
                'Lotomania',
                'Timemania',
              ].map((game) => (
                <li key={game}>
                  <Link
                    href={`/${game.toLowerCase().replace('-', '')}`}
                    className="text-gray-600 hover:text-semantic-primary transition-colors"
                  >
                    {game}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="font-caixa text-lg font-bold mb-4 text-semantic-primary">
              Links Úteis
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resultados"
                  className="text-gray-600 hover:text-semantic-primary transition-colors"
                >
                  Últimos Resultados
                </Link>
              </li>
              <li>
                <Link
                  href="/estatisticas"
                  className="text-gray-600 hover:text-semantic-primary transition-colors"
                >
                  Estatísticas
                </Link>
              </li>
              <li>
                <Link
                  href="http://www.caixa.gov.br/loterias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-semantic-primary transition-colors"
                >
                  Site Oficial da Caixa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-caixa text-lg font-bold mb-4 text-semantic-primary">
              Contato
            </h3>
            <ul className="space-y-2">
              {/* Pix */}
              <li className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-semantic-primary transition-colors">
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <defs />
                  <g fill="currentColor" fillRule="evenodd">
                    <path d="M393.072 391.897c-20.082 0-38.969-7.81-53.176-22.02l-77.069-77.067c-5.375-5.375-14.773-5.395-20.17 0l-76.784 76.786c-14.209 14.207-33.095 22.019-53.179 22.019h-9.247l97.521 97.52c30.375 30.375 79.614 30.375 109.988 0l97.239-97.238h-15.123zm-105.049 74.327c-8.55 8.53-19.93 13.25-32.05 13.25h-.02c-12.12 0-23.522-4.721-32.05-13.25l-56.855-56.855c7.875-4.613 15.165-10.248 21.758-16.84l63.948-63.948 64.23 64.23c7.637 7.66 16.188 14.013 25.478 18.952l-54.439 54.46zM310.958 22.78c-30.374-30.374-79.613-30.374-109.988 0l-97.52 97.52h9.247c20.082 0 38.97 7.834 53.178 22.02l76.784 76.785c5.57 5.592 14.622 5.57 20.17 0l77.069-77.068c14.207-14.187 33.094-22.02 53.176-22.02h15.123l-97.239-97.237zm6.028 96.346l-64.23 64.23-63.97-63.97c-6.593-6.592-13.86-12.206-21.736-16.818l56.853-56.877c17.69-17.645 46.476-17.668 64.121 0l54.44 54.461c-9.292 4.961-17.842 11.315-25.479 18.974h.001z" />
                    <path d="M489.149 200.97l-58.379-58.377h-37.706c-13.838 0-27.394 5.635-37.185 15.426l-77.068 77.069c-7.202 7.18-16.623 10.77-26.067 10.77-9.443 0-18.885-3.59-26.066-10.77l-76.785-76.785c-9.792-9.814-23.346-15.427-37.207-15.427h-31.81L22.78 200.97c-30.374 30.375-30.374 79.614 0 109.988l58.095 58.074 31.81.021c13.86 0 27.416-5.635 37.208-15.426l76.784-76.764c13.925-13.947 38.208-13.924 52.133-.02l77.068 77.066c9.791 9.792 23.346 15.405 37.185 15.405h37.706l58.379-58.356c30.374-30.374 30.374-79.613 0-109.988zm-362.19 129.724c-3.763 3.786-8.942 5.917-14.273 5.917H94.302l-48.59-48.564c-17.689-17.69-17.689-46.476 0-64.143L94.3 175.296h18.385c5.331 0 10.51 2.154 14.295 5.918l74.74 74.74-74.761 74.74zm339.257-42.647l-48.848 48.87h-24.305c-5.309 0-10.508-2.155-14.251-5.92l-75.023-75.043 75.023-75.023c3.743-3.764 8.942-5.918 14.252-5.918h24.304l48.847 48.891c8.573 8.551 13.273 19.93 13.273 32.05 0 12.141-4.7 23.52-13.273 32.093z" />
                  </g>
                </svg>
                <span onClick={copyOnClick}>
                  {settings?.contactInfo?.email}
                </span>
              </li>
              {/* Email */}
              <li className="flex items-center gap-2 text-gray-600  cursor-pointer hover:text-semantic-primary transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <Link href={`mailto:${settings?.contactInfo?.email}`}>
                  {settings?.contactInfo?.email}
                </Link>
              </li>
              {/* Phone */}
              <li className="flex items-center gap-2 text-gray-600  cursor-pointer hover:text-semantic-primary transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <Link href={`${settings?.contactInfo?.whatsapp}`}>
                  {settings?.contactInfo?.phone}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-semantic-primary-100 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600">
              © {currentYear} Loterias Boa Sorte. Todos os direitos reservados.
            </p>

            {/* Links Legais */}
            <div className="flex gap-6">
              <Link
                href="/privacidade"
                className="text-sm text-gray-600 hover:text-semantic-primary transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos"
                className="text-sm text-gray-600 hover:text-semantic-primary transition-colors"
              >
                Termos de Uso
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center md:text-right mt-4 md:mt-0">
              Este site não é afiliado à Caixa Econômica Federal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
