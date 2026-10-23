export function ScoreBar({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-2 w-24 overflow-hidden rounded-full bg-slate-200"
        role="img"
        aria-label={`Score de matching ${clamped} sur 100`}
      >
        <div className="h-full rounded-full bg-emerald-600" style={{ width: `${clamped}%` }} />
      </div>
      <span className="text-xs font-semibold text-slate-700">{clamped}/100</span>
    </div>
  );
}
