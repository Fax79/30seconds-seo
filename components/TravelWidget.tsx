'use client';

import { useEffect, useRef } from 'react';

type Props = {
  scriptSrc: string;
};

export default function TravelWidget({ scriptSrc }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Puliamo il contenitore (per evitare duplicati se cambi pagina)
    containerRef.current.innerHTML = '';

    // 2. Creiamo il tag script manualmente
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.charset = 'utf-8';

    // 3. Lo inseriamo fisicamente DENTRO questo div
    containerRef.current.appendChild(script);
  }, [scriptSrc]);

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-[200px] flex justify-center items-center bg-transparent"
    >
      {/* Il widget apparirà qui dentro */}
    </div>
  );
}