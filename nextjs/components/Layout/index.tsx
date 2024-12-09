import { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Homepage/Hero';
import { Settings } from '@/sanity.types';

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
      <main className="flex-1 pt-[96px] px-4 container my-4 mx-auto">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3 relative">
            <Hero settings={settings} />
          </div>
          {children}
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
