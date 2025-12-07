import { Check, AlertTriangle, X, ChevronDown, ChevronUp, MoreVertical, Copy, Power, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface StrategyNodeProps {
  node: {
    id: string;
    type: string;
    name: string;
    summary: string;
    status: 'valid' | 'warning' | 'error';
    icon: any;
    color: string;
    x: number;
    y: number;
    config?: any;
    disabled?: boolean;
  };
  isSelected: boolean;
  onSelect: () => void;
  onMove: (x: number, y: number) => void;
  onDelete: () => void;
  onToggleDisable: () => void;
  onDuplicate: () => void;
}

export function StrategyNode({
  node,
  isSelected,
  onSelect,
  onMove,
  onDelete,
  onToggleDisable,
  onDuplicate,
}: StrategyNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.node-menu')) return;
    setIsDragging(true);
    onSelect();
    
    const startX = e.clientX - node.x;
    const startY = e.clientY - node.y;

    const handleMouseMove = (e: MouseEvent) => {
      onMove(e.clientX - startX, e.clientY - startY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getStatusIcon = () => {
    switch (node.status) {
      case 'valid': return <Check className="w-4 h-4 text-[#00FF88]" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <X className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: node.x,
        top: node.y,
        zIndex: isSelected ? 10 : 1,
      }}
      className={cn(
        'min-w-[280px] max-w-[320px] bg-gradient-to-br from-gray-900 to-gray-800 border rounded-lg shadow-lg transition-all',
        isSelected ? 'border-[#00FF88] ring-2 ring-[#00FF88]/20' : 'border-gray-700',
        isDragging && 'cursor-grabbing',
        node.disabled && 'opacity-50'
      )}
      onMouseDown={handleMouseDown}
    >
      {/* Input Port */}
      <div
        className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#00C8FF] border-2 border-gray-900 cursor-pointer hover:scale-110 transition-transform"
        title="Input"
      />

      {/* Output Port */}
      <div
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#00FF88] border-2 border-gray-900 cursor-pointer hover:scale-110 transition-transform"
        title="Output"
      />

      {/* Node Header */}
      <div className={cn('p-3 border-b border-gray-700 bg-gradient-to-r', node.color, 'bg-opacity-10')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className={cn('p-1.5 rounded-lg bg-gradient-to-br', node.color)}>
              <node.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white truncate">{node.name}</h4>
              <p className="text-xs text-gray-500 truncate">{node.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {getStatusIcon()}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <div className="relative node-menu">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                  <button
                    onClick={() => {
                      onDuplicate();
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                  <button
                    onClick={() => {
                      onToggleDisable();
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    <Power className="w-4 h-4" />
                    {node.disabled ? 'Enable' : 'Disable'}
                  </button>
                  <button
                    onClick={() => {
                      onDelete();
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-gray-800"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Node Body - Collapsed */}
      {!isExpanded && (
        <div className="p-3">
          <p className="text-sm text-gray-400">{node.summary}</p>
        </div>
      )}

      {/* Node Body - Expanded with Config */}
      {isExpanded && (
        <div className="p-3 space-y-3">
          <p className="text-sm text-gray-400 mb-3">{node.summary}</p>

          {/* Example Configuration UI */}
          {node.type === 'RSI' && (
            <>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Timeframe</label>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                  <option>1 Hour</option>
                  <option>4 Hour</option>
                  <option>1 Day</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">RSI Period</label>
                <input
                  type="number"
                  defaultValue={14}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Condition</label>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                  <option>RSI &lt; 30 (Oversold)</option>
                  <option>RSI &gt; 70 (Overbought)</option>
                  <option>Custom</option>
                </select>
              </div>
            </>
          )}

          {node.type === 'Moving Average' && (
            <>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">MA Type</label>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                  <option>SMA</option>
                  <option>EMA</option>
                  <option>WMA</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Period</label>
                <input
                  type="number"
                  defaultValue={20}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Source</label>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                  <option>Close</option>
                  <option>Open</option>
                  <option>High</option>
                  <option>Low</option>
                  <option>HL/2</option>
                </select>
              </div>
            </>
          )}

          {(node.type === 'Take Profit' || node.type === 'Stop Loss') && (
            <>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Type</label>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                  <option>Fixed Points</option>
                  <option>Percentage</option>
                  <option>ATR Multiple</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Value</label>
                <input
                  type="number"
                  defaultValue={node.type === 'Take Profit' ? 2 : 1}
                  step="0.1"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                />
              </div>
            </>
          )}

          {/* Add more conditional config UIs based on node type */}
        </div>
      )}

      {/* Status Footer */}
      {node.status !== 'valid' && (
        <div className={cn(
          'px-3 py-2 border-t text-xs',
          node.status === 'warning' ? 'border-yellow-500/30 bg-yellow-500/5 text-yellow-500' : 'border-red-500/30 bg-red-500/5 text-red-500'
        )}>
          {node.status === 'warning' ? '⚠ Missing optional parameters' : '❌ Invalid configuration'}
        </div>
      )}
    </div>
  );
}