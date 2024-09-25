// pages/_app.tsx
import '../styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
