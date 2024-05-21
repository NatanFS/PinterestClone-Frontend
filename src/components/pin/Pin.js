"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart } from 'react-icons/fa';
import { likePin } from '../../lib/api';

const getImageResolution = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = src;
  });
};

const Pin = ({ image, title, tags = [], id, likes: initialLikes, description }) => {
  const router = useRouter();
  const [likes, setLikes] = useState(initialLikes);
  const [resolution, setResolution] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const loadImageResolution = async () => {
      const res = await getImageResolution(image);
      setResolution(res);
    };

    loadImageResolution();
  }, [image]);

  const handleClick = () => {
    router.push(`/routes/pin/${id}`);
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    await likePin(id);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const aspectRatio = (resolution.height / resolution.width);
  const gridRowSpan = Math.ceil(aspectRatio * 19);

  return (
    <div className="p-2 cursor-pointer" onClick={handleClick} style={{ gridRowEnd: `span ${gridRowSpan}` }}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={image} alt={title} className="w-full object-cover" style={{ aspectRatio: `${resolution.width}/${resolution.height}` }} />
        <div className="p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2 text-gray-900 truncate">{title}</h2>
            <p className="text-gray-600 mt-2 truncated">{description}</p>
            <p className="text-gray-600 truncate">{tags ? tags.join(', '): ""}</p>
          </div>
          <button onClick={handleLike} className="self-start mt-2 flex items-center text-red-500 hover:text-red-600 transition">
            <FaHeart className="mr-1" /> Like ({likes})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pin;
