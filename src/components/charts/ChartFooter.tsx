import { Circle, Wifi, Database, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ChartFooter() {
  const marketStatus = 'OPEN';
  const latency = 120;
  const dataSource = 'Real-time';
  const exchange = 'NASDAQ';
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="h-8 bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-t border-gray-800 flex items-center justify-between px-4 text-xs">
      {/* Left: Market Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Circle
            className={cn(
              'w-2 h-2 fill-current',
              marketStatus === 'OPEN' ? 'text-[#00FF88]' : 'text-gray-500'
            )}
          />
          <span className="text-gray-400">{exchange}</span>
          <span
            className={cn(
              'font-semibold',
              marketStatus === 'OPEN' ? 'text-[#00FF88]' : 'text-gray-500'
            )}
          >
            {marketStatus}
          </span>
        </div>

        <div className="w-px h-4 bg-gray-700" />

        {/* Latency */}
        <div className="flex items-center gap-2">
          <Wifi className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-gray-400">Latency:</span>
          <span
            className={cn(
              'font-semibold',
              latency < 150 ? 'text-[#00FF88]' :
              latency < 300 ? 'text-yellow-500' :
              'text-red-400'
            )}
          >
            {latency}ms
          </span>
        </div>

        <div className="w-px h-4 bg-gray-700" />

        {/* Data Source */}
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-gray-400">Data:</span>
          <span className="text-white font-semibold">{dataSource}</span>
          <span className="text-gray-500">· Binance</span>
        </div>
      </div>

      {/* Right: Time */}
      <div className="flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-gray-500" />
        <span className="text-gray-400">Exchange Time:</span>
        <span className="text-white font-mono font-semibold">{currentTime}</span>
        <span className="text-gray-500">EST</span>
      </div>
    </div>
  );
}
