import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import './styles/globals.css';
import './components/ds/ds.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter
      basename="/sotkissite_other"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <LanguageProvider>
      <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
