import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TradingPanelProps {
  symbol: string;
  currentPrice: string;
  marketStatus: 'Open' | 'Closed' | 'Pre-market' | 'After-hours';
  onPlaceOrder?: (order: any) => void;
}

export function TradingPanel({ symbol, currentPrice, marketStatus, onPlaceOrder }: TradingPanelProps) {
  const [orderType, setOrderType] = useState<'Market' | 'Limit' | 'SL' | 'SL-M'>('Market');
  const [side, setSide] = useState<'Buy' | 'Sell'>('Buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [validity, setValidity] = useState('DAY');

  const currentPriceNum = parseFloat(currentPrice.replace(/[^0-9.]/g, ''));
  const quantityNum = parseFloat(quantity) || 0;
  const priceNum = orderType === 'Market' ? currentPriceNum : parseFloat(price) || currentPriceNum;
  const totalValue = (quantityNum * priceNum).toFixed(2);

  const handlePlaceOrder = () => {
    const order = {
      symbol,
      side,
      orderType,
      quantity: quantityNum,
      price: orderType !== 'Market' ? priceNum : undefined,
      validity,
      totalValue,
    };
    onPlaceOrder?.(order);
    // Show success message
    alert(`${side} order placed for ${quantity} shares of ${symbol}`);
  };

  const isMarketClosed = marketStatus === 'Closed';
  const canPlaceOrder = quantityNum > 0 && (orderType === 'Market' || (price && parseFloat(price) > 0));

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">Trade {symbol}</h3>
          <div className="text-right">
            <div className="text-sm text-gray-500">Current Price</div>
            <div className="text-xl font-bold text-white">{currentPrice}</div>
          </div>
        </div>
      </div>

      {/* Order Type Tabs */}
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-500 mb-2">Order Type</div>
        <div className="grid grid-cols-4 gap-2 p-1 bg-gray-800 rounded-lg">
          {(['Market', 'Limit', 'SL', 'SL-M'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-all',
                orderType === type
                  ? 'bg-[#00FF88] text-black'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Buy/Sell Tabs */}
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSide('Buy')}
            className={cn(
              'flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all',
              side === 'Buy'
                ? 'bg-[#00FF88] text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            )}
          >
            <TrendingUp className="w-5 h-5" />
            Buy
          </button>
          <button
            onClick={() => setSide('Sell')}
            className={cn(
              'flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all',
              side === 'Sell'
                ? 'bg-red-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            )}
          >
            <TrendingDown className="w-5 h-5" />
            Sell
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 mb-4">
        {/* Quantity */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
            min="1"
            step="1"
          />
        </div>

        {/* Price (for Limit/SL orders) */}
        {(orderType === 'Limit' || orderType === 'SL') && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
              step="0.01"
            />
          </div>
        )}

        {/* Validity */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Validity
          </label>
          <select
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#00FF88]/50"
          >
            <option value="DAY">Day</option>
            <option value="IOC">IOC (Immediate or Cancel)</option>
            <option value="GTC">GTC (Good Till Cancelled)</option>
          </select>
        </div>
      </div>

      {/* Total Value */}
      {quantityNum > 0 && (
        <div className="mb-4 p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Total Value</span>
            <span className="text-xl font-bold text-white">
              ${totalValue}
            </span>
          </div>
        </div>
      )}

      {/* Warnings */}
      {isMarketClosed && (
        <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-500">
            Market is closed. Order will be placed when market opens.
          </div>
        </div>
      )}

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={!canPlaceOrder}
        className={cn(
          'w-full py-3 rounded-lg font-semibold transition-all',
          side === 'Buy'
            ? 'bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90'
            : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:opacity-90',
          !canPlaceOrder && 'opacity-50 cursor-not-allowed'
        )}
      >
        {side === 'Buy' ? '🔼' : '🔽'} Place {side} Order
      </button>

      {/* Quick Info */}
      <div className="mt-4 pt-4 border-t border-gray-800 text-xs text-gray-600">
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            Orders are executed through your connected broker. Make sure you have sufficient balance.
          </div>
        </div>
      </div>
    </div>
  );
}
