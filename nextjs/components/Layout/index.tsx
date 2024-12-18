import { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Homepage/Hero';
import { Settings } from '@/sanity.types';
import StickySocialNav from '../StickySocialNav';

export default function Layout({
  children,
  settings,
}: {
  children: ReactNode;
  settings: Settings;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="grid lg:grid-cols-12 gap-6 container my-4 mx-auto pt-[96px] px-4">
          {/* Sidebar */}
          <div className="lg:col-span-3 relative">
            <Hero settings={settings} />
          </div>
          {children}
        </div>
        <Footer settings={settings} />
        <StickySocialNav settings={settings} />
      </main>
    </>
  );
}
