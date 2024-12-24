'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaPhoneAlt, FaInstagram } from 'react-icons/fa';
import { FaPix, FaCopy, FaCheck } from 'react-icons/fa6';
import BusinessHours from '@/components/Homepage/Hero/BusinessHours';
import AddressInfo from '@/components/Homepage/Hero/Address';
import { AnimatePresence, motion } from 'framer-motion';

import type { Settings } from '@/sanity.types';

const Hero = ({ settings }: { settings: Settings }) => {
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(settings?.contactInfo?.email || '');
      setHasCopied(true);
      setShowCopyFeedback(true);

      setTimeout(() => {
        setShowCopyFeedback(false);
        setHasCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  return (
    <div className="p-6 rounded-lg border bg-white shadow-sm lg:sticky lg:top-[96px]">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center">
        <Image
          src="/images/logo-caixa.png"
          alt="Loterias Caixa"
          width={90}
          height={90}
          priority
          className="mb-4"
        />
        <h1 className="font-caixa font-bold text-2xl leading-tight text-semantic-primary mb-2">
          Loterias Boa Sorte <br /> Aldeota
        </h1>

        {settings?.messages?.footer && (
          <p className="text-sm text-gray-600 mb-6">
            {settings.messages.footer}
          </p>
        )}

        {/* Contact Information Section */}
        <div className="w-full space-y-6 mb-8">
          {/* Primary Contact Methods */}
          <div className="flex flex-col gap-3">
            <Link
              href={`tel:${settings?.contactInfo?.phone}`}
              className="inline-flex items-center justify-center gap-2 text-semantic-primary hover:text-semantic-primary-600 transition-colors"
            >
              <FaPhoneAlt className="w-5 h-5" />
              <span className="text-base">{settings?.contactInfo?.phone}</span>
            </Link>

            <button
              onClick={handleCopyPix}
              className="inline-flex items-center justify-center gap-2 text-semantic-primary hover:text-semantic-primary-600 group transition-colors relative"
            >
              <FaPix className="w-5 h-5" />
              <span className="text-base">{settings?.contactInfo?.email}</span>
              {hasCopied ? (
                <FaCheck className="w-3 h-3 text-green-500" />
              ) : (
                <FaCopy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-6">
            <Link
              href={`https://wa.me/${settings?.contactInfo?.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-semantic-primary hover:text-semantic-primary-600 transition-colors"
            >
              <FaWhatsapp className="w-6 h-6" />
              <span className="text-sm">WhatsApp</span>
            </Link>

            <Link
              href={
                (settings?.socialMedia?.instagram?.handle
                  ? `https://instagram.com/${settings?.socialMedia?.instagram?.handle}`
                  : settings?.socialMedia?.instagram?.url) || ''
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-semantic-primary hover:text-semantic-primary-600 transition-colors"
            >
              <FaInstagram className="w-6 h-6" />
              <span className="text-sm">Instagram</span>
            </Link>
          </div>
        </div>

        {/* Business Hours Section */}
        {settings?.businessHours && (
          <BusinessHours hours={settings.businessHours} />
        )}

        {/* Address Section */}
        {settings?.location && <AddressInfo address={settings.location} />}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showCopyFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-semantic-primary text-white px-4 py-2 rounded-full shadow-lg text-sm flex items-center gap-2"
          >
            <FaCheck className="w-4 h-4" />
            Pix copiado com sucesso!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
