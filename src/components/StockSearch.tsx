import React, { useState, useEffect, useRef } from 'react';
import { Stock, stocksList } from '../data/stocksList';
import { getCompanyDetails } from '../utils/marketData';

interface StockData {
  companyName: string;
  industry: string;
  lastPrice: number;
  change: number;
  pChange: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
}

const StockSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Stock[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions based on search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = stocksList.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10)); // Show top 10 matches
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Fetch stock data periodically if a stock is selected
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchData = async () => {
      if (selectedStock) {
        try {
          setLoading(true);
          setError('');
          const data = await getCompanyDetails(selectedStock.symbol);
          if (data) {
            setStockData(data);
          }
        } catch (err) {
          setError('Failed to fetch stock data. Please try again.');
          console.error('Error fetching stock data:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    if (selectedStock) {
      fetchData();
      interval = setInterval(fetchData, 10000); // Update every 10 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedStock]);

  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
    setSearchTerm(stock.symbol);
    setShowSuggestions(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Stock Search</h1>

      {/* Search Box */}
      <div className="relative mb-8" ref={searchRef}>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search by stock name or symbol (e.g., RELIANCE, TCS)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="menu bg-base-200 w-full rounded-box mt-2 absolute z-50 shadow-lg max-h-60 overflow-auto">
                {suggestions.map((stock) => (
                  <li key={stock.symbol}>
                    <button
                      className="flex justify-between items-center p-3 hover:bg-base-300 w-full text-left"
                      onClick={() => handleSelectStock(stock)}
                    >
                      <span className="font-semibold">{stock.symbol}</span>
                      <span className="text-sm text-gray-600">{stock.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Stock Data Display */}
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {selectedStock && stockData && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Info Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">{selectedStock.name}</h2>
              <p className="text-gray-600">{stockData.industry}</p>
              <div className="divider"></div>
              <div className="stats stats-vertical shadow">
                <div className="stat">
                  <div className="stat-title">Current Price</div>
                  <div className="stat-value text-primary">₹{stockData.lastPrice.toFixed(2)}</div>
                  <div className={`stat-desc ${stockData.pChange >= 0 ? 'text-success' : 'text-error'}`}>
                    {stockData.pChange >= 0 ? '↗' : '↘'} {stockData.pChange.toFixed(2)}% ({stockData.change.toFixed(2)})
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Data Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Market Data</h2>
              <div className="divider"></div>
              <div className="stats stats-vertical shadow">
                <div className="stat">
                  <div className="stat-title">Day's Range</div>
                  <div className="stat-value text-sm">
                    ₹{stockData.dayLow.toFixed(2)} - ₹{stockData.dayHigh.toFixed(2)}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Volume</div>
                  <div className="stat-value text-sm">{stockData.volume.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
