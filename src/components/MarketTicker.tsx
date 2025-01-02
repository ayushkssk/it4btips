import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { getStockPrice, getBSEStockPrice } from '../utils/marketData';

interface MarketData {
  symbol: string;
  price: string;
  change: string;
}

const MarketTicker: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: 'NIFTY', price: '0.00', change: '0.00%' },
    { symbol: 'SENSEX', price: '0.00', change: '0.00%' },
    { symbol: 'RELIANCE', price: '0.00', change: '0.00%' },
    { symbol: 'TCS', price: '0.00', change: '0.00%' },
    { symbol: 'INFY', price: '0.00', change: '0.00%' },
    { symbol: 'HDFCBANK', price: '0.00', change: '0.00%' },
  ]);

  // Animate ticker
  useEffect(() => {
    const ticker = gsap.to('.ticker-items', {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: 'linear',
    });

    return () => {
      ticker.kill();
    };
  }, []);

  // Fetch live market data
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const updatedData = await Promise.all(
          marketData.map(async (item) => {
            try {
              let price = 0;
              let change = '0.00%';

              // Try NSE API first
              const nsePrice = await getStockPrice(item.symbol);
              if (nsePrice) {
                price = nsePrice;
                // Calculate change (mock for now)
                const randomChange = (Math.random() * 2 - 1) * 2;
                change = `${randomChange > 0 ? '+' : ''}${randomChange.toFixed(2)}%`;
              } else {
                // Try BSE API as fallback
                const bsePrice = await getBSEStockPrice(item.symbol);
                if (bsePrice) {
                  price = bsePrice;
                  const randomChange = (Math.random() * 2 - 1) * 2;
                  change = `${randomChange > 0 ? '+' : ''}${randomChange.toFixed(2)}%`;
                }
              }

              return {
                ...item,
                price: price ? price.toFixed(2) : item.price,
                change: change
              };
            } catch (error) {
              console.error(`Error fetching data for ${item.symbol}:`, error);
              return item;
            }
          })
        );

        setMarketData(updatedData);
      } catch (error) {
        console.error('Error updating market data:', error);
      }
    };

    // Initial fetch
    fetchMarketData();

    // Update every 10 seconds
    const interval = setInterval(fetchMarketData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-base-200 border-y border-base-300 py-2">
      <div className="ticker-container relative whitespace-nowrap overflow-hidden">
        <div className="ticker-items inline-block">
          {marketData.map((item, index) => (
            <span key={index} className="inline-flex items-center mx-8">
              <span className="font-semibold text-primary">{item.symbol}</span>
              <span className="mx-2">₹{item.price}</span>
              <span className={`${
                item.change.startsWith('+') ? 'text-success' : 'text-error'
              }`}>
                {item.change}
              </span>
            </span>
          ))}
        </div>
        <div className="ticker-items inline-block">
          {marketData.map((item, index) => (
            <span key={index} className="inline-flex items-center mx-8">
              <span className="font-semibold text-primary">{item.symbol}</span>
              <span className="mx-2">₹{item.price}</span>
              <span className={`${
                item.change.startsWith('+') ? 'text-success' : 'text-error'
              }`}>
                {item.change}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;
