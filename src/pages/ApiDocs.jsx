import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Link as LinkIcon,
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
  Copy,
  Check,
  ExternalLink,
  Code,
  Image,
  Palette,
  Settings,
  ArrowLeft,
} from 'lucide-react';

const baseUrl = window.location.origin;

const apiExamples = {
  url: {
    icon: LinkIcon,
    title: 'URL / Link',
    description: 'Generate QR code for a website URL',
    params: [
      { name: 'type', value: 'url', required: true },
      { name: 'data', value: 'https://example.com', required: true },
    ],
    example: `${baseUrl}/generate?type=url&data=https://example.com`,
  },
  text: {
    icon: Type,
    title: 'Plain Text',
    description: 'Generate QR code for plain text content',
    params: [
      { name: 'type', value: 'text', required: true },
      { name: 'data', value: 'Hello World!', required: true },
    ],
    example: `${baseUrl}/generate?type=text&data=Hello%20World!`,
  },
  email: {
    icon: Mail,
    title: 'Email',
    description: 'Generate QR code that opens email client',
    params: [
      { name: 'type', value: 'email', required: true },
      { name: 'email', value: 'contact@example.com', required: true },
      { name: 'subject', value: 'Hello', required: false },
      { name: 'body', value: 'Message content', required: false },
    ],
    example: `${baseUrl}/generate?type=email&email=contact@example.com&subject=Hello`,
  },
  phone: {
    icon: Phone,
    title: 'Phone Number',
    description: 'Generate QR code for phone call',
    params: [
      { name: 'type', value: 'phone', required: true },
      { name: 'data', value: '+1234567890', required: true },
    ],
    example: `${baseUrl}/generate?type=phone&data=+1234567890`,
  },
  sms: {
    icon: MessageSquare,
    title: 'SMS',
    description: 'Generate QR code for SMS message',
    params: [
      { name: 'type', value: 'sms', required: true },
      { name: 'phone', value: '+1234567890', required: true },
      { name: 'message', value: 'Hello!', required: false },
    ],
    example: `${baseUrl}/generate?type=sms&phone=+1234567890&message=Hello!`,
  },
  wifi: {
    icon: Wifi,
    title: 'WiFi Network',
    description: 'Generate QR code to connect to WiFi',
    params: [
      { name: 'type', value: 'wifi', required: true },
      { name: 'ssid', value: 'NetworkName', required: true },
      { name: 'password', value: 'password123', required: true },
      { name: 'encryption', value: 'WPA', required: false, options: ['WPA', 'WEP', 'nopass'] },
      { name: 'hidden', value: 'false', required: false, options: ['true', 'false'] },
    ],
    example: `${baseUrl}/generate?type=wifi&ssid=MyNetwork&password=secret123&encryption=WPA`,
  },
  vcard: {
    icon: User,
    title: 'vCard / Contact',
    description: 'Generate QR code for contact information',
    params: [
      { name: 'type', value: 'vcard', required: true },
      { name: 'firstName', value: 'John', required: true },
      { name: 'lastName', value: 'Doe', required: true },
      { name: 'phone', value: '+1234567890', required: false },
      { name: 'mobile', value: '+1234567890', required: false },
      { name: 'email', value: 'john@example.com', required: false },
      { name: 'organization', value: 'Company', required: false },
      { name: 'title', value: 'Developer', required: false },
      { name: 'website', value: 'https://example.com', required: false },
      { name: 'street', value: '123 Main St', required: false },
      { name: 'city', value: 'New York', required: false },
      { name: 'state', value: 'NY', required: false },
      { name: 'zip', value: '10001', required: false },
      { name: 'country', value: 'USA', required: false },
    ],
    example: `${baseUrl}/generate?type=vcard&firstName=John&lastName=Doe&email=john@example.com&phone=+1234567890`,
  },
  location: {
    icon: MapPin,
    title: 'Geo Location',
    description: 'Generate QR code for map coordinates',
    params: [
      { name: 'type', value: 'location', required: true },
      { name: 'lat', value: '40.7128', required: true },
      { name: 'lng', value: '-74.0060', required: true },
    ],
    example: `${baseUrl}/generate?type=location&lat=40.7128&lng=-74.0060`,
  },
  whatsapp: {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Generate QR code for WhatsApp chat',
    params: [
      { name: 'type', value: 'whatsapp', required: true },
      { name: 'phone', value: '1234567890', required: true },
      { name: 'message', value: 'Hello!', required: false },
    ],
    example: `${baseUrl}/generate?type=whatsapp&phone=1234567890&message=Hello!`,
  },
  event: {
    icon: Calendar,
    title: 'Calendar Event',
    description: 'Generate QR code for calendar event',
    params: [
      { name: 'type', value: 'event', required: true },
      { name: 'title', value: 'Meeting', required: true },
      { name: 'start', value: '2024-12-25T10:00:00', required: true },
      { name: 'end', value: '2024-12-25T11:00:00', required: false },
      { name: 'location', value: 'Office', required: false },
      { name: 'description', value: 'Team meeting', required: false },
    ],
    example: `${baseUrl}/generate?type=event&title=Meeting&start=2024-12-25T10:00:00&location=Office`,
  },
  bitcoin: {
    icon: Bitcoin,
    title: 'Bitcoin',
    description: 'Generate QR code for Bitcoin payment',
    params: [
      { name: 'type', value: 'bitcoin', required: true },
      { name: 'address', value: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', required: true },
      { name: 'amount', value: '0.001', required: false },
      { name: 'label', value: 'Payment', required: false },
    ],
    example: `${baseUrl}/generate?type=bitcoin&address=1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2&amount=0.001`,
  },
};

const styleParams = [
  { name: 'size', description: 'QR code size in pixels', default: '300', example: '500' },
  { name: 'margin', description: 'Margin around QR code in pixels', default: '10', example: '20' },
  { name: 'format', description: 'Output format', default: 'png', options: ['png', 'svg', 'jpeg', 'webp'] },
  { name: 'color', description: 'Foreground color (hex without #)', default: '000000', example: '3b82f6' },
  { name: 'bg', description: 'Background color (hex without #)', default: 'ffffff', example: 'f0f0f0' },
  { name: 'dots', description: 'Dots style', default: 'square', options: ['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'] },
  { name: 'corners', description: 'Corner squares style', default: 'square', options: ['square', 'dot', 'extra-rounded'] },
  { name: 'cornerDots', description: 'Corner dots style', default: 'square', options: ['square', 'dot', 'extra-rounded'] },
  { name: 'ec', description: 'Error correction level', default: 'M', options: ['L', 'M', 'Q', 'H'] },
  { name: 'logo', description: 'Logo image URL (must be CORS enabled)', default: '', example: 'https://example.com/logo.png' },
  { name: 'download', description: 'Auto-download the QR code', default: 'false', options: ['true', 'false'] },
];

function CodeBlock({ code, language = 'text' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code className="text-foreground">{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}

function ParamTable({ params }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-3 font-medium">Parameter</th>
            <th className="text-left py-2 px-3 font-medium">Value</th>
            <th className="text-left py-2 px-3 font-medium">Required</th>
            <th className="text-left py-2 px-3 font-medium">Options</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param) => (
            <tr key={param.name} className="border-b">
              <td className="py-2 px-3">
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{param.name}</code>
              </td>
              <td className="py-2 px-3 text-muted-foreground">{param.value || param.example || param.default || '-'}</td>
              <td className="py-2 px-3">
                {param.required ? (
                  <span className="text-red-500 text-xs font-medium">Required</span>
                ) : (
                  <span className="text-muted-foreground text-xs">Optional</span>
                )}
              </td>
              <td className="py-2 px-3 text-xs text-muted-foreground">
                {param.options?.join(', ') || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApiTypeCard({ type, data }) {
  const Icon = data.icon;
  const [testUrl, setTestUrl] = useState(data.example);

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{data.title}</CardTitle>
            <CardDescription>{data.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ParamTable params={data.params} />
        
        <div className="space-y-2">
          <Label>Example URL</Label>
          <CodeBlock code={data.example} />
        </div>

        <div className="flex gap-2">
          <a
            href={data.example}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
          >
            <ExternalLink className="h-4 w-4" />
            Try it
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

function UrlBuilder() {
  const [params, setParams] = useState({
    type: 'url',
    data: 'https://example.com',
    size: '300',
    format: 'png',
    color: '000000',
    bg: 'ffffff',
    dots: 'square',
  });

  const buildUrl = () => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
    return `${baseUrl}/generate?${searchParams.toString()}`;
  };

  const updateParam = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const generatedUrl = buildUrl();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          URL Builder
        </CardTitle>
        <CardDescription>Build your API URL interactively</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <select
              value={params.type}
              onChange={(e) => updateParam('type', e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              {Object.keys(apiExamples).map((type) => (
                <option key={type} value={type}>{apiExamples[type].title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Data / URL</Label>
            <Input
              value={params.data}
              onChange={(e) => updateParam('data', e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Size (px)</Label>
            <Input
              type="number"
              value={params.size}
              onChange={(e) => updateParam('size', e.target.value)}
              min="50"
              max="2000"
            />
          </div>
          <div className="space-y-2">
            <Label>Format</Label>
            <select
              value={params.format}
              onChange={(e) => updateParam('format', e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <option value="png">PNG</option>
              <option value="svg">SVG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Color (hex)</Label>
            <div className="flex gap-2">
              <Input
                value={params.color}
                onChange={(e) => updateParam('color', e.target.value)}
                placeholder="000000"
              />
              <input
                type="color"
                value={`#${params.color}`}
                onChange={(e) => updateParam('color', e.target.value.slice(1))}
                className="h-10 w-10 rounded border cursor-pointer"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Background (hex)</Label>
            <div className="flex gap-2">
              <Input
                value={params.bg}
                onChange={(e) => updateParam('bg', e.target.value)}
                placeholder="ffffff"
              />
              <input
                type="color"
                value={`#${params.bg}`}
                onChange={(e) => updateParam('bg', e.target.value.slice(1))}
                className="h-10 w-10 rounded border cursor-pointer"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Dots Style</Label>
            <select
              value={params.dots}
              onChange={(e) => updateParam('dots', e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <option value="square">Square</option>
              <option value="dots">Dots</option>
              <option value="rounded">Rounded</option>
              <option value="extra-rounded">Extra Rounded</option>
              <option value="classy">Classy</option>
              <option value="classy-rounded">Classy Rounded</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Generated URL</Label>
          <CodeBlock code={generatedUrl} />
        </div>

        <div className="flex gap-2 flex-wrap">
          <a
            href={generatedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
          >
            <ExternalLink className="h-4 w-4" />
            Open in New Tab
          </a>
          <a
            href={`${generatedUrl}&download=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80"
          >
            <Image className="h-4 w-4" />
            Download
          </a>
        </div>

        <div className="space-y-2">
          <Label>Use in HTML</Label>
          <CodeBlock code={`<!-- Note: This is a client-side generator, not a direct image API -->\n<a href="${generatedUrl}" target="_blank">\n  Click to generate QR Code\n</a>`} />
        </div>
      </CardContent>
    </Card>
  );
}

export function ApiDocs() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Generator
          </Link>
          <h1 className="text-4xl font-bold mb-2">API Documentation</h1>
          <p className="text-muted-foreground text-lg">
            Generate QR codes programmatically using URL parameters
          </p>
        </div>

        <Tabs defaultValue="quickstart" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
            <TabsTrigger value="types">QR Types</TabsTrigger>
            <TabsTrigger value="styling">Styling</TabsTrigger>
            <TabsTrigger value="builder">URL Builder</TabsTrigger>
          </TabsList>

          <TabsContent value="quickstart" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Quick Start
                </CardTitle>
                <CardDescription>
                  Get started with the QR Code API in seconds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Base URL</h3>
                  <CodeBlock code={`${baseUrl}/generate`} />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Simple Example</h3>
                  <p className="text-muted-foreground text-sm">
                    Generate a QR code for a URL:
                  </p>
                  <CodeBlock code={`${baseUrl}/generate?type=url&data=https://example.com`} />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">With Styling</h3>
                  <p className="text-muted-foreground text-sm">
                    Add custom colors and styling:
                  </p>
                  <CodeBlock code={`${baseUrl}/generate?type=url&data=https://example.com&size=400&color=3b82f6&dots=rounded`} />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Auto Download</h3>
                  <p className="text-muted-foreground text-sm">
                    Add <code className="bg-muted px-1.5 py-0.5 rounded">&download=true</code> to automatically download:
                  </p>
                  <CodeBlock code={`${baseUrl}/generate?type=url&data=https://example.com&format=svg&download=true`} />
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">⚠️ Note</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    This is a client-side QR code generator. The URL opens a page that generates and displays the QR code. 
                    It cannot be used directly as an image source (e.g., <code>&lt;img src="..."&gt;</code>). 
                    For that use case, you would need a server-side API.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="types" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(apiExamples).map(([type, data]) => (
                <ApiTypeCard key={type} type={type} data={data} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="styling" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Styling Parameters
                </CardTitle>
                <CardDescription>
                  Customize the appearance of your QR codes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ParamTable params={styleParams.map(p => ({
                  name: p.name,
                  value: p.description,
                  required: false,
                  options: p.options,
                }))} />

                <div className="space-y-4">
                  <h3 className="font-semibold">Examples</h3>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Blue rounded QR code:</p>
                    <CodeBlock code={`${baseUrl}/generate?type=url&data=https://example.com&color=3b82f6&dots=rounded&corners=extra-rounded`} />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Large SVG with custom background:</p>
                    <CodeBlock code={`${baseUrl}/generate?type=url&data=https://example.com&size=500&format=svg&bg=f0f9ff&color=1e40af`} />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">High error correction for logo:</p>
                    <CodeBlock code={`${baseUrl}/generate?type=url&data=https://example.com&ec=H&logo=https://example.com/logo.png`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <UrlBuilder />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
