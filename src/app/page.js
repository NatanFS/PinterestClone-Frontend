"use client";

import { useState, useContext, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Pin from '../components/pin/Pin';
import UploadForm from '../components/UploadForm';
import { fetchPins, uploadPin } from '../lib/api';
import { UserContext } from '../context/UserContext';

const HomePage = () => {
  const [pins, setPins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('title');
  const [orderCriteria, setOrderCriteria] = useState('-created_at');
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const { user } = useContext(UserContext);

  const loadPins = async (url = null) => {
    try {
      setPins([]);
      const data = await fetchPins(searchQuery, filterType, orderCriteria, url);
      setPins(data.results);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
    } catch (error) {
      console.error("Failed to fetch pins:", error);
    }
  };

  useEffect(() => {
    loadPins();
  }, [orderCriteria]);

  const handleUpload = async (newPin) => {
    try {
      const uploadedPin = await uploadPin(newPin);
      setPins(prevPins => [...prevPins, uploadedPin]);
    } catch (error) {
      console.error("Failed to upload pin:", error);
    }
  };

  const handleSearchIconClick = () => {
    loadPins();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      loadPins();
    }
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      loadPins(nextPageUrl);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      loadPins(previousPageUrl);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <span className='text-lg font-bold text-gray-900'>
        {user ? <>Hello, {user.username}!</> : <>Hello, guest!</>}
      </span>

      <div className="relative mt-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="mr-2 p-2 border rounded text-gray-900 bg-white"
          >
            <option value="title">Title</option>
            <option value="user__username">Username</option>
            <option value="tags">Tag</option>
          </select>
          <div className="relative w-full sm:w-auto flex-grow">
            <FaSearch 
              className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 cursor-pointer" 
              onClick={handleSearchIconClick} 
            />
            <input
              type="text"
              placeholder={`Search by ${filterType.split('__')[0]}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-2 pl-10 border rounded text-gray-900"
            />
          </div>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <button
            onClick={() => setOrderCriteria('-created_at')}
            className={`px-4 py-2 mr-2 rounded transition-colors duration-200 ${orderCriteria === '-created_at' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
          >
            Newest
          </button>
          <button
            onClick={() => setOrderCriteria('-likes')}
            className={`px-4 py-2 rounded transition-colors duration-200 ${orderCriteria === '-likes' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
          >
            Most Liked
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 auto-rows-auto grid-flow-row-dense">
        {pins.map((pin) => (
          <Pin key={pin.id} image={pin.image} title={pin.title} tags={pin.tags} id={pin.id} likes={pin.likes} description={pin.description} user={pin.user} />
        ))}
      </div>

      <div className="pagination-controls mt-4 flex justify-center">
        <button
          onClick={handlePreviousPage}
          disabled={!previousPageUrl}
          className={`px-4 py-2 mx-1 ${!previousPageUrl ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!nextPageUrl}
          className={`px-4 py-2 mx-1 ${!nextPageUrl ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
        >
          Next
        </button>
      </div>

      <UploadForm onUpload={handleUpload} />
    </div>
  );
}

export default HomePage;
