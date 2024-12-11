import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg shadow-sm">
      <div className="container py-4 sm:px-6">
        <div className="flex items-center justify-between gap-5">
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
            <span className="hidden sm:block font-caixa font-bold text-md md:text-md leading-5 text-semantic-primary">
              Loterias Boa Sorte <br />Aldeota
            </span>
          </Link>

          <nav className="flex-1 flex justify-end">
            <ul className="flex items-center gap-4 md:gap-8 font-caixa">
              <li className="hidden md:block">
                <Link
                  href="/resultados"
                  className="text-gray-700 hover:underline underline-offset-4 transition"
                >
                  Últimos Resultados
                </Link>
              </li>
              <li className="hidden md:block">
                <Link
                  href="/conferir"
                  className="text-gray-700 hover:underline underline-offset-4 transition"
                >
                  Conferir Jogos
                </Link>
              </li>
              <li className="hidden md:block">
                <Link
                  href="/criar-jogo"
                  className="text-semantic-accent hover:text-semantic-accent-hover hover:underline underline-offset-4 transition"
                >
                  Criar Jogo/Bolão
                </Link>
              </li>

              <li className="sm:before:w-[1px] sm:before:bg-gray-200 sm:pl-8 lg:hidden">
                <Link
                  href="/menu"
                  className="bg-semantic-primary text-white hover:bg-semantic-primary-hover rounded-full py-2 px-4 md:px-6 text-sm md:text-base transition-all duration-200 flex items-center gap-2"
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
                  <span className="hidden sm:inline">Menu</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}