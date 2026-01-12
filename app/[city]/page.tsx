import destinations from '@/data/destinations.json';
import { notFound } from 'next/navigation';

// --- Tipi aggiornati in base al nuovo JSON ---
type Widget = {
  type: string;
  label: string;
  subtitle?: string;
  url: string;
  image?: string;
  icon?: string;
  colorClass?: string;
};

type Section = {
  title: string;
  content: string;
  widget?: Widget | null;
};

// Se hai un file di tipi separato, aggiorna anche lì l'interfaccia Destination
// Qui faccio un cast rapido per brevità nel componente
type CityData = {
  slug: string;
  meta_title: string;
  meta_description: string;
  hero_image: string;
  hero_title: string;
  intro_text: string;
  sections: Section[];
};

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    city: destination.slug,
  }));
}

type Props = {
  params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const cityData = destinations.find((d) => d.slug === resolvedParams.city);

  if (!cityData) { return { title: 'Destinazione non trovata' } }
  return {
    title: cityData.meta_title,
    description: cityData.meta_description,
  }
}

export default async function CityPage({ params }: Props) {
  const resolvedParams = await params;
  const rawCityData = destinations.find((d) => d.slug === resolvedParams.city);

  if (!rawCityData) { return notFound(); }

  // Cast dei dati al nuovo tipo (assicurati che il JSON corrisponda!)
  const cityData = rawCityData as unknown as CityData;

  // Render Widget Dinamico
  const renderWidget = (widget: Widget) => {
    if (!widget || !widget.url) return null;

    // Caso 1: Widget con Immagine (es. Banner Tiqets o Heymondo)
    if (widget.image) {
      return (
        <a 
          href={widget.url} 
          target="_blank" 
          rel="noopener" 
          className="block my-6 hover:opacity-90 transition-opacity transform hover:scale-[1.01] duration-300 shadow-md rounded-xl overflow-hidden"
        >
          <img src={widget.image} alt={widget.label} className="w-full h-auto object-cover" />
        </a>
      );
    }

    // Caso 2: Widget "Card" (es. Voli, Hotel, Download PDF)
    return (
      <a 
        href={widget.url} 
        target="_blank" 
        rel="noopener" 
        className={`block my-6 p-5 ${widget.colorClass || 'bg-gray-100'} rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 flex items-center group`}
      >
        <span className="text-3xl mr-4 group-hover:scale-110 transition-transform">{widget.icon || '🔗'}</span>
        <div>
          <h4 className="font-bold text-lg leading-tight">{widget.label}</h4>
          {widget.subtitle && <p className="text-sm opacity-80 mt-1">{widget.subtitle}</p>}
        </div>
        <div className="ml-auto opacity-70 group-hover:opacity-100 transition-opacity">
          ➜
        </div>
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* HERO SECTION - Invariata */}
      <header className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img src={cityData.hero_image} alt={cityData.hero_title} className="absolute inset-0 w-full h-full object-cover"/>
        <div className="relative z-20 text-center px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">{cityData.hero_title}</h1>
          <p className="text-xl text-white/95 max-w-2xl mx-auto font-light">Guida Rapida & Itinerario Smart</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 bg-white -mt-20 relative z-30 rounded-t-3xl shadow-xl min-h-[500px]">
        
        {/* INTRODUZIONE */}
        <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-[#E67E22]">
            {cityData.intro_text}
            </p>
        </div>

        {/* SEZIONI DINAMICHE */}
        <div className="space-y-12">
            {cityData.sections?.map((section, index) => (
                <section key={index} className="border-b border-gray-100 last:border-0 pb-12 last:pb-0">
                    
                    {/* Titolo Sezione */}
                    <h2 className="text-2xl font-bold text-[#2C3E50] mb-4 flex items-center">
                        <span className="bg-[#E67E22] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 font-bold shadow-sm">
                            {index + 1}
                        </span>
                        {section.title}
                    </h2>

                    {/* Contenuto Testuale (gestisce i newlines \n) */}
                    <div className="prose prose-lg text-gray-600 whitespace-pre-line leading-relaxed">
                        {section.content}
                    </div>

                    {/* Widget Specifico per questa sezione (se presente) */}
                    {section.widget && (
                        <div className="mt-6">
                            {renderWidget(section.widget)}
                        </div>
                    )}
                </section>
            ))}
        </div>

        {/* FOOTER INTERNO ALLA CARD (Opzionale, richiamo finale) */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
             <p className="text-gray-400 text-sm italic">Hai trovato utile questa guida?</p>
             <a href="https://www.30secondstoguide.it" className="text-[#E67E22] font-semibold hover:underline text-sm">Crea il tuo itinerario personalizzato con AI</a>
        </div>

      </main>
      
      <footer className="bg-gray-100 py-12 text-center text-gray-500 text-sm mt-12">
        <p>© 2026 30SecondsToGuide</p>
      </footer>
    </div>
  );
}