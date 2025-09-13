import React from 'react';
import { Wifi, WifiOff, Download, Leaf } from 'lucide-react';

interface OfflineIndicatorProps {
  isOnline: boolean;
  cachedCount: number;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline, cachedCount }) => {
  const dataSaved = cachedCount * 2.5 * 0.6; // Approximate MB saved per lesson
  const co2Saved = dataSaved * 0.5; // Approximate grams of CO2 saved

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`flex items-center px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 ${
        isOnline 
          ? 'bg-green-500 text-white' 
          : 'bg-yellow-500 text-white animate-pulse'
      }`}>
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4 mr-2" />
            Online
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4 mr-2" />
            Offline Mode
          </>
        )}
      </div>

      {cachedCount > 0 && (
        <div className="mt-2 bg-white shadow-lg rounded-lg p-3 text-xs border border-gray-200">
          <div className="flex items-center text-blue-600 mb-1">
            <Download className="h-3 w-3 mr-1" />
            <span className="font-medium">{cachedCount} lessons cached</span>
          </div>
          <div className="flex items-center text-green-600 text-xs">
            <Leaf className="h-3 w-3 mr-1" />
            <span>~{dataSaved.toFixed(1)}MB & {co2Saved.toFixed(1)}g CO₂ saved</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineIndicator;