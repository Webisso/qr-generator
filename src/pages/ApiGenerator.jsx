import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import QRCodeStyling from 'qr-code-styling';

// Generate QR content based on type and params
function generateQRContent(type, params) {
  switch (type) {
    case 'url':
    case 'link':
      return params.get('data') || params.get('url') || '';
    
    case 'text':
      return params.get('data') || params.get('text') || '';
    
    case 'email': {
      const email = params.get('email') || params.get('data') || '';
      const subject = params.get('subject') || '';
      const body = params.get('body') || '';
      let result = `mailto:${email}`;
      const emailParams = [];
      if (subject) emailParams.push(`subject=${encodeURIComponent(subject)}`);
      if (body) emailParams.push(`body=${encodeURIComponent(body)}`);
      if (emailParams.length) result += '?' + emailParams.join('&');
      return result;
    }
    
    case 'phone':
    case 'tel':
      return `tel:${params.get('phone') || params.get('data') || ''}`;
    
    case 'sms': {
      const phone = params.get('phone') || params.get('data') || '';
      const message = params.get('message') || '';
      return `sms:${phone}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
    }
    
    case 'wifi': {
      const ssid = params.get('ssid') || params.get('data') || '';
      const password = params.get('password') || '';
      const encryption = params.get('encryption') || 'WPA';
      const hidden = params.get('hidden') === 'true';
      return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};;`;
    }
    
    case 'vcard': {
      const firstName = params.get('firstName') || '';
      const lastName = params.get('lastName') || '';
      const org = params.get('organization') || params.get('org') || '';
      const title = params.get('title') || '';
      const phone = params.get('phone') || '';
      const mobile = params.get('mobile') || '';
      const email = params.get('email') || '';
      const website = params.get('website') || '';
      const street = params.get('street') || '';
      const city = params.get('city') || '';
      const state = params.get('state') || '';
      const zip = params.get('zip') || '';
      const country = params.get('country') || '';
      
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName};${firstName};;;`,
        `FN:${firstName} ${lastName}`,
        org && `ORG:${org}`,
        title && `TITLE:${title}`,
        mobile && `TEL;TYPE=CELL:${mobile}`,
        phone && `TEL;TYPE=WORK:${phone}`,
        email && `EMAIL:${email}`,
        website && `URL:${website}`,
        (street || city || state || zip || country) &&
          `ADR:;;${street};${city};${state};${zip};${country}`,
        'END:VCARD',
      ].filter(Boolean).join('\n');
    }
    
    case 'geo':
    case 'location': {
      const lat = params.get('lat') || params.get('latitude') || '0';
      const lng = params.get('lng') || params.get('longitude') || '0';
      return `geo:${lat},${lng}`;
    }
    
    case 'whatsapp': {
      const phone = (params.get('phone') || params.get('data') || '').replace(/[^0-9]/g, '');
      const message = params.get('message') || '';
      return `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
    }
    
    case 'bitcoin': {
      const address = params.get('address') || params.get('data') || '';
      const amount = params.get('amount') || '';
      const label = params.get('label') || '';
      let uri = `bitcoin:${address}`;
      const btcParams = [];
      if (amount) btcParams.push(`amount=${amount}`);
      if (label) btcParams.push(`label=${encodeURIComponent(label)}`);
      if (btcParams.length) uri += '?' + btcParams.join('&');
      return uri;
    }
    
    case 'event': {
      const title = params.get('title') || params.get('data') || '';
      const description = params.get('description') || '';
      const location = params.get('location') || '';
      const start = params.get('start') || '';
      const end = params.get('end') || '';
      
      const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };
      
      return [
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        description && `DESCRIPTION:${description}`,
        location && `LOCATION:${location}`,
        start && `DTSTART:${formatDate(start)}`,
        end && `DTEND:${formatDate(end)}`,
        'END:VEVENT',
      ].filter(Boolean).join('\n');
    }
    
    default:
      return params.get('data') || params.get('url') || params.get('text') || '';
  }
}

