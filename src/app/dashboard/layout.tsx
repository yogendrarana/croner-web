import Container from '@/components/container';
import Header from '@/components/layout/header';
import { DashboardNav } from '@/components/layout/dashboard-nav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Header />
      <main className="flex min-h-screen flex-col">
        <DashboardNav className="flex flex-col" />

        {/* Main Content */}
        <main className="flex-1 overflow-auto py-4">{children}</main>
      </main>
    </Container>
  );
}
