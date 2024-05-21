"use client";

import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Pin from '../components/pin/Pin';
import UploadForm from '../components/UploadForm';
import { fetchPins, uploadPin } from '../lib/api';
import { useUser } from '../components/Layout';

export default function HomePage() {
  const [pins, setPins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();

  useEffect(() => {
    const loadPins = async () => {
      const pins = await fetchPins();
      setPins(pins);
    };

    loadPins();
  }, []);

  const handleUpload = async (newPin) => {
    const uploadedPin = await uploadPin(newPin);
    setPins([...pins, uploadedPin]);
  };

  const filteredPins = pins.filter(pin =>
    pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <span className='text-lg font-bold text-gray-900'>
        {user ? (
          <>Hello, {user.username}!</>
        ) : (
          <>Hello, guest!</>
        )}
      </span>
      
      <div className="relative mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded pl-10 text-gray-900"
        />
        <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 auto-rows-auto grid-flow-row-dense">
        {filteredPins.map((pin) => (
          <Pin key={pin.id} image={pin.image} title={pin.title} tags={pin.tags} id={pin.id} likes={pin.likes} description={pin.description} />
        ))}
      </div>
      <UploadForm onUpload={handleUpload} />
    </div>
  );
}