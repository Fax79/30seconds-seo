'use client';

interface TravelWidgetProps {
  url: string;
}

export default function TravelWidget({ url }: TravelWidgetProps) {
  return (
    <div style={{ 
      width: '100%', 
      minHeight: '500px', 
      margin: '40px 0', 
      backgroundColor: '#f9f9f9', 
      border: '2px solid #e2e8f0', 
      borderRadius: '16px', 
      overflow: 'hidden' 
    }}>
      <iframe 
        src={url} 
        title="Widget Voli"
        style={{ width: '100%', height: '500px', border: 'none' }}
      />
    </div>
  );
}