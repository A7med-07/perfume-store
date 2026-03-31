// app/watches/[id]/page.tsx
import { use } from 'react'
import { notFound } from 'next/navigation'
import { watches } from '../../data/watches'
import WatchDetails from '../../WatchDetails'

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const watch = watches.find(w => w.id === Number(id))
  if (!watch) notFound()

  const related = watches
    .filter(w => w.id !== watch.id && (w.brand === watch.brand || w.category === watch.category))
    .slice(0, 4)

  return <WatchDetails watch={watch} related={related} />
}