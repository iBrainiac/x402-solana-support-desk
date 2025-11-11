# Solana Support Desk – X402 Implementation Guide

## Overview

Solana Support Desk is a Next.js 16 application that demonstrates a tiered support workflow backed by Solana USDC payments using the X402 protocol. Users can submit tickets at three urgency levels:

- `Standard` – free, best-effort response
- `Priority` – $1 USDC, 12h SLA
- `Express` – $5 USDC, 2h SLA

The app relies on the `x402-next` middleware to enforce payment for premium tiers, Coinbase Pay for checkout, and Resend to notify the support team by email.

---

## High-Level Flow

1. **Landing page (`/`)** – Users choose a support tier. Standard routes directly to the form; Priority/Express invoke the X402 payment gate first.
2. **Middleware** – X402 intercepts requests to `/tickets/priority` and `/tickets/express`, returning HTTP 402 until a valid payment session exists.
3. **Coinbase Pay Modal** – The user completes a Solana USDC transfer via the X402 facilitator.
4. **Ticket Form** – After payment (or immediately for Standard), the user fills out contact details and issue description.
5. **API Route** – `POST /api/tickets` logs the ticket and sends it to the configured support inbox via Resend.
6. **Confirmation** – The UI confirms submission and explains next steps while the session cookie keeps the paid tier unlocked.
