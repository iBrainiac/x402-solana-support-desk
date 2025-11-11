import { TicketForm, type TicketTierConfig } from '@/components/ticket-form'
import { notFound } from 'next/navigation'

const TIERS = {
  standard: {
    price: 'Free',
    headline: 'Standard Support Ticket',
    sla: 'Best-effort response within 48 hours.',
    badge: 'Standard Queue',
    icon: '🧭',
    gradient: 'linear-gradient(135deg, rgba(20,241,149,0.35), rgba(153,69,255,0.2))',
  },
  priority: {
    price: '$1 USDC',
    headline: 'Priority Support Ticket',
    sla: 'Guaranteed response within 12 hours.',
    badge: 'Priority Response',
    icon: '⚡️',
    gradient: 'linear-gradient(135deg, rgba(255,196,67,0.4), rgba(153,69,255,0.25))',
  },
  express: {
    price: '$5 USDC',
    headline: 'Express Support Ticket',
    sla: 'Direct escalation with response within 2 hours.',
    badge: 'Express Escalation',
    icon: '🚀',
    gradient: 'linear-gradient(135deg, rgba(255,82,124,0.45), rgba(20,241,149,0.25))',
  },
} satisfies Record<string, TicketTierConfig>

type TierKey = keyof typeof TIERS

const isSupportedTier = (value: string): value is TierKey => Object.hasOwn(TIERS, value)

export default function TicketPage({ params }: { params: { tier: string } }) {
  const { tier } = params

  if (!isSupportedTier(tier)) {
    notFound()
  }

  const config = TIERS[tier]

  return <TicketForm tier={tier} config={config} />
}
