import { useState, useContext } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';
import LoginModal from './LoginModal';

export default function UploadForm({ onUpload }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && title && tags && description) {
      onUpload({ image, title, tags, description });
      setImage(null);
      setTitle('');
      setTags('');
      setDescription('');
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
      >
        {isOpen ? <FaTimes /> : <FaPlus />}
      </button>
      {isOpen && (
        <div className="fixed bottom-16 right-4 p-6 border rounded-lg shadow-md bg-white max-w-md w-full">
          {user ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 text-gray-900 focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200">Upload</button>
            </form>
          ) : (
            <div className="text-center text-gray-700">
              <p className="mb-4">You need to be logged in to upload pins.</p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
              >
                Log In
              </button>
            </div>
          )}
          <LoginModal
            isOpen={isLoginModalOpen}
            onRequestClose={() => setIsLoginModalOpen(false)}
          />
        </div>
        
      )}
    </>
  );
}
