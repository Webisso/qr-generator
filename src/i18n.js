import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all language files
import arSA from './locales/ar-SA.json';
import ca from './locales/ca.json';
import zhHans from './locales/zh-Hans.json';
import zhHant from './locales/zh-Hant.json';
import hr from './locales/hr.json';
import cs from './locales/cs.json';
import da from './locales/da.json';
import nlNL from './locales/nl-NL.json';
import enAU from './locales/en-AU.json';
import enCA from './locales/en-CA.json';
import enGB from './locales/en-GB.json';
import enUS from './locales/en-US.json';
import fi from './locales/fi.json';
import frFR from './locales/fr-FR.json';
import frCA from './locales/fr-CA.json';
import deDE from './locales/de-DE.json';
import el from './locales/el.json';
import he from './locales/he.json';
import hi from './locales/hi.json';
import hu from './locales/hu.json';
import id from './locales/id.json';
import it from './locales/it.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ms from './locales/ms.json';
import no from './locales/no.json';
import pl from './locales/pl.json';
import sl from './locales/sl.json';
import pt from './locales/pt.json';
import fa from './locales/fa.json';
import pa from './locales/pa.json';
import ptBR from './locales/pt-BR.json';
import ptPT from './locales/pt-PT.json';
import ro from './locales/ro.json';
import ru from './locales/ru.json';
import sk from './locales/sk.json';
import esMX from './locales/es-MX.json';
import esES from './locales/es-ES.json';
import sv from './locales/sv.json';
import th from './locales/th.json';
import tr from './locales/tr.json';
import uk from './locales/uk.json';
import vi from './locales/vi.json';

const resources = {
  'ar-SA': { translation: arSA },
  'ca': { translation: ca },
  'zh-Hans': { translation: zhHans },
  'zh-Hant': { translation: zhHant },
  'hr': { translation: hr },
  'cs': { translation: cs },
  'da': { translation: da },
  'nl-NL': { translation: nlNL },
  'en-AU': { translation: enAU },
  'en-CA': { translation: enCA },
  'en-GB': { translation: enGB },
  'en-US': { translation: enUS },
  'fi': { translation: fi },
  'fr-FR': { translation: frFR },
  'fr-CA': { translation: frCA },
  'de-DE': { translation: deDE },
  'el': { translation: el },
  'he': { translation: he },
  'hi': { translation: hi },
  'hu': { translation: hu },
  'id': { translation: id },
  'it': { translation: it },
  'ja': { translation: ja },
  'ko': { translation: ko },
  'ms': { translation: ms },
  'no': { translation: no },
  'pl': { translation: pl },
  'sl': { translation: sl },
  'pt': { translation: pt },
  'fa': { translation: fa },
  'pa': { translation: pa },
  'pt-BR': { translation: ptBR },
  'pt-PT': { translation: ptPT },
  'ro': { translation: ro },
  'ru': { translation: ru },
  'sk': { translation: sk },
  'es-MX': { translation: esMX },
  'es-ES': { translation: esES },
  'sv': { translation: sv },
  'th': { translation: th },
  'tr': { translation: tr },
  'uk': { translation: uk },
  'vi': { translation: vi },
};

export const languages = [
  { code: 'ar-SA', name: 'العربية', dir: 'rtl' },
  { code: 'ca', name: 'Català', dir: 'ltr' },
  { code: 'zh-Hans', name: '简体中文', dir: 'ltr' },
  { code: 'zh-Hant', name: '繁體中文', dir: 'ltr' },
  { code: 'hr', name: 'Hrvatski', dir: 'ltr' },
  { code: 'cs', name: 'Čeština', dir: 'ltr' },
  { code: 'da', name: 'Dansk', dir: 'ltr' },
  { code: 'nl-NL', name: 'Nederlands', dir: 'ltr' },
  { code: 'en-AU', name: 'English (Australia)', dir: 'ltr' },
  { code: 'en-CA', name: 'English (Canada)', dir: 'ltr' },
  { code: 'en-GB', name: 'English (UK)', dir: 'ltr' },
  { code: 'en-US', name: 'English (US)', dir: 'ltr' },
  { code: 'fi', name: 'Suomi', dir: 'ltr' },
  { code: 'fr-FR', name: 'Français (France)', dir: 'ltr' },
  { code: 'fr-CA', name: 'Français (Canada)', dir: 'ltr' },
  { code: 'de-DE', name: 'Deutsch', dir: 'ltr' },
  { code: 'el', name: 'Ελληνικά', dir: 'ltr' },
  { code: 'he', name: 'עברית', dir: 'rtl' },
  { code: 'hi', name: 'हिन्दी', dir: 'ltr' },
  { code: 'hu', name: 'Magyar', dir: 'ltr' },
  { code: 'id', name: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'it', name: 'Italiano', dir: 'ltr' },
  { code: 'ja', name: '日本語', dir: 'ltr' },
  { code: 'ko', name: '한국어', dir: 'ltr' },
  { code: 'ms', name: 'Bahasa Melayu', dir: 'ltr' },
  { code: 'no', name: 'Norsk', dir: 'ltr' },
  { code: 'pl', name: 'Polski', dir: 'ltr' },
  { code: 'sl', name: 'Slovenščina', dir: 'ltr' },
  { code: 'pt', name: 'Português', dir: 'ltr' },
  { code: 'fa', name: 'فارسی', dir: 'rtl' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', dir: 'ltr' },
  { code: 'pt-BR', name: 'Português (Brasil)', dir: 'ltr' },
  { code: 'pt-PT', name: 'Português (Portugal)', dir: 'ltr' },
  { code: 'ro', name: 'Română', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'sk', name: 'Slovenčina', dir: 'ltr' },
  { code: 'es-MX', name: 'Español (México)', dir: 'ltr' },
  { code: 'es-ES', name: 'Español (España)', dir: 'ltr' },
  { code: 'sv', name: 'Svenska', dir: 'ltr' },
  { code: 'th', name: 'ไทย', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
  { code: 'uk', name: 'Українська', dir: 'ltr' },
  { code: 'vi', name: 'Tiếng Việt', dir: 'ltr' },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
