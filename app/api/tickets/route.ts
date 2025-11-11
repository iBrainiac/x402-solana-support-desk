import { NextResponse } from 'next/server'
import { Resend } from 'resend'

type Ticket = {
  id: string
  tier: string
  email: string
  subject: string
  details: string
  createdAt: string
}

const tickets: Ticket[] = []

const resendApiKey = process.env.RESEND_API_KEY
const supportInbox = process.env.SUPPORT_INBOX_EMAIL

const resendClient = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  const formData = await request.formData()

  const ticket: Ticket = {
    id: crypto.randomUUID(),
    tier: String(formData.get('tier') ?? 'standard'),
    email: String(formData.get('email') ?? '').trim(),
    subject: String(formData.get('subject') ?? '').trim(),
    details: String(formData.get('details') ?? '').trim(),
    createdAt: new Date().toISOString(),
  }

  if (!ticket.email || !ticket.subject || !ticket.details) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  tickets.push(ticket)
  console.log('New support ticket:', ticket)

  if (!resendClient || !supportInbox) {
    console.warn(
      '[tickets] Missing RESEND_API_KEY or SUPPORT_INBOX_EMAIL env vars. Ticket stored locally but no email sent.',
    )
    return NextResponse.json({ ok: true, ticketId: ticket.id, emailed: false })
  }

  try {
    await resendClient.emails.send({
      from: 'Solana Support Desk <franqsharky@goiferai.resend.app>', //tickets@resend.dev
      to: supportInbox,
      subject: `[${ticket.tier.toUpperCase()}] ${ticket.subject}`,
      replyTo: ticket.email,
      text: formatTicketPlainText(ticket),
      html: formatTicketHtml(ticket),
    })
  } catch (error) {
    console.error('Failed to send support ticket email:', error)
    return NextResponse.json({ error: 'Unable to notify support by email.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, ticketId: ticket.id, emailed: true })
}

const formatTicketPlainText = (ticket: Ticket) => {
  return [
    `New ${ticket.tier} support ticket`,
    `Created: ${ticket.createdAt}`,
    `From: ${ticket.email}`,
    `Tier: ${ticket.tier}`,
    '',
    `Subject: ${ticket.subject}`,
    '',
    ticket.details,
  ].join('\n')
}

const formatTicketHtml = (ticket: Ticket) => {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <p style="font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #6366f1; margin-bottom: 12px;">
        ${ticket.tier.toUpperCase()} Support Ticket
      </p>
      <p style="margin: 0 0 16px 0; font-size: 14px; color: #334155;">
        Created on <strong>${new Date(ticket.createdAt).toLocaleString()}</strong>
      </p>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px;">
        <p style="margin: 0 0 12px 0; font-size: 14px; color: #475569;">
          <strong>From:</strong> ${ticket.email}<br/>
          <strong>Tier:</strong> ${ticket.tier}
        </p>
        <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #0f172a;">${ticket.subject}</h2>
        <p style="white-space: pre-wrap; font-size: 15px; color: #1f2937;">${ticket.details}</p>
      </div>
      <p style="margin-top: 20px; font-size: 13px; color: #475569;">
        Reply directly to this email to reach the customer.
      </p>
    </div>
  `
}

