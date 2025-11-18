import { CheckCircle } from "lucide-react";

interface AuditItem {
  system: string;
  status: string;
}

interface SecurityAuditTableProps {
  audits: AuditItem[];
}

export function SecurityAuditTable({ audits }: SecurityAuditTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left py-4 px-6 text-[#00FF88]">
              Audit / Security System
            </th>
            <th className="text-left py-4 px-6 text-[#00FF88]">Status</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit, index) => (
            <tr
              key={index}
              className="border-b border-white/10 hover:bg-white/5 transition-colors"
            >
              <td className="py-4 px-6 text-gray-300">{audit.system}</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2 text-[#00C8FF]">
                  <CheckCircle size={18} />
                  <span>{audit.status}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
