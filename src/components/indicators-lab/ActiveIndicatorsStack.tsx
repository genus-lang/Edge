import { Eye, EyeOff, Settings, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface ActiveIndicator {
  id: string;
  name: string;
  shortName: string;
  color: string;
  visible: boolean;
  panel: 'Main Chart' | 'Separate Panel';
  params: Record<string, any>;
}

interface ActiveIndicatorsStackProps {
  indicators: ActiveIndicator[];
  onToggleVisibility: (id: string) => void;
  onSettings: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  selectedIndicatorId?: string;
}

export function ActiveIndicatorsStack({
  indicators,
  onToggleVisibility,
  onSettings,
  onDelete,
  onReorder,
  selectedIndicatorId,
}: ActiveIndicatorsStackProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">Active Indicators</h3>
        <span className="text-xs text-gray-500">{indicators.length} active</span>
      </div>

      <div className="space-y-2">
        {indicators.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-sm text-gray-500 mb-2">No indicators added yet</div>
            <div className="text-xs text-gray-600">Add indicators from the library above</div>
          </div>
        ) : (
          indicators.map((indicator, index) => (
            <div
              key={indicator.id}
              className={cn(
                'p-3 bg-gray-800/30 border rounded-lg transition-all',
                selectedIndicatorId === indicator.id
                  ? 'border-[#00FF88] bg-[#00FF88]/5'
                  : 'border-gray-700 hover:border-gray-600'
              )}
            >
              {/* Main Row */}
              <div className="flex items-center gap-2">
                {/* Drag Handle */}
                <button className="text-gray-600 hover:text-gray-400 cursor-move">
                  <GripVertical className="w-4 h-4" />
                </button>

                {/* Color Dot */}
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: indicator.color }}
                />

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{indicator.shortName}</div>
                  <div className="text-xs text-gray-500">{indicator.panel}</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onToggleVisibility(indicator.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    title={indicator.visible ? 'Hide' : 'Show'}
                  >
                    {indicator.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      onSettings(indicator.id);
                      setExpandedId(expandedId === indicator.id ? null : indicator.id);
                    }}
                    className={cn(
                      'p-1.5 rounded-lg transition-colors',
                      selectedIndicatorId === indicator.id
                        ? 'text-[#00FF88] bg-[#00FF88]/10'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    )}
                    title="Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDelete(indicator.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setExpandedId(expandedId === indicator.id ? null : indicator.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    {expandedId === indicator.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Parameters */}
              {expandedId === indicator.id && (
                <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                  {Object.entries(indicator.params).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 capitalize">{key.replace('_', ' ')}</span>
                      <span className="text-white font-mono">{String(value)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
