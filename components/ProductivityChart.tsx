"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/** Grafik produktivitas 7/30 hari — Recharts, token chart warna. */
export function ProductivityChart({ data }: { data: Array<{ date: string; count: number }> }) {
  const chartData = useMemo(() => data, [data]);
  const max = Math.max(1, ...chartData.map((d) => d.count));
  return (
    <div className="h-44 w-full" role="img" aria-label={`Grafik produktivitas ${chartData.length} hari terakhir, maksimal ${max} misi per hari`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }}
          />
          <Bar dataKey="count" name="Misi selesai" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
