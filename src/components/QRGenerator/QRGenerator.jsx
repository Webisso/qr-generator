import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import QRCodeStyling from 'qr-code-styling';
import { QRTypeSelector } from './QRTypeSelector';
import { QRDataForm } from './QRDataForm';
import { QRCustomization } from './QRCustomization';
import { QRPreview } from './QRPreview';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const defaultOptions = {
  width: 300,
  height: 300,
  margin: 10,
  data: '',
  dotsOptions: {
    color: '#000000',
    type: 'square',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    color: '#000000',
    type: 'square',
  },
  cornersDotOptions: {
    color: '#000000',
    type: 'square',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 10,
    imageSize: 0.4,
    hideBackgroundDots: true,
  },
  qrOptions: {
    errorCorrectionLevel: 'M',
  },
};

export function QRGenerator() {
  const { t } = useTranslation();
  const [qrType, setQrType] = useState('link');
  const [qrData, setQrData] = useState({});
  const [options, setOptions] = useState(defaultOptions);
  const [qrCode, setQrCode] = useState(null);
  const qrRef = useRef(null);

  // Generate QR content based on type
  const generateQRContent = useCallback(() => {
    switch (qrType) {
      case 'link':
        return qrData.url || '';
      case 'text':
        return qrData.text || '';
      case 'email':
        const emailParts = [`mailto:${qrData.email || ''}`];
        const emailParams = [];
        if (qrData.subject) emailParams.push(`subject=${encodeURIComponent(qrData.subject)}`);
        if (qrData.body) emailParams.push(`body=${encodeURIComponent(qrData.body)}`);
        if (emailParams.length) emailParts.push('?' + emailParams.join('&'));
        return emailParts.join('');
      case 'phone':
        return `tel:${qrData.phone || ''}`;
      case 'sms':
        return `sms:${qrData.phone || ''}${qrData.message ? `?body=${encodeURIComponent(qrData.message)}` : ''}`;
      case 'wifi':
        return `WIFI:T:${qrData.encryption || 'WPA'};S:${qrData.networkName || ''};P:${qrData.password || ''};H:${qrData.hidden ? 'true' : 'false'};;`;
      case 'vcard':
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `N:${qrData.lastName || ''};${qrData.firstName || ''};;;`,
          `FN:${qrData.firstName || ''} ${qrData.lastName || ''}`,
          qrData.organization && `ORG:${qrData.organization}`,
          qrData.title && `TITLE:${qrData.title}`,
          qrData.mobile && `TEL;TYPE=CELL:${qrData.mobile}`,
          qrData.phone && `TEL;TYPE=WORK:${qrData.phone}`,
          qrData.homePhone && `TEL;TYPE=HOME:${qrData.homePhone}`,
          qrData.fax && `TEL;TYPE=FAX:${qrData.fax}`,
          qrData.email && `EMAIL;TYPE=WORK:${qrData.email}`,
          qrData.emailPersonal && `EMAIL;TYPE=HOME:${qrData.emailPersonal}`,
          qrData.website && `URL:${qrData.website}`,
          (qrData.street || qrData.city || qrData.state || qrData.zipCode || qrData.country) &&
            `ADR;TYPE=WORK:;;${qrData.street || ''};${qrData.city || ''};${qrData.state || ''};${qrData.zipCode || ''};${qrData.country || ''}`,
          qrData.note && `NOTE:${qrData.note}`,
          'END:VCARD',
        ].filter(Boolean).join('\n');
      case 'event':
        const formatDate = (date) => {
          if (!date) return '';
          return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        return [
          'BEGIN:VEVENT',
          `SUMMARY:${qrData.eventTitle || ''}`,
          qrData.description && `DESCRIPTION:${qrData.description}`,
          qrData.location && `LOCATION:${qrData.location}`,
          qrData.startDate && `DTSTART:${formatDate(qrData.startDate)}`,
          qrData.endDate && `DTEND:${formatDate(qrData.endDate)}`,
          'END:VEVENT',
        ].filter(Boolean).join('\n');
      case 'location':
        return `geo:${qrData.latitude || 0},${qrData.longitude || 0}`;
      case 'whatsapp':
        return `https://wa.me/${(qrData.whatsappNumber || '').replace(/[^0-9]/g, '')}${qrData.message ? `?text=${encodeURIComponent(qrData.message)}` : ''}`;
      case 'bitcoin':
        let btcUri = `bitcoin:${qrData.bitcoinAddress || ''}`;
        const btcParams = [];
        if (qrData.amount) btcParams.push(`amount=${qrData.amount}`);
        if (qrData.label) btcParams.push(`label=${encodeURIComponent(qrData.label)}`);
        if (qrData.message) btcParams.push(`message=${encodeURIComponent(qrData.message)}`);
        if (btcParams.length) btcUri += '?' + btcParams.join('&');
        return btcUri;
      case 'twitter':
        if (qrData.tweetText) {
          return `https://twitter.com/intent/tweet?text=${encodeURIComponent(qrData.tweetText)}`;
        }
        return `https://twitter.com/${(qrData.username || '').replace('@', '')}`;
      case 'facebook':
        return qrData.profileUrl || 'https://facebook.com';
      case 'instagram':
        return `https://instagram.com/${(qrData.username || '').replace('@', '')}`;
      case 'youtube':
        return qrData.videoUrl || 'https://youtube.com';
      case 'linkedin':
        return qrData.profileUrl || 'https://linkedin.com';
      case 'spotify':
        return qrData.trackUrl || 'https://open.spotify.com';
      default:
        return '';
    }
  }, [qrType, qrData]);

  // Initialize QR code
  useEffect(() => {
    const qr = new QRCodeStyling({
      ...options,
      data: generateQRContent() || 'https://example.com',
    });
    setQrCode(qr);
  }, []);

  // Update QR code when options or data change
  useEffect(() => {
    if (qrCode) {
      const content = generateQRContent();
      qrCode.update({
        ...options,
        data: content || 'https://example.com',
      });
    }
  }, [qrCode, options, generateQRContent]);

  // Render QR code to DOM
  useEffect(() => {
    if (qrCode && qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
    }
  }, [qrCode]);

  const handleDownload = (format = 'png') => {
    if (qrCode) {
      qrCode.download({
        name: 'qr-code',
        extension: format,
      });
    }
  };

  const handleCopy = async () => {
    if (qrCode) {
      try {
        const blob = await qrCode.getRawData('png');
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        return true;
      } catch (err) {
        console.error('Failed to copy:', err);
        return false;
      }
    }
    return false;
  };

  const updateOptions = (newOptions) => {
    setOptions((prev) => ({
      ...prev,
      ...newOptions,
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{t('app.title')}</h1>
        <p className="text-muted-foreground">{t('app.description')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('qrTypes.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <QRTypeSelector value={qrType} onChange={setQrType} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <QRDataForm type={qrType} data={qrData} onChange={setQrData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('customization.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">{t('customization.basic')}</TabsTrigger>
                  <TabsTrigger value="colors">{t('customization.colors')}</TabsTrigger>
                  <TabsTrigger value="style">{t('customization.style')}</TabsTrigger>
                  <TabsTrigger value="logo">{t('customization.logo')}</TabsTrigger>
                </TabsList>
                <QRCustomization
                  options={options}
                  onUpdate={updateOptions}
                />
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:sticky lg:top-8 h-fit">
          <QRPreview
            qrRef={qrRef}
            onDownload={handleDownload}
            onCopy={handleCopy}
          />
        </div>
      </div>
    </div>
  );
}
