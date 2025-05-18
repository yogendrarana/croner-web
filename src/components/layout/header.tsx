'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon, Menu, X, ClockIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { authClient, signOut } from '@/lib/auth/auth-client';
import { toast } from 'sonner';

export default function Header() {
  const { setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isPending } = authClient.useSession();

  const logout = async () => {
    await signOut();
    setIsMenuOpen(false);
    toast('Logged out successfully');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn('w-full border-b sticky top-0 z-50 duration-300', {
        'bg-background top-4 px-4 border rounded-lg': isScrolled,
      })}
    >
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold">Croner</span>
          </Link>
        </div>

        {/* Auth & Theme Buttons */}
        {!isPending && data?.user ? (
          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                Dashboard
              </Button>
            </Link>
            <Button size="sm" className="cursor-pointer rounded" onClick={logout}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="cursor-pointer">
                Sign up
              </Button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 space-y-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Documentation
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
          </nav>

          <div className="flex flex-col space-y-2">
            <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">Sign up</Button>
            </Link>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm font-medium">Theme</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setTheme('light')} aria-label="Light theme">
                <SunIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setTheme('dark')} aria-label="Dark theme">
                <MoonIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
