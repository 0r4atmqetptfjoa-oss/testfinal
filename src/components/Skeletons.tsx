
import React from "react";

export function SkeletonLine({ w="100%", h=12 }: { w?: string|number; h?: number }){
  return <div className="animate-pulse rounded bg-gray-800/60" style={{ width: w, height: h }} />;
}
export function SkeletonCard(){
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded bg-gray-800/60 w-10 h-10 animate-pulse" />
        <div className="flex-1 space-y-2">
          <SkeletonLine w="60%" />
          <SkeletonLine w="40%" />
        </div>
      </div>
    </div>
  );
}
