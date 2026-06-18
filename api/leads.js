// Serverless lead ingestion and Resend email dispatcher function for Vercel
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, company, project, email, message, timestamp } = req.body

  if (!name || !email) {
    res.status(400).json({ error: 'Name and Email are required fields' })
    return
  }

  // 1. Supabase Database Ingestion
  let dbSuccess = false
  const supabaseUrl = process.env.VITE_DATABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.VITE_DATABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      const dbResponse = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
          name,
          company: company || 'Personal Brand',
          project,
          email,
          message,
          timestamp,
          archived: false
        })
      })
      if (dbResponse.ok) {
        dbSuccess = true
      } else {
        console.error(`Supabase returned error code: ${dbResponse.status}`)
      }
    } catch (dbErr) {
      console.error('Failed to ingest lead in Supabase database:', dbErr)
    }
  }

  // 2. Resend Background Email Dispatcher
  let emailSuccess = false
  const resendKey = process.env.VITE_RESEND_API_KEY
  const recipientEmail = process.env.VITE_RECIPIENT_EMAIL || 'zorbitweb@gmail.com'

  // Beautifully styled responsive HTML Email receipt template
  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>zorbit-studio Brief Logged</title>
    <style>
      body {
        background-color: #0A0A0F;
        color: #E2E8F0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        margin: 0;
        padding: 40px 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #111118;
        border: 1px solid #1A1A24;
        border-radius: 16px;
        padding: 32px;
      }
      .header {
        border-bottom: 1px solid #1A1A24;
        padding-bottom: 20px;
        margin-bottom: 28px;
      }
      .logo {
        font-size: 24px;
        font-weight: bold;
        color: #FFFFFF;
      }
      .logo span {
        color: #2563EB;
      }
      h1 {
        font-size: 22px;
        color: #FFFFFF;
        margin-top: 0;
      }
      p {
        line-height: 1.6;
        color: #94A3B8;
      }
      .detail-card {
        background-color: #1A1A24;
        border: 1px solid #22222F;
        border-radius: 12px;
        padding: 20px;
        margin: 24px 0;
      }
      .detail-row {
        margin-bottom: 12px;
        font-size: 14px;
      }
      .label {
        color: #64748B;
        font-weight: 600;
        display: block;
        margin-bottom: 4px;
      }
      .value {
        color: #FFFFFF;
        font-weight: bold;
      }
      .brief-content {
        white-space: pre-wrap;
        font-size: 13px;
        color: #E2E8F0;
        background: #0A0A0F;
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #22222F;
        margin-top: 6px;
      }
      .footer {
        border-top: 1px solid #1A1A24;
        padding-top: 20px;
        margin-top: 32px;
        font-size: 12px;
        color: #64748B;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">zorbit-<span>studio</span></div>
      </div>
      <h1>Project Inquest Received</h1>
      <p>Hi ${name},</p>
      <p>We have received your custom project request. Our engineering team has been notified and is currently analyzing your specifications. Below is the blueprint log registered in our system:</p>
      
      <div class="detail-card">
        <div class="detail-row">
          <span class="label">Client Name:</span>
          <span class="value">${name}</span>
        </div>
        <div class="detail-row">
          <span class="label">Company / Brand:</span>
          <span class="value">${company || 'Personal Brand'}</span>
        </div>
        <div class="detail-row">
          <span class="label">Project Focus:</span>
          <span class="value">${project}</span>
        </div>
        <div class="detail-row">
          <span class="label">Submission Date:</span>
          <span class="value">${new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
        </div>
        <div class="detail-row">
          <span class="label">Requirements & Details:</span>
          <div class="brief-content">${message}</div>
        </div>
      </div>

      <p>A product architect will reach out to you within our 4-hour response SLA to align on specifications, target timelines, and exact estimates.</p>
      
      <div class="footer">
        &copy; ${new Date().getFullYear()} zorbit-studio. All rights reserved.<br>
        Chennai, Tamil Nadu, India
      </div>
    </div>
  </body>
  </html>
  `

  if (resendKey) {
    try {
      // 1. Send receipt email to the Client
      const clientRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`
        },
        body: JSON.stringify({
          from: 'Zorbit Studio <sprints@zorbit.studio>',
          to: email,
          subject: `zorbit-studio: Project Inquest Logged [${project}]`,
          html: emailHtml
        })
      })

      if (!clientRes.ok) {
        const errorText = await clientRes.text()
        console.error(`[Resend Error] Client Receipt API call failed (HTTP ${clientRes.status}):`, errorText)
      }

      // 2. Notify Zorbit Studio Admins
      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`
        },
        body: JSON.stringify({
          from: 'Zorbit Studio Telemetry <alerts@zorbit.studio>',
          to: recipientEmail,
          subject: `Telemetry Alert: New Inquest from ${name} [${company || 'Personal'}]`,
          html: `<h3>New Lead Logged</h3><p>Name: ${name}</p><p>Email: ${email}</p><p>Focus: ${project}</p><p>Message: ${message}</p>`
        })
      })

      if (!adminRes.ok) {
        const errorText = await adminRes.text()
        console.error(`[Resend Error] Admin Notification API call failed (HTTP ${adminRes.status}):`, errorText)
      } else {
        emailSuccess = true
      }
    } catch (emailErr) {
      console.error('Resend background email dispatch encountered an exception:', emailErr)
    }
  }

  res.status(200).json({
    success: true,
    dbSynced: dbSuccess,
    emailDispatched: emailSuccess,
    message: dbSuccess ? 'Lead stored and email receipt triggered.' : 'Lead stored locally in fallback mode.'
  })
}
