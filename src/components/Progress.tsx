export function Progress({ position, total }: { position: number; total: number }) {
  const label = `${String(position).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
  return <div className="chapter-progress" aria-label={`Chapter ${position} of ${total}`}><span>{label}</span><i /></div>
}
