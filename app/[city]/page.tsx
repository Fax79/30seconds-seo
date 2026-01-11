import React from 'react';
import { notFound } from 'next/navigation';
import destinations from '@/data/destinations.json';
import ContextualWidget from '@/components/ContextualWidget';

// 1. Questa funzione dice a Next.js quali pagine esistono
export async function generateStaticParams() {
  return destinations.map((city) => ({
    city: city.slug,
  }));
}

// DEFINIZIONE TIPO: Params ora è una Promise (una promessa)
type Props = {
  params: Promise<{ city: string }>
}

// 2. Aggiungiamo 'async' prima della funzione
export default async function CityPage({ params }: Props) {
  
  // 3. ASPETTIAMO che i parametri siano pronti
  const { city } = await params;

  // Ora usiamo 'city' che è la stringa pulita ("roma")
  const cityData = destinations.find((d) => d.slug === city);

  if (!cityData) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* HEADER / HERO SECTION */}
      <header className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
            src={cityData.hero_image} 
            alt={cityData.hero_title} 
            className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
            {cityData.hero_title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-light">
            Guida Rapida & Itinerario Smart
          </p>
        </div>
      </header>

      {/* CONTENUTO PRINCIPALE */}
      <main className="max-w-3xl mx-auto px-6 py-12 bg-white -mt-20 relative z-30 rounded-t-3xl shadow-xl">
        
        {/* Intro SEO */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8 first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-[#E67E22]">
          {cityData.intro_text}
        </p>

        {/* WIDGET */}
        {cityData.widgets.tiqets_url && (
            <ContextualWidget 
                type="tiqets"
                label={cityData.widgets.tiqets_label}
                link={cityData.widgets.tiqets_url}
                image={cityData.hero_image} 
            />
        )}

        <hr className="my-10 border-gray-100" />

        {/* GIORNO 1 */}
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">
          {cityData.day_1_title}
        </h2>
        <div className="prose text-gray-600 whitespace-pre-line mb-8 leading-7">
            {cityData.day_1_content}
        </div>

        {/* THE WALL */}
        <div className="bg-gradient-to-br from-[#E67E22] to-[#D35400] p-8 rounded-2xl text-center text-white shadow-lg mt-12 transform hover:scale-[1.02] transition-transform">
            <h3 className="text-2xl font-bold mb-2">
                Vuoi l'itinerario completo?
            </h3>
            <p className="mb-6 text-white/90">
                Questa è solo l'anteprima. Scarica subito la <strong>Guida PDF Completa</strong> con i giorni 2, 3 e i consigli sui ristoranti. È gratis.
            </p>
            <a 
                href="https://www.30secondstoguide.it" 
                className="inline-block bg-white text-[#E67E22] font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100"
            >
                VAI ALL'APP E SCARICA IL PDF ➜
            </a>
            <p className="text-xs mt-4 opacity-70">
                Generato dall'AI in 30 secondi su 30SecondsToGuide.it
            </p>
        </div>

      </main>

      <footer className="bg-gray-100 py-8 text-center text-gray-500 text-sm mt-12">
        <p>© 2026 30SecondsToGuide - Travel Tech</p>
      </footer>
    </div>
  );
}