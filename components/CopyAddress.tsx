'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
export default function CopyAddress({ mint }: { mint: string }) {
  const [done, setDone] = useState(false);
  return <button className="contract" onClick={async () => { await navigator.clipboard.writeText(mint); setDone(true); setTimeout(() => setDone(false), 1600); }}>{done ? 'COPIED' : mint} {done ? <Check size={14} /> : <Copy size={14} />}</button>;
}
