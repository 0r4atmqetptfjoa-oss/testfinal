
import React, { useMemo } from "react";
import Lottie from "@/components/Lottie";
import { tintLottie } from "@/lib/lottieBrand";
import badgeFirst from "@/assets/lottie/badge_first.json";
import badgePerfect from "@/assets/lottie/badge_perfect.json";
import badgeStreak from "@/assets/lottie/badge_streak.json";

export function BadgeFirst({ color = "#8b5cf6" }: { color?: string }){
  const data = useMemo(()=> tintLottie(badgeFirst as any, color), [color]);
  return <Lottie src={data} style={{ width: 56, height: 56 }} />;
}
export function BadgePerfect({ color = "#22d3ee" }: { color?: string }){
  const data = useMemo(()=> tintLottie(badgePerfect as any, color), [color]);
  return <Lottie src={data} style={{ width: 56, height: 56 }} />;
}
export function BadgeStreak({ color = "#10b981" }: { color?: string }){
  const data = useMemo(()=> tintLottie(badgeStreak as any, color), [color]);
  return <Lottie src={data} style={{ width: 56, height: 56 }} />;
}
