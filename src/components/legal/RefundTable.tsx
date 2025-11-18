interface RefundTableProps {
  rows: {
    situation: string;
    eligibility: string;
    isEligible: boolean;
  }[];
}

export function RefundTable({ rows }: RefundTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left py-3 px-4 text-[#00FF88]">Situation</th>
            <th className="text-left py-3 px-4 text-[#00FF88]">
              Refund Eligibility
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-b border-white/10 hover:bg-white/5 transition-colors"
            >
              <td className="py-3 px-4 text-gray-300">{row.situation}</td>
              <td className="py-3 px-4">
                <span
                  className={`flex items-center gap-2 ${
                    row.isEligible ? "text-[#00FF88]" : "text-red-400"
                  }`}
                >
                  {row.isEligible ? "✔" : "❌"} {row.eligibility}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
