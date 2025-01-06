import React, { useState, useEffect } from 'react';

const URLList = () => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      const mockUrls = [
        {
          id: 1,
          originalUrl: 'https://example.com/very-long-url-1',
          shortUrl: 'short.url/abc123',
          clicks: 42,
          createdAt: '2024-01-01T12:00:00Z'
        },
        {
          id: 2,
          originalUrl: 'https://example.com/very-long-url-2',
          shortUrl: 'short.url/def456',
          clicks: 27,
          createdAt: '2024-01-02T14:30:00Z'
        }
      ];
      setUrls(mockUrls);
    } catch (err) {
      setError('Failed to fetch URLs');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Your Shortened URLs
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Track and manage all your shortened links in one place
          </p>
        </div>

        {error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-700">
            {error}
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {urls.map((url) => (
                <li key={url.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          <a
                            href={url.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {url.shortUrl}
                          </a>
                        </p>
                        <button
                          onClick={() => navigator.clipboard.writeText(url.shortUrl)}
                          className="ml-2 p-1 hover:bg-gray-100 rounded"
                        >
                          📋
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {url.originalUrl}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900">{url.clicks}</span> clicks
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(url.createdAt)}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {urls.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No shortened URLs yet. Create your first one!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default URLList;