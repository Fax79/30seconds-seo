'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import destinationsData from '@/data/destinations.json';

// Definizione del tipo per evitare errori di compilazione TypeScript in fase di build su Vercel
type Destination = {
  slug: string;
  continent?: string;
  continent_label?: string;
  country?: string;
  country_label?: string;
  hero_title: string;
  hero_image: string;
  meta_description: string;
  [key: string]: any;
};

// Casting esplicito del file JSON importato
const destinations = destinationsData as Destination[];

export default function GuidesHome() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Estrazione dinamica dei tag per i filtri (Continenti e Nazioni)
  const filters = useMemo(() => {
    const uniqueFilters = new Map();
    uniqueFilters.set('all', 'Tutte le destinazioni');
    
    destinations.forEach(dest => {
      if (dest.continent && dest.continent_label) {
        uniqueFilters.set(dest.continent, dest.continent_label);
      }
      if (dest.country && dest.country_label) {
        uniqueFilters.set(dest.country, dest.country_label);
      }
    });
    return Array.from(uniqueFilters.entries());
  }, []);

  // Logica di filtraggio delle guide
  const filteredDestinations = destinations.filter(dest => 
    activeFilter === 'all' || dest.continent === activeFilter || dest.country === activeFilter
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
        Le nostre <span className="text-orange-600">Guide Pocket</span>
      </h1>

      {/* Barra dei Filtri */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map(([key, label]) => (
          <button 
            key={key} 
            onClick={() => setActiveFilter(key)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              activeFilter === key 
                ? 'bg-orange-600 text-white' 
                : 'bg-white text-gray-600 border hover:border-orange-300 hover:text-orange-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Griglia delle Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredDestinations.map(dest => (
          <Link 
            href={`/${dest.slug}`} 
            key={dest.slug} 
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={dest.hero_image} 
                alt={dest.hero_title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-bold mb-2 text-gray-900">{dest.hero_title}</h2>
              <p className="text-gray-500 text-sm line-clamp-2 flex-grow">{dest.meta_description}</p>
              <div className="mt-4 text-orange-600 font-bold text-sm">
                Apri la guida ➜
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
