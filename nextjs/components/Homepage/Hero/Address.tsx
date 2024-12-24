import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface Address {
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: "AC" | "AL" | "AP" | "AM" | "BA" | "CE" | "DF" | "ES" | "GO" | "MA" | "MT" | "MS" | "MG" | "PA" | "PB" | "PR" | "PE" | "PI" | "RJ" | "RN" | "RS" | "RO" | "RR" | "SC" | "SP" | "SE" | "TO";
  zipCode?: string;
  googleMapsUrl?: string;
  
}

const AddressInfo = ({ address }: { address: Address }) => {
  const [showMap, setShowMap] = useState(true);
  const [mapUrl, setMapUrl] = useState('');

  const loadMap = async () => {
    if (!showMap) return;
    
    const fullAddress = `${address.street}, ${address.number} - ${address.city}`;
    const response = await fetch(`/api/maps?address=${encodeURIComponent(fullAddress)}`);
    const data = await response.json();
    setMapUrl(data.url);
  };

  useEffect(() => {
    loadMap();
  }, [showMap]);


  return (
    <div className="w-full border-t pt-4 mt-4">
      <div className="flex items-center gap-2 mb-2 text-semantic-primary">
        <FaMapMarkerAlt size={20} />
        <span className="font-semibold">Endereço</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {address.street}, {address.number}
        {address.complement && ` - ${address.complement}`}
        <br />
        {address.neighborhood} - {address.city}/{address.state}
        <br />
        CEP: {address.zipCode}
      </p>
      <button
        onClick={() => setShowMap(!showMap)}
        className="text-sm text-semantic-primary hover:text-semantic-primary-600 transition"
      >
        {showMap ? 'Ocultar mapa' : 'Ver no mapa'}
      </button>

      {showMap && mapUrl && (
        <div className="mt-2 rounded-lg overflow-hidden h-48 bg-gray-100">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            src={mapUrl}
          />
        </div>
      )}
    </div>
  );
};

export default AddressInfo;
