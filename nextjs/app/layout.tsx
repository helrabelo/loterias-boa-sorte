import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { Toaster } from 'sonner';

import DraftModeToast from '@/components/DraftModeToast';
import Layout from '@/components/Layout';
import * as demo from '@/lib/sanity/demo';
import { sanityFetch, SanityLive } from '@/lib/sanity/live';
import { settingsQuery } from '@/lib/sanity/queries';
import { resolveOpenGraphImage } from '@/lib/sanity/utils';
import { handleError } from './client-utils';
import { Settings } from '@/sanity.types';

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch<typeof settingsQuery>({
    query: settingsQuery,
    stega: false,
  });

  // Valores base
  const title = settings?.title || demo.title;
  // TODO: FIX DESCRIPTION
  const description = settings?.description || demo.description;

  // Resolve a URL base para metadata
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = (settings?.seo as any)?.metadataBase
      ? new URL((settings?.seo as any)?.metadataBase)
      : undefined;
  } catch {
    // ignora erros de URL inválida
  }

  // Resolve OG Image usando sua função existente
  // TODO: FIX OG IMAGE
  const ogImage = resolveOpenGraphImage((settings?.seo as any)?.ogImage);

  // Resolve favicon
  // TODO: FIX FAVICON
  const faviconUrl = (settings?.seo as any)?.favicon?.asset.url;

  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    // TODO: FIX DESCRIPTION
    description: '',

    // Open Graph
    openGraph: {
      type: 'website',
      siteName: title,
      title,
      description: '',
      images: ogImage ? [ogImage] : [],
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description: '',
      images: ogImage ? [ogImage] : [],
    },

    // Keywords baseados na localização
    keywords: [
      'loteria',
      'jogos',
      'mega sena',
      'lotofácil',
      'resultados loteria',
      // TODO: FIX LOCATION
      (settings?.location as any)?.city,
      (settings?.location as any)?.state,
    ].filter(Boolean),

    // Ícones
    icons: faviconUrl
      ? {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        }
      : undefined,

    // Viewport
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  const { data } = await sanityFetch<typeof settingsQuery>({
    query: settingsQuery,
    stega: false,
  });

  const settings = data as unknown as Settings;

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-white font-caixa text-black">
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        <SanityLive onError={handleError} />
        <Layout settings={settings}>
          {children}
        </Layout>
        
        <SpeedInsights />
      </body>
    </html>
  );
}