// Parse color - supports hex with or without #
function parseColor(color, defaultColor = '#000000') {
  if (!color) return defaultColor;
  if (color.startsWith('#')) return color;
  if (/^[0-9A-Fa-f]{6}$/.test(color)) return `#${color}`;
  return defaultColor;
}

export function ApiGenerator() {
  const [searchParams] = useSearchParams();
  const qrRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get all parameters
  const type = searchParams.get('type') || 'url';
  const format = searchParams.get('format') || searchParams.get('file') || 'png';
  const size = parseInt(searchParams.get('size') || '300', 10);
  const margin = parseInt(searchParams.get('margin') || '10', 10);
  const fgColor = parseColor(searchParams.get('color') || searchParams.get('fg'));
  const bgColor = parseColor(searchParams.get('bg') || searchParams.get('bgcolor'), '#ffffff');
  const dotsType = searchParams.get('dots') || 'square';
  const cornersSquareType = searchParams.get('corners') || 'square';
  const cornersDotType = searchParams.get('cornerDots') || 'square';
  const errorCorrection = searchParams.get('ec') || searchParams.get('errorCorrection') || 'M';
  const download = searchParams.get('download') === 'true' || searchParams.get('download') === '1';
  const logoUrl = searchParams.get('logo') || '';

  const data = generateQRContent(type, searchParams);

  useEffect(() => {
    if (!data) {
      setError('No data provided. Please include data parameter.');
      setIsLoading(false);
      return;
    }

    const options = {
      width: Math.min(Math.max(size, 50), 2000),
      height: Math.min(Math.max(size, 50), 2000),
      margin: Math.min(Math.max(margin, 0), 100),
      data,
      dotsOptions: {
        color: fgColor,
        type: dotsType,
      },
      backgroundOptions: {
        color: bgColor,
      },
      cornersSquareOptions: {
        color: fgColor,
        type: cornersSquareType,
      },
      cornersDotOptions: {
        color: fgColor,
        type: cornersDotType,
      },
      qrOptions: {
        errorCorrectionLevel: errorCorrection,
      },
    };

    if (logoUrl) {
      options.image = logoUrl;
      options.imageOptions = {
        crossOrigin: 'anonymous',
        margin: 5,
        imageSize: 0.4,
        hideBackgroundDots: true,
      };
    }

    const qr = new QRCodeStyling(options);
    setQrCode(qr);
    setIsLoading(false);

    // Auto download if requested
    if (download && qr) {
      setTimeout(() => {
        qr.download({
          name: 'qrcode',
          extension: format,
        });
      }, 500);
    }
  }, [data, size, margin, fgColor, bgColor, dotsType, cornersSquareType, cornersDotType, errorCorrection, logoUrl, download, format]);

  useEffect(() => {
    if (qrCode && qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
    }
  }, [qrCode]);

  const handleDownload = () => {
    if (qrCode) {
      qrCode.download({
        name: 'qrcode',
        extension: format,
      });
    }
  };

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#f8f9fa',
      }}>
        <div style={{
          padding: '20px 40px',
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
        }}>
          <h2 style={{ margin: '0 0 10px 0' }}>Error</h2>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
        <a
          href="/api-docs"
          style={{
            marginTop: '20px',
            color: '#3b82f6',
            textDecoration: 'underline',
          }}
        >
          View API Documentation
        </a>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <p>Generating QR Code...</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f8f9fa',
    }}>
      <div
        ref={qrRef}
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      />
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={handleDownload}
          style={{
            padding: '10px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Download {format.toUpperCase()}
        </button>
        <a
          href="/"
          style={{
            padding: '10px 24px',
            backgroundColor: '#e5e7eb',
            color: '#374151',
            border: 'none',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Go to Generator
        </a>
      </div>
      <p style={{
        marginTop: '20px',
        fontSize: '12px',
        color: '#6b7280',
      }}>
        Add <code style={{ backgroundColor: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>&download=true</code> to auto-download
      </p>
    </div>
  );
}
