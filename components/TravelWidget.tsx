'use client';

type Props = {
  url: string;
};

export default function TravelWidget({ url }: Props) {
  // Costruiamo l'HTML che Travelpayouts si aspetta di vedere
  const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <base target="_parent">
        <style>
          body { margin: 0; padding: 0; background: transparent; display: flex; justify-content: center; }
        </style>
      </head>
      <body>
        <script async src="${url}" charset="utf-8"></script>
      </body>
    </html>
  `;

  return (
    <div className="w-full my-8 flex justify-center min-h-[400px]">
      <iframe
        srcDoc={iframeContent}
        title="Widget Voli New York"
        width="100%"
        height="600"
        style={{ border: 'none', overflow: 'hidden' }}
        className="rounded-xl shadow-lg bg-white"
      />
    </div>
  );
}