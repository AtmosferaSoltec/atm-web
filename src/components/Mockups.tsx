import type { ProductId } from '../data/site'

/** Ventana de app simplificada; el contenido cambia por producto. */
function Frame({ children, from, to }: { children: React.ReactNode; from: string; to: string }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] opacity-40 blur-3xl"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101113] shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  )
}

const Bar = ({ w, c }: { w: string; c: string }) => (
  <div className="h-2 rounded-full bg-white/[0.07]">
    <div className="h-full rounded-full" style={{ width: w, background: c }} />
  </div>
)

function Orbita({ from, to }: { from: string; to: string }) {
  const bars = [38, 62, 45, 80, 55, 92, 70]
  return (
    <Frame from={from} to={to}>
      <p className="text-xs text-white/45">Recibos por honorarios · 2026</p>
      <p className="mt-1 text-3xl font-bold tracking-tight">S/ 31,240<span className="text-base font-medium text-white/40"> / 50,000</span></p>
      <div className="mt-3"><Bar w="62%" c={`linear-gradient(90deg,${from},${to})`} /></div>
      <div className="mt-6 flex h-28 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-md" style={{ height: `${h}%`, background: `linear-gradient(to top,${from}55,${to})`, opacity: 0.45 + i * 0.08 }} />
        ))}
      </div>
      <div className="mt-5 space-y-2.5 text-sm">
        {[['Netflix compartido', 'Ana pagó'], ['GitHub', 'Próx. cobro 12 nov'], ['Préstamo · Luis', 'S/ 400 pendiente']].map(([a, b]) => (
          <div key={a} className="flex justify-between rounded-lg bg-white/[0.04] px-3 py-2.5">
            <span>{a}</span><span className="text-white/45">{b}</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function Nova({ from, to }: { from: string; to: string }) {
  const rows = [
    ['Marco', '+ S/ 180', 'Debe', true],
    ['Junta del barrio', '– S/ 250', 'Cuota 4/10', false],
    ['Apple One · Carla', '+ S/ 22', 'Al día', true],
    ['Diego', '+ S/ 95', 'Debe', true],
  ] as const
  return (
    <Frame from={from} to={to}>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-white/45">Te deben</p>
          <p className="mt-1 text-3xl font-bold tracking-tight" style={{ backgroundImage: `linear-gradient(90deg,${from},${to})`, WebkitBackgroundClip: 'text', color: 'transparent' }}>S/ 1,372</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">Enlace público activo</span>
      </div>
      <div className="mt-5 space-y-2.5">
        {rows.map(([name, amt, tag, pos]) => (
          <div key={name} className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-3">
            <span className="grid size-9 place-items-center rounded-full text-sm font-semibold" style={{ background: `linear-gradient(135deg,${from},${to})` }}>{name[0]}</span>
            <div className="min-w-0 flex-1"><p className="truncate text-sm">{name}</p><p className="text-xs text-white/40">{tag}</p></div>
            <span className={`text-sm font-semibold ${pos ? 'text-emerald-300' : 'text-rose-300'}`}>{amt}</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function Iris({ from, to }: { from: string; to: string }) {
  return (
    <Frame from={from} to={to}>
      <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
        <div className="grid aspect-video place-items-center rounded-xl bg-gradient-to-br from-[#2a1a05] to-[#0c0a07] p-4 text-center ring-1 ring-white/10">
          <p className="text-lg leading-snug font-semibold sm:text-xl" style={{ color: to }}>
            Santo, santo, santo<br /><span className="text-white/85">Señor Dios todopoderoso</span>
          </p>
        </div>
        <div className="space-y-2 text-xs">
          {['Alabanza', 'Lectura', 'Mensaje', 'Ofrenda'].map((b, i) => (
            <div key={b} className={`rounded-lg px-3 py-2.5 ${i === 0 ? 'text-black' : 'bg-white/[0.05] text-white/60'}`} style={i === 0 ? { background: `linear-gradient(90deg,${from},${to})` } : undefined}>
              {b}<span className="float-right opacity-60">{10 + i * 5}′</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-10 flex-1 rounded-md ring-1 ${i === 1 ? 'ring-2' : 'ring-white/10'} bg-white/[0.04]`} style={i === 1 ? { boxShadow: `0 0 0 2px ${from}` } : undefined} />
        ))}
      </div>
    </Frame>
  )
}

function Pulso({ from, to }: { from: string; to: string }) {
  return (
    <Frame from={from} to={to}>
      <div className="grid grid-cols-3 gap-3">
        {[['Activos', '412'], ['Por vencer', '37'], ['Hoy', '128']].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-white/[0.04] p-3">
            <p className="text-[11px] text-white/45">{k}</p>
            <p className="mt-1 text-2xl font-bold" style={{ color: to }}>{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {[['Sede Centro', '86%'], ['Sede Norte', '64%'], ['Sede Sur', '41%']].map(([k, w]) => (
          <div key={k}>
            <div className="mb-1.5 flex justify-between text-xs text-white/55"><span>{k}</span><span>{w}</span></div>
            <Bar w={w} c={`linear-gradient(90deg,${from},${to})`} />
          </div>
        ))}
      </div>
      <p className="mt-5 flex items-center gap-2 text-xs text-white/50">
        <span className="size-2 animate-pulse rounded-full" style={{ background: to }} /> Acceso en vivo · Lucía M. ingresó
      </p>
    </Frame>
  )
}

export default function Mockup({ id, from, to }: { id: ProductId; from: string; to: string }) {
  const C = { orbita: Orbita, nova: Nova, iris: Iris, pulso: Pulso }[id]
  return <C from={from} to={to} />
}
