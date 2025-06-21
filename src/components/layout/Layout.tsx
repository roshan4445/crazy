import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BackgroundAnimation } from './BackgroundAnimation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <BackgroundAnimation />
      <Header />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}