'use client';

import { usePathname } from 'next/navigation';
import Container from '@/components/container';
import { DashboardNav } from '@/components/layout/dashboard-nav';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Container>
      <Header />
      <main className="flex min-h-screen flex-col">
        <DashboardNav className="flex flex-col" />

        {/* Main Content */}
        <main className="flex-1 overflow-auto py-4">{children}</main>
      </main>
      <Footer />
    </Container>
  );
}
