import React from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../../i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    const lang = languages.find((l) => l.code === langCode);
    if (lang) {
      document.documentElement.dir = lang.dir;
      document.documentElement.lang = langCode;
    }
  };

  const currentLanguage = languages.find((l) => l.code === i18n.language) || 
    languages.find((l) => l.code === 'en-US');

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto min-w-[180px]">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue>
          {currentLanguage?.name || 'English (US)'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
