'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import destinations from '@/data/destinations.json';

export default function GuidesHome() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Estrazione dinamica dei tag (Continenti e Nazioni)
  const filters = useMemo(() => {
    const uniqueFilters = new Map();
    uniqueFilters.set('all', 'Tutte le destinazioni');
    
    destinations.forEach(dest => {
      if (dest.continent) uniqueFilters.set(dest.continent, dest.continent_label);
      if (dest.country) uniqueFilters.set(dest.country, dest.country_label);
    });
    return Array.from(uniqueFilters.entries());
  }, []);

  // Logica di filtraggio
  const filteredDestinations = destinations.filter(dest => 
    activeFilter === 'all' || dest.continent === activeFilter || dest.country === activeFilter
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        Le nostre <span className="text-orange-600">Guide Pocket</span>
      </h1>

      {/* Barra dei Filtri dinamica */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map(([key, label]) => (
          <button 
            key={key} 
            onClick={() => setActiveFilter(key)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              activeFilter === key ? 'bg-orange-600 text-white' : 'bg-white text-gray-600 border'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Griglia delle Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredDestinations.map(dest => (
          <Link href={`/guide/${dest.slug}`} key={dest.slug} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
            <div className="relative h-48">
              <img src={dest.hero_image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold">{dest.hero_title}</h2>
              <p className="text-gray-500 text-sm mt-2">{dest.meta_description}</p>
              <div className="mt-4 text-orange-600 font-bold text-sm">Apri la guida ➜</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
