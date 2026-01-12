'use client';

import { useEffect, useRef } from 'react';

type Props = {
  url: string; // Cambiato in 'url'
};

export default function TravelWidget({ url }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.charset = 'utf-8';
    containerRef.current.appendChild(script);
  }, [url]);

  return (
    <div className="w-full my-8 flex justify-center">
      <div ref={containerRef} className="w-full min-h-[300px]" />
    </div>
  );
}