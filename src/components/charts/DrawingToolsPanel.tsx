import { MousePointer, TrendingUp, Minus, Circle, Square, Type, Ruler, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DrawingToolsPanelProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  drawingsVisible: boolean;
  onToggleDrawings: () => void;
  drawingsLocked: boolean;
  onToggleLock: () => void;
}

export function DrawingToolsPanel({
  activeTool,
  onToolChange,
  drawingsVisible,
  onToggleDrawings,
  drawingsLocked,
  onToggleLock,
}: DrawingToolsPanelProps) {
  const tools = [
    { id: 'cursor', label: 'Cursor', icon: MousePointer },
    { id: 'trendline', label: 'Trend Line', icon: TrendingUp },
    { id: 'horizontal', label: 'Horizontal Line', icon: Minus },
    { id: 'vertical', label: 'Vertical Line', icon: Minus, rotate: true },
    { id: 'circle', label: 'Circle', icon: Circle },
    { id: 'rectangle', label: 'Rectangle', icon: Square },
    { id: 'text', label: 'Text Note', icon: Type },
    { id: 'measure', label: 'Measure', icon: Ruler },
  ];

  return (
    <div className="w-14 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-r border-gray-800 flex flex-col items-center py-4 gap-2">
      {/* Drawing Tools */}
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onToolChange(tool.id)}
          className={cn(
            'w-10 h-10 flex items-center justify-center rounded-lg transition-all group relative',
            activeTool === tool.id
              ? 'bg-[#00FF88] text-black'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          )}
          title={tool.label}
        >
          <tool.icon className={cn('w-5 h-5', tool.rotate && 'rotate-90')} />

          {/* Tooltip */}
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            {tool.label}
          </div>
        </button>
      ))}

      {/* Separator */}
      <div className="w-8 h-px bg-gray-700 my-2" />

      {/* Toggle Visibility */}
      <button
        onClick={onToggleDrawings}
        className={cn(
          'w-10 h-10 flex items-center justify-center rounded-lg transition-all group relative',
          drawingsVisible
            ? 'text-[#00C8FF] bg-gray-800'
            : 'text-gray-600 hover:bg-gray-800'
        )}
        title={drawingsVisible ? 'Hide Drawings' : 'Show Drawings'}
      >
        {drawingsVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}

        {/* Tooltip */}
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {drawingsVisible ? 'Hide Drawings' : 'Show Drawings'}
        </div>
      </button>

      {/* Lock/Unlock */}
      <button
        onClick={onToggleLock}
        className={cn(
          'w-10 h-10 flex items-center justify-center rounded-lg transition-all group relative',
          drawingsLocked
            ? 'text-red-400 bg-gray-800'
            : 'text-gray-600 hover:bg-gray-800'
        )}
        title={drawingsLocked ? 'Unlock Drawings' : 'Lock Drawings'}
      >
        {drawingsLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}

        {/* Tooltip */}
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {drawingsLocked ? 'Unlock Drawings' : 'Lock Drawings'}
        </div>
      </button>
    </div>
  );
}
