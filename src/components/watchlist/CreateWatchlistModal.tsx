import { useState } from 'react';
import { X } from 'lucide-react';

interface CreateWatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; type: 'manual' | 'smart'; assetTypes: string[] }) => void;
}

export function CreateWatchlistModal({ isOpen, onClose, onCreate }: CreateWatchlistModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'manual' | 'smart'>('manual');
  const [assetTypes, setAssetTypes] = useState<string[]>(['Stocks']);

  if (!isOpen) return null;

  const toggleAssetType = (asset: string) => {
    if (assetTypes.includes(asset)) {
      setAssetTypes(assetTypes.filter((a) => a !== asset));
    } else {
      setAssetTypes([...assetTypes, asset]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && assetTypes.length > 0) {
      onCreate({ name: name.trim(), type, assetTypes });
      setName('');
      setType('manual');
      setAssetTypes(['Stocks']);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Create New Watchlist</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Watchlist Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Watchlist Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Tech Stocks, Crypto Portfolio"
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
              autoFocus
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('manual')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  type === 'manual'
                    ? 'border-[#00FF88] bg-[#00FF88]/10 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div className="text-sm font-semibold">Manual</div>
                <div className="text-xs mt-1 opacity-70">Add symbols manually</div>
              </button>
              <button
                type="button"
                onClick={() => setType('smart')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  type === 'smart'
                    ? 'border-[#00C8FF] bg-[#00C8FF]/10 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div className="text-sm font-semibold">Smart</div>
                <div className="text-xs mt-1 opacity-70">Rule-based auto</div>
              </button>
            </div>
          </div>

          {/* Asset Types */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Asset Types
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Stocks', 'Crypto', 'Forex', 'Indices'].map((asset) => (
                <label
                  key={asset}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                    assetTypes.includes(asset)
                      ? 'border-[#00FF88] bg-[#00FF88]/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={assetTypes.includes(asset)}
                    onChange={() => toggleAssetType(asset)}
                    className="rounded border-gray-700 bg-gray-800"
                  />
                  <span className="text-sm text-white">{asset}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || assetTypes.length === 0}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Watchlist
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
