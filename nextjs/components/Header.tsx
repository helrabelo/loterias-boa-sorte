'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import classNames from 'classnames';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
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
                Loterias Boa Sorte <br />
                Aldeota
              </span>
            </Link>

            <nav className="flex-1 flex justify-end">
              <ul className="flex items-center gap-4 md:gap-8 font-caixa">
                <li className="hidden md:block">
                  <Link
                    href="/"
                    className="text-gray-700 hover:underline underline-offset-4 transition"
                  >
                    Últimos Resultados
                  </Link>
                </li>
                <li className="hidden md:block">
                  <Link
                    href="/conferir-resultado"
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

                {/* Menu Button */}
                <li className="before:hidden sm:before:block sm:before:w-[1px] sm:before:h-6 sm:before:bg-gray-200 pl-0 sm:pl-4 md:pl-8 md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="bg-semantic-primary text-white hover:bg-semantic-primary-hover rounded-full py-2 px-3 sm:px-4 md:px-6 text-sm md:text-base transition-all duration-200 flex items-center gap-2"
                    aria-label="Open menu"
                  >
                    <FiMenu className="w-5 h-5" />
                    <span className="hidden sm:inline">Menu</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={classNames(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden transition duration-300 ease-in-out',
          {
            'opacity-100 ': isMenuOpen,
            'opacity-0 translate-x-[100vw]': !isMenuOpen
          }
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Prevent click propagation on menu content */}
        <div
          className={classNames(
            'fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-lg transition-transform duration-300 ease-in-out',
            {
              'translate-x-0': isMenuOpen,
              'translate-x-full': !isMenuOpen
            }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-caixa font-bold text-lg">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <IoMdClose className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto">
              <ul className="p-4 space-y-4">
                <li>
                  <Link
                    href="/"
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Últimos Resultados
                  </Link>
                </li>
                <li>
                  <Link
                    href="/conferir-resultado"
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Conferir Jogos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/criar-jogo"
                    className="flex items-center p-2 text-semantic-accent hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Criar Jogo/Bolão
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}