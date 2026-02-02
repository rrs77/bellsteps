'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function MigrateButton() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleMigrate = async () => {
    setIsRunning(true);
    setResults([]);
    
    try {
      const response = await fetch('/api/migrate', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Migrations completed successfully!');
        setResults(data.results || []);
      } else {
        toast.error(`Migration failed: ${data.message || data.error}`);
      }
    } catch (error: any) {
      toast.error(`Migration failed: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleMigrate}
        disabled={isRunning}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isRunning ? 'Running Migrations...' : 'Run Migrations'}
      </button>

      {results.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold">Results:</h3>
          {results.map((result, idx) => (
            <div key={idx} className="text-sm">
              <span className={result.status === 'success' ? 'text-green-600' : result.status === 'error' ? 'text-red-600' : 'text-yellow-600'}>
                {result.status}
              </span>
              {result.error && <span className="text-red-600 ml-2">- {result.error}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
