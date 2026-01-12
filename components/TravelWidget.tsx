'use client';

type Props = {
  widgetPath: string; // Ora si aspetta il percorso del file HTML
};

export default function TravelWidget({ widgetPath }: Props) {
  return (
    <div className="w-full flex justify-center my-8">
      <iframe 
        src={widgetPath}
        title="Widget Ricerca"
        width="100%"
        height="250" 
        style={{ border: 'none', overflow: 'hidden' }}
        className="rounded-xl shadow-sm"
      />
    </div>
  );
}