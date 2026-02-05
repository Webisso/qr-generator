import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TabsContent } from '../ui/tabs';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ColorPicker } from '../ui/color-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Upload, X } from 'lucide-react';

export function QRCustomization({ options, onUpdate }) {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const dotsStyles = [
    { value: 'square', label: t('dotsStyles.square') },
    { value: 'dots', label: t('dotsStyles.dots') },
    { value: 'rounded', label: t('dotsStyles.rounded') },
    { value: 'extra-rounded', label: t('dotsStyles.extraRounded') },
    { value: 'classy', label: t('dotsStyles.classy') },
    { value: 'classy-rounded', label: t('dotsStyles.classyRounded') },
  ];

  const cornersStyles = [
    { value: 'square', label: t('cornersStyles.square') },
    { value: 'dot', label: t('cornersStyles.dot') },
    { value: 'extra-rounded', label: t('cornersStyles.extraRounded') },
  ];

  const errorCorrectionLevels = [
    { value: 'L', label: t('errorCorrectionLevels.L') },
    { value: 'M', label: t('errorCorrectionLevels.M') },
    { value: 'Q', label: t('errorCorrectionLevels.Q') },
    { value: 'H', label: t('errorCorrectionLevels.H') },
  ];

  const gradientTypes = [
    { value: 'linear', label: t('gradientTypes.linear') },
    { value: 'radial', label: t('gradientTypes.radial') },
  ];

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({ image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onUpdate({ image: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Basic Settings */}
      <TabsContent value="basic" className="space-y-6 mt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>{t('customization.size')}</Label>
              <span className="text-sm text-muted-foreground">{options.width}px</span>
            </div>
            <Slider
              value={[options.width]}
              onValueChange={([value]) => onUpdate({ width: value, height: value })}
              min={100}
              max={1000}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>{t('customization.margin')}</Label>
              <span className="text-sm text-muted-foreground">{options.margin}px</span>
            </div>
            <Slider
              value={[options.margin]}
              onValueChange={([value]) => onUpdate({ margin: value })}
              min={0}
              max={50}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('customization.errorCorrection')}</Label>
            <Select
              value={options.qrOptions?.errorCorrectionLevel || 'M'}
              onValueChange={(value) =>
                onUpdate({
                  qrOptions: { ...options.qrOptions, errorCorrectionLevel: value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {errorCorrectionLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {t('customization.errorCorrectionDesc')}
            </p>
          </div>
        </div>
      </TabsContent>

      {/* Colors */}
      <TabsContent value="colors" className="space-y-6 mt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('customization.foregroundColor')}</Label>
            <ColorPicker
              value={options.dotsOptions?.color || '#000000'}
              onChange={(color) =>
                onUpdate({
                  dotsOptions: { ...options.dotsOptions, color },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>{t('customization.backgroundColor')}</Label>
            <ColorPicker
              value={options.backgroundOptions?.color || '#ffffff'}
              onChange={(color) =>
                onUpdate({
                  backgroundOptions: { ...options.backgroundOptions, color },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>{t('customization.gradientEnabled')}</Label>
            <Switch
              checked={!!options.dotsOptions?.gradient}
              onCheckedChange={(checked) => {
                if (checked) {
                  onUpdate({
                    dotsOptions: {
                      ...options.dotsOptions,
                      gradient: {
                        type: 'linear',
                        rotation: 0,
                        colorStops: [
                          { offset: 0, color: '#000000' },
                          { offset: 1, color: '#4F46E5' },
                        ],
                      },
                    },
                  });
                } else {
                  const { gradient, ...rest } = options.dotsOptions || {};
                  onUpdate({ dotsOptions: rest });
                }
              }}
            />
          </div>

          {options.dotsOptions?.gradient && (
            <>
              <div className="space-y-2">
                <Label>{t('customization.gradientType')}</Label>
                <Select
                  value={options.dotsOptions.gradient.type}
                  onValueChange={(value) =>
                    onUpdate({
                      dotsOptions: {
                        ...options.dotsOptions,
                        gradient: { ...options.dotsOptions.gradient, type: value },
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('customization.gradientStart')}</Label>
                <ColorPicker
                  value={options.dotsOptions.gradient.colorStops[0].color}
                  onChange={(color) =>
                    onUpdate({
                      dotsOptions: {
                        ...options.dotsOptions,
                        gradient: {
                          ...options.dotsOptions.gradient,
                          colorStops: [
                            { offset: 0, color },
                            options.dotsOptions.gradient.colorStops[1],
                          ],
                        },
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>{t('customization.gradientEnd')}</Label>
                <ColorPicker
                  value={options.dotsOptions.gradient.colorStops[1].color}
                  onChange={(color) =>
                    onUpdate({
                      dotsOptions: {
                        ...options.dotsOptions,
                        gradient: {
                          ...options.dotsOptions.gradient,
                          colorStops: [
                            options.dotsOptions.gradient.colorStops[0],
                            { offset: 1, color },
                          ],
                        },
                      },
                    })
                  }
                />
              </div>

              {options.dotsOptions.gradient.type === 'linear' && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{t('customization.gradientRotation')}</Label>
                    <span className="text-sm text-muted-foreground">
                      {options.dotsOptions.gradient.rotation}°
                    </span>
                  </div>
                  <Slider
                    value={[options.dotsOptions.gradient.rotation]}
                    onValueChange={([value]) =>
                      onUpdate({
                        dotsOptions: {
                          ...options.dotsOptions,
                          gradient: { ...options.dotsOptions.gradient, rotation: value },
                        },
                      })
                    }
                    min={0}
                    max={360}
                    step={1}
                  />
                </div>
              )}
            </>
          )}

          <div className="space-y-2">
            <Label>{t('customization.cornersSquareColor')}</Label>
            <ColorPicker
              value={options.cornersSquareOptions?.color || '#000000'}
              onChange={(color) =>
                onUpdate({
                  cornersSquareOptions: { ...options.cornersSquareOptions, color },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>{t('customization.cornersDotColor')}</Label>
            <ColorPicker
              value={options.cornersDotOptions?.color || '#000000'}
              onChange={(color) =>
                onUpdate({
                  cornersDotOptions: { ...options.cornersDotOptions, color },
                })
              }
            />
          </div>
        </div>
      </TabsContent>

      {/* Style */}
      <TabsContent value="style" className="space-y-6 mt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('customization.dotsStyle')}</Label>
            <Select
              value={options.dotsOptions?.type || 'square'}
              onValueChange={(value) =>
                onUpdate({
                  dotsOptions: { ...options.dotsOptions, type: value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dotsStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t('customization.cornersSquareStyle')}</Label>
            <Select
              value={options.cornersSquareOptions?.type || 'square'}
              onValueChange={(value) =>
                onUpdate({
                  cornersSquareOptions: { ...options.cornersSquareOptions, type: value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cornersStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t('customization.cornersDotStyle')}</Label>
            <Select
              value={options.cornersDotOptions?.type || 'square'}
              onValueChange={(value) =>
                onUpdate({
                  cornersDotOptions: { ...options.cornersDotOptions, type: value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cornersStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      {/* Logo */}
      <TabsContent value="logo" className="space-y-6 mt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('customization.uploadLogo')}</Label>
            <div className="flex gap-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                {t('customization.uploadLogo')}
              </Button>
              {options.image && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={removeLogo}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {options.image && (
            <>
              <div className="flex justify-center p-4 bg-muted rounded-lg">
                <img
                  src={options.image}
                  alt="Logo preview"
                  className="max-h-20 max-w-full object-contain"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>{t('customization.logoSize')}</Label>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((options.imageOptions?.imageSize || 0.4) * 100)}%
                  </span>
                </div>
                <Slider
                  value={[(options.imageOptions?.imageSize || 0.4) * 100]}
                  onValueChange={([value]) =>
                    onUpdate({
                      imageOptions: { ...options.imageOptions, imageSize: value / 100 },
                    })
                  }
                  min={10}
                  max={50}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>{t('customization.logoMargin')}</Label>
                  <span className="text-sm text-muted-foreground">
                    {options.imageOptions?.margin || 10}px
                  </span>
                </div>
                <Slider
                  value={[options.imageOptions?.margin || 10]}
                  onValueChange={([value]) =>
                    onUpdate({
                      imageOptions: { ...options.imageOptions, margin: value },
                    })
                  }
                  min={0}
                  max={30}
                  step={1}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>{t('customization.hideBackgroundDots')}</Label>
                <Switch
                  checked={options.imageOptions?.hideBackgroundDots ?? true}
                  onCheckedChange={(checked) =>
                    onUpdate({
                      imageOptions: { ...options.imageOptions, hideBackgroundDots: checked },
                    })
                  }
                />
              </div>
            </>
          )}
        </div>
      </TabsContent>
    </>
  );
}
