import { useState } from 'react';
import {
  LayoutGrid,
  TrendingUp,
  Code2,
  PieChart,
  Activity,
  FileText,
  Settings,
  ChevronRight,
  ChevronLeft,
  LineChart,
  Eye,
  Boxes,
  Layers,
  Target,
  BarChart3,
  Gauge,
  ListOrdered,
  History,
  Link2,
  FileBarChart,
  Download,
  User,
  Sliders,
  Key,
  Shield,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  badge?: string | number;
  submenu?: {
    id: string;
    label: string;
  }[];
}

const menuItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutGrid,
  },
  {
    id: 'markets',
    label: 'Markets',
    icon: TrendingUp,
    submenu: [
      { id: 'market-overview', label: 'Market Overview' },
      { id: 'market-watchlist', label: 'Watchlist' },
      { id: 'charts', label: 'Real-time Charts' },
      { id: 'indicators-lab', label: 'Indicators Lab' },
      { id: 'stock-details', label: 'Stock Details' },
      { id: 'crypto-details', label: 'Crypto Details' },
      { id: 'forex-details', label: 'Forex Details' },
      { id: 'heatmap', label: 'Heatmap' },
      { id: 'screener', label: 'Screener' },
      { id: 'ai-predictions', label: 'AI Predictions' },
      { id: 'news-feed', label: 'News Feed' },
      { id: 'sentiment-analysis', label: 'Sentiment' },
      { id: 'stocks', label: 'Stocks' },
    ],
  },
  {
    id: 'strategies',
    label: 'Strategies',
    icon: Code2,
    submenu: [
      { id: 'strategy-library', label: 'Strategy Library' },
      { id: 'strategy-builder', label: 'Builder (No-Code)' },
      { id: 'code-editor', label: 'Code Editor' },
      { id: 'backtesting-lab', label: 'Backtesting Lab' },
      { id: 'optimization', label: 'Optimization' },
    ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: PieChart,
    submenu: [
      { id: 'portfolio-overview', label: 'Portfolio Overview' },
      { id: 'allocation', label: 'Allocation' },
      { id: 'risk-analysis', label: 'Risk Analysis' },
      { id: 'pnl-analytics', label: 'P&L Analytics' },
    ],
  },
  {
    id: 'trading',
    label: 'Trading',
    icon: Activity,
    badge: 3,
    submenu: [
      { id: 'trading-panel', label: 'Trading Panel' },
      { id: 'live-monitor', label: 'Live Monitor' },
      { id: 'orders', label: 'Orders' },
      { id: 'trade-history', label: 'Trade History' },
      { id: 'brokers', label: 'Brokers' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    submenu: [
      { id: 'reports', label: 'Reports' },
      { id: 'export', label: 'Export' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    submenu: [
      { id: 'profile', label: 'Profile' },
      { id: 'preferences', label: 'Preferences' },
      { id: 'api-keys', label: 'API Keys' },
      { id: 'security', label: 'Security' },
    ],
  },
];

interface LeftSidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export function LeftSidebar({ activePage, onPageChange }: LeftSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>('markets');

  const toggleMenu = (id: string) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-screen bg-[#0E1117] border-r border-gray-800 transition-all duration-300 z-40',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FF88] to-[#00C8FF] flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-white">Quant Edge</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <div className="overflow-y-auto h-[calc(100vh-4rem)] py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              {/* Main Menu Item */}
              <button
                onClick={() => {
                  if (item.submenu) {
                    toggleMenu(item.id);
                  } else {
                    onPageChange(item.id);
                  }
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative',
                  activePage === item.id
                    ? 'bg-gradient-to-r from-[#00FF88]/10 to-[#00C8FF]/10 text-[#00FF88]'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                )}
              >
                {/* Active Indicator */}
                {activePage === item.id && (
                  <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-[#00FF88] to-[#00C8FF] rounded-r-full" />
                )}

                <item.icon className="w-5 h-5 flex-shrink-0" />

                {!collapsed && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-[#00FF88] text-black font-semibold">
                        {item.badge}
                      </span>
                    )}
                    {item.submenu && (
                      <ChevronRight
                        className={cn(
                          'w-4 h-4 transition-transform',
                          expandedMenu === item.id && 'rotate-90'
                        )}
                      />
                    )}
                  </>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-[#00FF88] text-black">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>

              {/* Submenu */}
              {item.submenu && !collapsed && expandedMenu === item.id && (
                <div className="mt-1 ml-4 space-y-1">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => onPageChange(subItem.id)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all',
                        activePage === subItem.id
                          ? 'text-[#00FF88] bg-gray-800/50'
                          : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                      )}
                    >
                      <div className="w-1 h-1 rounded-full bg-current" />
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}