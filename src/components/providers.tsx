'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from './ui/tooltip';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        {mounted ? (
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        ) : (
          <TooltipProvider>{children}</TooltipProvider>
        )}
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
