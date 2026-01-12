'use client';

type Props = {
  url: string;
};

export default function TravelWidget({ url }: Props) {
  return (
    <div className="w-full my-12 flex justify-center">
      <div className="w-full max-w-[800px] min-h-[500px] bg-gray-50 rounded-2xl overflow-hidden shadow-inner border border-gray-100">
        <iframe 
          src={url} 
          title="Widget Viaggi"
          width="100%" 
          height="500px" 
          style={{ border: 'none', display: 'block' }}
        />
      </div>
    </div>
  );
}