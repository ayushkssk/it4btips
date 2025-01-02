const ALPHA_VANTAGE_API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your API key

// NSE API endpoint
export async function getStockPrice(symbol: string): Promise<number | null> {
  try {
    const response = await fetch(`https://www.nseindia.com/api/quote-equity?symbol=${encodeURIComponent(symbol)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      }
    });
    
    const data = await response.json();
    
    if (data && data.priceInfo && data.priceInfo.lastPrice) {
      return data.priceInfo.lastPrice;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null;
  }
}

// Alternative BSE API
export async function getBSEStockPrice(symbol: string): Promise<number | null> {
  try {
    const response = await fetch(`https://api.bseindia.com/BseIndiaAPI/api/StockReachGraph/w?scripcode=${symbol}&flag=0&fromdate=&todate=&seriesid=`);
    const data = await response.json();
    
    if (data && data.CurrRate) {
      return parseFloat(data.CurrRate);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching BSE stock price:', error);
    return null;
  }
}

// Backup mock data function for testing
export function getMockStockPrice(entryPrice: number): number {
  const variation = entryPrice * 0.05;
  const randomChange = (Math.random() * variation * 2) - variation;
  return entryPrice + randomChange;
}

export const getCompanyDetails = async (symbol: string) => {
  try {
    // First try NSE API
    const response = await fetch(`https://www.nseindia.com/api/quote-equity?symbol=${symbol}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      return {
        companyName: data.info.companyName,
        industry: data.info.industry,
        lastPrice: data.priceInfo.lastPrice,
        change: data.priceInfo.change,
        pChange: data.priceInfo.pChange,
        dayHigh: data.priceInfo.dayHigh,
        dayLow: data.priceInfo.dayLow,
        volume: data.priceInfo.totalTradedVolume
      };
    }

    // If NSE fails, try BSE API
    const bseResponse = await fetch(`https://api.bseindia.com/BseIndiaAPI/api/StockReachGraph/w?scripcode=${symbol}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });

    if (bseResponse.ok) {
      const bseData = await bseResponse.json();
      return {
        companyName: bseData.CompanyName,
        industry: bseData.Industry || 'N/A',
        lastPrice: parseFloat(bseData.CurrRate),
        change: parseFloat(bseData.Change),
        pChange: parseFloat(bseData.PChange),
        dayHigh: parseFloat(bseData.High),
        dayLow: parseFloat(bseData.Low),
        volume: parseInt(bseData.Volume)
      };
    }

    // If both APIs fail, use mock data for testing
    return getMockCompanyDetails(symbol);
  } catch (error) {
    console.error('Error fetching company details:', error);
    return getMockCompanyDetails(symbol);
  }
};

const getMockCompanyDetails = (symbol: string) => {
  const basePrice = Math.random() * 1000 + 100;
  const change = (Math.random() * 20) - 10;
  const pChange = (change / basePrice) * 100;
  
  return {
    companyName: `${symbol} Company Ltd.`,
    industry: 'Technology',
    lastPrice: basePrice,
    change: change,
    pChange: pChange,
    dayHigh: basePrice * (1 + Math.random() * 0.05),
    dayLow: basePrice * (1 - Math.random() * 0.05),
    volume: Math.floor(Math.random() * 1000000)
  };
};
