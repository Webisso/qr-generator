# 🔲 QR Code Generator

<div align="center">

![QR Generator](https://img.shields.io/badge/QR-Generator-blue?style=for-the-badge&logo=qrcode)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Modern, fully client-side, multi-language QR code generator**

[🌐 Demo](https://webisso.github.io/qr-generator/) | [📖 API Docs](https://webisso.github.io/qr-generator/api-docs) | [🐛 Issues](https://github.com/webisso/qr-generator/issues)

</div>

---

## ✨ Features

### 🎯 17 Different QR Code Types
| Type | Description |
|------|-------------|
| 🔗 **URL** | Website links |
| 📝 **Text** | Plain text content |
| 📧 **Email** | Email address, subject, and body |
| 📞 **Phone** | Initiate phone calls |
| 💬 **SMS** | Send SMS messages |
| 📶 **WiFi** | Auto-connect to WiFi networks |
| 👤 **vCard** | Share contact information |
| 📍 **Location** | GPS coordinates |
| 💚 **WhatsApp** | WhatsApp messages |
| ₿ **Bitcoin** | Cryptocurrency payment addresses |
| 📅 **Event** | Calendar events |
| 📱 **App** | App Store/Play Store links |
| 🔐 **2FA/OTP** | Two-factor authentication |
| 🎫 **Coupon** | Discount coupons |
| ⭐ **Review** | Google/Yelp reviews |
| 📋 **Clipboard** | Copy to clipboard |
| 🆔 **UPI** | India payment system |

### 🎨 Full Customization
- **Colors**: Foreground, background, and gradient support
- **Dot Styles**: Square, rounded, extra-rounded, dots
- **Corner Styles**: Square, dot, extra-rounded
- **Logo**: Add custom logo to center with size adjustment
- **Error Correction**: L, M, Q, H levels
- **Size & Margin**: Full control

### 🌍 43 Language Support
English, Turkish, German, French, Spanish, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Arabic, and many more...

### 📥 Multiple Export Formats
- PNG (transparent background)
- JPEG
- SVG (vector)
- WebP

### 🔌 API Support
Programmatic QR code generation via URL parameters:
```
https://webisso.github.io/qr-generator/generate?type=url&data=https://example.com
```

---

## 🚀 Quick Start

### Requirements
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/webisso/qr-generator.git

# Navigate to project directory
cd qr-generator

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Create optimized build
npm run build

# Serve build folder
npx serve -s build
```

---

## 📖 Usage

### Web Interface

1. **Select QR Type**: Choose the desired QR code type from the left panel
2. **Enter Information**: Fill in the required fields based on the selected type
3. **Customize**: Add colors, styles, and logo
4. **Download**: Export in PNG, JPEG, SVG, or WebP format

### API Usage

#### Simple URL QR Code
```
/generate?type=url&data=https://google.com
```

#### Customized QR Code
```
/generate?type=url&data=https://example.com&size=400&color=3B82F6&dots=rounded&corners=dot
```

#### WiFi QR Code
```
/generate?type=wifi&ssid=MyNetwork&password=12345&encryption=WPA
```

#### vCard QR Code
```
/generate?type=vcard&name=John%20Doe&phone=+1234567890&email=john@example.com
```

#### Auto Download
```
/generate?type=url&data=https://example.com&download=true&format=png
```

### API Parameters

| Parameter | Description | Default | Options |
|-----------|-------------|---------|---------|
| `type` | QR code type | `url` | url, text, email, phone, sms, wifi, vcard, location, whatsapp, bitcoin, event |
| `data` | Main content | - | - |
| `size` | Size (px) | `300` | 100-1000 |
| `margin` | Margin | `10` | 0-50 |
| `color` | Foreground color | `000000` | Hex (without #) |
| `bg` | Background color | `ffffff` | Hex (without #) |
| `dots` | Dot style | `rounded` | square, rounded, dots, extra-rounded |
| `corners` | Corner style | `dot` | square, dot, extra-rounded |
| `ec` | Error correction | `H` | L, M, Q, H |
| `logo` | Logo URL | - | Valid image URL |
| `download` | Auto download | `false` | true, false |
| `format` | Download format | `png` | png, jpeg, svg, webp |

---

## 🏗️ Project Structure

```
qr-generator/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── select.jsx
│   │   │   ├── slider.jsx
│   │   │   ├── tabs.jsx
│   │   │   └── ...
│   │   ├── QRGenerator/           # QR generator components
│   │   │   ├── QRGenerator.jsx
│   │   │   ├── QRTypeSelector.jsx
│   │   │   ├── QRDataForm.jsx
│   │   │   ├── QRCustomization.jsx
│   │   │   └── QRPreview.jsx
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   └── LanguageSelector/
│   │       └── LanguageSelector.jsx
│   ├── pages/
│   │   ├── ApiGenerator.jsx       # API endpoint page
│   │   ├── ApiDocs.jsx            # API documentation
│   │   └── index.js
│   ├── locales/                   # Language files
│   │   ├── en-US.json
│   │   ├── tr.json
│   │   └── ... (43 languages)
│   ├── lib/
│   │   └── utils.js               # Utility functions
│   ├── i18n.js                    # i18n configuration
│   ├── App.js
│   ├── App.css
│   └── index.js
├── craco.config.js                # CRACO configuration
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js
└── package.json
```

---

## 🛠️ Technologies

| Technology | Description |
|------------|-------------|
| [React 19](https://react.dev/) | UI framework |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first CSS |
| [Radix UI](https://www.radix-ui.com/) | Headless UI components |
| [qr-code-styling](https://github.com/nickyurov/qr-code-styling) | QR code generation library |
| [i18next](https://www.i18next.com/) | Internationalization |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Lucide React](https://lucide.dev/) | Icon library |
| [CRACO](https://craco.js.org/) | CRA configuration override |

---

## 🌐 Deployment

### GitHub Pages

```bash
# Install gh-pages package
npm install gh-pages --save-dev --legacy-peer-deps

# Add homepage to package.json
# "homepage": "https://webisso.github.io/qr-generator"

# Deploy
npm run build
npx gh-pages -d build
```

### Vercel / Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Output directory: `build`
4. Deploy!

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

<div align="center">

**[Webisso LLC](https://webisso.com)**

[![Website](https://img.shields.io/badge/Website-webisso.com-blue?style=flat-square)](https://webisso.com)
[![GitHub](https://img.shields.io/badge/GitHub-webisso-black?style=flat-square&logo=github)](https://github.com/webisso)

</div>

---

<div align="center">

⭐ If you like this project, don't forget to give it a star!

</div>
