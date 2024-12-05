import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg shadow-sm">
      <div className="container py-4 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          {/* Logo */}
          <Link
            className="flex gap-2 items-center justify-center transition-opacity hover:opacity-90"
            href="/"
          >
            <Image
              src="/images/trevo.svg"
              alt="Loterias Caixa"
              width={42}
              height={42}
              priority
            />
            {/* Span with Boa Sorte <br /> Loterias */}
            <span className="hidden sm:block font-caixa font-bold text-md md:text-md leading-5 text-semantic-primary">
              Boa Sorte
              <br />
              Loterias
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 flex justify-end">
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-8 font-caixa"
            >
              {/* Menu Principal */}
              <li className="hidden sm:block">
                <Link
                  href="/megasena"
                  className="text-lottery-mega-sena hover:underline underline-offset-4 transition"
                >
                  Mega-Sena
                </Link>
              </li>
              <li className="hidden sm:block">
                <Link
                  href="/lotofacil"
                  className="text-lottery-lotofacil hover:underline underline-offset-4 transition"
                >
                  Lotofácil
                </Link>
              </li>
              <li className="hidden md:block">
                <Link
                  href="/quina"
                  className="text-lottery-quina hover:underline underline-offset-4 transition"
                >
                  Quina
                </Link>
              </li>

              {/* Dropdown ou Menu Button para mobile */}
              <li className="sm:before:w-[1px] sm:before:bg-gray-200 sm:pl-8 flex items-center">
                <Link
                  href="/todos-os-jogos"
                  className="bg-semantic-primary text-white hover:bg-semantic-primary-hover focus:ring-2 focus:ring-semantic-primary/20 rounded-full py-2 px-4 md:px-6 text-sm md:text-base transition-all duration-200 flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                  <span className="hidden sm:inline">Todos os Jogos</span>
                </Link>
              </li>

              {/* CTA Button */}
              <li className="hidden sm:block">
                <Link
                  className="bg-semantic-accent hover:bg-semantic-accent-hover text-white rounded-full py-2 px-4 md:px-6 text-sm md:text-base transition-colors duration-200 flex items-center gap-2"
                  href="/resultados"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <span>Resultados</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
