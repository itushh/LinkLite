"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const res = await fetch('/api/generate', {
      method: 'POST',
      body: form,
    });
    
    if(res.ok){
      router.push(`/success?url=${encodeURIComponent(originalUrl)}&shorturl=${encodeURIComponent(customAlias)}`);
    }else{
      const msg = await res.text()
      alert(msg)
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <LinkChainIcon className="mx-auto h-16 w-16 text-black" />
          <h2 className="mt-6 text-4xl font-bold text-gray-900">LINKLITE</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="original-url" className="block text-sm font-medium text-gray-700">
                Enter URL
              </label>
              <input
                name="url"
                type="url"
                required
                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent focus:border-black focus:ring-0 p-3 transition-all duration-200"
                placeholder="https://example.com/123"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="custom-alias" className="block text-sm font-medium text-gray-700">
                Custom Alias 
              </label>
              <input
                name="shorturl"
                type="text"
                required
                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent focus:border-black focus:ring-0 p-3 transition-all duration-200"
                placeholder="mysite"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
          >
            Shorten URL
          </button>
        </form>
      </div>
    </div>
  );
};

const LinkChainIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

export default Home;
