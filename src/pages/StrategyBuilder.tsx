import { useState, useEffect } from 'react';
import { BuilderHeader } from '../components/strategy-builder/BuilderHeader';
import { BlockPalette } from '../components/strategy-builder/BlockPalette';
import { StrategyCanvas } from '../components/strategy-builder/StrategyCanvas';
import { StrategyDetailsPanel } from '../components/strategy-builder/StrategyDetailsPanel';
import { QuickBacktestPanel } from '../components/strategy-builder/QuickBacktestPanel';
import { LogIn, LogOut, TrendingUp, Gauge, DollarSign } from 'lucide-react';

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

const initialNodes: Node[] = [
  {
    id: 'node-1',
    type: 'RSI',
    name: 'RSI Oversold Entry',
    summary: '1H: RSI < 30',
    status: 'valid',
    icon: Gauge,
    color: 'from-purple-500 to-pink-500',
    x: 100,
    y: 100,
  },
  {
    id: 'node-2',
    type: 'Moving Average',
    name: 'Trend Filter',
    summary: 'Price > 200 EMA',
    status: 'valid',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
    x: 100,
    y: 280,
  },
  {
    id: 'node-3',
    type: '% of Equity',
    name: 'Position Size',
    summary: '2% of equity per trade',
    status: 'valid',
    icon: DollarSign,
    color: 'from-yellow-500 to-orange-500',
    x: 500,
    y: 180,
  },
  {
    id: 'node-4',
    type: 'Take Profit',
    name: 'Take Profit',
    summary: '2% profit target',
    status: 'warning',
    icon: LogOut,
    color: 'from-red-500 to-orange-500',
    x: 900,
    y: 100,
  },
  {
    id: 'node-5',
    type: 'Stop Loss',
    name: 'Stop Loss',
    summary: '1% stop loss',
    status: 'error',
    icon: LogOut,
    color: 'from-red-500 to-orange-500',
    x: 900,
    y: 280,
  },
];

const initialConnections: Connection[] = [
  { from: 'node-1', to: 'node-3' },
  { from: 'node-2', to: 'node-3' },
  { from: 'node-3', to: 'node-4' },
  { from: 'node-3', to: 'node-5' },
];

