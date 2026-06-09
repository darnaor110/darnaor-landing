const RESEND_KEY  = 're_ZnZPao29_72jKa2hw74LiaRpYW8z8YVNr';
const RESEND_FROM = 'Dad Naor <onboarding@resend.dev>';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, name, pdfBase64 } = req.body || {};
  if (!to || !name) return res.status(400).json({ error: 'Missing to or name' });

  const safeName = String(name).replace(/[<>&"]/g, '');

  const emailHtml = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><style>
  body{margin:0;padding:24px 12px;background:#040e12;font-family:Arial,sans-serif;direction:rtl;color:#e2edf2}
  .wrap{max-width:520px;margin:0 auto;background:#0b1e26;border-radius:16px;padding:32px 24px;border:1px solid rgba(8,127,163,0.25);text-align:center}
  h1{font-size:1.4rem;color:#5bd4ff;margin-bottom:12px}
  p{font-size:0.95rem;color:#8aa4af;line-height:1.7}
  strong{color:#e2edf2}
</style></head>
<body><div class="wrap">
  <h1>שלום ${safeName}! 👋</h1>
  <p>התוכנית האישית שלך <strong>מוכנה</strong> ומצורפת למייל הזה כ-PDF.</p>
  <p>שמור אותה — יש בה הכל: תפריט שבועי, תוכנית אימון, ורשימת קניות.</p>
  <p style="margin-top:20px;font-size:0.85rem;color:rgba(138,164,175,0.6)">דר נאור · darnaor.com · @dar__naor</p>
</div></body></html>`;

  const payload = {
    from:    RESEND_FROM,
    to:      String(to),
    subject: `${safeName}, התוכנית האישית שלך מוכנה 💪`,
    html:    emailHtml
  };

  if (pdfBase64) {
    payload.attachments = [{
      filename: `התוכנית האישית של ${safeName}.pdf`,
      content:  pdfBase64
    }];
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
      body:    JSON.stringify(payload)
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data });
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
