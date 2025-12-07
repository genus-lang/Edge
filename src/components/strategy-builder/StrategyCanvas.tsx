import { ZoomIn, ZoomOut, Maximize2, Grid3x3 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { StrategyNode } from './StrategyNode';

interface Node {
  id: string;
  type: string;
  name: string;
  summary: string;
  status: 'valid' | 'warning' | 'error';
  icon: any;
  color: string;
  x: number;
  y: number;
  disabled?: boolean;
}

interface Connection {
  from: string;
  to: string;
}

interface StrategyCanvasProps {
  nodes: Node[];
  connections: Connection[];
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string | null) => void;
  onNodeMove: (nodeId: string, x: number, y: number) => void;
  onNodeDelete: (nodeId: string) => void;
  onNodeToggleDisable: (nodeId: string) => void;
  onNodeDuplicate: (nodeId: string) => void;
  onDrop: (x: number, y: number) => void;
}

export function StrategyCanvas({
  nodes,
  connections,
  selectedNodeId,
  onNodeSelect,
  onNodeMove,
  onNodeDelete,
  onNodeToggleDisable,
  onNodeDuplicate,
  onDrop,
}: StrategyCanvasProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom((prev) => Math.max(0.3, Math.min(2, prev * delta)));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).closest('.canvas-background')) {
      setIsPanning(true);
      onNodeSelect(null);
      
      const startX = e.clientX - pan.x;
      const startY = e.clientY - pan.y;

      const handleMouseMove = (e: MouseEvent) => {
        setPan({ x: e.clientX - startX, y: e.clientY - startY });
      };

      const handleMouseUp = () => {
        setIsPanning(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      onDrop(x, y);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const drawConnection = (from: Node, to: Node) => {
    const fromX = from.x + 320; // node width
    const fromY = from.y + 50; // roughly center
    const toX = to.x;
    const toY = to.y + 50;

    const midX = (fromX + toX) / 2;
    
    return `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;
  };

  return (
    <div className="relative flex-1 h-full overflow-hidden bg-[#0A0E13]">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-2">
        <button
          onClick={() => setZoom((prev) => Math.min(2, prev * 1.2))}
          className="p-2 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((prev) => Math.max(0.3, prev / 1.2))}
          className="p-2 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
          className="p-2 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          title="Fit to View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-700" />
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={cn(
            'p-2 rounded transition-colors',
            showGrid ? 'text-[#00FF88] bg-[#00FF88]/10' : 'text-gray-400 hover:text-white hover:bg-gray-800'
          )}
          title="Toggle Grid"
        >
          <Grid3x3 className="w-4 h-4" />
        </button>
        <div className="px-2 text-sm text-gray-400">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className={cn(
          'relative w-full h-full',
          isPanning ? 'cursor-grabbing' : 'cursor-grab'
        )}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Grid Background */}
        {showGrid && (
          <div
            className="canvas-background absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 136, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 136, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
              backgroundPosition: `${pan.x}px ${pan.y}px`,
            }}
          />
        )}

        {/* Transform Container */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: '4000px',
            height: '4000px',
            position: 'relative',
          }}
        >
          {/* SVG for Connections */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: '4000px', height: '4000px' }}
          >
            <defs>
              <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00C8FF" />
                <stop offset="100%" stopColor="#00FF88" />
              </linearGradient>
            </defs>
            {connections.map((conn, idx) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              return (
                <path
                  key={idx}
                  d={drawConnection(fromNode, toNode)}
                  stroke="url(#connection-gradient)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <StrategyNode
              key={node.id}
              node={node}
              isSelected={selectedNodeId === node.id}
              onSelect={() => onNodeSelect(node.id)}
              onMove={(x, y) => onNodeMove(node.id, x, y)}
              onDelete={() => onNodeDelete(node.id)}
              onToggleDisable={() => onNodeToggleDisable(node.id)}
              onDuplicate={() => onNodeDuplicate(node.id)}
            />
          ))}

          {/* Empty State */}
          {nodes.length === 0 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00FF88]/20 to-[#00C8FF]/20 border border-[#00FF88]/30 flex items-center justify-center">
                <Grid3x3 className="w-10 h-10 text-[#00FF88]/50" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start Building Your Strategy</h3>
              <p className="text-sm text-gray-500">Drag blocks from the left panel onto this canvas</p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-20 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2">
        <div className="text-xs text-gray-400 space-y-1">
          <div><span className="text-[#00FF88]">Drag</span> to pan • <span className="text-[#00C8FF]">Ctrl+Scroll</span> to zoom</div>
          <div><span className="text-purple-400">Click node</span> to select • <span className="text-yellow-400">Drag ports</span> to connect</div>
        </div>
      </div>
    </div>
  );
}
