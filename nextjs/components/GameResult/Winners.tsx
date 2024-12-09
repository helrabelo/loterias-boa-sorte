'use client'

import React, { useState } from 'react';
import { IoChevronDown } from "react-icons/io5";

interface GameResultProps {
  data: any;
}

export default function Winners({ data }: GameResultProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasWinners = data.listaRateioPremio?.some(
    (premio: any) => premio.numeroDeGanhadores > 0
  );

  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
      >
        <span className="font-medium">
          {hasWinners ? 'Ver pêmios e ganhadores' : 'Não houve ganhadores'}
        </span>
        <IoChevronDown
          className={`transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-[max-height] duration-200 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-4">
          {data.listaRateioPremio?.map((premio: any, index: number) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b last:border-0"
            >
              <div className="text-sm">
                {premio.descricaoFaixa} ({premio.numeroDeGanhadores} ganhadores)
              </div>
              <div className="font-bold">
                {premio.valorPremio.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}