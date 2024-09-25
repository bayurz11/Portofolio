import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script'; // Import Script component

export default function Document() {
  // Periksa dari awal apakah dark mode aktif
  const setInitialTheme = `
    (function() {
      const savedMode = localStorage.getItem('darkMode');
      const darkMode = savedMode === 'true' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  `;

  return (
    <Html className="dark"> {/* Setel dark mode langsung di SSR */}
      <Head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: setInitialTheme }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
