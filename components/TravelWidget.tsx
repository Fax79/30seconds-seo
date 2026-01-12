'use client';

import { useEffect } from 'react';

type Props = {
  url: string;
};

export default function TravelWidget({ url }: Props) {
  useEffect(() => {
    // Rimuoviamo eventuali script vecchi per evitare conflitti
    const existingScript = document.getElementById('tp-widget-script');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'tp-widget-script';
    script.src = url;
    script.async = true;
    script.charset = 'utf-8';
    
    // Lo iniettiamo nel body così è libero di agire su tutta la pagina
    document.body.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('tp-widget-script');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [url]);

  return (
    <div className="w-full my-12 flex justify-center min-h-[250px]">
      {/* Questo div è dove il widget cercherà di "agganciarsi" */}
      <div className="tp-widget-wrapper w-full" />
    </div>
  );
}