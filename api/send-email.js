// Vercel serverless function — sends plan email via Resend
// RESEND_API_KEY must be set in Vercel environment variables
// RESEND_FROM must be set to verified sender, e.g. "Dad Naor <noreply@darnaor.com>"

module.exports = async (req, res) => {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from   = process.env.RESEND_FROM || 'Dad Naor <noreply@darnaor.com>';

  if (!apiKey) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, html' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json'
      },
      body: JSON.stringify({ from, to, subject, html })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(response.status).json({ error: data.message || 'Send failed' });
    }

    return res.status(200).json({ ok: true, id: data.id });
  } catch (err) {
    console.error('send-email error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
};
