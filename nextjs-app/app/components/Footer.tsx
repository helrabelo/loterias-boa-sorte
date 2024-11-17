import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              <li className="flex items-center gap-2 text-gray-600">
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
                <Link
                  href="mailto:contato@exemplo.com"
                  className="hover:text-semantic-primary transition-colors"
                >
                  contato@exemplo.com
                </Link>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
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
                <Link
                  href="tel:+5511999999999"
                  className="hover:text-semantic-primary transition-colors"
                >
                  (11) 99999-9999
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
              © {currentYear} Loterias Boa Sorte. Todos os direitos
              reservados.
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
