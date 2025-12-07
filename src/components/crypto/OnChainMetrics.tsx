import { Activity, Users, Zap, Database, Lock, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  icon: any;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  sparklineData?: number[];
}

function MetricCard({ icon: Icon, label, value, change, positive, sparklineData }: MetricCardProps) {
  return (
    <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-[#00C8FF]" />
          <span className="text-xs text-gray-500">{label}</span>
        </div>
        <span
          className={cn(
            'text-xs font-semibold',
            positive ? 'text-[#00FF88]' : 'text-red-400'
          )}
        >
          {change}
        </span>
      </div>
      
      <div className="text-xl font-bold text-white mb-2">{value}</div>
      
      {sparklineData && (
        <div className="h-8 flex items-end gap-0.5">
          {sparklineData.map((val, idx) => (
            <div
              key={idx}
              className="flex-1 bg-[#00FF88]/30 rounded-t"
              style={{ height: `${val}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function OnChainMetrics() {
  return (
    <div className="space-y-4">
      {/* Network Health Indicator */}
      <div className="p-4 bg-gradient-to-br from-[#00FF88]/5 to-[#00C8FF]/5 border border-[#00FF88]/20 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#00FF88]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Network Status</div>
              <div className="text-xs text-gray-500">All systems operational</div>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-[#00FF88]/10 text-[#00FF88] text-sm font-semibold border border-[#00FF88]/30">
            Healthy
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          icon={Users}
          label="Active Addresses (24h)"
          value="842,350"
          change="+12.4%"
          positive={true}
          sparklineData={[60, 65, 70, 68, 75, 80, 78, 85, 90, 88]}
        />
        
        <MetricCard
          icon={Users}
          label="New Addresses (24h)"
          value="125,420"
          change="+8.2%"
          positive={true}
          sparklineData={[55, 58, 62, 60, 65, 70, 68, 72, 75, 73]}
        />
        
        <MetricCard
          icon={Zap}
          label="Transactions (24h)"
          value="342,580"
          change="+5.8%"
          positive={true}
          sparklineData={[65, 68, 70, 72, 75, 73, 78, 80, 82, 85]}
        />
        
        <MetricCard
          icon={Activity}
          label="Avg Transaction Value"
          value="$4,250"
          change="-2.3%"
          positive={false}
          sparklineData={[80, 78, 75, 73, 70, 68, 65, 63, 60, 58]}
        />
        
        <MetricCard
          icon={Database}
          label="Network Fees (24h)"
          value="$1.2M"
          change="+18.5%"
          positive={true}
          sparklineData={[45, 50, 55, 60, 65, 70, 75, 80, 85, 90]}
        />
        
        <MetricCard
          icon={Lock}
          label="Hashrate"
          value="450 EH/s"
          change="+3.2%"
          positive={true}
          sparklineData={[70, 72, 74, 73, 75, 77, 79, 81, 80, 82]}
        />
      </div>

      {/* Additional Insights */}
      <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h4 className="text-sm font-semibold text-white mb-3">Network Insights</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-4 h-4 text-[#00FF88] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-400">
              Active addresses increased by 12.4% in the last 24h, indicating growing network activity
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Activity className="w-4 h-4 text-[#00C8FF] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-400">
              Network fees are up 18.5%, suggesting higher demand for block space
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lock className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-400">
              Hashrate continues to grow, improving network security
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
