'use client'

import { type FormEvent, useState } from 'react'

export type TicketTierConfig = {
  price: string
  headline: string
  sla: string
  badge: string
  icon: string
  gradient: string
}

type TicketFormProps = {
  tier: 'standard' | 'priority' | 'express'
  config: TicketTierConfig
}

export function TicketForm({ tier, config }: TicketFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)

    const formData = new FormData(event.currentTarget)
    formData.append('tier', tier)

    const response = await fetch('/api/tickets', {
      method: 'POST',
      body: formData,
    })

    setSubmitting(false)

    if (response.ok) {
      setSubmitted(true)
      event.currentTarget.reset()
    } else {
      const { error } = await response.json().catch(() => ({ error: 'Unknown error' }))
      alert(error ?? 'Unable to submit ticket. Please try again.')
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 px-4 py-16 text-neutral-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#14f19522,_transparent_55%),radial-gradient(circle_at_bottom,_#9945ff22,_transparent_50%)]" />

      <main className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-10 shadow-2xl shadow-black/30 backdrop-blur">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-70 blur-3xl"
            style={{ background: config.gradient }}
          />

          <header className="relative mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur">
                <span className="text-base">{config.icon}</span>
                {config.badge}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/60">
                {config.price}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">{config.headline}</h1>
              <p className="mt-2 text-sm text-white/65">{config.sla}</p>
            </div>
          </header>

          {submitted ? (
            <div className="relative rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-green-100">
              <h2 className="text-xl font-semibold">Ticket submitted</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Thanks for trusting Solana Support Desk. Your request is routed to the {config.badge.toLowerCase()} queue
                and we&apos;ll reach out based on the guaranteed turnaround.
              </p>
            </div>
          ) : (
            <form className="relative flex flex-col gap-5" onSubmit={handleSubmit}>
              <FormField
                label="Email"
                description="We’ll update you as soon as an engineer replies."
                input={
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 shadow-inner shadow-black/20 transition focus:border-[#14F195]/60 focus:outline-none focus:ring-2 focus:ring-[#14F195]/40"
                  />
                }
              />
              <FormField
                label="Subject"
                description="A fast headline helps us route your request."
                input={
                  <input
                    name="subject"
                    placeholder="Subject"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 shadow-inner shadow-black/20 transition focus:border-[#14F195]/60 focus:outline-none focus:ring-2 focus:ring-[#14F195]/40"
                  />
                }
              />
              <FormField
                label="Details"
                description="Share logs, error codes, or reproduction steps."
                input={
                  <textarea
                    name="details"
                    rows={6}
                    placeholder="Describe your issue in detail…"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 shadow-inner shadow-black/20 transition focus:border-[#14F195]/60 focus:outline-none focus:ring-2 focus:ring-[#14F195]/40"
                  />
                }
              />

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-base font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:bg-[#14F195] hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Submitting…' : `Submit ${config.headline}`}
              </button>
            </form>
          )}
        </section>

        <aside className="relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white">What happens next?</h2>
            <p className="text-sm text-white/65">
              Payments settle instantly on Solana, unlocking the {config.badge.toLowerCase()} engineer queue in moments.
            </p>
          </div>

          <ol className="space-y-5 text-sm">
            {[
              {
                title: 'Submit your ticket',
                detail: 'Give us context so the right engineer can take over immediately.',
              },
              {
                title: 'Confirm payment (if required)',
                detail:
                  tier === 'standard'
                    ? 'Standard tickets stay free—no payment required.'
                    : 'Authorize the USDC payment. We verify it on-chain via X402 in seconds.',
              },
              {
                title: 'Receive updates',
                detail: 'Track progress by email. You’ll hear from us within the guaranteed window.',
              },
            ].map((item, index) => (
              <li key={item.title} className="relative pl-10">
                <span className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-semibold text-white/70">
                  {index + 1}
                </span>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-white/60">{item.detail}</p>
              </li>
            ))}
          </ol>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-white/70 shadow-inner shadow-black/50">
            <p className="font-semibold text-white">Response pledge</p>
            <p className="mt-2 leading-relaxed">
              Our SLA timers start as soon as your ticket is logged. If we miss the promised window for a paid tier, your
              next request at that tier is on us.
            </p>
          </div>

          <div className="grid gap-3 rounded-2xl bg-white/10 p-6 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Need a human fast?</p>
            <p className="text-base font-semibold text-white">Ping our standby engineer desk on Discord: @solana-support</p>
            <p>
              Include your ticket ID after submission and we’ll anchor your conversation for continuity across channels.
            </p>
          </div>
        </aside>
      </main>
    </div>
  )
}

type FormFieldProps = {
  label: string
  description: string
  input: React.ReactNode
}

function FormField({ label, description, input }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-white">{label}</span>
      <span className="text-xs text-white/45">{description}</span>
      {input}
    </label>
  )
}


