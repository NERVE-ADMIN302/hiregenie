import React from 'react';

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-8 w-1/3 rounded-lg"></div>
      <div className="skeleton h-32 w-full rounded-lg"></div>
      <div className="skeleton h-32 w-full rounded-lg"></div>
    </div>
  );
}