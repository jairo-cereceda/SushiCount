import { type PropsWithChildren } from "react";

export default function HTML({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F6F1EB" />
        <title>SushiCount</title>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/service-worker.js');
            });
          }
        `,
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Esto sustituye al ScrollViewStyleReset y evita errores de TS */
          body, #root, #__next { height: 100vh; width: 100vw; overflow: hidden; }
        `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
