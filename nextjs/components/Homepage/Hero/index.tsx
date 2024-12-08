'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { FaPix, FaCopy } from 'react-icons/fa6';
import BusinessHours from '@/components/Homepage/Hero/BusinessHours';
import AddressInfo from '@/components/Homepage/Hero/Address';

import type { Settings } from '@/sanity.types';

const Hero = ({ settings }: { settings: Settings }) => {
  return (
    <div className="p-6 rounded-lg border bg-white shadow-sm lg:sticky lg:top-[96px]">
      <div className="flex flex-col items-center text-center gap-4">
        <Image
          src="/images/logo-caixa.png"
          alt="Loterias Caixa"
          width={90}
          height={90}
          priority
        />
        <span className="font-caixa font-bold text-2xl leading-tight text-semantic-primary">
          Loterias Boa Sorte Aldeota
        </span>

        {settings?.messages?.footer && (
          <p className="text-sm text-gray-600">{settings.messages.footer}</p>
        )}

        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <div className="flex gap-4">
            <Link
              href={`https://api.whatsapp.com/send?phone=${settings?.contactInfo?.whatsapp}`}
              passHref
              target="_blank"
              className="flex text-sm text-gray-600 transition hover:text-semantic-primary-300 items-center gap-2"
            >
              <FaWhatsapp size={20} />
              <span>Fale no WhatsApp</span>
            </Link>
            <span>|</span>
            <Link
              href={`tel:${settings?.contactInfo?.phone}`}
              passHref
              className="flex text-sm text-gray-600 transition hover:text-semantic-primary-300 items-center gap-2"
            >
              <FaPhoneAlt size={20} />
              <span>{settings?.contactInfo?.phone}</span>
            </Link>
          </div>

          <button
            onClick={() =>
              navigator.clipboard.writeText(settings?.contactInfo?.email || '')
            }
            className="flex text-sm text-gray-600 hover:text-semantic-primary-300 items-center gap-2"
          >
            <FaPix size={20} />
            <div className="flex gap-1 items-center">
              <span>{settings?.contactInfo?.email}</span>
              <FaCopy size={12} />
            </div>
          </button>
        </div>

        {settings?.businessHours && (
          <BusinessHours hours={settings.businessHours} />
        )}

        {settings?.location && <AddressInfo address={settings.location} />}
      </div>
    </div>
  );
};

export default Hero;
