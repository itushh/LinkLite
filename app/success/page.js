"use client"

import { useEffect, useState } from 'react'

import QRCode from 'react-qr-code';

const UrlDetails = () => {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState()
  const [shorturl, setShortUrl] = useState()

  useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      setUrl(params.get('url'))
      setShortUrl(`${window.location.origin}/vip/${params.get('shorturl')}`) 
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shorturl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Short URL',
        text: 'Check out this short URL:',
        url: shorturl
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-24 w-24 text-black mb-4" />
          <h1 className="text-xl font-bold text-gray-900">URL Assigned!</h1>

          <div className="mt-6 space-y-4">
            <div className="group relative">
              <div className="text-3xl font-medium text-gray-900 break-all">
                {shorturl}
              </div>
              <span className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {url}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <ActionButton
                icon={<ClipboardIcon />}
                label={copied ? "Copied!" : "Copy"}
                onClick={copyToClipboard}
              />
              <ActionButton
                icon={<ShareIcon />}
                label="Share"
                onClick={shareUrl}
              />
              <ActionButton
                icon={<QRIcon />}
                label="QR Code"
                onClick={() => setShowQR(!showQR)}
              />
            </div>

            {showQR && (
              <div className="mt-8 rounded-lg flex flex-col items-center">
                <QRCode value={shorturl} size={200} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
  >
    {icon}
    <span className="text-sm font-medium text-gray-900">{label}</span>
  </button>
);

// SVG Icons
const CheckCircleIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 122.88 116.87"
    xmlns="http://www.w3.org/2000/svg"
    style={{ enableBackground: 'new 0 0 122.88 116.87' }}
  >
    <defs>
      <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10a64a" />
        <stop offset="100%" stopColor="#0d8a3d" />
      </linearGradient>
      <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f0f0f0" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.1)" />
      </filter>
    </defs>

    {/* Main star shape with gradient and shadow */}
    <polygon
      fill="url(#mainGradient)"
      fillRule="evenodd"
      points="61.37 8.24 80.43 0 90.88 17.79 111.15 22.32 109.15 42.85 122.88 58.43 109.2 73.87 111.15 94.55 91 99 80.43 116.87 61.51 108.62 42.45 116.87 32 99.08 11.73 94.55 13.73 74.01 0 58.43 13.68 42.99 11.73 22.32 31.88 17.87 42.45 0 61.37 8.24"
      filter="url(#shadow)"
      stroke="#0d8a3d"
      strokeWidth="1.5"
    />

    {/* Modern checkmark with gradient */}
    <path
      fill="url(#checkGradient)"
      d="M37.92 65c-6.07-6.53 3.25-16.26 10-10.1 2.38 2.17 5.84 5.34 8.24 7.49L74.66 39.66C81.1 33 91.27 42.78 84.91 49.48L61.67 77.2a7.13 7.13 0 0 1-9.9.44C47.83 73.89 42.05 68.5 37.92 65Z"
      style={{
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
        stroke: 'rgba(0,0,0,0.1)'
      }}
    />
  </svg>
);

const ClipboardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const QRIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);

export default UrlDetails;