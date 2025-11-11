import Link from 'next/link'

const tiers = [
  {
    id: 'standard',
    title: 'Standard Support',
    description: 'Free ticket with best-effort response within 48 hours.',
    cta: 'Submit Standard Ticket',
    highlight: 'Best for general issues',
    icon: '🧭',
  },
  {
    id: 'priority',
    title: 'Priority Support',
    description: '$1 USDC • Guaranteed response within 12 hours.',
    cta: 'Submit Priority Ticket',
    highlight: 'Guaranteed 12h response',
    icon: '⚡️',
  },
  {
    id: 'express',
    title: 'Express Support',
    description: '$5 USDC • Direct escalation, response within 2 hours.',
    cta: 'Submit Express Ticket',
    highlight: 'Fastest 2h turnaround',
    icon: '🚀',
  },
] as const

const features = [
  {
    title: 'USDC Payments on Solana',
    description: 'Secure, verifiable payments powered by Coinbase X402 ensure every paid request is honored immediately.',
    icon: '💳',
  },
  {
    title: 'Real Engineers, Real Time',
    description: 'Your ticket is routed directly to the right engineer queue based on tier, keeping wait times honest.',
    icon: '👩‍💻',
  },
  {
    title: 'Transparent SLAs',
    description: 'See exactly how long each tier takes before you pay, with automated updates as your case progresses.',
    icon: '📈',
  },
] as const

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-neutral-950 font-sans text-neutral-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#14f19533,_transparent_50%),radial-gradient(circle_at_bottom,_#9945ff33,_transparent_55%)]" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-28 sm:px-10 lg:px-16">
        <header className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Solana Support Desk
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Dial up your response time with tiered, verifiable support.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">
              Submit your ticket and choose the turnaround that matches the urgency. Payments are settled in Solana USDC
              the moment you confirm, unlocking dedicated engineer queues instantly.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tickets/express"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-[#14F195]/30 transition hover:translate-y-0.5 hover:shadow-xl"
              >
                Book Express Support <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/tickets/standard"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Try Standard First
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-[#9945FF]/20 backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Why teams choose Solana Support Desk</h2>
            <div className="grid gap-5">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-white/80">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-white/65">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white">Choose your priority level</h2>
            <p className="text-sm text-white/60">
              Each tier routes you to a dedicated queue. Payments settle instantly and unlock your promised SLA.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <article
                key={tier.id}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] p-7 shadow-lg shadow-black/30 transition duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/15"
              >
                <div className="absolute right-4 top-4 text-3xl opacity-60 transition group-hover:opacity-100">
                  {tier.icon}
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Tier {tier.id}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{tier.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">{tier.description}</p>
                  <div className="rounded-2xl bg-black/30 px-4 py-3 text-xs font-medium text-white/60">
                    {tier.highlight}
                  </div>
                </div>

                <Link
                  href={`/tickets/${tier.id}`}
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-[#14F195] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {tier.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
