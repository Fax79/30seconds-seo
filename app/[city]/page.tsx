import destinations from '@/data/destinations.json';
import { notFound } from 'next/navigation';

// Se vedi rosso qui sotto, controlla di aver rinominato il file in page.tsx!
type Props = {
  params: Promise<{ city: string }>
}

// --- 1. IL MOTORE SEO ---
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const cityData = destinations.find((d) => d.slug === resolvedParams.city);

  if (!cityData) {
    return { title: 'Destinazione non trovata' }
  }
  return {
    title: cityData.meta_title,
    description: cityData.meta_description,
  }
}

// --- 2. LA PAGINA VISIBILE ---
export default async function CityPage({ params }: Props) {
  const resolvedParams = await params;
  const cityData = destinations.find((d) => d.slug === resolvedParams.city);

  if (!cityData) { return notFound(); }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* HERO SECTION */}
      <header className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img src={cityData.hero_image} alt={cityData.hero_title} className="absolute inset-0 w-full h-full object-cover"/>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-md">{cityData.hero_title}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-light">Guida Rapida & Itinerario Smart</p>
        </div>
      </header>

      {/* CONTENUTO */}
      <main className="max-w-3xl mx-auto px-6 py-12 bg-white -mt-20 relative z-30 rounded-t-3xl shadow-xl">
        
        {/* Intro */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8 first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-[#E67E22]">
          {cityData.intro_text}
        </p>

        {/* --- TRAVEL TOOLKIT (WIDGET DINAMICI) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
            
            {/* 1. ASSICURAZIONE */}
            {cityData.widgets.insurance_url && (
                <a href={cityData.widgets.insurance_url} target="_blank" rel="noopener" className="p-4 bg-green-50 border border-green-200 rounded-xl hover:shadow-md transition flex items-center">
                    <span className="text-2xl mr-3">🚑</span>
                    <div>
                        <h4 className="font-bold text-green-900">Assicurazione</h4>
                        <p className="text-xs text-green-700">Sconto riservato</p>
                    </div>
                </a>
            )}

            {/* 2. VOLI */}
            {cityData.widgets.flight_url && (
                <a href={cityData.widgets.flight_url} target="_blank" rel="noopener" className="p-4 bg-sky-50 border border-sky-200 rounded-xl hover:shadow-md transition flex items-center">
                    <span className="text-2xl mr-3">✈️</span>
                    <div>
                        <h4 className="font-bold text-sky-900">Voli Economici</h4>
                        <p className="text-xs text-sky-700">Trova offerte</p>
                    </div>
                </a>
            )}

            {/* 3. ATTRAZIONI */}
            {cityData.widgets.tiqets_url && (
                <a href={cityData.widgets.tiqets_url} target="_blank" rel="noopener" className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:shadow-md transition flex items-center">
                    <span className="text-2xl mr-3">🎟️</span>
                    <div>
                        <h4 className="font-bold text-blue-900">Attrazioni</h4>
                        <p className="text-xs text-blue-700">{cityData.widgets.tiqets_label || "Salta la coda"}</p>
                    </div>
                </a>
            )}

            {/* 4. HOTEL */}
            {cityData.widgets.hotel_link && (
                <a href={cityData.widgets.hotel_link} target="_blank" rel="noopener" className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl hover:shadow-md transition flex items-center">
                    <span className="text-2xl mr-3">🛏️</span>
                    <div>
                        <h4 className="font-bold text-indigo-900">Hotel</h4>
                        <p className="text-xs text-indigo-700">Dove dormire</p>
                    </div>
                </a>
            )}
        </div>

        <hr className="my-10 border-gray-100" />

        {/* ITINERARIO */}
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
        <div className="bg-gradient-to-br from-[#E67E22] to-[#D35400] p-8 rounded-2xl text-center text-white shadow-lg mt-12">
            <h3 className="text-2xl font-bold mb-2">Vuoi l'itinerario completo?</h3>
            <p className="mb-6 text-white/90">Scarica la <strong>Guida PDF Completa</strong> con i giorni 2, 3 e i consigli sui ristoranti.</p>
            <a href="https://www.30secondstoguide.it" className="inline-block bg-white text-[#E67E22] font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100">
                SCARICA IL PDF GRATIS ➜
            </a>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-8 text-center text-gray-500 text-sm mt-12">
        <p>© 2026 30SecondsToGuide</p>
      </footer>
    </div>
  );
}