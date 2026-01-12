'use client';

import { useEffect, useRef } from 'react';

type Props = {
  scriptSrc: string;
};

export default function TravelWidget({ scriptSrc }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    // TRUCCO: Scriviamo un mini-sito dentro l'iframe che contiene SOLO lo script.
    // In questo modo il "document.write" funziona perché è isolato da React.
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_parent"> <style>
            body { margin: 0; padding: 0; display: flex; justify-content: center; background-color: transparent; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <script async src="${scriptSrc}" charset="utf-8"></script>
        </body>
      </html>
    `);
    doc.close();

  }, [scriptSrc]);

  return (
    <div className="w-full flex justify-center">
      <iframe 
        ref={iframeRef} 
        title="Travel Search Widget"
        width="100%"
        height="200" // Altezza di partenza
        style={{ border: 'none', overflow: 'hidden', minHeight: '220px' }} 
      />
    </div>
  );
}