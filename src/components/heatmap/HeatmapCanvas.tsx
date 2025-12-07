import { HeatmapTile } from './HeatmapTile';

interface Asset {
  symbol: string;
  name: string;
  price: string;
  change: number;
  changePercent: number;
  volume?: string;
  marketCap?: string;
  sector: string;
  hasAlert?: boolean;
  hasAI?: boolean;
}

interface HeatmapCanvasProps {
  viewMode: 'treemap' | 'grid';
  groupBy: string;
  assets: Asset[];
  onTileClick?: (symbol: string) => void;
}

export function HeatmapCanvas({ viewMode, groupBy, assets, onTileClick }: HeatmapCanvasProps) {
  // Group assets by sector/category
  const grouped = assets.reduce((acc, asset) => {
    const group = asset.sector;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(asset);
    return acc;
  }, {} as Record<string, Asset[]>);

  if (viewMode === 'grid') {
    return (
      <div className="space-y-6">
        {Object.entries(grouped).map(([group, groupAssets]) => (
          <div key={group}>
            {/* Group Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="text-lg font-semibold text-white">{group}</div>
              <div className="flex-1 h-px bg-gray-800" />
              <div className="text-sm text-gray-500">
                {groupAssets.length} {groupAssets.length === 1 ? 'asset' : 'assets'}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {groupAssets.map((asset) => (
                <HeatmapTile
                  key={asset.symbol}
                  {...asset}
                  onClick={() => onTileClick?.(asset.symbol)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Treemap view (simplified grid with varied sizes)
  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([group, groupAssets]) => (
        <div key={group} className="p-4 bg-gray-800/20 border border-gray-800 rounded-xl">
          {/* Group Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="text-lg font-semibold text-white">{group}</div>
            <div className="flex-1 h-px bg-gray-700" />
            <div className="text-sm text-gray-500">
              {groupAssets.length} {groupAssets.length === 1 ? 'asset' : 'assets'}
            </div>
          </div>

          {/* Treemap Grid (with varied sizes) */}
          <div className="grid grid-cols-6 gap-3">
            {groupAssets.map((asset, idx) => {
              // Vary size based on index for visual interest
              const sizeClass = idx % 5 === 0 ? 'col-span-2 row-span-2' : idx % 3 === 0 ? 'col-span-2' : 'col-span-1';
              const size = idx % 5 === 0 ? 'large' : idx % 3 === 0 ? 'medium' : 'small';
              
              return (
                <div key={asset.symbol} className={sizeClass}>
                  <HeatmapTile
                    {...asset}
                    size={size}
                    onClick={() => onTileClick?.(asset.symbol)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
