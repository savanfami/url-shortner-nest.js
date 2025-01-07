import React, { useState } from 'react';
import { CreateUrl } from '../../api/userAuth';

const URLShortener = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');

  const urlRegex = /^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?)$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setValidationError('');

    // Validate URL before sending request
    if (!urlRegex.test(url)) {
      setValidationError('Please enter a valid URL.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await CreateUrl(url);
      if (response && response.data.shortUrl) {
        setResult({
          shortUrl: response.data.shortUrl,
        });
      } else {
        setError('Failed to generate short URL. Please try again.');
      }
    } catch (err) {
      console.error('Error shortening URL:', err);
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Shorten Your URL
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Paste your long URL and get a shorter version instantly
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Long URL
              </label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/very-long-url"
              />
              {validationError && (
                <p className="mt-1 text-sm text-red-600">{validationError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !url}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading || !url ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Shortening...
                </div>
              ) : (
                'Shorten URL'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6 p-4 bg-green-50 rounded-md">
              <h3 className="text-sm font-medium text-green-800">URL Shortened Successfully!</h3>
              <div className="mt-2 text-sm text-green-700">
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">Short URL:</span>
                  <div className="flex items-center space-x-2">
                    <a
                      href={result.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      {result.shortUrl}
                    </a>
                    <button
                      onClick={() => navigator.clipboard.writeText(result.shortUrl)}
                      className="p-1 hover:bg-green-100 rounded"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default URLShortener;
