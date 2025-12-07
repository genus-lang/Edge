import { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Moon,
  Sun,
  User,
  Settings,
  CreditCard,
  LogOut,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../lib/auth';
import { cn } from '../../lib/utils';

interface SearchResult {
  id: string;
  type: 'asset' | 'strategy' | 'news';
  title: string;
  subtitle?: string;
  icon?: string;
}

// Mock search results
const mockSearchResults: SearchResult[] = [
  { id: '1', type: 'asset', title: 'AAPL', subtitle: 'Apple Inc. - $182.45' },
  { id: '2', type: 'asset', title: 'BTC-USD', subtitle: 'Bitcoin - $43,250.00' },
  { id: '3', type: 'asset', title: 'TSLA', subtitle: 'Tesla Inc. - $238.72' },
  { id: '4', type: 'strategy', title: 'Mean Reversion Strategy', subtitle: 'Active' },
  { id: '5', type: 'strategy', title: 'Momentum Breakout', subtitle: 'Backtesting' },
  { id: '6', type: 'news', title: 'Fed Signals Rate Hold', subtitle: '2 hours ago' },
];

interface Notification {
  id: string;
  type: 'price' | 'strategy' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'price',
    title: 'Price Alert',
    message: 'BTC crossed $45,000',
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'strategy',
    title: 'Strategy Alert',
    message: 'Mean Reversion generated buy signal',
    time: '12 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'System Update',
    message: 'New features available in Strategy Builder',
    time: '1 hour ago',
    read: true,
  },
];

interface TopBarProps {
  sidebarCollapsed: boolean;
}

export function TopBar({ sidebarCollapsed }: TopBarProps) {
  const { user, profile } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    if ((window as any).navigateTo) {
      (window as any).navigateTo('login');
    }
  };

  const filteredResults = searchQuery
    ? mockSearchResults.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div
      className={cn(
        'sticky top-0 z-30 transition-all duration-300',
        isScrolled ? 'bg-[#0E1117]/95 backdrop-blur-lg shadow-lg' : 'bg-transparent',
        sidebarCollapsed ? 'left-[72px]' : 'left-[260px]'
      )}
      style={{
        width: sidebarCollapsed ? 'calc(100% - 72px)' : 'calc(100% - 260px)',
      }}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
        {/* Search */}
        <div className="flex-1 max-w-xl" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search stocks, crypto, strategies, news..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00FF88]/50 focus:ring-1 focus:ring-[#00FF88]/50 transition-all"
            />

            {/* Search Results Dropdown */}
            {searchOpen && searchQuery && filteredResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-[#0E1117] border border-gray-800 rounded-lg shadow-2xl max-h-96 overflow-y-auto">
                <div className="p-2 space-y-1">
                  {filteredResults.map((result) => (
                    <button
                      key={result.id}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchOpen(false);
                      }}
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center',
                          result.type === 'asset' && 'bg-[#00FF88]/10 text-[#00FF88]',
                          result.type === 'strategy' && 'bg-[#00C8FF]/10 text-[#00C8FF]',
                          result.type === 'news' && 'bg-purple-500/10 text-purple-400'
                        )}
                      >
                        {result.type === 'asset' && <TrendingUp className="w-4 h-4" />}
                        {result.type === 'strategy' && <CheckCircle className="w-4 h-4" />}
                        {result.type === 'news' && <AlertCircle className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{result.title}</div>
                        {result.subtitle && (
                          <div className="text-xs text-gray-500">{result.subtitle}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00FF88] rounded-full border-2 border-[#0E1117]" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0E1117] border border-gray-800 rounded-lg shadow-2xl max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                  <h3 className="font-semibold text-white">Notifications</h3>
                  <button className="text-xs text-[#00FF88] hover:text-[#00FF88]/80">
                    Mark all read
                  </button>
                </div>
                <div className="p-2 space-y-1">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        'p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer',
                        !notification.read && 'bg-gray-800/50'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                            notification.type === 'price' && 'bg-[#00FF88]/10 text-[#00FF88]',
                            notification.type === 'strategy' &&
                              'bg-[#00C8FF]/10 text-[#00C8FF]',
                            notification.type === 'system' && 'bg-purple-500/10 text-purple-400'
                          )}
                        >
                          {notification.type === 'price' && <TrendingUp className="w-4 h-4" />}
                          {notification.type === 'strategy' && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          {notification.type === 'system' && <AlertCircle className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white">
                            {notification.title}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {notification.message}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">{notification.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 pl-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="text-sm text-white font-medium">
                {profile?.full_name || user?.email?.split('@')[0] || 'User'}
              </span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF88] to-[#00C8FF] flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0E1117] border border-gray-800 rounded-lg shadow-2xl">
                <div className="p-3 border-b border-gray-800">
                  <div className="font-medium text-white">
                    {profile?.full_name || 'User'}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{user?.email}</div>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left text-sm text-gray-300">
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left text-sm text-gray-300">
                    <CreditCard className="w-4 h-4" />
                    Subscription
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left text-sm text-gray-300">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
                <div className="p-2 border-t border-gray-800">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors text-left text-sm text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
