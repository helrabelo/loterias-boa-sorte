'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import type { Settings } from '@/sanity.types';

const StickySocialNav = ({ settings }: { settings: Settings }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay the appearance for a smooth entrance after page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 flex flex-col gap-3 transition-transform duration-500 ease-out ${
        isVisible ? 'translate-y-[-20%]' : 'translate-y-[200%]'
      }`}
    >
      <Link
        href={`https://api.whatsapp.com/send?phone=${settings?.contactInfo?.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </Link>

      <Link
        href={settings?.socialMedia?.instagram || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Follow us on Instagram"
      >
        <FaInstagram size={24} />
      </Link>
    </div>
  );
};

export default StickySocialNav;
