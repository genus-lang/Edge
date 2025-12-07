import { useState, useEffect } from 'react';
import { CodeEditorHeader } from '../components/code-editor/CodeEditorHeader';
import { CodeEditorPanel } from '../components/code-editor/CodeEditorPanel';
import { RightSidebarPanels } from '../components/code-editor/RightSidebarPanels';
import { BottomConsole } from '../components/code-editor/BottomConsole';

const pythonTemplate = `# Quant Edge Strategy - Moving Average Crossover
import numpy as np
import pandas as pd

# Strategy parameters
fast_ma_period = 20
slow_ma_period = 50
position_size = 0.02  # 2% of equity

def initialize():
    """Initialize strategy on startup"""
    print("Strategy initialized")
    
def on_bar(symbol, data):
    """Called on each new bar"""
    # Get historical data
    df = get_historical_data(symbol, '1h', 100)
    
    # Calculate moving averages
    df['fast_ma'] = df['close'].rolling(fast_ma_period).mean()
    df['slow_ma'] = df['close'].rolling(slow_ma_period).mean()
    
    # Get current values
    fast_ma = df['fast_ma'].iloc[-1]
    slow_ma = df['slow_ma'].iloc[-1]
    prev_fast_ma = df['fast_ma'].iloc[-2]
    prev_slow_ma = df['slow_ma'].iloc[-2]
    
    # Get current position
    position = get_position(symbol)
    
    # Entry logic: Fast MA crosses above Slow MA
    if fast_ma > slow_ma and prev_fast_ma <= prev_slow_ma:
        if position == 0:
            # Calculate position size
            balance = get_balance()
            qty = (balance * position_size) / data['close']
            
            # Place buy order
            place_order(symbol, 'buy', qty, 'market')
            print(f"BUY signal: {symbol} at {data['close']}")
    
    # Exit logic: Fast MA crosses below Slow MA
    elif fast_ma < slow_ma and prev_fast_ma >= prev_slow_ma:
        if position > 0:
            # Close position
            place_order(symbol, 'sell', position, 'market')
            print(f"SELL signal: {symbol} at {data['close']}")

def on_order_filled(order):
    """Called when an order is filled"""
    print(f"Order filled: {order['symbol']} {order['side']} {order['qty']} @ {order['price']}")

def on_stop():
    """Called when strategy is stopped"""
    print("Strategy stopped")
`;

const javascriptTemplate = `// Quant Edge Strategy - Moving Average Crossover
const fastMaPeriod = 20;
const slowMaPeriod = 50;
const positionSize = 0.02; // 2% of equity

function initialize() {
  console.log("Strategy initialized");
}

function onBar(symbol, data) {
  // Get historical data
  const df = getHistoricalData(symbol, '1h', 100);
  
  // Calculate moving averages
  const fastMa = calculateSMA(df.close, fastMaPeriod);
  const slowMa = calculateSMA(df.close, slowMaPeriod);
  
  // Get current values
  const currentFastMa = fastMa[fastMa.length - 1];
  const currentSlowMa = slowMa[slowMa.length - 1];
  const prevFastMa = fastMa[fastMa.length - 2];
  const prevSlowMa = slowMa[slowMa.length - 2];
  
  // Get current position
  const position = getPosition(symbol);
  
  // Entry logic: Fast MA crosses above Slow MA
  if (currentFastMa > currentSlowMa && prevFastMa <= prevSlowMa) {
    if (position === 0) {
      const balance = getBalance();
      const qty = (balance * positionSize) / data.close;
      
      placeOrder(symbol, 'buy', qty, 'market');
      console.log(\`BUY signal: \${symbol} at \${data.close}\`);
    }
  }
  
  // Exit logic: Fast MA crosses below Slow MA
  else if (currentFastMa < currentSlowMa && prevFastMa >= prevSlowMa) {
    if (position > 0) {
      placeOrder(symbol, 'sell', position, 'market');
      console.log(\`SELL signal: \${symbol} at \${data.close}\`);
    }
  }
}

function onOrderFilled(order) {
  console.log(\`Order filled: \${order.symbol} \${order.side} \${order.qty} @ \${order.price}\`);
}

function onStop() {
  console.log("Strategy stopped");
}
`;

