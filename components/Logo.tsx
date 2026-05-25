export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-aqua text-lg font-black text-white shadow-glow">P</div>
      {!compact && (
        <span className="font-display text-2xl font-bold tracking-wide">
          POOL <span className="text-aqua">FOREVER</span>
        </span>
      )}
    </div>
  );
}
