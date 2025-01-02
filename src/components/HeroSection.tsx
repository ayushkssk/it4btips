import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { getStockPrice, getBSEStockPrice } from '../utils/marketData';

interface MarketData {
  symbol: string;
  price: string;
  change: string;
}

const HeroSection: React.FC = () => {
  const heroRef = useRef(null);
  const [stockData, setStockData] = useState<MarketData[]>([
    { symbol: 'NIFTY 50', price: '0.00', change: '0.00%' },
    { symbol: 'SENSEX', price: '0.00', change: '0.00%' }
  ]);
  const [forexData, setForexData] = useState<MarketData[]>([
    { symbol: 'USD/INR', price: '0.00', change: '0.00%' },
    { symbol: 'EUR/INR', price: '0.00', change: '0.00%' }
  ]);
  const [cryptoData, setCryptoData] = useState<MarketData[]>([
    { symbol: 'BTC/USD', price: '0.00', change: '0.00%' },
    { symbol: 'ETH/USD', price: '0.00', change: '0.00%' }
  ]);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
      });

      gsap.from('.trading-card', {
        x: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.5
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Fetch live market data
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Fetch stock data
        const updatedStockData = await Promise.all(
          stockData.map(async (item) => {
            try {
              const price = await getStockPrice(item.symbol) || 0;
              const randomChange = (Math.random() * 2 - 1) * 2;
              return {
                ...item,
                price: price.toFixed(2),
                change: `${randomChange > 0 ? '+' : ''}${randomChange.toFixed(2)}%`
              };
            } catch (error) {
              console.error(`Error fetching stock data for ${item.symbol}:`, error);
              return item;
            }
          })
        );
        setStockData(updatedStockData);

        // Mock forex data (replace with real forex API if available)
        const updatedForexData = forexData.map(item => ({
          ...item,
          price: (Math.random() * 10 + 80).toFixed(2),
          change: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 0.5).toFixed(2)}%`
        }));
        setForexData(updatedForexData);

        // Mock crypto data (replace with real crypto API if needed)
        const updatedCryptoData = cryptoData.map(item => ({
          ...item,
          price: item.symbol.includes('BTC') 
            ? (Math.random() * 1000 + 40000).toFixed(2)
            : (Math.random() * 100 + 2000).toFixed(2),
          change: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 2).toFixed(2)}%`
        }));
        setCryptoData(updatedCryptoData);
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
    <>
      {/* Spacer for navbar and ticker */}
      <div className="h-24"></div>
      
      <div ref={heroRef} className="py-16 bg-gradient-to-br from-base-100 via-primary/5 to-base-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Hero Content */}
            <div className="lg:w-1/2 hero-content">
              <div className="max-w-xl">
                <div className="badge badge-primary mb-4">Professional Trading Solutions</div>
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Master the Markets with IT4B
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Transform your trading journey with expert guidance, advanced tools, and proven strategies. 
                  Join thousands of successful traders who trust IT4B.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="btn btn-primary">Start Trading Now</button>
                  <button className="btn btn-outline btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Demo
                  </button>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-8 flex items-center gap-6 text-gray-600">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Not SEBI Registered!
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    SSL Secured
                  </div>
                </div>
              </div>
            </div>

            {/* Trading Cards */}
            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="trading-card card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                  <h3 className="card-title text-primary">Stock Trading</h3>
                  <div className="mockup-code bg-primary/5 text-primary-content mt-4">
                    {stockData.map((item, index) => (
                      <pre key={index}><code>{item.symbol}: {item.change.startsWith('+') ? '↗' : '↘'} {item.change}</code></pre>
                    ))}
                  </div>
                </div>
              </div>

              <div className="trading-card card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                  <h3 className="card-title text-secondary">Forex Trading</h3>
                  <div className="mockup-code bg-secondary/5 text-secondary-content mt-4">
                    {forexData.map((item, index) => (
                      <pre key={index}><code>{item.symbol}: {item.change.startsWith('+') ? '↗' : '↘'} {item.change}</code></pre>
                    ))}
                  </div>
                </div>
              </div>

              <div className="trading-card card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                  <h3 className="card-title text-accent">Crypto Trading</h3>
                  <div className="mockup-code bg-accent/5 text-accent-content mt-4">
                    {cryptoData.map((item, index) => (
                      <pre key={index}><code>{item.symbol}: {item.change.startsWith('+') ? '↗' : '↘'} {item.change}</code></pre>
                    ))}
                  </div>
                </div>
              </div>

              <div className="trading-card card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                  <h3 className="card-title text-info">Portfolio Analysis</h3>
                  <div className="mockup-code bg-info/5 text-info-content mt-4">
                    <pre><code>Risk Score: Low</code></pre>
                    <pre><code>Returns: +35% YTD</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
