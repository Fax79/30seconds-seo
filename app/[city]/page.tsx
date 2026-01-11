import destinations from '@/data/destinations.json'; 
import { notFound } from 'next/navigation';

// --- 1. IL MOTORE SEO ---
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const cityData = destinations.find((d) => d.slug === resolvedParams.city);

  if (!cityData) {
    return {
      title: 'Destinazione non trovata',
      description: 'Guida non disponibile.'
    }
  }

  return {
    title: cityData.meta_title,
    description: cityData.meta_description,
  }
}

// --- 2. LA PAGINA VISIBILE ---
export default async function CityPage({ params }) {
  
  const resolvedParams = await params;
  const city = resolvedParams.city;
  const cityData = destinations.find((d) => d.slug === city);

  if (!cityData) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* HERO SECTION */}
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
        
        {/* Intro */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8 first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-[#E67E22]">
          {cityData.intro_text}
        </p>

        {/* WIDGET TIQETS */}
        {cityData.widgets.tiqets_url && (
            <div className="my-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm text-center transform transition hover:scale-[1.01]">
                <h3 className="text-xl font-bold text-blue-900 mb-2">🎟️ Salta la Coda a {cityData.hero_title}</h3>
                <p className="text-blue-700 mb-4 text-sm">Non perdere tempo in biglietteria.</p>
                <a 
                    href={cityData.widgets.tiqets_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition-colors"
                >
                    {cityData.widgets.tiqets_label} ➜
                </a>
            </div>
        )}

        <hr className="my-10 border-gray-100" />

        {/* ITINERARIO GIORNO 1 */}
        <section>
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-4 flex items-center">
                <span className="bg-[#E67E22] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 font-bold">1</span>
                {cityData.day_1_title}
            </h2>
            <div className="prose prose-lg text-gray-600 whitespace-pre-line mb-8 leading-relaxed">
                {cityData.day_1_content}
            </div>
        </section>

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
                className="inline-block bg-white text-[#E67E22] font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
                VAI ALL'APP E SCARICA IL PDF ➜
            </a>
            <p className="text-xs mt-4 opacity-70">
                Generato dall'AI in 30 secondi su 30SecondsToGuide.it
            </p>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-8 text-center text-gray-500 text-sm mt-12">
        <p>© 2026 30SecondsToGuide - Travel Tech</p>
        <p className="text-xs mt-2">Made with Next.js & Vercel</p>
      </footer>
    </div>
  );
}