export function CodeEditor() {
  const [strategyName, setStrategyName] = useState('MA Crossover Strategy');
  const [strategyId] = useState('STR-00457');
  const [strategyStatus, setStrategyStatus] = useState<'draft' | 'active' | 'archived'>('draft');
  const [lastSaved, setLastSaved] = useState<Date | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [isModified, setIsModified] = useState(false);
  
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'javascript'>('python');
  const [environment, setEnvironment] = useState<'paper' | 'live' | 'sandbox'>('paper');
  
  const [files, setFiles] = useState([
    {
      id: 'main-py',
      name: 'main.py',
      language: 'python',
      content: pythonTemplate,
      path: 'strategies/user/main.py',
    },
  ]);
  const [activeFileId, setActiveFileId] = useState('main-py');
  
  const [errors, setErrors] = useState<Array<{ line: number; message: string; severity: 'error' | 'warning' }>>([]);
  
  const [variables, setVariables] = useState([
    { id: 'var-1', name: 'fast_ma_period', type: 'int' as const, defaultValue: '20', min: 5, max: 50, exposeInUI: true },
    { id: 'var-2', name: 'slow_ma_period', type: 'int' as const, defaultValue: '50', min: 20, max: 200, exposeInUI: true },
    { id: 'var-3', name: 'position_size', type: 'float' as const, defaultValue: '0.02', min: 0.01, max: 0.1, exposeInUI: true },
  ]);
  
  const [symbols, setSymbols] = useState([
    { id: 'sym-1', symbol: 'AAPL', type: 'equity' as const },
    { id: 'sym-2', symbol: 'BTCUSDT', type: 'crypto' as const },
    { id: 'sym-3', symbol: 'EURUSD', type: 'forex' as const },
  ]);
  
  const [consoleLogs, setConsoleLogs] = useState<Array<{ timestamp: Date; level: 'info' | 'warn' | 'error'; message: string }>>([
    { timestamp: new Date(), level: 'info', message: 'Strategy initialized successfully' },
    { timestamp: new Date(), level: 'info', message: 'Connected to market data feed' },
  ]);
  
  const [testResult, setTestResult] = useState<any>(undefined);
  const [showConsole, setShowConsole] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    console.log('Saving strategy...', { strategyName, files, variables, symbols });
    
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
      setIsModified(false);
    }, 1000);
  };

  const handleRunTest = () => {
    console.log('Running test...');
    setShowConsole(true);
    
    setConsoleLogs((prev) => [
      ...prev,
      { timestamp: new Date(), level: 'info', message: 'Starting test run...' },
      { timestamp: new Date(), level: 'info', message: 'Loading historical data for AAPL...' },
    ]);
    
    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        { timestamp: new Date(), level: 'info', message: 'Test completed successfully' },
      ]);
      
      setTestResult({
        symbol: 'AAPL',
        timeframe: '1h',
        dateRange: '2024-01-01 to 2024-12-07',
        totalTrades: 24,
        winRate: 65,
        pnl: 12.5,
        maxDrawdown: -8.3,
        trades: [
          { id: '1', entryTime: '2024-11-20 10:30', exitTime: '2024-11-21 14:15', side: 'buy' as const, size: 10, pnl: 2.5 },
          { id: '2', entryTime: '2024-11-22 09:00', exitTime: '2024-11-22 15:45', side: 'buy' as const, size: 10, pnl: -1.2 },
          { id: '3', entryTime: '2024-11-25 11:20', exitTime: '2024-11-26 13:30', side: 'buy' as const, size: 10, pnl: 3.8 },
          { id: '4', entryTime: '2024-11-27 10:00', exitTime: '2024-11-28 14:00', side: 'buy' as const, size: 10, pnl: 1.9 },
          { id: '5', entryTime: '2024-12-01 09:30', exitTime: '2024-12-02 16:00', side: 'buy' as const, size: 10, pnl: -0.8 },
        ],
      });
    }, 2000);
  };

  const handleBacktest = () => {
    console.log('Opening backtesting lab...');
    // Navigate to backtesting lab page
  };

  const handleDeploy = () => {
    console.log('Deploying strategy...');
    alert('This would open a deployment confirmation dialog');
  };

  const handleUndo = () => {
    console.log('Undo');
  };

  const handleRedo = () => {
    console.log('Redo');
  };

  const handleFormatCode = () => {
    console.log('Formatting code...');
    setConsoleLogs((prev) => [
      ...prev,
      { timestamp: new Date(), level: 'info', message: 'Code formatted successfully' },
    ]);
  };

  const handleDownload = () => {
    const activeFile = files.find((f) => f.id === activeFileId);
    if (activeFile) {
      const blob = new Blob([activeFile.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = activeFile.name;
      a.click();
    }
  };

  const handleFileChange = (fileId: string, content: string) => {
    setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, content } : f)));
    setIsModified(true);
    
    // Simple linting simulation
    const lines = content.split('\n');
    const newErrors: Array<{ line: number; message: string; severity: 'error' | 'warning' }> = [];
    
    lines.forEach((line, idx) => {
      if (line.includes('TODO')) {
        newErrors.push({ line: idx + 1, message: 'TODO comment found', severity: 'warning' });
      }
    });
    
    setErrors(newErrors);
  };

  const handleFileAdd = () => {
    const newFile = {
      id: `file-${Date.now()}`,
      name: selectedLanguage === 'python' ? 'helpers.py' : 'helpers.js',
      language: selectedLanguage,
      content: '',
      path: `strategies/user/helpers.${selectedLanguage === 'python' ? 'py' : 'js'}`,
    };
    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newFile.id);
    setIsModified(true);
  };

  const handleFileClose = (fileId: string) => {
    if (files.length > 1) {
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      if (activeFileId === fileId) {
        setActiveFileId(files[0].id);
      }
    }
  };

  const handleLanguageChange = (lang: 'python' | 'javascript') => {
    setSelectedLanguage(lang);
    const newFiles = [
      {
        id: `main-${lang === 'python' ? 'py' : 'js'}`,
        name: lang === 'python' ? 'main.py' : 'main.js',
        language: lang,
        content: lang === 'python' ? pythonTemplate : javascriptTemplate,
        path: `strategies/user/main.${lang === 'python' ? 'py' : 'js'}`,
      },
    ];
    setFiles(newFiles);
    setActiveFileId(newFiles[0].id);
    setIsModified(true);
  };

  const handleVariableAdd = () => {
    const newVar = {
      id: `var-${Date.now()}`,
      name: 'new_variable',
      type: 'int' as const,
      defaultValue: '0',
      exposeInUI: false,
    };
    setVariables((prev) => [...prev, newVar]);
    setIsModified(true);
  };

  const handleVariableDelete = (id: string) => {
    setVariables((prev) => prev.filter((v) => v.id !== id));
    setIsModified(true);
  };

  const handleVariableUpdate = (id: string, updates: any) => {
    setVariables((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)));
    setIsModified(true);
  };

  const handleSymbolAdd = () => {
    const newSymbol = {
      id: `sym-${Date.now()}`,
      symbol: 'NEWSY',
      type: 'equity' as const,
    };
    setSymbols((prev) => [...prev, newSymbol]);
    setIsModified(true);
  };

  const handleSymbolDelete = (id: string) => {
    setSymbols((prev) => prev.filter((s) => s.id !== id));
    setIsModified(true);
  };

  const handleClearLogs = () => {
    setConsoleLogs([]);
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
      <CodeEditorHeader
        strategyName={strategyName}
        strategyId={strategyId}
        strategyStatus={strategyStatus}
        lastSaved={lastSaved}
        isSaving={isSaving}
        isModified={isModified}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        environment={environment}
        onEnvironmentChange={setEnvironment}
        onSave={handleSave}
        onRunTest={handleRunTest}
        onBacktest={handleBacktest}
        onDeploy={handleDeploy}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onFormatCode={handleFormatCode}
        onDownload={handleDownload}
        canUndo={false}
        canRedo={false}
        onStrategyNameChange={setStrategyName}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden" style={{ height: showConsole ? 'calc(100% - 384px)' : 'calc(100% - 144px)' }}>
        {/* Code Editor */}
        <div className="flex-1">
          <CodeEditorPanel
            files={files}
            activeFileId={activeFileId}
            onFileChange={handleFileChange}
            onFileSelect={setActiveFileId}
            onFileClose={handleFileClose}
            onFileAdd={handleFileAdd}
            errors={errors}
          />
        </div>

        {/* Right Sidebar */}
        <RightSidebarPanels
          variables={variables}
          symbols={symbols}
          onVariableAdd={handleVariableAdd}
          onVariableDelete={handleVariableDelete}
          onVariableUpdate={handleVariableUpdate}
          onSymbolAdd={handleSymbolAdd}
          onSymbolDelete={handleSymbolDelete}
        />
      </div>

      {/* Bottom Console */}
      <BottomConsole
        isOpen={showConsole}
        onToggle={() => setShowConsole(!showConsole)}
        consoleLogs={consoleLogs}
        testResult={testResult}
        onClearLogs={handleClearLogs}
      />
    </div>
  );
}