export function StrategyBuilder() {
  const [strategyName, setStrategyName] = useState('RSI Mean Reversion Strategy');
  const [description, setDescription] = useState('A trend-following strategy using RSI oversold conditions combined with EMA trend filter for high-probability entries.');
  const [strategyState, setStrategyState] = useState<'draft' | 'active' | 'archived' | 'backtest-only'>('draft');
  const [isModified, setIsModified] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>(undefined);
  
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<any>(null);
  
  const [history, setHistory] = useState<{ nodes: Node[]; connections: Connection[] }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const [showQuickBacktest, setShowQuickBacktest] = useState(false);
  const [backtestResults, setBacktestResults] = useState<any>(undefined);

  const validations = [
    { type: 'success' as const, message: 'At least one entry condition configured' },
    { type: 'success' as const, message: 'Position sizing block configured' },
    { type: 'warning' as const, message: 'No exit condition defined for all scenarios' },
    { type: 'error' as const, message: 'Stop Loss block has invalid configuration' },
  ];

  const validationLogs = [
    { type: 'error' as const, message: 'Stop Loss block: Missing value parameter', timestamp: new Date(Date.now() - 60000) },
    { type: 'warning' as const, message: 'No exit rules connected to entry chain', timestamp: new Date(Date.now() - 120000) },
    { type: 'info' as const, message: 'Strategy validation started', timestamp: new Date(Date.now() - 180000) },
  ];

  const previewMetrics = {
    winRate: 62,
    avgRR: 2.1,
    backtestDays: 90,
  };

  const handleSave = () => {
    console.log('Saving strategy...', { strategyName, description, nodes, connections });
    setLastSaved(new Date());
    setIsModified(false);
  };

  const handleQuickBacktest = () => {
    console.log('Running quick backtest...');
    setShowQuickBacktest(true);
  };

  const handleDeploy = () => {
    console.log('Deploying strategy...');
    // Show confirmation modal
    alert('This would open a deployment confirmation dialog');
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const state = history[historyIndex - 1];
      setNodes(state.nodes);
      setConnections(state.connections);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const state = history[historyIndex + 1];
      setNodes(state.nodes);
      setConnections(state.connections);
    }
  };

  const handleValidate = () => {
    console.log('Validating strategy...');
    alert('Validation results shown in right panel');
  };

  const handleNodeMove = (nodeId: string, x: number, y: number) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === nodeId ? { ...node, x, y } : node))
    );
    setIsModified(true);
  };

  const handleNodeDelete = (nodeId: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== nodeId));
    setConnections((prev) =>
      prev.filter((conn) => conn.from !== nodeId && conn.to !== nodeId)
    );
    setIsModified(true);
  };

  const handleNodeToggleDisable = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId ? { ...node, disabled: !node.disabled } : node
      )
    );
    setIsModified(true);
  };

  const handleNodeDuplicate = (nodeId: string) => {
    const nodeToDuplicate = nodes.find((n) => n.id === nodeId);
    if (nodeToDuplicate) {
      const newNode = {
        ...nodeToDuplicate,
        id: `node-${Date.now()}`,
        x: nodeToDuplicate.x + 50,
        y: nodeToDuplicate.y + 50,
      };
      setNodes((prev) => [...prev, newNode]);
      setIsModified(true);
    }
  };

  const handleBlockDragStart = (block: any) => {
    setDraggedBlock(block);
  };

  const handleCanvasDrop = (x: number, y: number) => {
    if (draggedBlock) {
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: draggedBlock.name,
        name: draggedBlock.name,
        summary: draggedBlock.description,
        status: 'warning',
        icon: draggedBlock.icon,
        color: draggedBlock.color,
        x,
        y,
      };
      setNodes((prev) => [...prev, newNode]);
      setDraggedBlock(null);
      setIsModified(true);
    }
  };

  const handleRunQuickBacktest = (timeRange: string) => {
    console.log('Running quick backtest for:', timeRange);
    // Simulate backtest
    setTimeout(() => {
      setBacktestResults({
        totalTrades: 48,
        winRate: 62,
        pnl: 18.5,
        maxDrawdown: -12,
        sharpe: 1.6,
      });
    }, 1000);
  };

  const handleOpenFullBacktest = () => {
    console.log('Opening full backtesting lab...');
    // Navigate to backtesting lab page
  };

  // Auto-save detection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isModified) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isModified]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <BuilderHeader
        strategyName={strategyName}
        strategyState={strategyState}
        isModified={isModified}
        lastSaved={lastSaved}
        onSave={handleSave}
        onQuickBacktest={handleQuickBacktest}
        onDeploy={handleDeploy}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onValidate={handleValidate}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        canSave={isModified}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden" style={{ height: showQuickBacktest ? 'calc(100% - 320px)' : 'calc(100% - 88px)' }}>
        {/* Left: Block Palette */}
        <BlockPalette onDragStart={handleBlockDragStart} />

        {/* Center: Canvas */}
        <StrategyCanvas
          nodes={nodes}
          connections={connections}
          selectedNodeId={selectedNodeId}
          onNodeSelect={setSelectedNodeId}
          onNodeMove={handleNodeMove}
          onNodeDelete={handleNodeDelete}
          onNodeToggleDisable={handleNodeToggleDisable}
          onNodeDuplicate={handleNodeDuplicate}
          onDrop={handleCanvasDrop}
        />

        {/* Right: Details Panel */}
        <StrategyDetailsPanel
          strategyName={strategyName}
          onStrategyNameChange={setStrategyName}
          description={description}
          onDescriptionChange={setDescription}
          validations={validations}
          previewMetrics={previewMetrics}
        />
      </div>

      {/* Bottom: Quick Backtest Panel */}
      <QuickBacktestPanel
        isOpen={showQuickBacktest}
        onToggle={() => setShowQuickBacktest(!showQuickBacktest)}
        backtestResults={backtestResults}
        validationLogs={validationLogs}
        onRunQuickBacktest={handleRunQuickBacktest}
        onOpenFullBacktest={handleOpenFullBacktest}
      />
    </div>
  );
}
