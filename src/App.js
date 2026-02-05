import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QRGenerator } from './components/QRGenerator';
import { ApiGenerator, ApiDocs } from './pages';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <QRGenerator />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<ApiGenerator />} />
        <Route path="/api-docs" element={<ApiDocs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
