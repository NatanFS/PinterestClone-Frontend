"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchPin, likePin } from '../../../../lib/api';
import { FaHeart } from 'react-icons/fa';

const getImageResolution = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = src;
  });
};

export default function PinDetail() {
  const { pinId } = useParams();
  const [pin, setPin] = useState(null);
  const [viewersCount, setViewersCount] = useState(0);
  const [likes, setLikes] = useState(0);
  const [resolution, setResolution] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let isMounted = true;

    const loadPin = async () => {
      const pin = await fetchPin(pinId);
      if (isMounted) {
        setPin(pin);
        setLikes(pin.likes);
        setViewersCount((prevCount) => prevCount + 1);

        const res = await getImageResolution(pin.image);
        if (isMounted) {
          setResolution(res);
        }
      }
    };

    loadPin();

    return () => {
      isMounted = false;
      setViewersCount((prevCount) => prevCount - 1);
    };
  }, [pinId]);

  const handleLike = async (e) => {
    e.stopPropagation();
    await likePin(pinId);
    setLikes((prevLikes) => prevLikes + 1);
  };

  if (!pin) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h1 className="text-4xl font-bold mb-2 text-black">{pin.title}</h1>
          <p className="text-gray-600">Currently viewed by {viewersCount} people</p>
        </div>
        <div className="w-full h-96 mb-4 rounded-lg shadow-sm overflow-hidden">
          <img src={pin.image} alt={pin.title} className="w-full h-full object-contain rounded-lg" />
        </div>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-gray-600 mb-4">{pin.description}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Resolution: {resolution.width}x{resolution.height}</p>
              <p className="text-gray-600">Tags: {pin.tags.join(', ')}</p>
            </div>
            <button onClick={handleLike} className="flex items-center text-red-500 hover:text-red-600 transition">
              <FaHeart className="mr-1" /> Like ({likes})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
