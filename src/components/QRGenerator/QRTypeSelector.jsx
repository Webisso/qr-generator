import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  Type,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  User,
  Calendar,
  MapPin,
  MessageCircle,
  Bitcoin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Music,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const qrTypes = [
  { id: 'link', icon: Link },
  { id: 'text', icon: Type },
  { id: 'email', icon: Mail },
  { id: 'phone', icon: Phone },
  { id: 'sms', icon: MessageSquare },
  { id: 'wifi', icon: Wifi },
  { id: 'vcard', icon: User },
  { id: 'event', icon: Calendar },
  { id: 'location', icon: MapPin },
  { id: 'whatsapp', icon: MessageCircle },
  { id: 'bitcoin', icon: Bitcoin },
  { id: 'twitter', icon: Twitter },
  { id: 'facebook', icon: Facebook },
  { id: 'instagram', icon: Instagram },
  { id: 'youtube', icon: Youtube },
  { id: 'linkedin', icon: Linkedin },
  { id: 'spotify', icon: Music },
];

export function QRTypeSelector({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {qrTypes.map(({ id, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            'flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all',
            'hover:border-primary hover:bg-accent',
            value === id
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-background'
          )}
        >
          <Icon className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium text-center truncate w-full">
            {t(`qrTypes.${id}`)}
          </span>
        </button>
      ))}
    </div>
  );
}
