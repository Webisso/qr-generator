import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 py-6 px-4">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{t('footer.madeWith')}</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} QR Generator. {t('footer.rights')}
          </p>
        </div>
        <a
          href="https://webisso.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-colors"
        >
          <span>Webisso LLC</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
