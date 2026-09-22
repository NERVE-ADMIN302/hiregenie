import React from 'react';

export function DataTable({ columns, data }: any) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[var(--bg)] border-b border-[var(--border)]">
          <tr>{columns.map((col: any) => <th key={col.key} className="px-6 py-4 font-medium text-[var(--text-muted)]">{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--border)] transition-colors">
              {columns.map((col: any) => <td key={col.key} className="px-6 py-4">{row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}