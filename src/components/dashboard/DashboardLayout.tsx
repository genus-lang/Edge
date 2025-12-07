import { ReactNode, useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { TopBar } from './TopBar';
import { RightPanel } from './RightPanel';
import { cn } from '../../lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  activePage: string;
  onPageChange: (page: string) => void;
}

export function DashboardLayout({
  children,
  activePage,
  onPageChange,
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [rightPanelType, setRightPanelType] = useState<'ai-insights' | 'help' | null>(null);

  // Make right panel accessible globally
  (window as any).openRightPanel = (type: 'ai-insights' | 'help') => {
    setRightPanelType(type);
    setRightPanelOpen(true);
  };

  // Make navigation accessible globally for breadcrumbs
  (window as any).onPageChange = onPageChange;

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      {/* Left Sidebar */}
      <LeftSidebar activePage={activePage} onPageChange={onPageChange} />

      {/* Main Content Area */}
      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
        )}
      >
        {/* Top Bar */}
        <TopBar sidebarCollapsed={sidebarCollapsed} />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Right Panel */}
      <RightPanel
        isOpen={rightPanelOpen}
        onClose={() => setRightPanelOpen(false)}
        type={rightPanelType}
      />
    </div>
  );
}