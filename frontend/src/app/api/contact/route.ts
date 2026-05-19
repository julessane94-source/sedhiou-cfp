import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'

type ReqBody = {
  name: string
  email: string
  message: string
}

async function getReceiver() {
  try {
    const q = `*[_type == "contact"][0]{ email }`
    const res = await client.fetch(q)
    return res?.email || process.env.CONTACT_RECEIVER_EMAIL || null
  } catch (e) {
    return process.env.CONTACT_RECEIVER_EMAIL || null
  }
}

export async function POST(req: Request) {
  try {
    const body: ReqBody = await req.json()
    const receiver = await getReceiver()
    if (!receiver) return NextResponse.json({ error: 'Receiver not configured' }, { status: 500 })

    // Validate
    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Configure transporter using env vars. If none provided (dev), fall back to Ethereal test account.
    let transporter
    let usingTestAccount = false
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
    } else {
      // Development fallback: create Ethereal test account so the form still 'sends' locally
      const testAcct = await nodemailer.createTestAccount()
      transporter = nodemailer.createTransport({
        host: testAcct.smtp.host,
        port: testAcct.smtp.port,
        secure: testAcct.smtp.secure,
        auth: { user: testAcct.user, pass: testAcct.pass },
      })
      usingTestAccount = true
    }

    const mail = {
      from: `${body.name} <${body.email}>`,
      to: receiver,
      subject: `Nouveau message depuis le site — ${body.name}`,
      text: `Nom: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
      html: `<p><strong>Nom:</strong> ${body.name}</p><p><strong>Email:</strong> ${body.email}</p><p><strong>Message:</strong></p><p>${body.message.replace(/\n/g, '<br/>')}</p>`,
    }

    try {
      const info = await transporter.sendMail(mail)
      // If using test account, return the preview URL
      if (usingTestAccount) {
        const preview = nodemailer.getTestMessageUrl(info)
        return NextResponse.json({ ok: true, preview })
      }
      return NextResponse.json({ ok: true })
    } catch (err) {
      const msg = (err as Error).message || String(err)
      // Common case: ECONNREFUSED when SMTP not reachable
      if (msg.includes('ECONNREFUSED')) {
        return NextResponse.json({ error: `Connexion SMTP refusée (vérifiez SMTP_HOST/PORT). Détail: ${msg}` }, { status: 502 })
      }
      return NextResponse.json({ error: msg }, { status: 500 })
    }
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || 'Erreur' }, { status: 500 })
  }
}
