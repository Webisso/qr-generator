import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSelector } from '../LanguageSelector';
import { Button } from '../ui/button';
import { Moon, Sun, QrCode, Code, Home } from 'lucide-react';

export function Header() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const isHome = location.pathname === '/';
  const isApiDocs = location.pathname === '/api-docs';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <QrCode className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">{t('app.title')}</span>
          </Link>
          
          <nav className="hidden sm:flex items-center gap-1">
            <Link to="/">
              <Button
                variant={isHome ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                <span className="hidden md:inline">{t('nav.generator')}</span>
              </Button>
            </Link>
            <Link to="/api-docs">
              <Button
                variant={isApiDocs ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Code className="h-4 w-4" />
                <span className="hidden md:inline">API</span>
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={t('accessibility.toggleTheme')}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          
          {/* Mobile nav */}
          <div className="flex sm:hidden gap-1">
            <Link to="/">
              <Button variant={isHome ? "secondary" : "ghost"} size="icon">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/api-docs">
              <Button variant={isApiDocs ? "secondary" : "ghost"} size="icon">
                <Code className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
