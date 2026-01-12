'use client';

type Props = {
  widgetPath: string;
};

export default function TravelWidget({ widgetPath }: Props) {
  return (
    <div className="w-full flex justify-center my-8 min-h-[300px]">
      <iframe 
        src={widgetPath}
        title="Widget Ricerca"
        width="100%"
        height="500" // Aumentiamo l'altezza per evitare che il widget venga tagliato
        style={{ border: 'none' }}
        className="rounded-xl overflow-visible"
      />
    </div>
  );
}