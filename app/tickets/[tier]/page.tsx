import { TicketForm, type TicketTierConfig } from '@/components/ticket-form'
import { notFound } from 'next/navigation'

const TIERS: Record<string, TicketTierConfig> = {
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
}

export default async function TicketPage({ params }: { params: Promise<{ tier: string }> }) {
  const { tier } = await params
  const config = TIERS[tier]

  if (!config) {
    notFound()
  }

  return <TicketForm tier={tier as keyof typeof TIERS} config={config} />
}

