import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Download, Copy, Check, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export function QRPreview({ qrRef, onDownload, onCopy }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('png');

  const handleCopy = async () => {
    const success = await onCopy();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadFormats = [
    { value: 'png', label: 'PNG' },
    { value: 'svg', label: 'SVG' },
    { value: 'jpeg', label: 'JPEG' },
    { value: 'webp', label: 'WebP' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('actions.preview')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Code Display */}
        <div className="flex justify-center p-8 bg-white rounded-lg border">
          <div ref={qrRef} className="qr-container" />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Select value={downloadFormat} onValueChange={setDownloadFormat}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {downloadFormats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => onDownload(downloadFormat)}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('actions.download')}
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={handleCopy}
            className="w-full"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                {t('actions.copied')}
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                {t('actions.copy')}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
