'use client';

type Props = {
  url: string;
};

export default function TravelWidget({ url }: Props) {
  return (
    <div className="w-full my-12 overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white">
      <iframe 
        src={url} 
        title="Widget Viaggi"
        // Impostiamo un'altezza fissa molto chiara
        style={{ 
          width: '100%', 
          height: '400px', 
          border: 'none',
          display: 'block'
        }}
        // Questo impedisce che l'altezza venga ignorata
        height="400"
        scrolling="no"
      />
    </div>
  );
}